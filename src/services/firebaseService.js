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
  orderBy,
  increment
} from 'firebase/firestore';
import defaultShopItems from '../data/defaultShopItems';
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
    return data ? JSON.parse(data) : { students: {}, classes: {}, assignments: {}, teachers: {}, helpRequests: {} };
  } catch {
    return { students: {}, classes: {}, assignments: {}, teachers: {}, helpRequests: {} };
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
    } else if (key.startsWith('helpRequests:')) {
      const classCode = key.replace('helpRequests:', '');
      const requests = Object.entries(data.helpRequests?.[classCode] || {})
        .map(([id, r]) => ({
          id,
          ...r,
          createdAt: r.createdAt ? new Date(r.createdAt) : null,
          resolvedAt: r.resolvedAt ? new Date(r.resolvedAt) : null
        }))
        .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      cb(requests);
    } else if (key.startsWith('shopItems:')) {
      const classCode = key.replace('shopItems:', '');
      const items = Object.entries(data.shopItems?.[classCode] || {}).map(([id, item]) => ({ id, ...item }));
      cb(items);
    } else if (key.startsWith('purchases:')) {
      const classCode = key.replace('purchases:', '');
      const purchases = Object.entries(data.purchases?.[classCode] || {})
        .map(([id, p]) => ({
          id,
          ...p,
          createdAt: p.createdAt ? new Date(p.createdAt) : null,
          resolvedAt: p.resolvedAt ? new Date(p.resolvedAt) : null
        }))
        .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      cb(purchases);
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
        completedFunctionsScopeExercises: [],
        completedPlanningTools: [],
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
      completedFunctionsScopeExercises: [],
      completedPlanningTools: [],
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
        completedFunctionsScopeExercises: progress.completedFunctionsScopeExercises || [],
        completedPlanningTools: progress.completedPlanningTools || [],
        totalPoints: progress.totalPoints || 0,
        spentPoints: progress.spentPoints || 0,
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
    completedFunctionsScopeExercises: progress.completedFunctionsScopeExercises || [],
    completedPlanningTools: progress.completedPlanningTools || [],
    totalPoints: progress.totalPoints || 0,
    spentPoints: progress.spentPoints || 0,
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
// PLANNING TOOL RESPONSE FUNCTIONS
// ============================================

// Save a student's planning tool response
export const savePlanningToolResponse = async (studentId, toolId, response) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.students[studentId]) return;

    if (!data.students[studentId].planningToolResponses) {
      data.students[studentId].planningToolResponses = {};
    }

    data.students[studentId].planningToolResponses[toolId] = {
      formData: response.formData,
      toolTitle: response.toolTitle,
      lastSaved: new Date().toISOString()
    };

    data.students[studentId].lastActivity = new Date().toISOString();
    saveDemoData(data);
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const updateData = {};
  updateData[`planningToolResponses.${toolId}`] = {
    formData: response.formData,
    toolTitle: response.toolTitle,
    lastSaved: serverTimestamp()
  };
  updateData.lastActivity = serverTimestamp();

  await updateDoc(studentRef, updateData);
};

// Get a student's planning tool response
export const getPlanningToolResponse = async (studentId, toolId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.students[studentId]) return null;
    const responses = data.students[studentId].planningToolResponses || {};
    return responses[toolId] || null;
  }

  if (!db) return null;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const studentDoc = await getDoc(studentRef);

  if (studentDoc.exists()) {
    const responses = studentDoc.data().planningToolResponses || {};
    return responses[toolId] || null;
  }
  return null;
};

// Get all planning tool responses for a class (teacher view)
export const getClassPlanningToolResponses = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const results = [];

    Object.entries(data.students)
      .filter(([_, student]) => student.classCode === classCode)
      .forEach(([studentId, student]) => {
        if (student.planningToolResponses) {
          Object.entries(student.planningToolResponses).forEach(([toolId, response]) => {
            results.push({
              studentId,
              studentName: student.name,
              toolId,
              toolTitle: response.toolTitle,
              formData: response.formData,
              lastSaved: response.lastSaved
            });
          });
        }
      });

    return results;
  }

  if (!db) return [];

  const studentsQuery = query(
    collection(db, STUDENTS_COLLECTION),
    where('classCode', '==', classCode)
  );

  const snapshot = await getDocs(studentsQuery);
  const results = [];

  snapshot.docs.forEach(docSnap => {
    const student = docSnap.data();
    if (student.planningToolResponses) {
      Object.entries(student.planningToolResponses).forEach(([toolId, response]) => {
        results.push({
          studentId: docSnap.id,
          studentName: student.name,
          toolId,
          toolTitle: response.toolTitle,
          formData: response.formData,
          lastSaved: response.lastSaved?.toDate?.() || null
        });
      });
    }
  });

  return results;
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
// TEAM MODE FUNCTIONS
// ============================================

