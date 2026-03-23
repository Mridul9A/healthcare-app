import { useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import { usePatientStore } from "../../store/patientStore";
import PatientCard from "../../components/patients/PatientCard";
import { Pencil, Trash2 } from "lucide-react";

export default function Patients() {
  const { patients, addPatient, deletePatient, updatePatient } =
    usePatientStore();

  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");

  // UI state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Pagination
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 6;

  // Edit
  const [editId, setEditId] = useState<number | null>(null);

  /**
   * Notification helper
   * Uses browser Notification API
   */
  const notify = (message: string) => {
    if (Notification.permission === "granted") {
      new Notification("Healthcare Alert", {
        body: message,
      });
    }
  };

  /**
   * Add or update patient
   */
  const handleAdd = () => {
    if (!name || !age || !disease) return;

    if (editId !== null) {
      updatePatient({
        id: editId,
        name,
        age: Number(age),
        disease,
      });
      setEditId(null);
    } else {
      addPatient({
        id: Date.now(),
        name,
        age: Number(age),
        disease,
      });

      // Notification on add
      notify(`Patient ${name} added`);
    }

    setName("");
    setAge("");
    setDisease("");
  };

  /**
   * Edit patient
   */
  const handleEdit = (p: any) => {
    setName(p.name);
    setAge(String(p.age));
    setDisease(p.disease);
    setEditId(p.id);
  };

  /**
   * Filter + search (memoized)
   */
  const filtered = useMemo(() => {
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter
          ? p.disease.toLowerCase().includes(filter.toLowerCase())
          : true)
    );
  }, [patients, search, filter]);

  /**
   * Pagination
   */
  const paginated = filtered.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Patients</h1>

        {/* Add / Update Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800"
          />

          <input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800"
          />

          <input
            placeholder="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800"
          />

          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Search + Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <input
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800"
          />

          <input
            placeholder="Filter by disease"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800"
          />
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded-lg ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded-lg ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            List
          </button>
        </div>

        {/* Content */}
        {paginated.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
            No patients found
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onDelete={(id: number) => {
                  deletePatient(id);
                  notify(`Patient ${p.name} deleted`);
                }}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y">
            {paginated.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    Age: {p.age} • {p.disease}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      deletePatient(p.id);
                      notify(`Patient ${p.name} deleted`);
                    }}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-4">

            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className={`px-5 py-2 rounded-lg ${
                page === 0
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Prev
            </button>

            <button
              onClick={() =>
                setPage((p) =>
                  (p + 1) * PAGE_SIZE < filtered.length ? p + 1 : p
                )
              }
              disabled={(page + 1) * PAGE_SIZE >= filtered.length}
              className={`px-5 py-2 rounded-lg ${
                (page + 1) * PAGE_SIZE >= filtered.length
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Next
            </button>

          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Page {page + 1} of{" "}
            {Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}
          </p>
        </div>

      </div>
    </MainLayout>
  );
}