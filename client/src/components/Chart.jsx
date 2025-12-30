import React, { useContext, useMemo, useEffect, useState, useRef } from "react";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { AppContent } from "../context/AppContext";
import { dateFormat } from "../utils/dateFormat";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(11, 10, 10, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  position: relative;

  .empty-msg {
    text-align: center;
    color: #999;
    font-style: italic;
    font-size: 15px;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    min-height: 250px;

    .empty-msg {
      font-size: 14px;
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    min-height: 200px;

    .empty-msg {
      font-size: 13px;
      padding: 1rem;
    }
  }
`;

const Chart = () => {
  const { incomes, expenses } = useContext(AppContent);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isChartReady, setIsChartReady] = useState(false);
  const chartRef = useRef(null);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Set chart as ready after a short delay to ensure container is rendered
    const timer = setTimeout(() => {
      setIsChartReady(true);
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Force chart update when window width changes
  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.resize();
      chartRef.current.chartInstance.update();
    }
  }, [windowWidth]);

  // Calculate date range for last 7 days
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(dateFormat(date));
    }
    return dates;
  };

  // Filter incomes and expenses for the last 7 days
  const filterLast7DaysData = useMemo(() => {
    const last7Days = getLast7Days();

    // Filter incomes from the last 7 days
    const filteredIncomes = incomes.filter((income) => {
      const incomeDate = dateFormat(income.date);
      return last7Days.includes(incomeDate);
    });

    // Filter expenses from the last 7 days
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = dateFormat(expense.date);
      return last7Days.includes(expenseDate);
    });

    return { filteredIncomes, filteredExpenses, last7Days };
  }, [incomes, expenses]);

  const { filteredIncomes, filteredExpenses, last7Days } = filterLast7DaysData;

  // Check if there's any data in the last 7 days
  const hasData = filteredIncomes.length > 0 || filteredExpenses.length > 0;

  // Calculate totals for each of the last 7 days
  const incomeData = last7Days.map((date) => {
    return filteredIncomes
      .filter((income) => dateFormat(income.date) === date)
      .reduce((sum, income) => sum + income.amount, 0);
  });

  const expenseData = last7Days.map((date) => {
    return filteredExpenses
      .filter((expense) => dateFormat(expense.date) === date)
      .reduce((sum, expense) => sum + expense.amount, 0);
  });

  // Create chart options dynamically based on window width
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: windowWidth < 768 ? 10 : 12,
            padding: windowWidth < 768 ? 8 : 10,
            font: {
              size: windowWidth < 768 ? 11 : 12,
            },
          },
        },
        title: {
          display: true,
          text: "Last 7 Days: Income vs Expenses",
          font: {
            size: windowWidth < 768 ? 14 : 16,
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#333",
          bodyColor: "#333",
          borderColor: "#ddd",
          borderWidth: 1,
          padding: windowWidth < 480 ? 8 : 10,
          cornerRadius: 6,
          displayColors: false,
          titleFont: {
            size: windowWidth < 480 ? 11 : 12,
          },
          bodyFont: {
            size: windowWidth < 480 ? 11 : 12,
          },
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                if (windowWidth < 480) {
                  label += `₦${context.parsed.y.toLocaleString("en-US")}`;
                } else {
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "NGN",
                  }).format(context.parsed.y);
                }
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            maxTicksLimit: windowWidth < 480 ? 4 : 5,
            font: {
              size: windowWidth < 480 ? 10 : 11,
            },
            callback: function (value) {
              if (windowWidth < 480) {
                if (value >= 1000000)
                  return `₦${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
                return `₦${value}`;
              }
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
              }).format(value);
            },
          },
          title: {
            display: windowWidth > 480,
            text: "Amount (₦)",
            font: {
              size: windowWidth < 768 ? 11 : 12,
            },
          },
        },
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            maxRotation: windowWidth < 768 ? 45 : 0,
            font: {
              size: windowWidth < 480 ? 9 : 10,
            },
            maxTicksLimit: 7,
            callback: function (value, index) {
              const label = this.getLabelForValue(value);
              if (windowWidth < 480) {
                const date = new Date(label);
                const options =
                  windowWidth < 360
                    ? { weekday: "short" }
                    : { month: "short", day: "numeric" };
                return date.toLocaleDateString("en-US", options);
              }
              return label;
            },
          },
          title: {
            display: windowWidth > 768,
            text: "Date",
            font: {
              size: windowWidth < 768 ? 11 : 12,
            },
          },
        },
      },
      elements: {
        point: {
          radius: windowWidth < 768 ? 3 : 4,
          hoverRadius: windowWidth < 768 ? 5 : 7,
        },
        line: {
          tension: 0.3,
          borderWidth: windowWidth < 768 ? 2 : 2.5,
        },
      },
    }),
    [windowWidth]
  );

  // Chart data
  const chartData = useMemo(
    () => ({
      labels: last7Days,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "green",
          backgroundColor: "rgba(0,128,0,0.4)",
          tension: 0.3,
          fill: false,
          pointRadius: windowWidth < 768 ? 4 : 5,
          pointHoverRadius: windowWidth < 768 ? 6 : 8,
        },
        {
          label: "Expenses",
          data: expenseData,
          borderColor: "red",
          backgroundColor: "rgba(255,0,0,0.4)",
          tension: 0.3,
          fill: false,
          pointRadius: windowWidth < 768 ? 4 : 5,
          pointHoverRadius: windowWidth < 768 ? 6 : 8,
        },
      ],
    }),
    [last7Days, incomeData, expenseData, windowWidth]
  );

  return (
    <ChartStyled>
      {hasData && isChartReady ? (
        <Line
          ref={chartRef}
          data={chartData}
          options={chartOptions}
          redraw={true}
        />
      ) : hasData ? (
        // Show loading state while chart initializes
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading chart...
        </div>
      ) : (
        <p className="empty-msg">
          No income or expenses recorded in the last 7 days
        </p>
      )}
    </ChartStyled>
  );
};

export default Chart;