// Save team mode data for a student on an exercise
export const saveTeamModeData = async (studentId, exerciseId, data) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    if (!demoData.students[studentId]) return;

    if (!demoData.students[studentId].teamModeData) {
      demoData.students[studentId].teamModeData = {};
    }

    demoData.students[studentId].teamModeData[exerciseId] = {
      role: data.role,
      teamMembers: data.teamMembers,
      contributions: data.contributions,
      lastSaved: new Date().toISOString()
    };

    demoData.students[studentId].lastActivity = new Date().toISOString();
    saveDemoData(demoData);
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const updateData = {};
  updateData[`teamModeData.${exerciseId}`] = {
    role: data.role,
    teamMembers: data.teamMembers,
    contributions: data.contributions,
    lastSaved: serverTimestamp()
  };
  updateData.lastActivity = serverTimestamp();

  await updateDoc(studentRef, updateData);
};

// Get team mode data for a student on an exercise
export const getTeamModeData = async (studentId, exerciseId) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    if (!demoData.students[studentId]) return null;
    const teamData = demoData.students[studentId].teamModeData || {};
    return teamData[exerciseId] || null;
  }

  if (!db) return null;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const studentDoc = await getDoc(studentRef);

  if (studentDoc.exists()) {
    const teamData = studentDoc.data().teamModeData || {};
    return teamData[exerciseId] || null;
  }
  return null;
};

// Get all team mode data for a class (teacher view)
export const getClassTeamModeData = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const results = [];

    Object.entries(data.students)
      .filter(([_, student]) => student.classCode === classCode)
      .forEach(([studentId, student]) => {
        if (student.teamModeData) {
          Object.entries(student.teamModeData).forEach(([exerciseId, tmData]) => {
            results.push({
              studentId,
              studentName: student.name,
              exerciseId,
              role: tmData.role,
              teamMembers: tmData.teamMembers,
              contributions: tmData.contributions,
              lastSaved: tmData.lastSaved
            });
          });
        }
      });

    return results;
  }

  if (!db) return [];

  const studentsQuery = query(
    collection(db, STUDENTS_COLLECTION),
    where('classCode', '==', classCode)
  );

  const snapshot = await getDocs(studentsQuery);
  const results = [];

  snapshot.docs.forEach(docSnap => {
    const student = docSnap.data();
    if (student.teamModeData) {
      Object.entries(student.teamModeData).forEach(([exerciseId, tmData]) => {
        results.push({
          studentId: docSnap.id,
          studentName: student.name,
          exerciseId,
          role: tmData.role,
          teamMembers: tmData.teamMembers,
          contributions: tmData.contributions,
          lastSaved: tmData.lastSaved?.toDate?.() || tmData.lastSaved || null
        });
      });
    }
  });

  return results;
};

// ============================================
// HELP REQUEST FUNCTIONS
// ============================================

// Create a help request
export const createHelpRequest = async (classCode, requestData) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    if (!demoData.helpRequests) demoData.helpRequests = {};
    if (!demoData.helpRequests[classCode]) demoData.helpRequests[classCode] = {};

    const requestId = `help_${Date.now()}`;
    demoData.helpRequests[classCode][requestId] = {
      studentId: requestData.studentId,
      studentName: requestData.studentName,
      exerciseId: requestData.exerciseId,
      exerciseTitle: requestData.exerciseTitle,
      moduleName: requestData.moduleName,
      status: 'pending',
      createdAt: new Date().toISOString(),
      resolvedAt: null,
      resolvedBy: null
    };

    saveDemoData(demoData);
    notifyDemoSubscribers(`helpRequests:${classCode}`);
    return { id: requestId };
  }

  if (!db) return null;

  const helpRef = collection(db, CLASSES_COLLECTION, classCode, 'helpRequests');
  const newRequest = {
    studentId: requestData.studentId,
    studentName: requestData.studentName,
    exerciseId: requestData.exerciseId,
    exerciseTitle: requestData.exerciseTitle,
    moduleName: requestData.moduleName,
    status: 'pending',
    createdAt: serverTimestamp(),
    resolvedAt: null,
    resolvedBy: null
  };

  const docRef = doc(helpRef);
  await setDoc(docRef, newRequest);
  return { id: docRef.id };
};

