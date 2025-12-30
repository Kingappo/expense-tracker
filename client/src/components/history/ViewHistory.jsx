import React, { useState } from "react";
import styled from "styled-components";
import { InnerLayOut } from "../../styles/Layout";
import MainHistory from "../history/MainHistory";

const ViewHistoryStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .history-con {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  .filter-con {
    flex-shrink: 0;
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
    background: #fcf6f9c1;
    position: sticky;
    top: 0;
    z-index: 5;
    width: 100%;
    text-align: center;

    h2 {
      color: #222260;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;

      .filter-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
          background: rgba(34, 34, 96, 0.05);
        }

        &.active {
          background: #222260;
          color: white;
          border-color: #222260;
        }

        input[type="radio"] {
          cursor: pointer;
          margin: 0;
          transform: scale(1.2);
        }

        label {
          cursor: pointer;
          margin: 0;
          user-select: none;
        }
      }
    }
  }

  .histories {
    flex: 1;
    width: 100%;
    max-width: 900px;
    background: transparent;
    border-radius: 12px;
    padding: 1.5rem;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    .histories {
      max-width: 100%;
      padding: 1.5rem 2rem;
    }
  }

  @media (max-width: 992px) {
    .filter-con {
      padding: 0.8rem 0;

      h2 {
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
      }

      .filters {
        gap: 1.5rem;

        .filter-option {
          padding: 0.4rem 0.8rem;
          font-size: 0.9rem;
        }
      }
    }

    .histories {
      padding: 1.2rem 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .filter-con {
      position: relative;
      top: 0;
      padding: 1rem 0;
      background: #fcf6f9;

      h2 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
      }

      .filters {
        gap: 1rem;
        flex-direction: column;
        align-items: center;

        .filter-option {
          width: 200px;
          justify-content: center;
          padding: 0.6rem 1rem;
          font-size: 0.95rem;
          border-radius: 25px;
        }
      }
    }

    .histories {
      padding: 1rem;
      border-radius: 8px;
    }
  }

  @media (max-width: 576px) {
    .history-con {
      gap: 0.5rem;
    }

    .filter-con {
      padding: 0.8rem 0.5rem;

      h2 {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
      }

      .filters {
        gap: 0.8rem;

        .filter-option {
          width: 160px;
          padding: 0.5rem 0.8rem;
          font-size: 0.9rem;

          input[type="radio"] {
            transform: scale(1.1);
          }
        }
      }
    }

    .histories {
      padding: 0.8rem;
      border-radius: 6px;
    }
  }

  @media (max-width: 480px) {
    .filter-con {
      padding: 0.6rem 0.3rem;

      h2 {
        font-size: 1.1rem;
        margin-bottom: 0.6rem;
      }

      .filters {
        gap: 0.6rem;

        .filter-option {
          width: 140px;
          padding: 0.4rem 0.6rem;
          font-size: 0.85rem;
          gap: 0.3rem;

          input[type="radio"] {
            transform: scale(1);
          }
        }
      }
    }

    .histories {
      padding: 0.5rem;
    }
  }

  @media (max-width: 360px) {
    .filter-con {
      .filters {
        .filter-option {
          width: 120px;
          padding: 0.3rem 0.5rem;
          font-size: 0.8rem;
        }
      }
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .history-con {
      gap: 0.5rem;
    }

    .filter-con {
      padding: 0.5rem 0;
      h2 {
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }
      .filters {
        gap: 1rem;
        flex-direction: row;
        flex-wrap: wrap;
        .filter-option {
          width: auto;
          padding: 0.3rem 0.8rem;
          font-size: 0.8rem;
        }
      }
    }

    .histories {
      padding: 0.5rem;
    }
  }

  @media print {
    .filter-con {
      position: static;
      background: white;
      border-bottom: 2px solid #222260;
    }

    .histories {
      overflow: visible;
    }
  }
`;

const ViewHistory = () => {
  const [filterType, setFilterType] = useState("all");

  const FilterOption = ({ value, label, currentFilter, onChange }) => (
    <div
      className={`filter-option ${currentFilter === value ? "active" : ""}`}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        name="filterType"
        value={value}
        checked={currentFilter === value}
        onChange={() => onChange(value)}
        id={`filter-${value}`}
      />
      <label htmlFor={`filter-${value}`}>{label}</label>
    </div>
  );

  return (
    <ViewHistoryStyled>
      <InnerLayOut>
        <div className="history-con">
          <div className="filter-con">
            <h2>Transactions</h2>
            <div className="filters">
              <FilterOption
                value="all"
                label="All"
                currentFilter={filterType}
                onChange={setFilterType}
              />
              <FilterOption
                value="income"
                label="Income"
                currentFilter={filterType}
                onChange={setFilterType}
              />
              <FilterOption
                value="expense"
                label="Expenses"
                currentFilter={filterType}
                onChange={setFilterType}
              />
            </div>
          </div>

          <div className="histories">
            <MainHistory filterType={filterType} />
          </div>
        </div>
      </InnerLayOut>
    </ViewHistoryStyled>
  );
};

export default ViewHistory;
