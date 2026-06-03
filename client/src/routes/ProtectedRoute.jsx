import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  return localStorage.getItem("smart_feeder_token") ? children : <Navigate to="/login" replace />;
}
