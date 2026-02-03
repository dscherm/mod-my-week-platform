// Firebase service for student progress tracking
// Supports both Firebase and Demo Mode (localStorage fallback)

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../config/firebase';

// Check if we're in demo mode
const isDemoMode = () => {
  // Check for explicit demo mode flag
  if (import.meta.env.VITE_DEMO_MODE === 'true') return true;
  // Check if Firebase is not configured
  return !isFirebaseConfigured();
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" &&
         firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
         firebaseConfig.apiKey &&
         firebaseConfig.projectId;
};

// Initialize Firebase only if configured
let app = null;
let db = null;

if (isFirebaseConfigured() && !isDemoMode()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.log('Running in Demo Mode - using localStorage for data storage');
}

// Collection references
const STUDENTS_COLLECTION = 'students';
const CLASSES_COLLECTION = 'classes';
const TEACHERS_COLLECTION = 'teachers';

// ============================================
// DEMO MODE HELPERS (localStorage)
// ============================================

const DEMO_STORAGE_KEY = 'cyberRangeDemo';

const getDemoData = () => {
  try {
    const data = localStorage.getItem(DEMO_STORAGE_KEY);
    return data ? JSON.parse(data) : { students: {}, classes: {}, assignments: {}, teachers: {} };
  } catch {
    return { students: {}, classes: {}, assignments: {}, teachers: {} };
  }
};

const saveDemoData = (data) => {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
};

// Demo mode subscriptions (simulated real-time)
const demoSubscriptions = new Map();

const notifyDemoSubscribers = (key) => {
  const callbacks = demoSubscriptions.get(key) || [];
  const data = getDemoData();
  callbacks.forEach(cb => {
    if (key.startsWith('class:')) {
      const classCode = key.replace('class:', '');
      const students = Object.values(data.students).filter(s => s.classCode === classCode);
      cb(students.map(s => ({
        ...s,
        lastActivity: s.lastActivity ? new Date(s.lastActivity) : null,
        lastLogin: s.lastLogin ? new Date(s.lastLogin) : null
      })));
    } else if (key.startsWith('assignments:')) {
      const classCode = key.replace('assignments:', '');
      const assignments = Object.values(data.assignments[classCode] || {});
      cb(assignments.map(a => ({
        ...a,
        dueDate: a.dueDate ? new Date(a.dueDate) : null,
        createdAt: a.createdAt ? new Date(a.createdAt) : null,
        assignedAt: a.assignedAt ? new Date(a.assignedAt) : null
      })));
    }
  });
};

// ============================================
// STUDENT FUNCTIONS
// ============================================

// Register or login a student
export const loginStudent = async (studentName, classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const studentId = `${classCode}_${studentName.toLowerCase().replace(/\s+/g, '_')}`;

    if (data.students[studentId]) {
      data.students[studentId].lastLogin = new Date().toISOString();
      saveDemoData(data);
      return { id: studentId, ...data.students[studentId] };
    } else {
      const newStudent = {
        name: studentName,
        classCode: classCode,
        completedChallenges: [],
        completedScenarios: [],
        completedExercises: [],
        completedPseudocode: [],
        completedFlowcharts: [],
        completedDataApisExercises: [],
        completedObjectsImagesExercises: [],
        totalPoints: 0,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
      data.students[studentId] = newStudent;
      saveDemoData(data);
      notifyDemoSubscribers(`class:${classCode}`);
      return { id: studentId, ...newStudent };
    }
  }

  if (!db) return null;

  const studentId = `${classCode}_${studentName.toLowerCase().replace(/\s+/g, '_')}`;
  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);

  const studentDoc = await getDoc(studentRef);

  if (studentDoc.exists()) {
    // Update last login
    await updateDoc(studentRef, {
      lastLogin: serverTimestamp()
    });
    return { id: studentId, ...studentDoc.data() };
  } else {
    // Create new student
    const newStudent = {
      name: studentName,
      classCode: classCode,
      completedChallenges: [],
      completedScenarios: [],
      completedExercises: [],
      completedPseudocode: [],
      completedFlowcharts: [],
      completedDataApisExercises: [],
      completedObjectsImagesExercises: [],
      totalPoints: 0,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      lastActivity: serverTimestamp()
    };
    await setDoc(studentRef, newStudent);
    return { id: studentId, ...newStudent };
  }
};

