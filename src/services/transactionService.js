import api from "./api";

const getTransactions = async (limit, offset) => {
  const response = await api.get("/transaction/history", {
    params: { limit, offset }, 
  });

  return response.data.data;
};

// transactionService.js
const topUp = async (amount) => {
  console.log(amount);
  const response = await api.post("/topup", { top_up_amount: amount });
  console.log(response);
  return response.data;
};

const makePayment = async (service_code, total_amount) => {
  try {
    const response = await api.post("/transaction", {
      service_code,
      total_amount,
    });
    console.log(response, "respon api payment");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBalance = async () => {
  try {
    const response = await api.get("/balance");
    return response.data?.data?.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

const transactionService = { getTransactions, topUp, makePayment, getBalance };
export default transactionService;
