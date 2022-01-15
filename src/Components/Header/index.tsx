import { useState } from "react";
import Modal from "react-modal";
import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

export function Header() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleClickOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }
  function handleClickCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt mononey" />
        <button type="button" onClick={handleClickOpenNewTransactionModal}>
          Nova Transação
        </button>

        <Modal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleClickCloseNewTransactionModal}
        >
          <h2>Cadastrar transacao</h2>
        </Modal>
      </Content>
    </Container>
  );
}
