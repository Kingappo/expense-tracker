// import React, { useContext } from "react";
// import styled from "styled-components";
// import { AppContent } from "../../context/AppContext";
// import { dateFormat, timeFormat } from "../../utils/dateFormat";
// import { useNavigate } from "react-router-dom";

// const HistoryStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   height: 100%;

//   h2 {
//     color: #222260;
//     margin: 0 0 0.5rem 0;
//     font-size: 1.5rem;
//     font-weight: 700;
//   }

//   .history-content {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//   }

//   .history-items {
//     display: flex;
//     flex-direction: column;
//     gap: 0.8rem;
//     flex: 1;
//   }

//   .history-item {
//     background: #fcf6f9;
//     border: 2px solid #ffffff;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     display: flex;
//     flex-direction: column;
//     transition: all 0.3s ease;
//     cursor: pointer;

//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//     }

//     .first-div {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 1rem;
//     }

//     .title {
//       font-weight: 600;
//       flex: 1;
//       word-break: break-word;
//       line-height: 1.3;
//     }

//     .amount {
//       font-weight: 600;
//       white-space: nowrap;
//       flex-shrink: 0;
//     }

//     .date {
//       margin-top: 0.5rem;
//       font-size: 0.8rem;
//       color: #666;
//       line-height: 1.3;
//     }
//   }

//   .empty-msg {
//     text-align: center;
//     color: #999;
//     font-style: italic;
//     margin: 2rem 0;
//     padding: 1rem;
//     background: #f8f9fa;
//     border-radius: 12px;
//     font-size: 1rem;
//   }

//   .view-more-btn {
//     align-self: center;
//     background: #2e7d32;
//     color: white;
//     border: none;
//     padding: 0.8rem 1.5rem;
//     border-radius: 25px;
//     font-size: 0.95rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     margin-top: auto;
//     width: fit-content;
//     min-width: 140px;

//     &:hover {
//       background: #256528;
//       transform: translateY(-2px);
//       box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
//     }

//     &:active {
//       transform: translateY(0);
//     }
//   }

//   @media (max-width: 1200px) {
//     gap: 0.8rem;

//     h2 {
//       font-size: 1.4rem;
//     }

//     .history-items {
//       gap: 0.7rem;
//     }

//     .history-item {
//       padding: 0.9rem;
//       border-radius: 18px;
//     }
//   }

//   @media (max-width: 992px) {
//     h2 {
//       font-size: 1.3rem;
//     }

//     .history-item {
//       padding: 0.8rem;
//       border-radius: 16px;

//       .first-div {
//         gap: 0.8rem;
//       }

//       .date {
//         font-size: 0.75rem;
//       }
//     }

//     .view-more-btn {
//       padding: 0.7rem 1.3rem;
//       font-size: 0.9rem;
//     }
//   }

//   @media (max-width: 768px) {
//     gap: 0.7rem;

//     h2 {
//       font-size: 1.2rem;
//       margin-bottom: 0.3rem;
//     }

//     .history-content {
//       gap: 0.8rem;
//     }

//     .history-items {
//       gap: 0.6rem;
//     }

//     .history-item {
//       padding: 0.7rem;
//       border-radius: 14px;

//       .first-div {
//         flex-direction: column;
//         gap: 0.3rem;
//         align-items: stretch;
//       }

//       .title {
//         font-size: 0.95rem;
//       }

//       .amount {
//         font-size: 1rem;
//         align-self: flex-end;
//       }

//       .date {
//         margin-top: 0.4rem;
//         font-size: 0.7rem;
//       }
//     }

//     .empty-msg {
//       margin: 1.5rem 0;
//       padding: 0.8rem;
//       font-size: 0.9rem;
//     }

//     .view-more-btn {
//       padding: 0.6rem 1.2rem;
//       font-size: 0.85rem;
//       min-width: 120px;
//     }
//   }

//   @media (max-width: 576px) {
//     gap: 0.6rem;

//     h2 {
//       font-size: 1.1rem;
//     }

//     .history-items {
//       gap: 0.5rem;
//     }

//     .history-item {
//       padding: 0.6rem;
//       border-radius: 12px;

//       .title {
//         font-size: 0.9rem;
//       }

//       .amount {
//         font-size: 0.95rem;
//       }

//       .date {
//         font-size: 0.65rem;
//       }
//     }

//     .empty-msg {
//       margin: 1rem 0;
//       padding: 0.7rem;
//       font-size: 0.85rem;
//     }

//     .view-more-btn {
//       padding: 0.5rem 1rem;
//       font-size: 0.8rem;
//       min-width: 110px;
//     }
//   }

//   @media (max-width: 480px) {
//     .history-item {
//       padding: 0.5rem;

//       .first-div {
//         gap: 0.2rem;
//       }

//       .title {
//         font-size: 0.85rem;
//       }

//       .amount {
//         font-size: 0.9rem;
//       }

//       .date {
//         font-size: 0.6rem;
//       }
//     }

