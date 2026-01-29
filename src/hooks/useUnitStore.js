import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_UNIT = {
  title: '',
  subject: '',
  gradeLevel: '',
  duration: {
    totalDays: 10,
    engage: 2,
    explore: 3,
    explain: 2,
    elaborate: 2,
    evaluate: 1,
  },
  essentialQuestion: '',
  objectives: [],
  vocabulary: [],
  standards: [],
  lessons: [],
};

const useUnitStore = create(
  persist(
    (set, get) => ({
      // Current unit being edited
      currentUnit: { ...DEFAULT_UNIT },

      // Wizard state
      currentStep: 1,
      totalSteps: 5,

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, state.totalSteps)
      })),

      prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
      })),

      // Unit updates
      updateUnit: (updates) => set((state) => ({
        currentUnit: { ...state.currentUnit, ...updates }
      })),

      updateDuration: (phase, days) => set((state) => {
        const newDuration = { ...state.currentUnit.duration, [phase]: days };
        newDuration.totalDays =
          newDuration.engage +
          newDuration.explore +
          newDuration.explain +
          newDuration.elaborate +
          newDuration.evaluate;
        return {
          currentUnit: { ...state.currentUnit, duration: newDuration }
        };
      }),

      // Objectives
      addObjective: (objective) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          objectives: [...state.currentUnit.objectives, objective]
        }
      })),

      removeObjective: (index) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          objectives: state.currentUnit.objectives.filter((_, i) => i !== index)
        }
      })),

      updateObjective: (index, value) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          objectives: state.currentUnit.objectives.map((obj, i) =>
            i === index ? value : obj
          )
        }
      })),

      // Vocabulary
      addVocabularyTerm: (term) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          vocabulary: [...state.currentUnit.vocabulary, {
            id: `vocab-${Date.now()}`,
            term: term.term || '',
            definition: term.definition || '',
            example: term.example || '',
          }]
        }
      })),

      removeVocabularyTerm: (id) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          vocabulary: state.currentUnit.vocabulary.filter(v => v.id !== id)
        }
      })),

      updateVocabularyTerm: (id, updates) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          vocabulary: state.currentUnit.vocabulary.map(v =>
            v.id === id ? { ...v, ...updates } : v
          )
        }
      })),

      // Lessons
      addLesson: (lesson) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          lessons: [...state.currentUnit.lessons, {
            id: `lesson-${Date.now()}`,
            ...lesson
          }]
        }
      })),

      updateLesson: (id, updates) => set((state) => ({
        currentUnit: {
          ...state.currentUnit,
          lessons: state.currentUnit.lessons.map(l =>
            l.id === id ? { ...l, ...updates } : l
          )
        }
      })),

      // Reset
      resetUnit: () => set({
        currentUnit: { ...DEFAULT_UNIT },
        currentStep: 1
      }),

      // Load existing unit
      loadUnit: (unit) => set({
        currentUnit: unit,
        currentStep: 1
      }),
    }),
    {
      name: 'unit-builder-storage',
      partialize: (state) => ({
        currentUnit: state.currentUnit,
        currentStep: state.currentStep
      }),
    }
  )
);

export default useUnitStore;
