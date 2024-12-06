import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! Halaman yang kamu cari tidak tersedia</p>
      <Link
        to="/"
        className="px-4 py-2  text-red-500 border border-red-500 rounded "
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
