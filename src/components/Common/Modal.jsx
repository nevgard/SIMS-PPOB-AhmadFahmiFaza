import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isOpen,
  title,
  amount,
  type,
  onClose,
  onConfirm,
  buttonMessage
}) => {
    console.log(buttonMessage)
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`flex flex-col items-center relative w-80 py-6 max-w-md rounded-lg shadow-xl border-2 bg-white`}
      >
        {/* Modal Title */}
        {type == "info" ? (
          <img
            src="/assets/img/Logo.png"
            alt="LOGO SIMS PPOB"
            className="w-14"
          />
        ) : type == "success" ? (
          <div className="bg-emerald-400 text-white rounded-full p-4">
            <FaCheck size={24}/>
          </div>
        ) : (
          <div className="bg-red-500 text-white rounded-full p-4">
            <IoMdClose size={24} />
          </div>
        )}
        <h2 className="text-center mt-4">{title}</h2>

        {/* Modal Amount */}
        <div className=" font-bold text-2xl text-center">
          {amount && <span> {amount}</span>}
        </div>

        {type == "success" && 
        <p className="">berhasil!</p>
        }
        {type == "error" && 
        <p className="">gagal!</p>
        }


        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4 mt-6">
          {onConfirm ? (
            <>
              <button
                onClick={onConfirm}
                className="text-red-500 font-bold"
              >
             {buttonMessage}
              </button>
              <button onClick={onClose} className="font-bold text-neutral-500">
                Batalkan
              </button>
            </>
          ) : (
            <button onClick={onClose} className="font-bold text-red-500">
              Kembali ke Beranda
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
