import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, topUp } from "../redux/transactionSlice";
import Layout from "../components/Layout/Layout";
import AmountForm from "../components/Transaction/AmountForm";
import Modal from "../components/Common/Modal"; 

const TopUpPage = () => {
  const [amount, setAmount] = useState({ raw: "", formatted: "" });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    amount: "",
    type: "info",
    onClose: () => setModalState((prevState) => ({ ...prevState, isOpen: false })),
    onConfirm: null,
    buttonMessage: ""
  });
console.log(modalState)
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transactions);

  const handleTopUp = () => {
    if (amount.raw) {
      dispatch(topUp(Number(amount.raw)))
        .then((response) => {
          if (topUp.fulfilled.match(response)) {
            dispatch(getBalance());
            setModalState({
              isOpen: true,
              title: "Top Up sebesar",
              amount:  amount.formatted,
              type: "success",
              onClose: () => setModalState((prevState) => ({ ...prevState, isOpen: false })),
              onConfirm: null
            });
          } else if (topUp.rejected.match(response)) {
            setModalState({
              isOpen: true,
              title: "Gagal",
              amount: amount.formatted,
              type: "error",
              onClose: () => setModalState((prevState) => ({ ...prevState, isOpen: false })),
              onConfirm: null
            });
          }
        })
        .finally(() => setModalState((prevState) => ({ ...prevState, isOpen: true })));
    }
  };

  // Predefined nominal values for top-up
  const initiateNominal = [
    { id: 1, value: 10000 },
    { id: 2, value: 20000 },
    { id: 3, value: 50000 },
    { id: 4, value: 100000 },
    { id: 5, value: 250000 },
    { id: 6, value: 500000 },
  ];

  return (
    <Layout summary={true} header={true}>
      <div className="mt-12">
        <p className="text-xl font-semibold">Silahkan masukan</p>
        <h1 className="text-3xl font-bold">Nominal Top Up</h1>
        <div className="w-full flex mt-12">
          <div className="w-full">
            <AmountForm
              amount={amount}
              setAmount={setAmount}
              handleSubmit={(e) => {
                e.preventDefault();
                setModalState({
                  isOpen: true,
                  buttonMessage: "Ya, lanjutkan Top Up",
                  title: "Anda yakin untuk Top Up sebesar",
                  amount: `${amount.formatted} ?`,
                  type: "info",
                  onClose: () => setModalState((prevState) => ({ ...prevState, isOpen: false })),
                  onConfirm: handleTopUp
                });
              }}
              buttonText={loading ? "Processing..." : "Top Up"}
              buttonDisabled={!amount.raw}
              label="Masukkan Nominal Top Up"
              placeholder="Masukkan nominal"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Nominal Buttons */}
          <div className="grid grid-cols-3 w-2/4 items-center justify-items-center gap-3 pl-6 pr-12">
            {initiateNominal.map((item) => (
              <div
                key={item.id}
                className={`border px-4 py-3 w-full rounded-sm cursor-pointer ${
                  amount.formatted ===
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(item.value)
                    ? "border-red-500"
                    : ""
                }`}
                onClick={() =>
                  setAmount({
                    raw: item.value.toString(),
                    formatted: new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(item.value),
                  })
                }
              >
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(item.value)}
                </p>
              </div>
            ))}
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

export default TopUpPage;
