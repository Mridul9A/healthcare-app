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
    }),
    {
      name: "patients-storage",
    }
  )
);