// Resolve a help request
export const resolveHelpRequest = async (classCode, requestId, resolvedBy) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    if (demoData.helpRequests?.[classCode]?.[requestId]) {
      demoData.helpRequests[classCode][requestId].status = 'resolved';
      demoData.helpRequests[classCode][requestId].resolvedAt = new Date().toISOString();
      demoData.helpRequests[classCode][requestId].resolvedBy = resolvedBy;
      saveDemoData(demoData);
      notifyDemoSubscribers(`helpRequests:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const requestRef = doc(db, CLASSES_COLLECTION, classCode, 'helpRequests', requestId);
  await updateDoc(requestRef, {
    status: 'resolved',
    resolvedAt: serverTimestamp(),
    resolvedBy
  });
};

// Subscribe to help requests for a class (real-time)
export const subscribeToHelpRequests = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `helpRequests:${classCode}`;
    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(callback);
    demoSubscriptions.set(key, callbacks);

    // Initial call
    const demoData = getDemoData();
    const requests = Object.entries(demoData.helpRequests?.[classCode] || {})
      .map(([id, r]) => ({
        id,
        ...r,
        createdAt: r.createdAt ? new Date(r.createdAt) : null,
        resolvedAt: r.resolvedAt ? new Date(r.resolvedAt) : null
      }))
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    callback(requests);

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== callback));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const helpRef = collection(db, CLASSES_COLLECTION, classCode, 'helpRequests');
  const helpQuery = query(helpRef, orderBy('createdAt', 'desc'));

  return onSnapshot(helpQuery, (snapshot) => {
    const requests = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || null,
      resolvedAt: doc.data().resolvedAt?.toDate?.() || null
    }));
    callback(requests);
  });
};

// Get pending help requests for a student on an exercise (to prevent spam)
export const getStudentHelpRequests = async (classCode, studentId, exerciseId) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    const requests = Object.values(demoData.helpRequests?.[classCode] || {})
      .filter(r => r.studentId === studentId && r.exerciseId === exerciseId && r.status === 'pending');
    return requests;
  }

  if (!db) return [];

  const helpRef = collection(db, CLASSES_COLLECTION, classCode, 'helpRequests');
  const helpQuery = query(
    helpRef,
    where('studentId', '==', studentId),
    where('exerciseId', '==', exerciseId),
    where('status', '==', 'pending')
  );

  const snapshot = await getDocs(helpQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ============================================
// REWARD SHOP FUNCTIONS
// ============================================

// Seed default shop items if the class has none
export const seedDefaultShopItems = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.shopItems) data.shopItems = {};
    if (!data.shopItems[classCode]) data.shopItems[classCode] = {};

    // Seed any items that don't already exist (by name)
    const existingNames = new Set(Object.values(data.shopItems[classCode]).map(i => i.name));
    let added = false;
    defaultShopItems.forEach((item, i) => {
      if (existingNames.has(item.name)) return;
      const id = `shop_default_${Date.now()}_${i}`;
      data.shopItems[classCode][id] = {
        ...item,
        createdAt: new Date().toISOString()
      };
      added = true;
    });
    if (added) {
      saveDemoData(data);
      notifyDemoSubscribers(`shopItems:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const shopRef = collection(db, CLASSES_COLLECTION, classCode, 'shopItems');
  const snapshot = await getDocs(shopRef);

  // Build set of existing item names to avoid duplicates
  const existingNames = new Set();
  snapshot.docs.forEach(d => {
    const name = d.data().name;
    if (name) existingNames.add(name);
  });

  // Seed any default items not already present
  for (const item of defaultShopItems) {
    if (existingNames.has(item.name)) continue;
    const docRef = doc(shopRef);
    await setDoc(docRef, { ...item, createdAt: serverTimestamp() });
  }
};

// Get shop items (one-time fetch)
export const getShopItems = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return Object.entries(data.shopItems?.[classCode] || {}).map(([id, item]) => ({ id, ...item }));
  }

  if (!db) return [];

  const shopRef = collection(db, CLASSES_COLLECTION, classCode, 'shopItems');
  const snapshot = await getDocs(shopRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Subscribe to shop items (real-time)
export const subscribeToShopItems = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `shopItems:${classCode}`;
    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(callback);
    demoSubscriptions.set(key, callbacks);

    // Initial call
    const data = getDemoData();
    const items = Object.entries(data.shopItems?.[classCode] || {}).map(([id, item]) => ({ id, ...item }));
    callback(items);

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== callback));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const shopRef = collection(db, CLASSES_COLLECTION, classCode, 'shopItems');
  return onSnapshot(shopRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(items);
  });
};

