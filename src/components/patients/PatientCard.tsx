import { memo } from "react";
import { Trash2, Edit } from "lucide-react";

type Props = {
  patient: any;
  onDelete: (id: number) => void;
  onEdit: (p: any) => void;
};

function PatientCard({ patient, onDelete, onEdit }: Props) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow
      hover:shadow-xl hover:scale-[1.02] transition"
    >
      <h2 className="font-bold text-lg">{patient.name}</h2>

      <p className="text-sm text-gray-500">Age: {patient.age}</p>

      <p className="text-blue-500 font-medium">
        {patient.disease}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(patient)}
          className="text-blue-500"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete(patient.id)}
          className="text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default memo(PatientCard);