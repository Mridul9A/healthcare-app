import MainLayout from "../../layouts/MainLayout";
import { usePatients } from "../../hooks/usePatients";
import { useAlertStore } from "../../store/alertStore";
import Card from "../../components/ui/Card";

export default function Dashboard() {
  const { total } = usePatients();
  const { alerts } = useAlertStore();

  const critical = alerts.filter(a => a.severity === "high").length;
  const warning = alerts.filter(a => a.severity === "medium").length;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">

        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <Card title="Total Patients" value={total} />
          <Card title="Critical 🔴" value={critical} color="text-red-500" />
          <Card title="Warning 🟡" value={warning} color="text-yellow-500" />
        </div>


        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Recent Alerts</h2>

          {alerts.length === 0 ? (
            <p>No alerts</p>
          ) : (
            alerts.slice(-5).map((a) => (
              <div
                key={a.id}
                className={`p-2 mb-2 rounded
                ${
                  a.severity === "high"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {a.patientName} → {a.disease}
              </div>
            ))
          )}
        </div>

      </div>
    </MainLayout>
  );
}