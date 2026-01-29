// Firebase service for student progress tracking
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
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../config/firebase';

// Check if Firebase is properly configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" &&
         firebaseConfig.projectId !== "YOUR_PROJECT_ID";
};

// Initialize Firebase only if configured
let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

// Collection references
const STUDENTS_COLLECTION = 'students';
const CLASSES_COLLECTION = 'classes';

// ============================================
// STUDENT FUNCTIONS
// ============================================

// Register or login a student
export const loginStudent = async (studentName, classCode) => {
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
  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  await updateDoc(studentRef, {
    completedChallenges: progress.completedChallenges || [],
    completedScenarios: progress.completedScenarios || [],
    completedExercises: progress.completedExercises || [],
    completedPseudocode: progress.completedPseudocode || [],
    completedFlowcharts: progress.completedFlowcharts || [],
    totalPoints: progress.totalPoints || 0,
    lastActivity: serverTimestamp()
  });
};

// Get student progress
export const getStudentProgress = async (studentId) => {
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
  if (!db) return;

  const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
  const activitiesRef = collection(studentRef, 'activities');

  await setDoc(doc(activitiesRef), {
    ...activity,
    timestamp: serverTimestamp()
  });
};

// ============================================
// TEACHER/CLASS FUNCTIONS
// ============================================

// Create a new class
export const createClass = async (className, teacherName) => {
  if (!db) return null;

  const classCode = generateClassCode();
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
  if (!db) return false;

  const classRef = doc(db, CLASSES_COLLECTION, classCode);
  const classDoc = await getDoc(classRef);
  return classDoc.exists();
};

// Get all students in a class
export const getClassStudents = async (classCode) => {
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
      createdAt: doc.data().createdAt?.toDate?.() || null
    }));
    callback(assignments);
  });
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

// Export db for direct access if needed
export { db };