//     .empty-msg {
//       font-size: 0.8rem;
//       padding: 0.6rem;
//     }
//   }

//   @media (max-width: 360px) {
//     .history-item {
//       .title {
//         font-size: 0.8rem;
//       }

//       .amount {
//         font-size: 0.85rem;
//       }
//     }

//     .view-more-btn {
//       padding: 0.4rem 0.8rem;
//       font-size: 0.75rem;
//       min-width: 100px;
//     }
//   }

//   @media (max-height: 500px) and (orientation: landscape) {
//     .history-items {
//       gap: 0.4rem;
//     }

//     .history-item {
//       padding: 0.5rem 0.6rem;

//       .first-div {
//         flex-direction: row;
//         align-items: center;
//       }

//       .date {
//         margin-top: 0.2rem;
//         font-size: 0.6rem;
//       }
//     }

//     .empty-msg {
//       margin: 1rem 0;
//       padding: 0.5rem;
//     }
//   }

//   @media print {
//     .view-more-btn {
//       display: none;
//     }

//     .history-item {
//       break-inside: avoid;
//       border: 1px solid #ddd;
//       box-shadow: none;
//     }
//   }
// `;

// function History() {
//   const { transactionHistory } = useContext(AppContent);
//   const navigate = useNavigate();

//   const history = transactionHistory();

//   const handleViewMore = () => {
//     navigate("/transactions");
//   };

//   return (
//     <HistoryStyled>
//       <h2>Recent History</h2>

//       <div className="history-content">
//         {history.length === 0 ? (
//           <p className="empty-msg">No recent transaction history</p>
//         ) : (
//           <div className="history-items">
//             {history.map((item) => {
//               const { _id, title, amount, date, type } = item;
//               const textColor = type === "expense" ? "#e74c3c" : "#27ae60";

//               return (
//                 <div
//                   key={_id}
//                   className="history-item"
//                   onClick={() => handleItemClick(item)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyPress={(e) => e.key === "Enter" && handleItemClick(item)}
//                 >
//                   <div className="first-div">
//                     <p className="title" style={{ color: textColor }}>
//                       {title}
//                     </p>
//                     <p className="amount" style={{ color: textColor }}>
//                       {type === "expense" ? `-${amount}` : `+${amount}`}
//                     </p>
//                   </div>
//                   <p className="date">
//                     {dateFormat(date)} at {timeFormat(date)}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {history.length > 0 && (
//           <button className="view-more-btn" onClick={handleViewMore}>
//             View More
//           </button>
//         )}
//       </div>
//     </HistoryStyled>
//   );
// }

// export default History;

