import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, makePayment } from "../redux/transactionSlice";
import Layout from "../components/Layout/Layout";
import AmountForm from "../components/Transaction/AmountForm";
import Modal from "../components/Common/Modal";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState({ raw: "", formatted: "" });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    amount: "",
    type: "info",
    onClose: () =>
      setModalState((prevState) => ({ ...prevState, isOpen: false })),
    onConfirm: null,
    buttonMessage: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transactions);

  const location = useLocation();
  const { service_name, service_icon, service_code } = location.state || {};

  if (!service_name || !service_icon || !service_code) {
    navigate("/");
    return null;
  }
  const handlePayment = () => {
    if (amount.raw) {
      dispatch(
        makePayment({
          service_code,
          total_amount: Number(amount.raw),
        })
      )
        .then((response) => {
          if (makePayment.fulfilled.match(response)) {
            dispatch(getBalance()); // Refetch balance after successful payment
            setModalState({
              isOpen: true,
              title: `Pembayaran ${service_name} sebesar`,
              amount: `${amount.formatted}`,
              type: "success",
              onClose: () =>
                setModalState((prevState) => ({ ...prevState, isOpen: false })),
              onConfirm: null,
            });
          } else if (makePayment.rejected.match(response)) {
            setModalState({
              isOpen: true,
              title: "Pembayaran Gagal",
              amount: `Sebesar ${amount.formatted}`,
              type: "error",
              onClose: () =>
                setModalState((prevState) => ({ ...prevState, isOpen: false })),
              onConfirm: null,
            });
          }
        })
        .catch((err) => {
          setModalState({
            isOpen: true,
            title: "Error",
            amount: err.message || "Terjadi kesalahan!",
            type: "error",
            onClose: () =>
              setModalState((prevState) => ({ ...prevState, isOpen: false })),
          });
        });
    }
  };

  return (
    <Layout summary={true} header={true}>
      <div className="mt-12">
        <p className="text-xl font-semibold">Pembayaran</p>
        <div className="flex items-center space-x-3 mt-3">
          <img src={service_icon} alt={service_name} className="w-8" />
          <h1 className="font-semibold text-xl">{service_name || ""}</h1>
        </div>
        <div className="w-full flex mt-12">
          <div className="w-full">
            <AmountForm
              amount={amount}
              setAmount={setAmount}
              handleSubmit={(e) => {
                e.preventDefault();
                setModalState({
                  isOpen: true,
                  buttonMessage: "Ya, lanjutkan Bayar",
                  title: `Beli ${service_name} senilai`,
                  amount: `${amount.formatted} ?`,
                  type: "info",
                  onClose: () =>
                    setModalState((prevState) => ({
                      ...prevState,
                      isOpen: false,
                    })),
                  onConfirm: handlePayment,
                });
              }}
              buttonText={loading ? "Processing..." : "Bayar"}
              buttonDisabled={!amount.raw}
              placeholder="Masukkan nominal"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      {/* Modal Confirmation */}
      {modalState.isOpen && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={modalState.onClose}
          title={modalState.title}
          amount={modalState.amount}
          type={modalState.type}
          onConfirm={modalState.onConfirm}
          buttonMessage={modalState.buttonMessage}
        />
      )}
    </Layout>
  );
};

export default PaymentPage;
