export default function Input({ ...props }: any) {
  return (
    <input
      {...props}
      className="border px-4 py-2 rounded-lg w-full 
      bg-white dark:bg-gray-700 
      dark:border-gray-600 
      text-gray-900 dark:text-white"
    />
  );
}