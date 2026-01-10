import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 450px;
  width: 100%;
  margin: 2rem auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.6rem;
  color: #222;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;
  &:focus {
    border-color: #007bff;
  }
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const BudgetForm = ({
  onBudgetSaved = { handleFormSubmit },
  isSubmitting = { isAddingBudget },
}) => {
  const [month, setMonth] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const currentMonthIndex = new Date().getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!month || !title || !category || !amount) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      await onBudgetSaved({ month, title, category, amount });

      setMonth("");
      setTitle("");
      setCategory("");
      setAmount("");
    } catch (error) {
      toast.error(error.message || "Failed to save budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New Budget</FormTitle>

      <Form onSubmit={handleSubmit}>
        {/* Month */}
        <FormGroup>
          <Label>Select Month</Label>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">-- Select Month --</option>
            {months.map((m, index) => (
              <option key={m} value={m} disabled={index < currentMonthIndex}>
                {m}
              </option>
            ))}
          </Select>
        </FormGroup>

        {/* Title */}
        <FormGroup>
          <Label>Budget Title</Label>
          <Input
            type="text"
            placeholder="e.g. Food Budget"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </FormGroup>

        {/* select */}
        <FormGroup>
          <Label>Select Category</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">-- Select Category --</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="transport">Transport</option>
            <option value="rent">House Rent</option>
            <option value="airtime">Airtime</option>
            <option value="data">Data</option>
            <option value="gift">Gift</option>
            <option value="school">School</option>
            <option value="others">Others</option>
          </Select>
        </FormGroup>

        {/* Amount */}
        <FormGroup>
          <Label>Budget Amount (₦)</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            disabled={loading}
            min="0"
            step="1"
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Set Budget"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default BudgetForm;
