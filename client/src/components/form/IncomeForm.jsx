// import React, { useContext, useState } from "react";
// import styled from "styled-components";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AppContent } from "../../context/AppContext";
// import { plus } from "../../utils/icon";
// import Button from "../Button";

// const IncomeFormStyled = styled.div`
//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     .input-fields {
//       input,
//       select,
//       textarea {
//         font-family: inherit;
//         font-size: inherit;
//         outline: none;
//         padding: 0.3rem 1rem;
//         border-radius: 2px;
//         border: 2px solid #d4d1d1;
//         background: transparent;
//         resize: none;
//         box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.06);
//         color: rgba(34, 3, 96, 0.9);
//         &::placeholder {
//           color: rgba(34, 3, 96, 0.4);
//           font-size: 1rem;
//         }
//       }
//       input {
//         width: 100%;
//       }
//     }
//     .selects {
//       display: flex;
//       justify-content: flex-end;
//       margin-right: 2rem;
//       select {
//         color: rgba(34, 3, 96, 0.4);
//         &:focus,
//         &:active {
//           color: rgba(34, 3, 96, 1);
//         }
//       }
//     }
//     .submit-btn {
//       button {
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         &:hover {
//           background: green !important;
//         }
//       }
//     }
//   }
// `;

// const IncomeForm = ({ onFormSubmit }) => {
//   const { addIncome, getIncomes } = useContext(AppContent);

//   const [inputState, setInputState] = useState({
//     title: "",
//     amount: "",
//     date: "",
//     category: "",
//     description: "",
//   });

//   const { title, amount, date, category, description } = inputState;

//   const handleInput = (name) => (e) => {
//     setInputState({ ...inputState, [name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addIncome(inputState);
//     getIncomes();

//     setInputState({
//       title: "",
//       amount: "",
//       date: "",
//       category: "",
//       description: "",
//     });

//     if (onFormSubmit) {
//       onFormSubmit();
//     }
//   };

//   return (
//     <IncomeFormStyled>
//       <form onSubmit={handleSubmit}>
//         <p style={{ textAlign: "center", fontWeight: 900 }}>Add New Income</p>
//         <div className="input-fields">
//           <input
//             type="text"
//             placeholder="Income Title"
//             name={"title"}
//             value={title}
//             onChange={handleInput("title")}
//             required
//           />
//         </div>

//         <div className="input-fields">
//           <input
//             type="number"
//             placeholder="Income Amount"
//             name={"amount"}
//             value={amount}
//             onChange={handleInput("amount")}
//             required
//             min="0"
//             step="0.01"
//           />
//         </div>

//         <div className="input-fields">
//           <DatePicker
//             id="date"
//             placeholderText="Enter date"
//             selected={date}
//             dateFormat="dd/MM/yyyy"
//             onChange={(date) => {
//               setInputState({ ...inputState, date: date });
//             }}
//             required
//           />
//         </div>

//         <div className="selects input-fields">
//           <select
//             name="category"
//             id="category"
//             value={category}
//             required
//             onChange={handleInput("category")}
//           >
//             <option value="" disabled>
//               Select Category
//             </option>
//             <option value="salary">Salary</option>
//             <option value="business">Business</option>
//             <option value="gift">Gift</option>
//             <option value="investment">Investment</option>
//             <option value="freelance">Freelance</option>
//             <option value="farming">Farming</option>
//             <option value="others">Others</option>
//           </select>
//         </div>

//         <div className="input-fields">
//           <textarea
//             name="description"
//             id="description"
//             value={description}
//             rows="4"
//             cols="30"
//             onChange={handleInput("description")}
//             placeholder="Description"
//           ></textarea>
//         </div>

//         <div className="submit-btn">
//           <Button
//             name={"Add Income"}
//             icon={plus}
//             bPad={".8rem 1.6rem"}
//             bRad={"30px"}
//             bg={"#f56692"}
//             color={"#fff"}
//             type="submit"
//           />
//         </div>
//       </form>
//     </IncomeFormStyled>
//   );
// };

// export default IncomeForm;

// IncomeForm.jsx - UPDATED VERSION
import React, { useContext, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContent } from "../../context/AppContext";
import { plus } from "../../utils/icon";
import Button from "../Button";
import { formatForBackend, formatForDatePicker } from "../../utils/dateFormat";

const IncomeFormStyled = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .input-fields {
      input,
      select,
      textarea {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: 0.3rem 1rem;
        border-radius: 2px;
        border: 2px solid #d4d1d1;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.06);
        color: rgba(34, 3, 96, 0.9);
        &::placeholder {
          color: rgba(34, 3, 96, 0.4);
          font-size: 1rem;
        }
      }
      input {
        width: 100%;
      }
    }
    .selects {
      display: flex;
      justify-content: flex-end;
      margin-right: 2rem;
      select {
        color: rgba(34, 3, 96, 0.4);
        &:focus,
        &:active {
          color: rgba(34, 3, 96, 1);
        }
      }
    }
    .submit-btn {
      button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
          background: green !important;
        }
      }
    }
  }
`;

const IncomeForm = ({ onFormSubmit }) => {
  const { addIncome, getIncomes } = useContext(AppContent);

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format date for backend (YYYY-MM-DD)
    const formattedDate = formatForBackend(date);

    const incomeData = {
      ...inputState,
      date: formattedDate, // Use formatted date
    };

    addIncome(incomeData);
    getIncomes();

    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });

    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  return (
    <IncomeFormStyled>
      <form onSubmit={handleSubmit}>
        <p style={{ textAlign: "center", fontWeight: 900 }}>Add New Income</p>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Income Title"
            name={"title"}
            value={title}
            onChange={handleInput("title")}
            required
          />
        </div>

        <div className="input-fields">
          <input
            type="number"
            placeholder="Income Amount"
            name={"amount"}
            value={amount}
            onChange={handleInput("amount")}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="input-fields">
          <DatePicker
            id="date"
            placeholderText="Enter date"
            selected={date ? formatForDatePicker(date) : null} // Use formatForDatePicker
            dateFormat="dd/MM/yyyy"
            onChange={(selectedDate) => {
              setInputState({ ...inputState, date: selectedDate });
            }}
            required
          />
        </div>

        <div className="selects input-fields">
          <select
            name="category"
            id="category"
            value={category}
            required
            onChange={handleInput("category")}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="salary">Salary</option>
            <option value="business">Business</option>
            <option value="gift">Gift</option>
            <option value="investment">Investment</option>
            <option value="freelance">Freelance</option>
            <option value="farming">Farming</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="input-fields">
          <textarea
            name="description"
            id="description"
            value={description}
            rows="4"
            cols="30"
            onChange={handleInput("description")}
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="submit-btn">
          <Button
            name={"Add Income"}
            icon={plus}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"#f56692"}
            color={"#fff"}
            type="submit"
          />
        </div>
      </form>
    </IncomeFormStyled>
  );
};

export default IncomeForm;
