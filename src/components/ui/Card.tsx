export default function Card({ title, value, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}