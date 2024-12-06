import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from "../redux/profileSlice";
import { MdEdit, MdEmail, MdPerson } from "react-icons/md";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: profile,
    loading,
    error,
  } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
  });
  const [imageError, setImageError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        profile_image: profile.profile_image || "",
      });
    }
  }, [profile]);

  const handleImageError = (e) => {
    e.target.src = "/assets/img/ProfilePhoto.png";
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      setImageError("Ukuran file tidak boleh lebih dari 100KB.");
    } else {
      setImageError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    try {
      const fileInput = document.getElementById("image-upload");
      if (fileInput && fileInput.files[0]) {
        dispatch(updateProfileImage(fileInput.files[0]));
      }
      if (
        formData.first_name !== profile.first_name ||
        formData.last_name !== profile.last_name ||
        formData.email !== profile.email
      ) {
        dispatch(updateProfile(formData));
      }
      setIsEditing(false);
      toast("Data Profil Berhasil Diperbarui");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); 
  };
  useEffect(() => {
    if (imageError) toast.error(imageError);
  }, [imageError]);

  return (
    <Layout header={true}>
      <div className="w-full flex flex-col items-center mt-8">
        {/* Profile Picture */}
        <div className="relative">
          <div className="border rounded-full relative">
            <img
              src={formData.profile_image || "/assets/img/ProfilePhoto.png"}
              alt="Profile"
              onError={handleImageError}
              className="w-32 h-32 object-cover rounded-full"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 bg-white border-2 rounded-full p-2 cursor-pointer"
            >
              <MdEdit />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={!isEditing}
            />
          </div>
        </div>

        <p className="capitalize text-2xl font-bold mt-4">
          {formData.first_name} {formData.last_name}
        </p>

        {/* Profile Form */}
        <form className="w-full max-w-xl mt-6">
          {/* Email */}
          <label className="block text-gray-700 font-bold mt-4 mb-2">
            Email
          </label>
          <div className="flex items-center border-2 focus-within:ring-2 focus-within:ring-red-500 rounded-md">
            <MdEmail className="text-gray-400 ml-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 outline-none"
              placeholder="Masukkan email"
              disabled={!isEditing}
            />
          </div>

          {/* First Name */}
          <label className="block text-gray-700 font-bold mt-4 mb-2">
            Nama Depan
          </label>
          <div className="flex items-center border-2 focus-within:ring-2 focus-within:ring-red-500 rounded-md">
            <MdPerson className="text-gray-400 ml-2" />
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full p-2 outline-none"
              placeholder="Masukkan nama depan"
              disabled={!isEditing}
            />
          </div>

          {/* Last Name */}
          <label className="block text-gray-700 font-bold mt-4 mb-2">
            Nama Belakang
          </label>
          <div className="flex items-center border-2 focus-within:ring-2 focus-within:ring-red-500 rounded-md">
            <MdPerson className="text-gray-400 ml-2" />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full p-2 outline-none"
              placeholder="Masukkan nama belakang"
              disabled={!isEditing}
            />
          </div>

          {/* Edit / Save Button */}
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEditClick}
              className="mt-6 w-full text-red-500 py-2 border-red-500 border rounded-md font-bold hover:bg-red-500 hover:text-white transition-all ease-in-out"
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveClick}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-md font-bold hover:bg-red-600 transition-all ease-in-out"
            >
              Simpan
            </button>
          )}
        </form>

        {/* Logout Button */}
        {!isEditing && (
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 w-full max-w-xl bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all ease-in-out"
          >
            Logout
          </button>
        )}
      </div>
      <Toaster position="top-center" />
    </Layout>
  );
};

export default ProfilePage;
