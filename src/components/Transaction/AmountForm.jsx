import React from "react";
import { BiWalletAlt } from "react-icons/bi";

const AmountForm = ({
  amount,
  setAmount,
  handleSubmit,
  buttonText,
  buttonDisabled,
  label,
  placeholder,
}) => {
  // Handle input change
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(rawValue || 0); // Format as currency (IDR)
    setAmount({ raw: rawValue, formatted: formattedValue });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative border focus-within:border-red-500 focus-within:ring-red-500 rounded-md items-center flex px-3 py-2">
        <BiWalletAlt className="text-neutral-500 absolute left-2" />
        <input
          id="amount"
          type="text"
          value={amount.formatted}
          onChange={handleInputChange}
          className="w-full ml-5 outline-none rounded-md"
          placeholder={placeholder || "Masukkan nominal"}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`rounded-md w-full mt-4 py-2 text-white ${buttonDisabled ? "bg-neutral-300" : "bg-red-500"}`}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AmountForm;
