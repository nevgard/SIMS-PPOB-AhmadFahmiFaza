import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../redux/transactionSlice";
import Layout from "../components/Layout/Layout";
import dayjs from "dayjs";

const TransactionHistoryPage = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);
  const [limit, setLimit] = useState(5); 
  const [offset, setOffset] = useState(0); 

  // Fetch data berdasarkan limit dan offset
  useEffect(() => {
    dispatch(fetchTransactions({ limit: limit.toString(), offset: offset.toString() }));
  }, [dispatch, limit, offset]);

  // Handler untuk tombol Show More
  const handleShowMore = () => {
    setOffset(offset + limit); 
  };

  // Hitung apakah ada data lebih
  const hasMore = transactions?.records?.length === parseInt(limit, 10);

  return (
    <Layout summary={true} header={true}>
      <div className="mt-8">
        <p className="text-xl font-semibold">Semua Transaksi</p>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {transactions?.records?.length > 0 ? (
          <div className="mt-4 space-y-2">
            {transactions.records.map((transaction) => (
              <div key={transaction.invoice_number} className="border rounded-md py-2 px-4">
                <div className="flex justify-between w-full items-center">
                  <p
                    className={`font-bold text-lg ${
                      transaction.transaction_type === "PAYMENT"
                        ? "text-red-500"
                        : transaction.transaction_type === "TOPUP"
                        ? "text-emerald-400"
                        : ""
                    }`}
                  >
                    {transaction.transaction_type === "PAYMENT"
                      ? "-"
                      : transaction.transaction_type === "TOPUP"
                      ? "+"
                      : ""}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(transaction.total_amount)}
                  </p>
                  <p className="text-xs font-bold">{transaction.description}</p>
                </div>
                <p className="text-xs">
                  {dayjs(transaction.created_on).format("DD-MM-YYYY HH:mm")} WIB
                </p>
              </div>
            ))}
            {/* Tombol Show More */}
            {hasMore && (
              <button
                onClick={handleShowMore}
                className="mt-4 pb-6 w-full font-bold text-red-500 "
                disabled={loading} 
              >
                {loading ? "Loading..." : "Show More"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center mt-24">

            <p className="text-neutral-500">Maaf tidak ada history transaksi saat ini.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TransactionHistoryPage;
