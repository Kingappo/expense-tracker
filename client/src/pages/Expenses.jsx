import React, { useContext, useState } from "react";
import styled from "styled-components";
import { InnerLayOut } from "../styles/Layout";
import IncomeItem from "../incomeItem/IncomeItem";
import { AppContent } from "../context/AppContext";
import ExpenseForm from "../components/form/ExpensesForm";

const ExpenseStyled = styled.div`
  h1 {
    color: #222260;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .total-expenses {
    text-align: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 20px;
    gap: 0.5rem;
    font-size: 1.5rem;

    h3 {
      margin: 0;
      span {
        font-size: 1.6;
        color: #fd3a3a;
        font-weight: 700;
        gap: 0.3rem;
      }
    }
  }

  .controls-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;
    gap: 1rem;
    flex-wrap: wrap;

    .desktop-add-btn {
      padding: 0.8rem 1.5rem;
      background: #fd3a3a;
      color: white;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(253, 58, 58, 0.3);
      white-space: nowrap;
      min-width: 140px;

      &:hover {
        background: #e03535;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(253, 58, 58, 0.4);
      }
    }

    .filter-select {
      max-width: 300px;
      width: 100%;
      position: relative;

      select {
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 25px;
        border: 2px solid #fd3a3a;
        background: white;
        color: #333;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-right: 2.5rem;
        transition: all 0.3s ease;
        box-shadow: 0px 2px 8px rgba(253, 58, 58, 0.1);

        &:focus {
          outline: none;
        }

        option {
          padding: 0.8rem;
          font-size: 0.9rem;
        }
      }

      .select-arrow {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #fd3a3a;
        font-size: 0.8rem;
      }
    }
  }

  .mobile-add-btn {
    display: none;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    background: #fd3a3a;
    color: white;
    border: none;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(253, 58, 58, 0.3);
    transition: all 0.3s ease;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.2;

    &:hover {
      background: #e03535;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 1rem;

    .form-container {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

      .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
          background: #f5f5f5;
          color: #333;
        }
      }
    }
  }

  .expenses-content {
    .expenses-list {
      max-height: 35vh;
      overflow-y: auto;
      padding-right: 0.5rem;
      scrollbar-width: thin;
      scrollbar-color: #ccc transparent;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #c1c1c1;
        border-radius: 10px;
        border: 2px solid #f1f1f1;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #a8a8a8;
      }

      .empty-message {
        text-align: center;
        color: #555;
        font-size: 1.1rem;
        font-weight: 500;
        margin-top: 2rem;
        padding: 3rem 1rem;
        background: #f8f9fa;
        border-radius: 12px;
      }
    }
  }

  @media (max-width: 1200px) {
    .total-expenses {
      font-size: 1.4rem;

      h3 span {
        font-size: 1.8rem;
      }
    }
  }

  @media (max-width: 992px) {
    h1 {
      font-size: 1.8rem;
    }

    .controls-container {
      .desktop-add-btn {
        display: none;
      }

      .filter-select {
        max-width: 250px;
        margin: 0 auto;
      }
    }

    .mobile-add-btn {
      display: flex;
    }

    .total-expenses {
      font-size: 1.3rem;
      padding: 1.2rem;

      h3 span {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.6rem;
      text-align: center;
    }

    .controls-container {
      margin: 1.5rem 0;

      .filter-select {
        max-width: 280px;
        margin: 0 auto;

        select {
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
        }
      }
    }

    .mobile-add-btn {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 65px;
      height: 65px;
      font-size: 0.75rem;
    }

    .form-overlay {
      padding: 0.5rem;

      .form-container {
        padding: 1.2rem;
        max-width: 95%;

        .close-btn {
          top: 0.5rem;
          right: 0.5rem;
        }
      }
    }

    .expenses-content {
      .expenses-list {
        max-height: 400px;
        gap: 0.8rem;
      }
    }

    .total-expenses {
      font-size: 1.2rem;
      padding: 1rem;
      margin: 0.8rem 0;

      h3 span {
        font-size: 1.4rem;
      }
    }
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 1.4rem;
    }

    .controls-container {
      margin: 1.2rem 0;

      .filter-select {
        max-width: 220px;

        select {
          padding: 0.6rem 0.8rem;
          font-size: 0.85rem;
        }
      }
    }

    .mobile-add-btn {
      bottom: 1rem;
      right: 1rem;
      width: 60px;
      height: 60px;
      font-size: 0.7rem;
    }

    .form-overlay .form-container {
      padding: 1rem;
      border-radius: 15px;
    }

    .expenses-content {
      .expenses-list {
        max-height: 350px;
        gap: 0.6rem;
        padding-right: 0.3rem;
      }
    }

    .total-expenses {
      font-size: 1.1rem;
      padding: 0.8rem;

      h3 span {
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 480px) {
    .controls-container {
      .filter-select {
        max-width: 200px;
      }
    }

    .total-expenses {
      font-size: 1rem;

      h3 span {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.4rem;
      }
    }

    .expenses-content .expenses-list {
      max-height: 300px;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 1.3rem;
    }

    .controls-container {
      .filter-select {
        max-width: 180px;

        select {
          padding: 0.5rem 0.7rem;
          font-size: 0.8rem;
        }
      }
    }

    .mobile-add-btn {
      width: 55px;
      height: 55px;
      font-size: 0.65rem;
      bottom: 0.8rem;
      right: 0.8rem;
    }

    .total-expenses {
      font-size: 0.95rem;

      h3 span {
        font-size: 1.1rem;
      }
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .mobile-add-btn {
      display: flex;
    }

    .form-overlay .form-container {
      max-height: 80vh;
    }
  }

  @media print {
    .controls-container,
    .mobile-add-btn,
    .form-overlay {
      display: none;
    }

    .expenses-list {
      max-height: none !important;
      overflow: visible !important;
    }
  }
`;