import React, { useContext } from "react";
import styled from "styled-components";
import { AppContent } from "../../context/AppContext";
import {
  dateFormat,
  timeFormat,
  hasTimeComponent,
} from "../../utils/dateFormat";
import { useNavigate } from "react-router-dom";

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;

  h2 {
    color: #222260;
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .history-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .history-items {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    flex: 1;
  }

  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .first-div {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .title {
      font-weight: 600;
      flex: 1;
      word-break: break-word;
      line-height: 1.3;
    }

    .amount {
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .date {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: #666;
      line-height: 1.3;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .time {
        font-style: italic;
        color: #888;

        &.no-time {
          color: #aaa;
        }
      }
    }
  }

  .empty-msg {
    text-align: center;
    color: #999;
    font-style: italic;
    margin: 2rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 12px;
    font-size: 1rem;
  }

  .view-more-btn {
    align-self: center;
    background: #2e7d32;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
    width: fit-content;
    min-width: 140px;

    &:hover {
      background: #256528;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 1200px) {
    gap: 0.8rem;

    h2 {
      font-size: 1.4rem;
    }

    .history-items {
      gap: 0.7rem;
    }

    .history-item {
      padding: 0.9rem;
      border-radius: 18px;
    }
  }

  @media (max-width: 992px) {
    h2 {
      font-size: 1.3rem;
    }

    .history-item {
      padding: 0.8rem;
      border-radius: 16px;

      .first-div {
        gap: 0.8rem;
      }

      .date {
        font-size: 0.75rem;
      }
    }

    .view-more-btn {
      padding: 0.7rem 1.3rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    gap: 0.7rem;

    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }

    .history-content {
      gap: 0.8rem;
    }

    .history-items {
      gap: 0.6rem;
    }

    .history-item {
      padding: 0.7rem;
      border-radius: 14px;

      .first-div {
        flex-direction: column;
        gap: 0.3rem;
        align-items: stretch;
      }

      .title {
        font-size: 0.95rem;
      }

      .amount {
        font-size: 1rem;
        align-self: flex-end;
      }

      .date {
        margin-top: 0.4rem;
        font-size: 0.7rem;
      }
    }

    .empty-msg {
      margin: 1.5rem 0;
      padding: 0.8rem;
      font-size: 0.9rem;
    }

    .view-more-btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.85rem;
      min-width: 120px;
    }
  }

  @media (max-width: 576px) {
    gap: 0.6rem;

    h2 {
      font-size: 1.1rem;
    }

    .history-items {
      gap: 0.5rem;
    }

    .history-item {
      padding: 0.6rem;
      border-radius: 12px;

      .title {
        font-size: 0.9rem;
      }

      .amount {
        font-size: 0.95rem;
      }

      .date {
        font-size: 0.65rem;
      }
    }

    .empty-msg {
      margin: 1rem 0;
      padding: 0.7rem;
      font-size: 0.85rem;
    }

    .view-more-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      min-width: 110px;
    }
  }

  @media (max-width: 480px) {
    .history-item {
      padding: 0.5rem;

      .first-div {
        gap: 0.2rem;
      }

      .title {
        font-size: 0.85rem;
      }

      .amount {
        font-size: 0.9rem;
      }

      .date {
        font-size: 0.6rem;
      }
    }

    .empty-msg {
      font-size: 0.8rem;
      padding: 0.6rem;
    }
  }

  @media (max-width: 360px) {
    .history-item {
      .title {
        font-size: 0.8rem;
      }

      .amount {
        font-size: 0.85rem;
      }
    }

    .view-more-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.75rem;
      min-width: 100px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .history-items {
      gap: 0.4rem;
    }

    .history-item {
      padding: 0.5rem 0.6rem;

      .first-div {
        flex-direction: row;
        align-items: center;
      }

      .date {
        margin-top: 0.2rem;
        font-size: 0.6rem;
      }
    }

    .empty-msg {
      margin: 1rem 0;
      padding: 0.5rem;
    }
  }

  @media print {
    .view-more-btn {
      display: none;
    }

    .history-item {
      break-inside: avoid;
      border: 1px solid #ddd;
      box-shadow: none;
    }
  }
`;

// function History() {
//   const { transactionHistory } = useContext(AppContent);
//   const navigate = useNavigate();

//   const history = transactionHistory();

//   const handleItemClick = (item) => {
//     console.log("Clicked item:", item);
//     // You can navigate to transaction details or show modal
//   };

//   const handleViewMore = () => {
//     navigate("/transactions");
//   };

//   return (
//     <HistoryStyled>
//       <h2>Recent History</h2>

//       <div className="history-content">
//         {history.length === 0 ? (
//           <p className="empty-msg">No recent transaction history</p>
//         ) : (
//           <div className="history-items">
//             {history.map((item) => {
//               const { _id, title, amount, date, type } = item;
//               const textColor = type === "expense" ? "#e74c3c" : "#27ae60";
//               const formattedDate = dateFormat(date);
//               const formattedTime = timeFormat(date);

//               return (
//                 <div
//                   key={_id}
//                   className="history-item"
//                   onClick={() => handleItemClick(item)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyPress={(e) => e.key === "Enter" && handleItemClick(item)}
//                 >
//                   <div className="first-div">
//                     <p className="title" style={{ color: textColor }}>
//                       {title}
//                     </p>
//                     <p className="amount" style={{ color: textColor }}>
//                       {type === "expense" ? `-${amount}` : `+${amount}`}
//                     </p>
//                   </div>

//                   <div className="date">
//                     <span>{formattedDate}</span>
//                     <span className="time">at {formattedTime}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {history.length > 0 && (
//           <button className="view-more-btn" onClick={handleViewMore}>
//             View More
//           </button>
//         )}
//       </div>
//     </HistoryStyled>
//   );
// }

function History() {
  const { transactionHistory } = useContext(AppContent);
  const navigate = useNavigate();

  const history = transactionHistory();

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    // You can navigate to transaction details or show modal
  };

  const handleViewMore = () => {
    navigate("/transactions");
  };

  return (
    <HistoryStyled>
      <h2>Recent History</h2>

      <div className="history-content">
        {history.length === 0 ? (
          <p className="empty-msg">No recent transaction history</p>
        ) : (
          <div className="history-items">
            {history.map((item) => {
              const { _id, title, amount, date, type } = item;
              const textColor = type === "expense" ? "#e74c3c" : "#27ae60";
              const formattedDate = dateFormat(date);
              const hasTime = hasTimeComponent(date);
              const formattedTime = timeFormat(date);

              return (
                <div
                  key={_id}
                  className="history-item"
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && handleItemClick(item)}
                >
                  <div className="first-div">
                    <p className="title" style={{ color: textColor }}>
                      {title}
                    </p>
                    <p className="amount" style={{ color: textColor }}>
                      {type === "expense" ? `-${amount}` : `+${amount}`}
                    </p>
                  </div>

                  <div className="date">
                    <span>{formattedDate}</span>
                    {hasTime &&
                    formattedTime !== "No time" &&
                    formattedTime !== "Nos time" ? (
                      <span className="time">at {formattedTime}</span>
                    ) : (
                      <span className="time no-time">(No time)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {history.length > 0 && (
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        )}
      </div>
    </HistoryStyled>
  );
}

export default History;