// Add a shop item
export const addShopItem = async (classCode, item) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.shopItems) data.shopItems = {};
    if (!data.shopItems[classCode]) data.shopItems[classCode] = {};

    const id = `shop_${Date.now()}`;
    data.shopItems[classCode][id] = {
      ...item,
      createdAt: new Date().toISOString()
    };
    saveDemoData(data);
    notifyDemoSubscribers(`shopItems:${classCode}`);
    return { id };
  }

  if (!db) return null;

  const shopRef = collection(db, CLASSES_COLLECTION, classCode, 'shopItems');
  const docRef = doc(shopRef);
  await setDoc(docRef, { ...item, createdAt: serverTimestamp() });
  return { id: docRef.id };
};

// Update a shop item
export const updateShopItem = async (classCode, itemId, updates) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.shopItems?.[classCode]?.[itemId]) {
      data.shopItems[classCode][itemId] = { ...data.shopItems[classCode][itemId], ...updates };
      saveDemoData(data);
      notifyDemoSubscribers(`shopItems:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const itemRef = doc(db, CLASSES_COLLECTION, classCode, 'shopItems', itemId);
  await updateDoc(itemRef, updates);
};

// Delete a shop item
export const deleteShopItem = async (classCode, itemId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.shopItems?.[classCode]?.[itemId]) {
      delete data.shopItems[classCode][itemId];
      saveDemoData(data);
      notifyDemoSubscribers(`shopItems:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const itemRef = doc(db, CLASSES_COLLECTION, classCode, 'shopItems', itemId);
  await deleteDoc(itemRef);
};

// Create a purchase request (student)
export const createPurchaseRequest = async (classCode, purchaseData) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.purchases) data.purchases = {};
    if (!data.purchases[classCode]) data.purchases[classCode] = {};

    const id = `purchase_${Date.now()}`;
    data.purchases[classCode][id] = {
      studentId: purchaseData.studentId,
      studentName: purchaseData.studentName,
      itemId: purchaseData.itemId,
      itemName: purchaseData.itemName,
      itemCost: purchaseData.itemCost,
      status: 'pending',
      createdAt: new Date().toISOString(),
      resolvedAt: null,
      resolvedBy: null
    };
    saveDemoData(data);
    notifyDemoSubscribers(`purchases:${classCode}`);
    return { id };
  }

  if (!db) return null;

  const purchasesRef = collection(db, CLASSES_COLLECTION, classCode, 'purchases');
  const docRef = doc(purchasesRef);
  await setDoc(docRef, {
    studentId: purchaseData.studentId,
    studentName: purchaseData.studentName,
    itemId: purchaseData.itemId,
    itemName: purchaseData.itemName,
    itemCost: purchaseData.itemCost,
    status: 'pending',
    createdAt: serverTimestamp(),
    resolvedAt: null,
    resolvedBy: null
  });
  return { id: docRef.id };
};

