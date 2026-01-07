import React, { useContext, useState } from "react";
import styled from "styled-components";
import { InnerLayOut } from "../styles/Layout";
import IncomeForm from "../components/form/IncomeForm";
import IncomeItem from "../incomeItem/IncomeItem";
import { AppContent } from "../context/AppContext";
import { naira } from "../utils/icon";

const IncomeStyled = styled.div`
  h1 {
    color: #222260;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222260;
    font-weight: 600;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 20px;
    gap: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
    flex-wrap: wrap;

    span {
      font-size: 2rem;
      color: green;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.3rem;
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
      background: #2e7d32;
      color: white;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
      white-space: nowrap;
      min-width: 140px;

      &:hover {
        background: #256528;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
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
        background: white;
        color: #333;
        border: 2px solid #2e7d32;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-right: 2.5rem;
        transition: all 0.3s ease;
        box-shadow: 0px 2px 8px rgba(46, 125, 50, 0.1);

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
        color: #2e7d32;
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
    background: #2e7d32;
    color: white;
    border: none;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(46, 125, 50, 0.3);
    transition: all 0.3s ease;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.2;

    &:hover {
      background: #256528;
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

  .income-content {
    .incomes {
      max-height: 40vh;
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
        color: #666;
        font-size: 1.1rem;
        font-style: italic;
        font-weight: 500;
        padding: 3rem 1rem;
        background: #f8f9fa;
        border-radius: 12px;
        margin: 0;
      }
    }
  }

  @media (max-width: 1200px) {
    .total-income {
      font-size: 1.4rem;

      span {
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
        display: none; /* Hide desktop button on mobile */
      }

      .filter-select {
        max-width: 250px;
        margin: 0 auto;
      }
    }

    .mobile-add-btn {
      display: flex; /* Show mobile button */
    }

    .total-income {
      font-size: 1.3rem;
      padding: 1.2rem;

      span {
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

    .income-content {
      .incomes {
        max-height: 400px;
        gap: 0.8rem;

        .empty-message {
          padding: 2rem 1rem;
          font-size: 1rem;
        }
      }
    }

    .total-income {
      font-size: 1.2rem;
      padding: 1rem;
      margin: 1rem 0;
      flex-direction: column;
      gap: 0.3rem;

      span {
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

    .income-content {
      .incomes {
        max-height: 350px;
        gap: 0.6rem;
        padding-right: 0.3rem;

        .empty-message {
          padding: 1.5rem 0.8rem;
          font-size: 0.95rem;
        }
      }
    }

    .total-income {
      font-size: 1.1rem;
      padding: 0.8rem;

      span {
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

    .total-income {
      font-size: 1rem;

      span {
        font-size: 1.2rem;
      }
    }

    .income-content .incomes {
      max-height: 300px;

      .empty-message {
        padding: 1rem 0.5rem;
        font-size: 0.9rem;
      }
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

    .total-income {
      font-size: 0.95rem;

      span {
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

    .incomes {
      max-height: none !important;
      overflow: visible !important;
    }
  }
`;

const Income = () => {
  const { incomes, deleteIncome } = useContext(AppContent);
  const [filter, setFilter] = useState("all");
  const [showFormOverlay, setShowFormOverlay] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "investment", label: "Investment" },
    { value: "business", label: "Business" },
    { value: "gift", label: "Gift" },
    { value: "farming", label: "Farming" },
    { value: "others", label: "Others" },
  ];

  const filteredIncomes =
    filter === "all"
      ? incomes
      : incomes.filter((income) => income.category === filter);

  const filteredTotal = filteredIncomes.reduce(
    (acc, income) => acc + (income.amount || 0),
    0
  );

  const handleFormSubmit = () => {
    setShowFormOverlay(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <IncomeStyled>
      <InnerLayOut>
        <h1>Incomes</h1>
        <div className="total-income">
          Total Income:{" "}
          <span>
            {naira}
            {filteredTotal}
          </span>
        </div>

        <div className="controls-container">
          <button
            className="desktop-add-btn"
            onClick={() => setShowFormOverlay(true)}
          >
            Add Income
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
          title="Add New Income"
        >
          Add
          <br />
          Income
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
              <IncomeForm onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        <div className="income-content">
          <div className="incomes">
            {filteredIncomes.length === 0 ? (
              <p className="empty-message">
                {filter === "all"
                  ? "Add income to visualize your earnings"
                  : `No incomes found in "${
                      categories.find((c) => c.value === filter)?.label
                    }" category`}
              </p>
            ) : (
              filteredIncomes.map((income) => (
                <IncomeItem
                  key={income._id}
                  id={income._id}
                  title={income.title}
                  amount={income.amount}
                  date={income.date}
                  category={income.category}
                  type={income.type}
                  description={income.description}
                  indicatorColor="#1abc9c"
                  deleteItem={deleteIncome}
                  isMainHistory={true}
                />
              ))
            )}
          </div>
        </div>
      </InnerLayOut>
    </IncomeStyled>
  );
};

export default Income;