// Save student progress
export const saveStudentProgress = async (studentId, progress) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.students[studentId]) {
      data.students[studentId] = {
        ...data.students[studentId],
        completedChallenges: progress.completedChallenges || [],
        completedScenarios: progress.completedScenarios || [],
        completedExercises: progress.completedExercises || [],
        completedPseudocode: progress.completedPseudocode || [],
        completedFlowcharts: progress.completedFlowcharts || [],
        completedDataApisExercises: progress.completedDataApisExercises || [],
        completedObjectsImagesExercises: progress.completedObjectsImagesExercises || [],
        totalPoints: progress.totalPoints || 0,
        lastActivity: new Date().toISOString()
      };
      saveDemoData(data);
      const classCode = data.students[studentId].classCode;
      notifyDemoSubscribers(`class:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  await updateDoc(studentRef, {
    completedChallenges: progress.completedChallenges || [],
    completedScenarios: progress.completedScenarios || [],
    completedExercises: progress.completedExercises || [],
    completedPseudocode: progress.completedPseudocode || [],
    completedFlowcharts: progress.completedFlowcharts || [],
    completedDataApisExercises: progress.completedDataApisExercises || [],
    completedObjectsImagesExercises: progress.completedObjectsImagesExercises || [],
    totalPoints: progress.totalPoints || 0,
    lastActivity: serverTimestamp()
  });
};

// Get student progress
export const getStudentProgress = async (studentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return data.students[studentId] || null;
  }

  if (!db) return null;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const studentDoc = await getDoc(studentRef);

  if (studentDoc.exists()) {
    return studentDoc.data();
  }
  return null;
};

// Record specific activity (for detailed tracking)
export const recordActivity = async (studentId, activity) => {
  if (isDemoMode()) {
    // In demo mode, we just update lastActivity
    const data = getDemoData();
    if (data.students[studentId]) {
      data.students[studentId].lastActivity = new Date().toISOString();
      saveDemoData(data);
    }
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const activitiesRef = collection(studentRef, 'activities');

  await setDoc(doc(activitiesRef), {
    ...activity,
    timestamp: serverTimestamp()
  });
};

// ============================================
// STUDENT SUBMISSION FUNCTIONS
// ============================================

// Save a student's final submission for an exercise
export const saveStudentSubmission = async (studentId, exerciseId, submission) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.students[studentId]) return;

    if (!data.students[studentId].submissions) {
      data.students[studentId].submissions = {};
    }

    data.students[studentId].submissions[exerciseId] = {
      answer: submission.answer,
      isCorrect: submission.isCorrect,
      exerciseType: submission.exerciseType,
      exerciseTitle: submission.exerciseTitle,
      submittedAt: new Date().toISOString()
    };

    data.students[studentId].lastActivity = new Date().toISOString();
    saveDemoData(data);
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);

  // Update the submissions map in the student document
  const updateData = {};
  updateData[`submissions.${exerciseId}`] = {
    answer: submission.answer,
    isCorrect: submission.isCorrect,
    exerciseType: submission.exerciseType,
    exerciseTitle: submission.exerciseTitle,
    submittedAt: serverTimestamp()
  };
  updateData.lastActivity = serverTimestamp();

  await updateDoc(studentRef, updateData);
};

// Get all submissions for a student (for teacher view)
export const getStudentSubmissions = async (studentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.students[studentId]) return {};
    return data.students[studentId].submissions || {};
  }

  if (!db) return {};

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const studentDoc = await getDoc(studentRef);

  if (studentDoc.exists()) {
    return studentDoc.data().submissions || {};
  }
  return {};
};

// Get all submissions for a class (for teacher dashboard)
export const getClassSubmissions = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const classSubmissions = [];

    Object.entries(data.students)
      .filter(([_, student]) => student.classCode === classCode)
      .forEach(([studentId, student]) => {
        if (student.submissions) {
          Object.entries(student.submissions).forEach(([exerciseId, submission]) => {
            classSubmissions.push({
              studentId,
              studentName: student.name,
              exerciseId,
              ...submission
            });
          });
        }
      });

    return classSubmissions;
  }

  if (!db) return [];

  const studentsQuery = query(
    collection(db, STUDENTS_COLLECTION),
    where('classCode', '==', classCode)
  );

  const snapshot = await getDocs(studentsQuery);
  const classSubmissions = [];

  snapshot.docs.forEach(doc => {
    const student = doc.data();
    if (student.submissions) {
      Object.entries(student.submissions).forEach(([exerciseId, submission]) => {
        classSubmissions.push({
          studentId: doc.id,
          studentName: student.name,
          exerciseId,
          ...submission,
          submittedAt: submission.submittedAt?.toDate?.() || null
        });
      });
    }
  });

  return classSubmissions;
};

// ============================================
// TEACHER/CLASS FUNCTIONS
// ============================================

// Create a new class
export const createClass = async (className, teacherName) => {
  const classCode = generateClassCode();

  if (isDemoMode()) {
    const data = getDemoData();
    data.classes[classCode] = {
      name: className,
      teacher: teacherName,
      classCode: classCode,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    data.assignments[classCode] = {};
    saveDemoData(data);
    return classCode;
  }

  if (!db) return null;

  const classRef = doc(db, CLASSES_COLLECTION, classCode);

  await setDoc(classRef, {
    name: className,
    teacher: teacherName,
    classCode: classCode,
    createdAt: serverTimestamp(),
    isActive: true
  });

  return classCode;
};

// Get class info
export const getClassInfo = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return data.classes[classCode] || null;
  }

  if (!db) return null;

  const classRef = doc(db, CLASSES_COLLECTION, classCode);
  const classDoc = await getDoc(classRef);

  if (classDoc.exists()) {
    return classDoc.data();
  }
  return null;
};

// Validate class code exists
export const validateClassCode = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return !!data.classes[classCode];
  }

  if (!db) return false;

  const classRef = doc(db, CLASSES_COLLECTION, classCode);
  const classDoc = await getDoc(classRef);
  return classDoc.exists();
};

// Get all students in a class
export const getClassStudents = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return Object.entries(data.students)
      .filter(([_, s]) => s.classCode === classCode)
      .map(([id, s]) => ({ id, ...s }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  if (!db) return [];

  const studentsQuery = query(
    collection(db, STUDENTS_COLLECTION),
    where('classCode', '==', classCode),
    orderBy('totalPoints', 'desc')
  );

  const snapshot = await getDocs(studentsQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Subscribe to real-time class updates (for teacher dashboard)
export const subscribeToClassProgress = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `class:${classCode}`;
    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(callback);
    demoSubscriptions.set(key, callbacks);

    // Initial call
    const data = getDemoData();
    const students = Object.entries(data.students)
      .filter(([_, s]) => s.classCode === classCode)
      .map(([id, s]) => ({
        id,
        ...s,
        lastActivity: s.lastActivity ? new Date(s.lastActivity) : null,
        lastLogin: s.lastLogin ? new Date(s.lastLogin) : null
      }));
    callback(students);

    // Return unsubscribe function
    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== callback));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const studentsQuery = query(
    collection(db, STUDENTS_COLLECTION),
    where('classCode', '==', classCode)
  );

  return onSnapshot(studentsQuery, (snapshot) => {
    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamps to JS dates
      lastActivity: doc.data().lastActivity?.toDate?.() || null,
      lastLogin: doc.data().lastLogin?.toDate?.() || null
    }));
    callback(students);
  });
};

// Subscribe to assignments for a class
export const subscribeToAssignments = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `assignments:${classCode}`;
    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(callback);
    demoSubscriptions.set(key, callbacks);

    // Initial call
    const data = getDemoData();
    const assignments = Object.entries(data.assignments[classCode] || {})
      .map(([id, a]) => ({
        id,
        ...a,
        dueDate: a.dueDate ? new Date(a.dueDate) : null,
        createdAt: a.createdAt ? new Date(a.createdAt) : null,
        assignedAt: a.assignedAt ? new Date(a.assignedAt) : null
      }));
    callback(assignments);

    // Return unsubscribe function
    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== callback));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const assignmentsRef = collection(db, CLASSES_COLLECTION, classCode, 'assignments');

  return onSnapshot(assignmentsRef, (snapshot) => {
    const assignments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueDate?.toDate?.() || null,
      createdAt: doc.data().createdAt?.toDate?.() || null,
      assignedAt: doc.data().assignedAt?.toDate?.() || doc.data().createdAt?.toDate?.() || null
    }));
    callback(assignments);
  });
};

// Create a new assignment for a class
export const createAssignment = async (classCode, assignmentData) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.assignments[classCode]) {
      data.assignments[classCode] = {};
    }

    const assignmentId = `assignment_${Date.now()}`;
    data.assignments[classCode][assignmentId] = {
      type: assignmentData.type,
      items: assignmentData.items || [],
      title: assignmentData.title,
      assignedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      dueDate: assignmentData.dueDate || null
    };

    saveDemoData(data);
    notifyDemoSubscribers(`assignments:${classCode}`);
    return { id: assignmentId };
  }

  if (!db) return null;

  const assignmentsRef = collection(db, CLASSES_COLLECTION, classCode, 'assignments');

  const newAssignment = {
    type: assignmentData.type,
    items: assignmentData.items || [],
    title: assignmentData.title,
    assignedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    dueDate: assignmentData.dueDate || null
  };

  const docRef = await setDoc(doc(assignmentsRef), newAssignment);
  return docRef;
};

// Delete an assignment from a class
export const deleteAssignment = async (classCode, assignmentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.assignments[classCode] && data.assignments[classCode][assignmentId]) {
      delete data.assignments[classCode][assignmentId];
      saveDemoData(data);
      notifyDemoSubscribers(`assignments:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const assignmentRef = doc(db, CLASSES_COLLECTION, classCode, 'assignments', assignmentId);
  await deleteDoc(assignmentRef);
};

// ============================================
// TEACHER AUTHENTICATION FUNCTIONS
// ============================================

// Register a new teacher
export const registerTeacher = async (name, email, password) => {
  const teacherId = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
  console.log('Registering teacher:', { teacherId, email, isDemoMode: isDemoMode(), dbAvailable: !!db });

  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teachers) data.teachers = {};

    if (data.teachers[teacherId]) {
      throw new Error('An account with this email already exists');
    }

    data.teachers[teacherId] = {
      name,
      email: email.toLowerCase(),
      password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
      classes: []
    };
    saveDemoData(data);
    console.log('Teacher registered in demo mode:', teacherId);
    return { id: teacherId, name, email: email.toLowerCase(), classes: [] };
  }

  if (!db) {
    console.error('Firebase db is not initialized for teacher registration!');
    throw new Error('Database not available. Please check Firebase configuration.');
  }

  try {
    const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
    const teacherDoc = await getDoc(teacherRef);

    if (teacherDoc.exists()) {
      throw new Error('An account with this email already exists');
    }

    const newTeacher = {
      name,
      email: email.toLowerCase(),
      password, // In production, use Firebase Auth instead
      createdAt: serverTimestamp(),
      classes: []
    };

    console.log('Creating teacher document in Firebase:', teacherId);
    await setDoc(teacherRef, newTeacher);
    console.log('Teacher registered successfully in Firebase');
    return { id: teacherId, name, email: email.toLowerCase(), classes: [] };
  } catch (error) {
    console.error('Error registering teacher:', error);
    throw error;
  }
};