// Approve a purchase (teacher) — increments student spentPoints
export const approvePurchase = async (classCode, purchaseId, resolvedBy) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const purchase = data.purchases?.[classCode]?.[purchaseId];
    if (!purchase || purchase.status !== 'pending') return;

    purchase.status = 'approved';
    purchase.resolvedAt = new Date().toISOString();
    purchase.resolvedBy = resolvedBy;

    // Increment student's spentPoints
    const student = data.students[purchase.studentId];
    if (student) {
      student.spentPoints = (student.spentPoints || 0) + purchase.itemCost;
    }

    saveDemoData(data);
    notifyDemoSubscribers(`purchases:${classCode}`);
    notifyDemoSubscribers(`class:${classCode}`);
    return purchase.itemCost;
  }

  if (!db) return 0;

  const purchaseRef = doc(db, CLASSES_COLLECTION, classCode, 'purchases', purchaseId);
  const purchaseSnap = await getDoc(purchaseRef);
  if (!purchaseSnap.exists() || purchaseSnap.data().status !== 'pending') return 0;

  const purchaseData = purchaseSnap.data();

  await updateDoc(purchaseRef, {
    status: 'approved',
    resolvedAt: serverTimestamp(),
    resolvedBy
  });

  // Increment student's spentPoints
  const studentRef = doc(db, STUDENTS_COLLECTION, purchaseData.studentId);
  await updateDoc(studentRef, {
    spentPoints: increment(purchaseData.itemCost)
  });

  return purchaseData.itemCost;
};

// Deny a purchase (teacher)
export const denyPurchase = async (classCode, purchaseId, resolvedBy) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const purchase = data.purchases?.[classCode]?.[purchaseId];
    if (!purchase || purchase.status !== 'pending') return;

    purchase.status = 'denied';
    purchase.resolvedAt = new Date().toISOString();
    purchase.resolvedBy = resolvedBy;

    saveDemoData(data);
    notifyDemoSubscribers(`purchases:${classCode}`);
    return;
  }

  if (!db) return;

  const purchaseRef = doc(db, CLASSES_COLLECTION, classCode, 'purchases', purchaseId);
  await updateDoc(purchaseRef, {
    status: 'denied',
    resolvedAt: serverTimestamp(),
    resolvedBy
  });
};

// Subscribe to all purchases for a class (teacher view)
export const subscribeToPurchases = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `purchases:${classCode}`;
    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(callback);
    demoSubscriptions.set(key, callbacks);

    const data = getDemoData();
    const purchases = Object.entries(data.purchases?.[classCode] || {})
      .map(([id, p]) => ({
        id,
        ...p,
        createdAt: p.createdAt ? new Date(p.createdAt) : null,
        resolvedAt: p.resolvedAt ? new Date(p.resolvedAt) : null
      }))
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    callback(purchases);

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== callback));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const purchasesRef = collection(db, CLASSES_COLLECTION, classCode, 'purchases');
  const purchasesQuery = query(purchasesRef, orderBy('createdAt', 'desc'));

  return onSnapshot(purchasesQuery, (snapshot) => {
    const purchases = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.() || null,
      resolvedAt: d.data().resolvedAt?.toDate?.() || null
    }));
    callback(purchases);
  });
};

// Subscribe to a student's own purchases (student view)
export const subscribeToStudentPurchases = (classCode, studentId, callback) => {
  if (isDemoMode()) {
    const key = `purchases:${classCode}`;
    // Wrap callback to filter by student
    const wrappedCb = () => {
      const data = getDemoData();
      const purchases = Object.entries(data.purchases?.[classCode] || {})
        .filter(([_, p]) => p.studentId === studentId)
        .map(([id, p]) => ({
          id,
          ...p,
          createdAt: p.createdAt ? new Date(p.createdAt) : null,
          resolvedAt: p.resolvedAt ? new Date(p.resolvedAt) : null
        }))
        .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      callback(purchases);
    };

    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(wrappedCb);
    demoSubscriptions.set(key, callbacks);

    // Initial call
    wrappedCb();

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== wrappedCb));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const purchasesRef = collection(db, CLASSES_COLLECTION, classCode, 'purchases');
  const purchasesQuery = query(
    purchasesRef,
    where('studentId', '==', studentId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(purchasesQuery, (snapshot) => {
    const purchases = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.() || null,
      resolvedAt: d.data().resolvedAt?.toDate?.() || null
    }));
    callback(purchases);
  });
};

