import React, { useState } from "react";
import {VscMention } from "react-icons/vsc";
import { CiLock } from "react-icons/ci";
import{ IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

const AuthForm = ({
  type,
  onSubmit,
  loading,
  toast,
  setToast,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "register" && password !== confirmPassword) {
      setToast({
        show: true,
        message: "Password and Confirm Password must match.",
      });
      return;
    }
    onSubmit({ firstName, lastName, email, password, confirmPassword });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const hasError = (field) =>
    toast.show && toast.message.toLowerCase().includes(field.toLowerCase());

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div
          className={`relative border-2 rounded-md ${
            hasError("email") ? "border-red-500 focus-within:ring-red-500" : ""
          }`}
        >
          <VscMention
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              hasError("email") ? "text-red-500" : "text-neutral-500"
            }`}
          />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md pl-10 py-3 outline-none"
            placeholder="masukkan email anda"
            required
          />
        </div>

        {type === "register" && (
          <>
            {/* First Name Input */}
            <div
              className={`relative border-2 rounded-md ${
                hasError("firstName")
                  ? "border-red-500 focus-within:ring-red-500"
                  : ""
              }`}
            >
              <FaUser
                size={14}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  hasError("firstName") ? "text-red-500" : "text-neutral-300"
                }`}
              />
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md pl-10 py-3 outline-none"
                placeholder="nama depan"
                required
              />
            </div>

            {/* Last Name Input */}
            <div
              className={`relative border-2 rounded-md ${
                hasError("lastName")
                  ? "border-red-500 focus-within:ring-red-500"
                  : ""
              }`}
            >
              <FaUser
                size={14}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  hasError("lastName") ? "text-red-500" : "text-neutral-300"
                }`}
              />
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-md pl-10 py-3 outline-none"
                placeholder="nama belakang"
                required
              />
            </div>
          </>
        )}

        {/* Password Input */}
        <div
          className={`relative border-2 rounded-md ${
            hasError("password") ? "border-red-500 focus-within:ring-red-500" : ""
          }`}
        >
          <CiLock
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              hasError("password") ? "text-red-500" : "text-neutral-500"
            }`}
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md pl-10 pr-10 py-3 outline-none"
            placeholder={
              type === "register"
                ? "buat password"
                : "masukan password anda"
            }
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>

        {type === "register" && (
          <div
            className={`relative border-2 rounded-md ${
              hasError("password") ? "border-red-500 focus-within:ring-red-500" : ""
            }`}
          >
            <CiLock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
            />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md pl-10 pr-10 py-3 outline-none"
              placeholder="konfirmasi password"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
              aria-label="Toggle password visibility"
            >
              {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : type === "login" ? "Masuk" : "Registrasi"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