const Expenses = () => {
  const { expenses, deleteExpense } = useContext(AppContent);
  const [filter, setFilter] = useState("all");
  const [showFormOverlay, setShowFormOverlay] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "food", label: "Food" },
    { value: "health", label: "Health" },
    { value: "shopping", label: "Shopping" },
    { value: "transport", label: "Transport" },
    { value: "rent", label: "Rent" },
    { value: "airtime", label: "Airtime" },
    { value: "data", label: "Data" },
    { value: "gift", label: "Gift" },
    { value: "school", label: "School" },
    { value: "other", label: "Other" },
  ];

  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const filteredTotal = filteredExpenses.reduce(
    (acc, expense) => acc + (expense.amount || 0),
    0
  );

  const handleFormSubmit = () => {
    setShowFormOverlay(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <ExpenseStyled>
      <InnerLayOut>
        <h1>Expenses</h1>
        <div className="total-expenses">
          <h3>
            Total Expenses:
            <span> ₦{filteredTotal.toLocaleString()}</span>
          </h3>
        </div>

        <div className="controls-container">
          <button
            className="desktop-add-btn"
            onClick={() => setShowFormOverlay(true)}
          >
            Add Expense
          </button>

          <div className="filter-select">
            <select value={filter} onChange={handleFilterChange}>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="select-arrow">▼</div>
          </div>
        </div>

        <button
          className="mobile-add-btn"
          onClick={() => setShowFormOverlay(true)}
          title="Add New Expense"
        >
          Add
          <br />
          Expense
        </button>

        {showFormOverlay && (
          <div className="form-overlay">
            <div className="form-container">
              <button
                className="close-btn"
                onClick={() => setShowFormOverlay(false)}
                aria-label="Close form"
              >
                ×
              </button>
              <ExpenseForm onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        <div className="expenses-content">
          <div className="expenses-list">
            {filteredExpenses.length === 0 ? (
              <p className="empty-message">
                {filter === "all"
                  ? "Add expenses to visualize your spending."
                  : `No expenses found in "${
                      categories.find((c) => c.value === filter)?.label
                    }" category`}
              </p>
            ) : (
              filteredExpenses.map((expense) => (
                <IncomeItem
                  key={expense._id}
                  id={expense._id}
                  title={expense.title}
                  amount={expense.amount}
                  date={expense.date}
                  category={expense.category}
                  type={expense.type}
                  description={expense.description}
                  indicatorColor="#f56692"
                  deleteItem={deleteExpense}
                  isMainHistory={true}
                />
              ))
            )}
          </div>
        </div>
      </InnerLayOut>
    </ExpenseStyled>
  );
};

export default Expenses;
