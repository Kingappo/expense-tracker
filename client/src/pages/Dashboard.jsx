import React, { useContext } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import { InnerLayOut } from "../styles/Layout";
import { AppContent } from "../context/AppContext";
import { naira } from "../utils/icon";
import History from "../components/history/History";
import html2pdf from "html2pdf.js";
import ReportItem from "../incomeItem/ReportItem";
import { useNavigate } from "react-router-dom";

const DashboardStyled = styled.div`
  .report {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;

    h1 {
      font-size: 1.8rem;
      margin: 0;
      flex: 1;
      min-width: 200px;
    }

    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      padding: 0.8rem 1.6rem;
      border-radius: 30px;
      background: #f56692;
      color: #fff;
      border: none;
      font-size: inherit;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      z-index: 1000;

      &:hover:not(:disabled) {
        background: green !important;
        transform: translateY(-2px);
      }

      &:disabled {
        background: #ccc !important;
        cursor: not-allowed;
        transform: none;
      }
    }
  }

  .trans-navigate {
    position: relative;

    &:hover .dropdown {
      display: block;
    }

    .trans-options {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;
      padding: 8px 16px;
      border: 2px solid #222260;
      border-radius: 30px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      font-weight: 500;
      background: white;
      white-space: nowrap;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      list-style: none;
      padding: 0.5rem 0;
      min-width: 180px;
      display: none;
      z-index: 1002;

      li {
        padding: 0.5rem 1rem;
        font-size: 14px;
        font-weight: 500;
        color: #222;
        transition: background 0.2s ease;
        cursor: pointer;

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }

  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .chart-con {
    grid-column: 1 / 4;
    height: 400px;
    min-height: 300px;
    position: relative;
    width: 100%;
    overflow: hidden; // Add this
  }

  .history-con {
    grid-column: 4 / -1;
  }

  .amount-con {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;

    .income,
    .expense,
    .balance {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(11, 10, 10, 0.06);
      padding: 1.5rem 1rem;
      border-radius: 20px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h2 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: #333;
      }

      p {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }
    }
  }

  .report-hidden {
    position: absolute;
    top: -9999px;
    left: -9999px;
    visibility: hidden;
    width: 210mm;
    padding: 1rem;
  }

  @media (max-width: 1200px) {
    .stats-con {
      gap: 1.5rem;
    }
    .amount-con {
      gap: 1.2rem;
      .income,
      .expense,
      .balance {
        padding: 1.2rem 0.8rem;
        p {
          font-size: 1.8rem;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .stats-con {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .chart-con {
      grid-column: 1 / -1;
      height: 350px;
      min-height: 350px;
    }

    .history-con {
      grid-column: 1 / -1;
    }
    .amount-con {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      .income,
      .expense,
      .balance {
        padding: 1rem 0.5rem;
        h2 {
          font-size: 1rem;
        }
        p {
          font-size: 1.6rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .report {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
      gap: 1rem;
      padding-bottom: 1rem;
      position: relative;

      h1 {
        font-size: 1.6rem;
        order: 1;
        width: 100%;
      }

      .trans-navigate {
        order: 2;
        width: 100%;
        max-width: 200px;
        margin: 0 auto;

        .trans-options {
          padding: 6px 12px;
          font-size: 0.9rem;
        }
      }

      button {
        order: 3;
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        padding: 0.7rem 1.4rem;
        font-size: 0.9rem;
      }
    }

    .stats-con {
      gap: 1.5rem;
    }

    .chart-con {
      height: 320px;
      min-height: 320px;
      margin-top: 0.5rem;
    }

    .amount-con {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 1.5rem;

      .income,
      .expense,
      .balance {
        padding: 1.5rem 1rem;
        h2 {
          font-size: 1.1rem;
        }
        p {
          font-size: 2rem;
        }
      }
    }
  }

  @media (max-width: 576px) {
    .report {
      padding-bottom: 0.8rem;

      h1 {
        font-size: 1.4rem;
      }

      .trans-navigate {
        .trans-options {
          padding: 5px 10px;
          font-size: 0.85rem;
        }
      }

      button {
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
      }
    }

    .stats-con {
      gap: 1rem;
    }

    .chart-con {
      height: 280px;
      min-height: 280px;
    }

    .amount-con {
      gap: 0.8rem;

      .income,
      .expense,
      .balance {
        padding: 1.2rem 0.8rem;
        h2 {
          font-size: 1rem;
          margin-bottom: 0.8rem;
        }
        p {
          font-size: 1.7rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .report {
      gap: 0.8rem;

      h1 {
        font-size: 1.3rem;
      }
    }

    .chart-con {
      height: 250px;
      min-height: 250px;
    }

    .amount-con {
      .income,
      .expense,
      .balance {
        padding: 1rem 0.5rem;
        h2 {
          font-size: 0.9rem;
        }
        p {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 400px) {
    .chart-con {
      height: 230px;
      min-height: 230px;
    }

    .amount-con {
      .income,
      .expense,
      .balance {
        padding: 0.8rem 0.5rem;
        h2 {
          font-size: 0.85rem;
        }
        p {
          font-size: 1.4rem;
        }
      }
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .chart-con {
      height: 200px;
      min-height: 200px;
    }

    .amount-con {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.8rem;

      .income,
      .expense,
      .balance {
        padding: 0.8rem 0.5rem;
        h2 {
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 1.2rem;
        }
      }
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .trans-navigate .dropdown {
      display: none !important;
    }

    .trans-navigate:active .dropdown,
    .trans-navigate:focus .dropdown {
      display: block !important;
    }

    .income:hover,
    .expense:hover,
    .balance:hover {
      transform: none;
    }
  }
`;
function Dashboard() {
  const navigation = useNavigate();

  const { totalIncome, totalExpense, balance } = useContext(AppContent);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const generateReport = async () => {
    const element = document.getElementById("report-content");

    if (!element) {
      console.error("Report content not found!");
      return;
    }

    setIsDownloading(true);
    element.style.visibility = "visible";

    const opt = {
      margin: 0.5,
      filename: `Tracky Financial_Report_${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      element.style.visibility = "hidden";
      setIsDownloading(false);
    }
  };
  return (
    <DashboardStyled>
      <InnerLayOut>
        <div className="report">
          <h1>All Transactions</h1>
          <div className="trans-navigate">
            <h4 className="trans-options">Select Transaction</h4>
            <ul className="dropdown">
              <li onClick={() => navigation("/income")}>Add Income</li>
              <li onClick={() => navigation("/expenses")}>Add Expense</li>
              <li onClick={() => navigation("/budget")}>Add Budget</li>
            </ul>
          </div>
          <button onClick={generateReport} disabled={isDownloading}>
            {isDownloading ? "Downloading..." : "Generate Report"}
          </button>
        </div>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
          </div>
          <div className="history-con">
            <History />
          </div>
        </div>
        <div className="amount-con">
          <div className="income">
            <h2>Total Income</h2>
            <p style={{ color: "green" }}>
              {naira} {totalIncome()}
            </p>
          </div>
          <div className="expense">
            <h2>Total Expenses</h2>
            <p style={{ color: "red" }}>
              {naira} {totalExpense()}
            </p>
          </div>
          <div className="balance">
            <h2>Total Balance</h2>
            <p style={{ color: "#222260" }}>
              {naira} {balance()}
            </p>
          </div>
        </div>
        <div id="report-content" className="report-hidden">
          <ReportItem />
        </div>
      </InnerLayOut>
    </DashboardStyled>
  );
}

export default Dashboard;
