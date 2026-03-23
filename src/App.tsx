import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loader from "./components/ui/Loader";

// 🔥 Lazy load pages
const Login = lazy(() => import("./modules/auth/Login"));
const Dashboard = lazy(() => import("./modules/dashboard/Dashboard"));
const Patients = lazy(() => import("./modules/patients/Patients"));
const Analytics = lazy(() => import("./modules/analytics/Analytics"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}