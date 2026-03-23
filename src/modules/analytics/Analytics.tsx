import { usePatientStore } from "../../store/patientStore";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import MainLayout from "../../layouts/MainLayout";
import { useMemo } from "react";

export default function Analytics() {
  /**
   * Global state: list of patients
   * Sourced from Zustand store
   */
  const patients = usePatientStore((s) => s.patients);

  /**
   * Transform patient data into disease distribution
   * Memoized to avoid recalculating on every render
   *
   * Output format:
   * [{ name: "Flu", value: 3 }, { name: "Diabetes", value: 2 }]
   */
  const diseaseData = useMemo(() => {
    const map: Record<string, number> = {};

    patients.forEach((p) => {
      map[p.disease] = (map[p.disease] || 0) + 1;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [patients]);

  /**
   * Group patients into predefined age buckets
   * Useful for bar chart visualization
   *
   * Buckets:
   * - 0–20
   * - 21–40
   * - 41+
   */
  const ageGroups = useMemo(() => {
    const groups = [
      { name: "0-20", count: 0 },
      { name: "21-40", count: 0 },
      { name: "41+", count: 0 },
    ];

    patients.forEach((p) => {
      if (p.age <= 20) groups[0].count++;
      else if (p.age <= 40) groups[1].count++;
      else groups[2].count++;
    });

    return groups;
  }, [patients]);

  /**
   * Color palette for pie chart segments
   * Cycled using modulo to support dynamic data
   */
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <MainLayout>
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

        {/* Page header */}
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        {/* Empty state when no data is available */}
        {patients.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow text-center">
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm text-gray-500">
              Add patients to see analytics
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Disease distribution (Pie Chart) */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="mb-4 font-semibold">Disease Distribution</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={diseaseData} dataKey="value" outerRadius={100}>
                    {diseaseData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Age distribution (Bar Chart) */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="mb-4 font-semibold">Age Distribution</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageGroups}>
                  <CartesianGrid stroke="#374151" />
                  <XAxis stroke="#9CA3AF" dataKey="name" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  );
}