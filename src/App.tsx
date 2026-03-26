import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SystemManagement from "./pages/SystemManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/management" element={<SystemManagement />} />
          {/* Fallback routes for demo */}
          <Route path="/history" element={<Dashboard />} />
          <Route path="/classrooms" element={<Dashboard />} />
          <Route path="/logs" element={<Dashboard />} />
          <Route path="/reports" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
