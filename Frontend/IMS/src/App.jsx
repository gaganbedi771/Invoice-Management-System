import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateInvoice from "./pages/createInvoice";
import EditInvoice from "./pages/editInvoice";

import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
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
        path="/create"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:invoiceNumber"
        element={
          <ProtectedRoute>
            <EditInvoice />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