// ============================================
// TEACHER AWARD POINTS FUNCTIONS
// ============================================

// Award points to a student (teacher action)
export const awardStudentPoints = async (studentId, points) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.students[studentId]) {
      data.students[studentId].totalPoints = (data.students[studentId].totalPoints || 0) + points;
      saveDemoData(data);
      const classCode = data.students[studentId].classCode;
      notifyDemoSubscribers(`class:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  await updateDoc(studentRef, {
    totalPoints: increment(points)
  });
};

// Subscribe to a student's own document for real-time point updates
export const subscribeToStudentPoints = (studentId, callback) => {
  if (isDemoMode()) {
    // In demo mode, poll for changes via the class subscription
    const data = getDemoData();
    const student = data.students[studentId];
    if (student) {
      callback({ totalPoints: student.totalPoints || 0, spentPoints: student.spentPoints || 0 });

      // Listen via class subscription
      const classCode = student.classCode;
      const key = `class:${classCode}`;
      const wrappedCb = () => {
        const freshData = getDemoData();
        const s = freshData.students[studentId];
        if (s) {
          callback({ totalPoints: s.totalPoints || 0, spentPoints: s.spentPoints || 0 });
        }
      };
      const callbacks = demoSubscriptions.get(key) || [];
      callbacks.push(wrappedCb);
      demoSubscriptions.set(key, callbacks);

      return () => {
        const cbs = demoSubscriptions.get(key) || [];
        demoSubscriptions.set(key, cbs.filter(cb => cb !== wrappedCb));
      };
    }
    return () => {};
  }

  if (!db) {
    callback({ totalPoints: 0, spentPoints: 0 });
    return () => {};
  }

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  return onSnapshot(studentRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      callback({ totalPoints: data.totalPoints || 0, spentPoints: data.spentPoints || 0 });
    }
  });
};

// ============================================
// AVATAR CONFIG FUNCTIONS
// ============================================

// Save avatar config for a student
export const saveAvatarConfig = async (studentId, avatarConfig) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.students[studentId]) {
      data.students[studentId].avatarConfig = avatarConfig;
      saveDemoData(data);
    }
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  await updateDoc(studentRef, { avatarConfig });
};

// Get avatar config for a student
export const getAvatarConfig = async (studentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return data.students[studentId]?.avatarConfig || null;
  }

  if (!db) return null;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const studentDoc = await getDoc(studentRef);
  if (studentDoc.exists()) {
    return studentDoc.data().avatarConfig || null;
  }
  return null;
};

// Get student's owned clothing items (approved purchases that have clothingType)
export const getStudentOwnedClothing = async (classCode, studentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const purchases = Object.entries(data.purchases?.[classCode] || {})
      .filter(([_, p]) => p.studentId === studentId && p.status === 'approved');

    const items = [];
    for (const [, purchase] of purchases) {
      const shopItem = data.shopItems?.[classCode]?.[purchase.itemId];
      if (shopItem?.clothingType) {
        items.push({ id: purchase.itemId, ...shopItem });
      }
    }
    return items;
  }

  if (!db) return [];

  // Get approved purchases for this student
  const purchasesRef = collection(db, CLASSES_COLLECTION, classCode, 'purchases');
  const purchasesQuery = query(
    purchasesRef,
    where('studentId', '==', studentId),
    where('status', '==', 'approved')
  );
  const purchaseSnap = await getDocs(purchasesQuery);

  const itemIds = purchaseSnap.docs.map(d => d.data().itemId);
  if (itemIds.length === 0) return [];

  // Fetch the shop items to check clothingType
  const shopRef = collection(db, CLASSES_COLLECTION, classCode, 'shopItems');
  const shopSnap = await getDocs(shopRef);
  const shopMap = {};
  shopSnap.docs.forEach(d => { shopMap[d.id] = { id: d.id, ...d.data() }; });

  return itemIds
    .map(id => shopMap[id])
    .filter(item => item && item.clothingType);
};

// ============================================
// DELETE STUDENT FUNCTION
// ============================================

// Delete a student from a class (teacher action)
export const deleteStudent = async (studentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const student = data.students[studentId];
    if (student) {
      const classCode = student.classCode;
      delete data.students[studentId];
      saveDemoData(data);
      notifyDemoSubscribers(`class:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  await deleteDoc(studentRef);
};

// ============================================
// TEACHER AVATAR FUNCTIONS
// ============================================

// Save avatar config for a teacher
export const saveTeacherAvatarConfig = async (teacherId, avatarConfig) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teachers) data.teachers = {};
    if (data.teachers[teacherId]) {
      data.teachers[teacherId].avatarConfig = avatarConfig;
      saveDemoData(data);
    }
    return;
  }

  if (!db) return;

  const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
  await updateDoc(teacherRef, { avatarConfig });
};

