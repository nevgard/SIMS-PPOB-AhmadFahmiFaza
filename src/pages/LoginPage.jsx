import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthToast from "../components/Auth/AuthToast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth); // assuming you have success in auth state after login

  const handleLogin = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    if (error) {
      setToast({
        show: true,
        message: error,
      });
    }
    const timer = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (success) {
      navigate("/"); // Redirect to home page after successful login
    }
  }, [success, navigate]);

  return (
    <div className="flex w-full h-screen">
      <div className="w-full items-center justify-center flex flex-col">
        {/* Logo */}
        <div className="flex w-full items-center justify-center space-x-2">
          <img src="/src/assets/img/Logo.png" className alt="LOGO SIMS PPOB" />
          <h2 className="text-2xl font-semibold">SIMS PPOB</h2>
        </div>

        <div className="flex w-full justify-center mt-8 px-48">
          <p className="font-bold text-3xl text-center">
            Masuk atau buat akun untuk memulai
          </p>
        </div>
        <div className="w-full px-28 mt-12">
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            toast={toast}
          />
        </div>
        <div className="text-sm font-semibold mt-8">
          <span className=" text-gray-500">belum punya akun? registrasi</span>
          <Link to={"/register"} className="text-red-500 font-bold">
            {" "}
            di sini
          </Link>
        </div>
        {toast.show && (
          <AuthToast
            message={toast.message}
            setToast={() => setToast({ show: false })}
          />
        )}
      </div>
      <div className="w-full">
        <img
          src="/assets/img/IllustrasiLogin.png"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
