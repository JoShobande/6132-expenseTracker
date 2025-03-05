import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const getTransactionById = (id) => {
    return transactions.find((transaction) => transaction.id === id);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        getTransactionById
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
