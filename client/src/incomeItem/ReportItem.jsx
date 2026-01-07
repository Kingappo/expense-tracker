import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { AppContent } from "../context/AppContext";

const ReportItemStyled = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  h3 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2f4f4f;
  }

  .details {
    display: flex;
    justify-content: flex-start;
    margin: 2rem 0 2rem 2rem;
    flex-wrap: wrap;

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: #222260;

      p {
        margin: 0.2rem 0;
        font-size: 0.9rem;
        white-space: nowrap;
      }
    }
  }

  .report-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    margin: 2rem;
    width: 100%;
    box-sizing: border-box;

    .report-tables {
      width: 100%;
      max-width: 100%;
      overflow-x: visible;

      .each-table {
        margin-bottom: 2rem;
        width: 100%;
        page-break-inside: avoid;

        h4 {
          margin-bottom: 0.5rem;
          color: #2f4f4f;
          font-size: 1.2rem;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 1rem;

          &::-webkit-scrollbar {
            height: 6px;
          }

          &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }

        table {
          width: 100%;
          min-width: 700px;
          border-collapse: collapse;
          table-layout: auto;

          th,
          td {
            border: 1px solid #ddd;
            padding: 0.5rem 0.8rem;
            text-align: left;
            vertical-align: top;
            word-wrap: break-word;
            word-break: break-word;
            hyphens: auto;
            font-size: 0.85rem;
            line-height: 1.3;
          }

          th {
            background-color: #4caf50;
            color: white;
            font-weight: bold;
            white-space: nowrap;
            position: sticky;
            top: 0;
          }

          td {
            min-width: 80px;
          }

          td:nth-child(1),
          th:nth-child(1) {
            min-width: 100px;
            max-width: 100px;
          }

          td:nth-child(2),
          th:nth-child(2) {
            min-width: 80px;
            max-width: 120px;
          }

          td:nth-child(3),
          th:nth-child(3) {
            min-width: 70px;
            max-width: 120px;
          }

          td:nth-child(4),
          th:nth-child(4) {
            min-width: 110px;
            max-width: 210px;
          }

          td:nth-child(5),
          th:nth-child(5) {
            min-width: 150px;
            max-width: 200px;
            text-align: right;
            white-space: nowrap;
          }

          tr:nth-child(even) {
            background-color: #f9f9f9;
          }

          tr:hover {
            background-color: #f1f1f1;
          }
        }
      }
    }
  }

  /* PDF-specific styles */
  @media print {
    width: 100% !important;
    max-width: none !important;
    font-size: 11pt !important;

    .report-container {
      margin: 0;
      padding: 0;

      .report-tables {
        .each-table {
          .table-wrapper {
            overflow-x: visible !important;
            border: none;
            box-shadow: none !important;

            table {
              min-width: 100% !important;
              width: 100% !important;
              table-layout: fixed !important;

              th,
              td {
                font-size: 9pt !important;
                padding: 4px 6px !important;
                page-break-inside: avoid;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
              }

              th:nth-child(1),
              td:nth-child(1) {
                width: 15% !important;
                max-width: 15% !important;
              }

              th:nth-child(2),
              td:nth-child(2) {
                width: 10% !important;
                max-width: 10% !important;
              }

              th:nth-child(3),
              td:nth-child(3) {
                width: 10% !important;
                max-width: 10% !important;
              }

              th:nth-child(4),
              td:nth-child(4) {
                width: 30% !important;
                max-width: 30% !important;
              }

              th:nth-child(5),
              td:nth-child(5) {
                width: 40% !important;
                max-width: 40% !important;
                text-align: left !important;
                white-space: nowrap !important;
                font-weight: bold !important;
              }
            }
          }
        }
      }
    }

    /* Force page breaks between major sections */
    .each-table {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    /* Prevent rows from breaking across pages */
    table tr {
      page-break-inside: avoid;
    }

    /* Hide scrollbars in print */
    .table-wrapper::-webkit-scrollbar {
      display: none !important;
    }
  }
`;

function ReportItem() {
  const { userData, incomes, expenses, budgets, balance } =
    useContext(AppContent);

  const reportRef = useRef(null);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Helper function to determine if a transaction is income
  const isIncome = (transaction) => {
    return (
      incomes.some((inc) => inc._id === transaction._id) ||
      transaction.type === "income" ||
      (transaction.type === undefined && incomes.includes(transaction))
    );
  };

  return (
    <div ref={reportRef}>
      <ReportItemStyled>
        <h3>Financial Report</h3>

        <div className="details">
          <div className="user-details">
            <p>
              <strong>Name:</strong>{" "}
              {userData ? `${userData.firstName} ${userData.surname}` : "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userData?.email || "N/A"}
            </p>
            <p>
              <strong>Generated:</strong> {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="report-container">
          <div className="report-tables">
            {/* Financial Summary */}
            <div className="each-table">
              <h4>Financial Summary</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Account Summary</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Income</td>
                      <td style={{ color: "green", fontWeight: "bold" }}>
                        NGN {totalIncome.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Expenses</td>
                      <td style={{ color: "red", fontWeight: "bold" }}>
                        NGN {totalExpense.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Balance</td>
                      <td
                        style={{
                          color: balance() >= 0 ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        NGN {balance().toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Transactions</td>
                      <td>{incomes.length + expenses.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expense Category Summary */}
            <div className="each-table">
              <h4>Expenses Breakdown</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Total Spent (NGN) </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Transport",
                      "Food",
                      "Health",
                      "Airtime",
                      "Data",
                      "Shopping",
                      "Rent",
                      "School",
                      "Other",
                    ].map((cat) => {
                      const spent = expenses
                        .filter(
                          (e) => e.category.toLowerCase() === cat.toLowerCase()
                        )
                        .reduce((sum, e) => sum + e.amount, 0);

                      return (
                        <tr key={cat}>
                          <td>{cat}</td>
                          <td style={{ color: "red" }}>
                            {spent.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="each-table">
              <h4>Budget Summary</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Limit (NGN) </th>
                      <th>Spent (NGN) </th>
                      <th>Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets.map((b) => {
                      const spent = expenses
                        .filter(
                          (e) =>
                            e.category.toLowerCase() ===
                            b.category.toLowerCase()
                        )
                        .reduce((sum, e) => sum + e.amount, 0);

                      const usage = ((spent / b.amount) * 100).toFixed(2);
                      const usageColor = spent > b.amount ? "red" : "orange";

                      return (
                        <tr key={b._id}>
                          <td>{b.category}</td>
                          <td> {b.amount.toLocaleString()}</td>
                          <td style={{ color: "red" }}>
                            {spent.toLocaleString()}
                          </td>
                          <td style={{ color: usageColor, fontWeight: "bold" }}>
                            {usage}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transaction History */}
            <div className="each-table">
              <h4>Transaction History</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th style={{ textAlign: "left" }}>Amount (NGN) </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...incomes, ...expenses]
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((t) => {
                        const income = isIncome(t);
                        const transactionColor = income ? "green" : "red";
                        const prefix = income ? "+" : "-";

                        return (
                          <tr key={t._id}>
                            <td>
                              {new Date(t.createdAt).toLocaleDateString()}
                            </td>
                            <td
                              style={{
                                color: transactionColor,
                                fontWeight: "bold",
                              }}
                            >
                              {income ? "Income" : "Expense"}
                            </td>
                            <td>{t.category}</td>
                            <td>{t.description}</td>
                            <td
                              style={{
                                color: transactionColor,
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              {prefix} {t.amount.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ReportItemStyled>
    </div>
  );
}

export default ReportItem;
