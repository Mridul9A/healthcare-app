import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Patient = {
  id: number;
  name: string;
  age: number;
  disease: string;
};

type PatientStore = {
  patients: Patient[];
  addPatient: (p: Patient) => void;
  deletePatient: (id: number) => void;
  // 1. Add this line to the type definition
  updatePatient: (p: Patient) => void; 
};

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: [],

      addPatient: (p) =>
        set((state) => ({
          patients: [...state.patients, p],
        })),

      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== id),
        })),

      // 2. Add the implementation logic here
      updatePatient: (updatedPatient) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === updatedPatient.id ? updatedPatient : p
          ),
        })),
    }),
    {
      name: "patients-storage",
    }
  )
);