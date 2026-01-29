// Unit and Activity Service for Teacher Module Builder
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebaseService';

const UNITS_COLLECTION = 'units';
const LESSONS_COLLECTION = 'lessons';

/**
 * Remove undefined values from an object (Firestore doesn't accept undefined)
 */
function cleanData(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(cleanData);
  if (typeof obj !== 'object') return obj;

  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = cleanData(value);
    }
  }
  return cleaned;
}

/**
 * Create a new unit
 */
export async function createUnit(userId, unitData) {
  if (!db || !isFirebaseConfigured()) return null;
  
  const unit = {
    ...unitData,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: 'draft',
    visibility: 'private',
  };

  const docRef = await addDoc(collection(db, UNITS_COLLECTION), unit);
  return { id: docRef.id, ...unit };
}

/**
 * Get a single unit by ID
 */
export async function getUnit(unitId) {
  if (!db || !isFirebaseConfigured()) return null;
  
  const docRef = doc(db, UNITS_COLLECTION, unitId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

/**
 * Get all units for a user
 */
export async function getUserUnits(userId) {
  if (!db || !isFirebaseConfigured()) return [];
  
  const q = query(
    collection(db, UNITS_COLLECTION),
    where('createdBy', '==', userId),
    orderBy('updatedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Get all published units (for students to see)
 */
export async function getPublishedUnits() {
  if (!db || !isFirebaseConfigured()) return [];
  
  const q = query(
    collection(db, UNITS_COLLECTION),
    where('status', '==', 'published'),
    orderBy('updatedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Update a unit
 */
export async function updateUnit(unitId, updates) {
  if (!db || !isFirebaseConfigured()) return;
  
  const docRef = doc(db, UNITS_COLLECTION, unitId);
  await updateDoc(docRef, {
    ...cleanData(updates),
    updatedAt: serverTimestamp()
  });
}

/**
 * Delete a unit and all its lessons
 */
export async function deleteUnit(unitId) {
  if (!db || !isFirebaseConfigured()) return;
  
  const batch = writeBatch(db);

  // Delete all lessons for this unit
  const lessonsQuery = query(
    collection(db, LESSONS_COLLECTION),
    where('unitId', '==', unitId)
  );
  const lessonsSnapshot = await getDocs(lessonsQuery);
  lessonsSnapshot.docs.forEach(docSnap => {
    batch.delete(docSnap.ref);
  });

  // Delete the unit
  batch.delete(doc(db, UNITS_COLLECTION, unitId));

  await batch.commit();
}

/**
 * Publish a unit (change status to published)
 */
export async function publishUnit(unitId) {
  await updateUnit(unitId, {
    status: 'published',
    publishedAt: serverTimestamp()
  });
}

/**
 * Create a lesson within a unit
 */
export async function createLesson(unitId, lessonData) {
  if (!db || !isFirebaseConfigured()) return null;
  
  const lesson = {
    ...cleanData(lessonData),
    unitId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, LESSONS_COLLECTION), lesson);
  return { id: docRef.id, ...lesson };
}

/**
 * Get all lessons for a unit
 */
export async function getUnitLessons(unitId) {
  if (!db || !isFirebaseConfigured()) return [];
  
  const q = query(
    collection(db, LESSONS_COLLECTION),
    where('unitId', '==', unitId)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Get a single lesson
 */
export async function getLesson(lessonId) {
  if (!db || !isFirebaseConfigured()) return null;
  
  const docRef = doc(db, LESSONS_COLLECTION, lessonId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

/**
 * Update a lesson
 */
export async function updateLesson(lessonId, updates) {
  if (!db || !isFirebaseConfigured()) return;
  
  const docRef = doc(db, LESSONS_COLLECTION, lessonId);
  await updateDoc(docRef, {
    ...cleanData(updates),
    updatedAt: serverTimestamp()
  });
}

/**
 * Delete a lesson
 */
export async function deleteLesson(lessonId) {
  if (!db || !isFirebaseConfigured()) return;
  
  await deleteDoc(doc(db, LESSONS_COLLECTION, lessonId));
}

/**
 * Save unit with all lessons (batch operation)
 */
export async function saveUnitWithLessons(userId, unitData, lessons) {
  if (!db || !isFirebaseConfigured()) return null;
  
  const batch = writeBatch(db);

  // Clean unit data - remove undefined values and temp id
  const { id: unitId, ...unitDataWithoutId } = unitData;
  const cleanedUnitData = cleanData(unitDataWithoutId);

  // Create or update unit
  let unitRef;
  if (unitId && !unitId.startsWith('unit-')) {
    unitRef = doc(db, UNITS_COLLECTION, unitId);
    batch.update(unitRef, {
      ...cleanedUnitData,
      updatedAt: serverTimestamp()
    });
  } else {
    unitRef = doc(collection(db, UNITS_COLLECTION));
    batch.set(unitRef, {
      ...cleanedUnitData,
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'draft',
      visibility: 'private'
    });
  }

  // Handle lessons
  for (const lesson of lessons) {
    const { id: lessonId, ...lessonDataWithoutId } = lesson;
    const cleanedLessonData = cleanData(lessonDataWithoutId);

    if (lessonId && !lessonId.startsWith('lesson-')) {
      const lessonRef = doc(db, LESSONS_COLLECTION, lessonId);
      batch.update(lessonRef, {
        ...cleanedLessonData,
        unitId: unitRef.id,
        updatedAt: serverTimestamp()
      });
    } else {
      const lessonRef = doc(collection(db, LESSONS_COLLECTION));
      batch.set(lessonRef, {
        ...cleanedLessonData,
        unitId: unitRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  }

  await batch.commit();
  return unitRef.id;
}

/**
 * Duplicate a unit
 */
export async function duplicateUnit(unitId, userId) {
  const originalUnit = await getUnit(unitId);
  if (!originalUnit) throw new Error('Unit not found');

  const originalLessons = await getUnitLessons(unitId);

  const { id: _, createdAt, updatedAt, publishedAt, ...unitDataToCopy } = originalUnit;

  const newUnit = await createUnit(userId, {
    ...unitDataToCopy,
    title: `${originalUnit.title} (Copy)`,
    status: 'draft',
    createdBy: userId
  });

  for (const lesson of originalLessons) {
    const { id: __, createdAt: _ca, updatedAt: _ua, ...lessonDataToCopy } = lesson;
    await createLesson(newUnit.id, lessonDataToCopy);
  }

  return newUnit;
}
