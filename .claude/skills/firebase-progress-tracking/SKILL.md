---
name: firebase-progress-tracking
description: "Pattern for implementing student progress tracking with Firebase Firestore including demo mode fallback via localStorage. Use when adding progress tracking to new modules, understanding the Firestore data structure, or modifying the Firebase service."
user-invocable: false
---

Pattern for implementing student progress tracking with Firebase, including demo mode fallback.

## Firebase Service Structure

Location: `src/services/firebaseService.js`

```javascript
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

// === CONFIGURATION ===
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// === INITIALIZATION ===
let app = null;
let db = null;

const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey &&
         firebaseConfig.projectId &&
         firebaseConfig.apiKey !== 'undefined';
};

const isDemoMode = () => {
  if (import.meta.env.VITE_DEMO_MODE === 'true') return true;
  return !isFirebaseConfigured();
};

if (isFirebaseConfigured() && !isDemoMode()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// === STUDENT FUNCTIONS ===

export async function loginStudent(name, classCode) {
  if (isDemoMode()) {
    const odemoId = `demo_${Date.now()}`;
    const demoStudent = {
      odemoId,
      name,
      classCode,
      completedChallenges: [],
      completedExercises: [],
      completedPseudocode: [],
      completedFlowcharts: [],
      completedDataApisExercises: [],
      completedObjectsImagesExercises: [],
      // Add new module arrays here
      totalPoints: 0
    };
    localStorage.setItem('demoStudent', JSON.stringify(demoStudent));
    return demoStudent;
  }

  // Check for existing student
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef, where('name', '==', name), where('classCode', '==', classCode));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { odemoId: doc.id, ...doc.data() };
  }

  // Create new student
  const newStudentRef = doc(collection(db, 'students'));
  const studentData = {
    name,
    classCode,
    completedChallenges: [],
    completedExercises: [],
    completedPseudocode: [],
    completedFlowcharts: [],
    completedDataApisExercises: [],
    completedObjectsImagesExercises: [],
    totalPoints: 0,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp()
  };

  await setDoc(newStudentRef, studentData);
  return { odemoId: newStudentRef.id, ...studentData };
}

export async function saveStudentProgress(userId, progressData) {
  if (isDemoMode()) {
    const stored = localStorage.getItem('demoStudent');
    if (stored) {
      const student = JSON.parse(stored);
      const updated = { ...student, ...progressData };
      localStorage.setItem('demoStudent', JSON.stringify(updated));
    }
    return;
  }

  if (!db) return;

  const studentRef = doc(db, 'students', oduserId);
  await updateDoc(studentRef, {
    ...progressData,
    lastActivity: serverTimestamp()
  });
}

export async function getStudentProgress(userId) {
  if (isDemoMode()) {
    const stored = localStorage.getItem('demoStudent');
    return stored ? JSON.parse(stored) : null;
  }

  if (!db) return null;

  const studentRef = doc(db, 'students', oduserId);
  const snapshot = await getDoc(studentRef);
  return snapshot.exists() ? snapshot.data() : null;
}

// === SUBMISSION TRACKING ===

export async function saveStudentSubmission(userId, submission) {
  if (isDemoMode()) {
    const stored = localStorage.getItem('demoSubmissions') || '[]';
    const submissions = JSON.parse(stored);
    submissions.push({ ...submission, timestamp: Date.now(), oduserId });
    localStorage.setItem('demoSubmissions', JSON.stringify(submissions));
    return;
  }

  if (!db) return;

  const submissionRef = doc(collection(db, 'students', oduserId, 'submissions'));
  await setDoc(submissionRef, {
    ...submission,
    timestamp: serverTimestamp()
  });
}

// === TEACHER FUNCTIONS ===

export async function createClassForTeacher(teacherId, classCode) {
  if (isDemoMode()) {
    localStorage.setItem('demoClass', JSON.stringify({ teacherId, classCode }));
    return true;
  }

  if (!db) return false;

  const classRef = doc(db, 'classes', classCode);
  await setDoc(classRef, {
    teacherId,
    classCode,
    createdAt: serverTimestamp()
  });
  return true;
}

// === ASSIGNMENT FUNCTIONS ===

export function subscribeToAssignments(classCode, callback) {
  if (isDemoMode()) {
    const stored = localStorage.getItem('demoAssignments') || '[]';
    callback(JSON.parse(stored));
    return () => {};
  }

  if (!db) {
    callback([]);
    return () => {};
  }

  const assignmentsRef = collection(db, 'assignments');
  const q = query(assignmentsRef, where('classCode', '==', classCode));

  return onSnapshot(q, (snapshot) => {
    const assignments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(assignments);
  });
}

export { isDemoMode };
```