// Get avatar config for a teacher
export const getTeacherAvatarConfig = async (teacherId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    return data.teachers?.[teacherId]?.avatarConfig || null;
  }

  if (!db) return null;

  const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
  const teacherDoc = await getDoc(teacherRef);
  if (teacherDoc.exists()) {
    return teacherDoc.data().avatarConfig || null;
  }
  return null;
};

// Get teacher info for a class (name + avatarConfig)
export const getTeacherInfoForClass = async (classCode) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const classInfo = data.classes?.[classCode];
    if (!classInfo?.teacherId) return null;
    const teacher = data.teachers?.[classInfo.teacherId];
    if (!teacher) return null;
    return { name: teacher.name, avatarConfig: teacher.avatarConfig || null };
  }

  if (!db) return null;

  const classRef = doc(db, CLASSES_COLLECTION, classCode);
  const classDoc = await getDoc(classRef);
  if (!classDoc.exists()) return null;

  const teacherId = classDoc.data().teacherId;
  if (!teacherId) return null;

  const teacherRef = doc(db, TEACHERS_COLLECTION, teacherId);
  const teacherDoc = await getDoc(teacherRef);
  if (!teacherDoc.exists()) return null;

  const teacher = teacherDoc.data();
  return { name: teacher.name, avatarConfig: teacher.avatarConfig || null };
};

// ============================================
// TEAM FUNCTIONS
// ============================================

// Create a team
export const createTeam = async (classCode, teamData) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.teams) data.teams = {};
    if (!data.teams[classCode]) data.teams[classCode] = {};

    const id = `team_${Date.now()}`;
    data.teams[classCode][id] = {
      name: teamData.name,
      memberIds: teamData.memberIds || [],
      color: teamData.color || '#00FFFF',
      createdAt: new Date().toISOString()
    };
    saveDemoData(data);
    notifyDemoSubscribers(`teams:${classCode}`);
    return { id };
  }

  if (!db) return null;

  const teamsRef = collection(db, CLASSES_COLLECTION, classCode, 'teams');
  const docRef = doc(teamsRef);
  await setDoc(docRef, {
    name: teamData.name,
    memberIds: teamData.memberIds || [],
    color: teamData.color || '#00FFFF',
    createdAt: serverTimestamp()
  });
  return { id: docRef.id };
};

// Update a team
export const updateTeam = async (classCode, teamId, updates) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.teams?.[classCode]?.[teamId]) {
      data.teams[classCode][teamId] = { ...data.teams[classCode][teamId], ...updates };
      saveDemoData(data);
      notifyDemoSubscribers(`teams:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const teamRef = doc(db, CLASSES_COLLECTION, classCode, 'teams', teamId);
  await updateDoc(teamRef, updates);
};

// Delete a team
export const deleteTeam = async (classCode, teamId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.teams?.[classCode]?.[teamId]) {
      delete data.teams[classCode][teamId];
      saveDemoData(data);
      notifyDemoSubscribers(`teams:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const teamRef = doc(db, CLASSES_COLLECTION, classCode, 'teams', teamId);
  await deleteDoc(teamRef);
};

// Subscribe to teams (real-time)
export const subscribeToTeams = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `teams:${classCode}`;
    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(callback);
    demoSubscriptions.set(key, callbacks);

    const data = getDemoData();
    const teams = Object.entries(data.teams?.[classCode] || {}).map(([id, t]) => ({ id, ...t }));
    callback(teams);

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== callback));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const teamsRef = collection(db, CLASSES_COLLECTION, classCode, 'teams');
  return onSnapshot(teamsRef, (snapshot) => {
    const teams = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(teams);
  });
};

