import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppContent } from "../../context/AppContext";
import IncomeItem from "../../incomeItem/IncomeItem";

const MainHistoryStyled = styled.div`
  width: 100%;

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #666;

    p {
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.8;
    }
  }

  .transactions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .transaction-item {
    margin: 0;
    padding: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .loading-state {
    text-align: center;
    padding: 2rem;
    color: #666;

    p {
      margin: 0;
    }
  }

  .error-state {
    text-align: center;
    padding: 2rem;
    color: #e74c3c;
    background: #ffeaea;
    border-radius: 8px;
    margin: 1rem 0;

    p {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    .transactions-list {
      gap: 0.6rem;
    }

    .empty-state {
      padding: 2rem 1rem;

      p {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    .transactions-list {
      gap: 0.5rem;
    }

    .empty-state {
      padding: 1.5rem 0.5rem;

      p {
        font-size: 0.95rem;
      }
    }

    .loading-state,
    .error-state {
      padding: 1.5rem 0.5rem;
    }
  }

  @media (max-width: 360px) {
    .transactions-list {
      gap: 0.4rem;
    }
  }

  @media print {
    .transactions-list {
      gap: 0.3rem;
    }
  }
`;

const MainHistory = ({ filterType }) => {
  const { incomes, expenses, isLoading, error } = useContext(AppContent);

  const transactions = useMemo(() => {
    if (isLoading) return [];

    let transactions = [...(incomes || []), ...(expenses || [])];

    if (filterType === "income") {
      transactions = transactions.filter((t) => t.type === "income");
    } else if (filterType === "expense") {
      transactions = transactions.filter((t) => t.type === "expense");
    }

    return transactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [incomes, expenses, filterType, isLoading]);

  if (isLoading) {
    return (
      <MainHistoryStyled>
        <div className="loading-state">
          <p>Loading transactions...</p>
        </div>
      </MainHistoryStyled>
    );
  }

  if (error) {
    return (
      <MainHistoryStyled>
        <div className="error-state">
          <p>Error loading transactions: {error}</p>
        </div>
      </MainHistoryStyled>
    );
  }

  return (
    <MainHistoryStyled>
      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>
            {filterType === "all"
              ? "No transactions found. Add your first transaction to get started!"
              : filterType === "income"
              ? "No income transactions found."
              : "No expense transactions found."}
          </p>
        </div>
      ) : (
        <ol className="transactions-list">
          {transactions.map((item) => (
            <li key={item._id || item.id} className="transaction-item">
              <IncomeItem
                id={item._id || item.id}
                title={item.title}
                amount={item.amount}
                date={item.createdAt || item.date}
                category={item.category}
                description={item.description}
                type={item.type}
                indicatorColor={item.type === "income" ? "#1abc9c" : "#e74c3c"}
                showDelete={false}
                isMainHistory={true}
              />
            </li>
          ))}
        </ol>
      )}
    </MainHistoryStyled>
  );
};

export default MainHistory;
