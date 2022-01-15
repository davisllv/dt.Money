import Modal from "react-modal";
import { Container, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useState } from "react";

interface isNewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: isNewTransactionModalProps) {
  const [type, setType] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>
      <Container>
        <h2>Cadastrar transacao</h2>

        <input placeholder="Título" />

        <input type="number" placeholder="Valor" />

        <input type="text" placeholder="Categoria" />

        <TransactionTypeContainer>
          <button
            onClick={(ev) => {
              ev.preventDefault();
              setType("income");
            }}
            className={type === "income" ? "active" : ""}
          >
            <img src={incomeImg} alt="Income type" />
            <span>Entrada</span>
          </button>
          <button
            onClick={(ev) => {
              ev.preventDefault();
              setType("outcome");
            }}
            className={type === "outcome" ? "outcome" : ""}
          >
            <img src={outcomeImg} alt="Outcome type" />
            <span>Saída</span>
          </button>
        </TransactionTypeContainer>

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
