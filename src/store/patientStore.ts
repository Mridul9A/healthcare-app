import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Represents the core data structure for a patient record.
 */
export type Patient = {
  /** Unique identifier, typically generated via Date.now() or a UUID */
  id: number;
  name: string;
  age: number;
  disease: string;
};

/**
 * State definitions and available actions for the Patient management module.
 */
type PatientStore = {
  /** Array of active patient records */
  patients: Patient[];
  /** Adds a new patient to the beginning of the list */
  addPatient: (p: Patient) => void;
  /** Removes a patient from the store by their unique ID */
  deletePatient: (id: number) => void;
  /** Replaces an existing patient record with updated data based on ID matching */
  updatePatient: (p: Patient) => void;
};

/**
 * Hook-based store for managing patient data with local storage persistence.
 * Uses Zustand for state management and the 'persist' middleware to ensure 
 * data survives page refreshes.
 */
export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: [],

      /**
       * Appends a new patient. 
       * Note: In a real production environment with an API, this would likely 
       * involve an optimistic update or a re-fetch.
       */
      addPatient: (p) =>
        set((state) => ({
          patients: [p, ...state.patients], // Added to start for better UX in lists
        })),

      /**
       * Standard filter-based deletion.
       * @param id - The unique identifier of the patient to remove.
       */
      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== id),
        })),

      /**
       * Maps through the collection to update a specific record.
       * Immutably replaces the object if the ID matches.
       */
      updatePatient: (updatedPatient) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === updatedPatient.id ? updatedPatient : p
          ),
        })),
    }),
    {
      /** Key used in localStorage/indexedDB */
      name: "healthcare-patients-storage",
      /** * Optional: Explicitly define storage. Defaults to localStorage.
       * createJSONStorage(() => sessionStorage) could be used for session-only data.
       */
      storage: createJSONStorage(() => localStorage),
    }
  )
);