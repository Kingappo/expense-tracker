import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  airtime,
  business,
  calender,
  comment,
  data,
  farming,
  food,
  freelance,
  gift,
  medical,
  money,
  naira,
  piggy,
  rent,
  school,
  shopping,
  stocks,
  transport,
  trash,
} from "../utils/icon";
import { dateFormat, timeFormat } from "../utils/dateFormat";

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: ${(props) => (props.isMainHistory ? "1rem 1.2rem" : "1rem")};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isMainHistory ? "2rem" : "1rem")};
  width: 100%;
  color: #222260;
  flex-shrink: 0;

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    flex-shrink: 0;

    i {
      font-size: 1.8rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;

    h5 {
      font-size: 1.1rem;
      padding-left: 1.5rem;
      position: relative;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 0.5rem;

      .text {
        display: flex;
        align-items: center;
        gap: ${(props) => (props.isMainHistory ? "2rem" : "1rem")};
        flex: 1;
        flex-wrap: nowrap;
        overflow: hidden;
      }

      p {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        opacity: 0.8;
        margin: 0;
        font-size: 0.9rem;
        white-space: nowrap;
        flex-shrink: 0;
      }
      span {
        font-size: 0.7rem;
      }

      .btn-con {
        margin-left: 0.5rem;
        cursor: pointer;
        transition: transform 0.2s ease;
        flex-shrink: 0;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: ${(props) => (props.isMainHistory ? "0.8rem 1rem" : "0.8rem")};
    gap: ${(props) => (props.isMainHistory ? "1.5rem" : "0.8rem")};
    margin-bottom: 1rem;

    .icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;

      i {
        font-size: 1.5rem;
      }
    }

    .content {
      h5 {
        font-size: 1rem;
        padding-left: 1.2rem;
      }

      .inner-content {
        .text {
          gap: ${(props) => (props.isMainHistory ? "1.5rem" : "0.8rem")};
        }

        p {
          font-size: 0.85rem;
          gap: 0.2rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    padding: 0.7rem;
    gap: 0.7rem;
    text-align: left;
    min-width: 180%;
    margin-bottom: 1rem;

    .icon {
      width: 45px;
      height: 45px;
      margin: 0;
      border-radius: 10px;

      i {
        font-size: 1.3rem;
      }
    }

    .content {
      gap: 0.4rem;
      min-width: 200px;

      h5 {
        padding-left: 1.2rem;
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;

        &::before {
          display: block;
        }
      }

      .inner-content {
        flex-wrap: nowrap;
        gap: 0.5rem;

        .text {
          flex-direction: row;
          gap: 0.8rem;
          align-items: center;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 2px;

          /* Hide scrollbar but keep functionality */
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
        }

        p {
          justify-content: flex-start;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .btn-con {
          margin-left: 0.5rem;
          margin-top: 0;
          flex-shrink: 0;
        }
      }
    }
  }

  @media (max-width: 360px) {
    padding: 0.6rem;
    gap: 0.6rem;

    .icon {
      width: 40px;
      height: 40px;

      i {
        font-size: 1.2rem;
      }
    }

    .content {
      h5 {
        font-size: 0.85rem;
        padding-left: 1rem;
      }

      .inner-content {
        p {
          font-size: 0.75rem;
        }

        .text {
          gap: 0.6rem;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .icon {
      width: 80px;
      height: 80px;
      border-radius: 20px;

      i {
        font-size: 2.5rem;
      }
    }

    .content {
      h5 {
        font-size: 1.3rem;
      }

      .inner-content {
        .text {
          gap: ${(props) => (props.isMainHistory ? "3rem" : "1.5rem")};
        }

        p {
          font-size: 1rem;
          gap: 0.5rem;
        }
      }
    }
  }
`;

const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  type,
  deleteItem,
  indicatorColor,
  showDelete = true,
  isMainHistory = false,
}) => {
  const incomeCategory = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelance":
        return freelance;
      case "investment":
        return stocks;
      case "farming":
        return farming;
      case "business":
        return business;
      case "gift":
        return gift;
      case "others":
        return piggy;
      default:
        return piggy;
    }
  };

  const expenseCategory = () => {
    switch (category) {
      case "food":
        return food;
      case "transport":
        return transport;
      case "health":
        return medical;
      case "rent":
        return rent;
      case "school":
        return school;
      case "airtime":
        return airtime;
      case "data":
        return data;
      case "gift":
        return gift;
      case "shopping":
        return shopping;
      case "others":
        return piggy;
      default:
        return piggy;
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#008000",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#fcf6f9",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
        Swal.fire({
          title: "Deleted!",
          text: "The record has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <IncomeItemStyled indicator={indicatorColor} isMainHistory={isMainHistory}>
      <div className="icon">
        {type === "expense" ? expenseCategory() : incomeCategory()}
      </div>

      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {naira} {amount}
            </p>

            <p>
              {calender} {dateFormat(date)} <span>at {timeFormat(date)} </span>
            </p>
            <p>
              {comment} {description}
            </p>
          </div>

          {showDelete && (
            <div className="btn-con" onClick={handleDelete}>
              {trash}
            </div>
          )}
        </div>
      </div>
    </IncomeItemStyled>
  );
};

export default IncomeItem;
