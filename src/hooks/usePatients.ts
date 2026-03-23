import { usePatientStore } from "../store/patientStore";

export const usePatients = () => {
  const patients = usePatientStore((s) => s.patients);

  const total = patients.length;

  const critical = patients.filter((p) =>
    p.disease.toLowerCase().includes("covid")
  ).length;

  const warning = patients.filter((p) =>
    p.disease.toLowerCase().includes("fever")
  ).length;

  return { patients, total, critical, warning };
};