## Progress State in App.jsx

```jsx
// State for tracking completion across modules
const [completedChallenges, setCompletedChallenges] = useState([]);
const [completedExercises, setCompletedExercises] = useState([]);
const [completedPseudocode, setCompletedPseudocode] = useState([]);
const [completedFlowcharts, setCompletedFlowcharts] = useState([]);
const [completedDataApisExercises, setCompletedDataApisExercises] = useState([]);
const [completedObjectsImagesExercises, setCompletedObjectsImagesExercises] = useState([]);
const [totalPoints, setTotalPoints] = useState(0);

// Load progress on login
useEffect(() => {
  if (currentUser) {
    loadProgress();
  }
}, [currentUser]);

const loadProgress = async () => {
  const progress = await getStudentProgress(currentUser.odemoId);
  if (progress) {
    setCompletedChallenges(progress.completedChallenges || []);
    setCompletedExercises(progress.completedExercises || []);
    // ... load other arrays
    setTotalPoints(progress.totalPoints || 0);
  }
};

// Save progress when completion arrays change
useEffect(() => {
  if (currentUser) {
    saveStudentProgress(currentUser.odemoId, {
      completedChallenges,
      completedExercises,
      completedPseudocode,
      completedFlowcharts,
      completedDataApisExercises,
      completedObjectsImagesExercises,
      totalPoints
    });
  }
}, [completedChallenges, completedExercises, /* ... */]);

// Handle completion callback
const handleComplete = (exerciseId, points, moduleType) => {
  switch (moduleType) {
    case 'challenge':
      if (!completedChallenges.includes(exerciseId)) {
        setCompletedChallenges(prev => [...prev, exerciseId]);
        setTotalPoints(prev => prev + points);
      }
      break;
    case 'arrays-loops':
      if (!completedExercises.includes(exerciseId)) {
        setCompletedExercises(prev => [...prev, exerciseId]);
        setTotalPoints(prev => prev + points);
      }
      break;
    // ... handle other module types
  }
};
```

## Firestore Data Structure

```
/students/{studentId}
  - name: string
  - classCode: string
  - completedChallenges: string[]
  - completedExercises: string[]
  - completedPseudocode: string[]
  - completedFlowcharts: string[]
  - completedDataApisExercises: string[]
  - completedObjectsImagesExercises: string[]
  - totalPoints: number
  - createdAt: timestamp
  - lastLogin: timestamp
  - lastActivity: timestamp

/students/{studentId}/submissions/{submissionId}
  - exerciseId: string
  - answer: string
  - isCorrect: boolean
  - exerciseType: string
  - exerciseTitle: string
  - timestamp: timestamp

/teachers/{teacherId}
  - name: string
  - email: string
  - classCode: string
  - createdAt: timestamp

/classes/{classCode}
  - teacherId: string
  - classCode: string
  - createdAt: timestamp

/assignments/{assignmentId}
  - classCode: string
  - type: string (module type)
  - items: string[] (unit/week IDs)
  - title: string
  - dueDate: timestamp
  - createdAt: timestamp
```

## Adding a New Module's Progress

1. Add completion array to student document schema
2. Add state in App.jsx
3. Add case in handleComplete switch
4. Include in saveStudentProgress call
5. Load in loadProgress function
