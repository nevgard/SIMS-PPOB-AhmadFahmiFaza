import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthToast from "../components/Auth/AuthToast";
import { register } from "../redux/authSlice";

const RegistrastionPage = () => {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.auth);

  const handleRegister = ({ firstName, lastName, email, password }) => {
    try {
      dispatch(register({ firstName, lastName, email, password }));
    } catch (error) {}
  };

  useEffect(() => {
    if (success) setToast({
      show: true,
      message: "registrasi berhasil silahkan login",
      type : "success"
    })
  }, [success]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (error) {
      setToast({
        show: true,
        message: error,
        type: "error",
      });
    }
    const timer = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);
  return (
    <div className="flex  w-full h-screen">
      <div className="w-full items-center justify-center flex flex-col">
        {/* Logo */}
        <div className="flex w-full items-center justify-center space-x-2">
          <img src="/assets/img/Logo.png" className alt="LOGO SIMS PPOB" />
          <h2 className="text-2xl font-semibold">SIMS PPOB</h2>
        </div>

        <div className="flex w-full justify-center mt-8 px-48">
          <p className="font-bold  text-3xl text-center">
            Lengkapi data untuk membuat akun
          </p>
        </div>
        <div className="w-full px-28 mt-12">
          <AuthForm
            type="register"
            onSubmit={handleRegister}
            loading={loading}
            toast={toast}
            setToast={setToast}
          />
        </div>
        <div className="text-sm font-semibold mt-8">
          <span className=" text-gray-500">sudah punya akun? login</span>
          <Link to={"/login"} className="text-red-500 font-bold">
            {" "}
            di sini
          </Link>
        </div>
      </div>
      {toast.show && (
        <AuthToast
          message={toast.message}
          setToast={() => setToast({ show: false })}
          type={toast.type}
        />
      )}
      <div className="w-full ">
        <img
          src="/assets/img/IllustrasiLogin.png"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegistrastionPage;
