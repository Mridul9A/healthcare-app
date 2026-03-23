import { create } from "zustand";

export type Alert = {
  id: number;
  patientId: number;
  patientName: string;
  disease: string;
  severity: "low" | "medium" | "high";
};

type AlertStore = {
  alerts: Alert[];
  addAlert: (a: Alert) => void;
  removeAlertByPatient: (patientId: number) => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],

  addAlert: (a) =>
    set((state) => ({
      alerts: [...state.alerts, a],
    })),

  removeAlertByPatient: (patientId) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.patientId !== patientId),
    })),
}));