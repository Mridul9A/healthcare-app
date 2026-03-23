import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const user = useAuthStore((s) => s.user);

  if (user === undefined) return <div>Loading...</div>;

  return user ? children : <Navigate to="/" />;
}