// Login teacher
export const loginTeacher = async (email, password) => {
  const teacherId = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
  console.log('Teacher login attempt:', { teacherId, isDemoMode: isDemoMode(), dbAvailable: !!db });

  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teachers) data.teachers = {};

    const teacher = data.teachers[teacherId];
    if (!teacher) {
      throw new Error('No account found with this email');
    }
    if (teacher.password !== password) {
      throw new Error('Incorrect password');
    }

    console.log('Teacher logged in via demo mode:', teacherId);
    return { id: teacherId, name: teacher.name, email: teacher.email, classes: teacher.classes || [] };
  }

  if (!db) {
    console.error('Firebase db is not initialized for teacher login!');
    throw new Error('Database not available. Please check Firebase configuration.');
  }

  try {
    const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
    console.log('Fetching teacher from Firebase:', teacherId);
    const teacherDoc = await getDoc(teacherRef);

    if (!teacherDoc.exists()) {
      console.log('Teacher not found in Firebase');
      throw new Error('No account found with this email');
    }

    const teacher = teacherDoc.data();
    if (teacher.password !== password) {
      throw new Error('Incorrect password');
    }

    console.log('Teacher logged in successfully from Firebase. Classes:', teacher.classes);
    return { id: teacherId, name: teacher.name, email: teacher.email, classes: teacher.classes || [] };
  } catch (error) {
    console.error('Error during teacher login:', error);
    throw error;
  }
};