// Get student's team
export const getStudentTeam = async (classCode, studentId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    const teams = Object.entries(data.teams?.[classCode] || {});
    for (const [id, team] of teams) {
      if (team.memberIds?.includes(studentId)) {
        return { id, ...team };
      }
    }
    return null;
  }

  if (!db) return null;

  const teamsRef = collection(db, CLASSES_COLLECTION, classCode, 'teams');
  const snapshot = await getDocs(teamsRef);
  for (const d of snapshot.docs) {
    const team = d.data();
    if (team.memberIds?.includes(studentId)) {
      return { id: d.id, ...team };
    }
  }
  return null;
};

// ============================================
// TEAM MESSAGING FUNCTIONS
// ============================================

// Send a team message
export const sendTeamMessage = async (classCode, messageData) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (!data.messages) data.messages = {};
    if (!data.messages[classCode]) data.messages[classCode] = {};

    const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    data.messages[classCode][id] = {
      teamId: messageData.teamId,
      senderId: messageData.senderId,
      senderName: messageData.senderName,
      text: (messageData.text || '').slice(0, 500),
      createdAt: new Date().toISOString()
    };
    saveDemoData(data);
    notifyDemoSubscribers(`messages:${classCode}:${messageData.teamId}`);
    notifyDemoSubscribers(`allMessages:${classCode}`);
    return { id };
  }

  if (!db) return null;

  const messagesRef = collection(db, CLASSES_COLLECTION, classCode, 'messages');
  const docRef = doc(messagesRef);
  await setDoc(docRef, {
    teamId: messageData.teamId,
    senderId: messageData.senderId,
    senderName: messageData.senderName,
    text: (messageData.text || '').slice(0, 500),
    createdAt: serverTimestamp()
  });
  return { id: docRef.id };
};

// Subscribe to team messages (for students)
export const subscribeToTeamMessages = (classCode, teamId, callback) => {
  if (isDemoMode()) {
    const key = `messages:${classCode}:${teamId}`;
    const wrappedCb = () => {
      const data = getDemoData();
      const messages = Object.entries(data.messages?.[classCode] || {})
        .filter(([_, m]) => m.teamId === teamId)
        .map(([id, m]) => ({
          id,
          ...m,
          createdAt: m.createdAt ? new Date(m.createdAt) : null
        }))
        .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
      callback(messages);
    };

    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(wrappedCb);
    demoSubscriptions.set(key, callbacks);

    wrappedCb();

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== wrappedCb));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const messagesRef = collection(db, CLASSES_COLLECTION, classCode, 'messages');
  const messagesQuery = query(
    messagesRef,
    where('teamId', '==', teamId),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.() || null
    }));
    callback(messages);
  });
};

// Subscribe to all messages (for teacher)
export const subscribeToAllMessages = (classCode, callback) => {
  if (isDemoMode()) {
    const key = `allMessages:${classCode}`;
    const wrappedCb = () => {
      const data = getDemoData();
      const messages = Object.entries(data.messages?.[classCode] || {})
        .map(([id, m]) => ({
          id,
          ...m,
          createdAt: m.createdAt ? new Date(m.createdAt) : null
        }))
        .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      callback(messages);
    };

    const callbacks = demoSubscriptions.get(key) || [];
    callbacks.push(wrappedCb);
    demoSubscriptions.set(key, callbacks);

    wrappedCb();

    return () => {
      const cbs = demoSubscriptions.get(key) || [];
      demoSubscriptions.set(key, cbs.filter(cb => cb !== wrappedCb));
    };
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const messagesRef = collection(db, CLASSES_COLLECTION, classCode, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate?.() || null
    }));
    callback(messages);
  });
};

// Delete a message (teacher moderation)
export const deleteMessage = async (classCode, messageId) => {
  if (isDemoMode()) {
    const data = getDemoData();
    if (data.messages?.[classCode]?.[messageId]) {
      delete data.messages[classCode][messageId];
      saveDemoData(data);
      // Notify all possible subscriptions
      notifyDemoSubscribers(`allMessages:${classCode}`);
    }
    return;
  }

  if (!db) return;

  const messageRef = doc(db, CLASSES_COLLECTION, classCode, 'messages', messageId);
  await deleteDoc(messageRef);
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
