import { useState, useEffect, useCallback } from 'react';
import {
  getUserUnits,
  getUnit,
  deleteUnit,
  publishUnit,
  saveUnitWithLessons,
  getUnitLessons,
  duplicateUnit,
  getPublishedUnits
} from '../services/unitService';

/**
 * Hook for managing teacher's units/activities
 * Uses classCode as the user identifier for teachers
 */
export function useUserUnits(classCode) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnits = useCallback(async () => {
    if (!classCode) {
      setUnits([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getUserUnits(classCode);
      setUnits(data);
    } catch (err) {
      console.error('Error fetching units:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [classCode]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const refresh = () => fetchUnits();

  const remove = async (unitId) => {
    try {
      await deleteUnit(unitId);
      setUnits(prev => prev.filter(u => u.id !== unitId));
    } catch (err) {
      console.error('Error deleting unit:', err);
      throw err;
    }
  };

  const duplicate = async (unitId) => {
    try {
      const newUnit = await duplicateUnit(unitId, classCode);
      await refresh();
      return newUnit;
    } catch (err) {
      console.error('Error duplicating unit:', err);
      throw err;
    }
  };

  return {
    units,
    loading,
    error,
    refresh,
    remove,
    duplicate
  };
}

/**
 * Hook for managing a single unit
 */
export function useUnit(unitId, classCode) {
  const [unit, setUnit] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch unit and lessons
  useEffect(() => {
    async function fetchData() {
      if (!unitId || unitId === 'new') {
        setUnit(null);
        setLessons([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [unitData, lessonsData] = await Promise.all([
          getUnit(unitId),
          getUnitLessons(unitId)
        ]);

        setUnit(unitData);
        setLessons(lessonsData);
      } catch (err) {
        console.error('Error fetching unit:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [unitId]);

  // Save unit with lessons
  const save = async (unitData, lessonsData) => {
    if (!classCode) throw new Error('Must have class code to save');

    try {
      setSaving(true);
      setError(null);

      const savedUnitId = await saveUnitWithLessons(
        classCode,
        { ...unitData, id: unitId !== 'new' ? unitId : undefined },
        lessonsData
      );

      // Refresh data
      const [updatedUnit, updatedLessons] = await Promise.all([
        getUnit(savedUnitId),
        getUnitLessons(savedUnitId)
      ]);

      setUnit(updatedUnit);
      setLessons(updatedLessons);

      return savedUnitId;
    } catch (err) {
      console.error('Error saving unit:', err);
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // Publish unit
  const publish = async (overrideUnitId = null) => {
    const idToPublish = overrideUnitId || unitId;

    if (!idToPublish || idToPublish === 'new') {
      throw new Error('Cannot publish unsaved unit');
    }

    try {
      setSaving(true);
      await publishUnit(idToPublish);
      setUnit(prev => prev ? { ...prev, status: 'published' } : prev);
    } catch (err) {
      console.error('Error publishing unit:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    unit,
    lessons,
    loading,
    saving,
    error,
    save,
    publish
  };
}

/**
 * Hook for getting all published units (for students)
 */
export function usePublishedUnits() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUnits() {
      try {
        setLoading(true);
        const data = await getPublishedUnits();
        setUnits(data);
      } catch (err) {
        console.error('Error fetching published units:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUnits();
  }, []);

  return { units, loading, error };
}
