import { useState } from "react";
import Modal from "react-modal";

import { Dashboard } from "./Components/Dashboard";
import { Header } from "./Components/Header";
import { NewTransactionModal } from "./Components/NewTransactionModal";

import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleClickOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }
  function handleClickCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleClickOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleClickCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
