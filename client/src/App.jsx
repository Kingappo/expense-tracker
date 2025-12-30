import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import ViewTransaction from "./pages/ViewTransactions";
import Account from "./pages/Account";
import AppLayout from "./components/navigation/AppLayout";
import TopNavbar from "./components/navigation/TopNavbar";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/reset-pages/VerifyEmail";
import ResetPassword from "./pages/reset-pages/ResetPassword";
import { PrivateRoute, PublicRoute } from "./components/ProtectedRoutes";
import Notification from "./pages/Notification";
import Budget from "./pages/Budget";

function App() {
  return (
    <>
      <TopNavbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/transactions" element={<ViewTransaction />} />
            <Route path="/account" element={<Account />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/notification" element={<Notification />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
