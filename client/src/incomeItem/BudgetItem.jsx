import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  airtime,
  data,
  food,
  medical,
  naira,
  piggy,
  rent,
  school,
  transport,
  trash,
} from "../utils/icon";

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    flex-shrink: 0;

    i {
      font-size: 2.5rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
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
      flex-wrap: wrap;
      gap: 0.5rem;

      .text {
        display: flex;
        align-items: center;
        gap: ${(props) => (props.isMainHistory ? "3rem" : "1.5rem")};
        flex: 1;
        flex-wrap: wrap;
        .am {
          color: #242451;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        .month {
          padding: 0.1rem 0.8rem;
          border-radius: 30px;
          border: 1px solid #242451;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
      }

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.8;
        margin: 0;
        font-size: 1rem;
        white-space: nowrap;
      }

      .btn-con {
        margin-left: 1rem;
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
      width: 60px;
      height: 60px;
      border-radius: 15px;

      i {
        font-size: 1.8rem;
      }
    }

    .content {
      h5 {
        font-size: 1.1rem;
        padding-left: 1.5rem;
      }

      .inner-content {
        .text {
          gap: ${(props) => (props.isMainHistory ? "2rem" : "1rem")};
        }

        p {
          font-size: 0.9rem;
          gap: 0.3rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    padding: 0.7rem;
    gap: 0.7rem;
    margin-bottom: 1rem;
    width: 130%;

    .icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;

      i {
        font-size: 1.5rem;
      }
    }

    .content {
      gap: 0.3rem;

      h5 {
        font-size: 1rem;
        padding-left: 1.2rem;
        white-space: normal;
      }

      .inner-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        .text {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.3rem;
          width: 100%;
        }

        p {
          font-size: 0.85rem;
          justify-content: flex-start;
        }

        .btn-con {
          margin-left: 0;
          align-self: flex-end;
          margin-top: 0.3rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    padding: 0.6rem;
    gap: 0.6rem;

    .icon {
      width: 45px;
      height: 45px;

      i {
        font-size: 1.3rem;
      }
    }

    .content {
      h5 {
        font-size: 0.9rem;
        padding-left: 1rem;
      }

      .inner-content {
        p {
          font-size: 0.8rem;
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

const BudgetItem = ({
  id,
  amount,
  title,
  category,
  month,
  deleteItem,
  indicatorColor,
  showDelete = true,
  isMainHistory = false,
}) => {
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
      case "airtime":
        return airtime;
      case "data":
        return data;
      case "school":
        return school;
      case "other":
        return piggy;
      default:
        return piggy;
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
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
          text: "The budget has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <IncomeItemStyled indicator={indicatorColor} isMainHistory={isMainHistory}>
      <div className="icon">{expenseCategory()}</div>

      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p className="am">
              {naira} {amount}
            </p>
            <p className="month">{month}</p>
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

export default BudgetItem;
