import React, { useContext, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContent } from "../../context/AppContext";
import { plus } from "../../utils/icon";
import Button from "../Button";
import { formatForDatePicker, formatForBackend } from "../../utils/dateFormat";

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-fields {
    input,
    select,
    textarea {
      font-family: inherit;
      font-size: inherit;
      outline: none;
      padding: 0.3rem 1rem;
      border-radius: 2px;
      border: 2px solid #d4d1d1;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.06);
      color: rgba(34, 3, 96, 0.9);

      &::placeholder {
        color: rgba(34, 3, 96, 0.4);
        font-size: 1rem;
      }
    }

    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;

    select {
      color: rgba(34, 3, 96, 0.4);

      &:focus,
      &:active {
        color: rgba(34, 3, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      &:hover {
        background: green !important;
      }
    }
  }
`;

const ExpenseForm = ({ onFormSubmit }) => {
  const { addExpense } = useContext(AppContent);

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const { title, amount, date, category } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      alert("Please fill in all fields");
      return;
    }

    const formattedDate = formatForBackend(date);

    const expenseData = {
      ...inputState,
      amount: Number(amount),
      date: formattedDate,
    };

    addExpense(expenseData);

    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
    });

    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <p style={{ textAlign: "center", fontWeight: 900 }}>Add New Expense</p>

      <div className="input-fields">
        <input
          type="text"
          placeholder="Expense Title"
          name="title"
          value={title}
          onChange={handleInput("title")}
          required
        />
      </div>

      <div className="input-fields">
        <input
          type="number"
          placeholder="Expense Amount"
          name="amount"
          value={amount}
          onChange={handleInput("amount")}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-fields">
        <DatePicker
          id="date"
          placeholderText="Enter date"
          selected={date ? formatForDatePicker(date) : null} // Use formatForDatePicker
          dateFormat="dd/MM/yyyy"
          onChange={(selectedDate) => {
            setInputState({ ...inputState, date: selectedDate });
          }}
          required
        />
      </div>

      <div className="selects input-fields">
        <select
          name="category"
          id="category"
          value={category}
          required
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="food">Food</option>
          <option value="health">Health</option>
          <option value="shopping">Shopping</option>
          <option value="transport">Transport</option>
          <option value="rent">House Rent</option>
          <option value="airtime">Airtime</option>
          <option value="data">Data</option>
          <option value="gift">Gift</option>
          <option value="school">School</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="submit-btn">
        <Button
          name="Add Expense"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="#f56692"
          color="#fff"
          type="submit"
        />
      </div>
    </ExpenseFormStyled>
  );
};

export default ExpenseForm;