// Get teacher's classes
export const getTeacherClasses = async (teacherId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teachers || !data.teachers[teacherId]) return [];

    const classCodes = data.teachers[teacherId].classes || [];
    return classCodes.map(code => data.classes[code]).filter(Boolean);
  }

  if (!db) return [];

  const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
  const teacherDoc = await getDoc(teacherRef);

  if (!teacherDoc.exists()) return [];

  const classCodes = teacherDoc.data().classes || [];
  const classes = [];

  for (const code of classCodes) {
    const classInfo = await getClassInfo(code);
    if (classInfo) {
      classes.push(classInfo);
    }
  }

  return classes;
};

// Create a class and link to teacher
export const createClassForTeacher = async (teacherId, className) => {
  const classCode = generateClassCode();
  console.log('Creating class:', { teacherId, className, classCode, isDemoMode: isDemoMode(), dbAvailable: !!db });

  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teachers) data.teachers = {};
    if (!data.teachers[teacherId]) {
      throw new Error('Teacher not found');
    }

    // Create the class
    data.classes[classCode] = {
      name: className,
      teacherId: teacherId,
      teacher: data.teachers[teacherId].name,
      classCode: classCode,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    data.assignments[classCode] = {};

    // Link class to teacher
    if (!data.teachers[teacherId].classes) {
      data.teachers[teacherId].classes = [];
    }
    data.teachers[teacherId].classes.push(classCode);

    saveDemoData(data);
    console.log('Class created in demo mode:', classCode);
    return data.classes[classCode];
  }

  if (!db) {
    console.error('Firebase db is not initialized!');
    throw new Error('Database not available. Please check Firebase configuration.');
  }

  try {
    // Create the class
    const classRef = doc(db, CLASSES_COLLECTION, classCode);
    const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);

    console.log('Fetching teacher document:', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    if (!teacherDoc.exists()) {
      console.error('Teacher not found in Firebase:', teacherId);
      throw new Error('Teacher not found');
    }

    const classData = {
      name: className,
      teacherId: teacherId,
      teacher: teacherDoc.data().name,
      classCode: classCode,
      createdAt: serverTimestamp(),
      isActive: true
    };

    console.log('Creating class document in Firebase:', classCode);
    await setDoc(classRef, classData);
    console.log('Class document created successfully');

    // Link class to teacher
    const currentClasses = teacherDoc.data().classes || [];
    console.log('Updating teacher classes array. Current classes:', currentClasses);
    await updateDoc(teacherRef, {
      classes: [...currentClasses, classCode]
    });
    console.log('Teacher document updated with new class');

    return { ...classData, classCode };
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

// Delete a class
export const deleteClass = async (teacherId, classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teachers || !data.teachers[teacherId]) {
      throw new Error('Teacher not found');
    }

    // Remove class from teacher's list
    data.teachers[teacherId].classes = (data.teachers[teacherId].classes || [])
      .filter(c => c !== classCode);

    // Delete the class
    delete data.classes[classCode];
    delete data.assignments[classCode];

    // Delete students in this class
    Object.keys(data.students).forEach(studentId => {
      if (data.students[studentId].classCode === classCode) {
        delete data.students[studentId];
      }
    });

    saveDemoData(data);
    return true;
  }

  if (!db) return false;

  const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
  const teacherDoc = await getDoc(teacherRef);

  if (!teacherDoc.exists()) {
    throw new Error('Teacher not found');
  }

  // Remove class from teacher's list
  const currentClasses = teacherDoc.data().classes || [];
  await updateDoc(teacherRef, {
    classes: currentClasses.filter(c => c !== classCode)
  });

  // Delete the class document
  const classRef = doc(db, CLASSES_COLLECTION, classCode);
  await deleteDoc(classRef);

  return true;
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate a random class code
const generateClassCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Check if running in demo mode (export for UI)
export const isInDemoMode = isDemoMode;

// Export db for direct access if needed
export { db };
