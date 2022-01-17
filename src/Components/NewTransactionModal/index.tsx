import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface isNewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: isNewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(event: FormEvent): Promise<void> {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });
    setType("");
    setTitle("");
    setAmount(0);
    setCategory("");
    onRequestClose();
  }

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
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacao</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(ev) => setAmount(Number(ev.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            onClick={(ev) => {
              ev.preventDefault();
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Income type" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            onClick={(ev) => {
              ev.preventDefault();
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Outcome type" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
