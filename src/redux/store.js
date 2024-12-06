import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import balanceReducer from './balanceSlice';
import transactionReducer from './transactionSlice';
import informationReducer from './informationSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    information: informationReducer,
    balance: balanceReducer,
    transactions: transactionReducer,
  },
});

export default store;
