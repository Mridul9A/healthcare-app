type ButtonVariant = "primary" | "danger" | "success";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export default function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-500 hover:bg-blue-600 text-white",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    success:
      "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}