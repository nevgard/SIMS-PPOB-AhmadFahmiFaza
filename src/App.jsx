import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/Common/PrivateRoute";
import RegistrationPage from "./pages/RegistrastionPage";
import PaymentPage from "./pages/PaymentPage";
import TopUpPage from "./pages/TopUpPage";
import HomePage from "/src/pages/HomePage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <RegistrationPage />}
      />

      {/* Private Routes */}
      <Route path="/" element={<PrivateRoute component={HomePage} />} />
      <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
      <Route path="/payments" element={<PrivateRoute component={PaymentPage} />} />
      <Route path="/topup" element={<PrivateRoute component={TopUpPage} />} />
      <Route path="/transactions" element={<PrivateRoute component={TransactionHistoryPage} />} />

      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
