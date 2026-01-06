import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContent } from "../context/AppContext";

const BarContainer = styled.div`
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    width: 130%;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 12px;
  background: #eee;
  border-radius: 10px;
  position: relative;
`;

const Filler = styled.div`
  height: 100%;
  background: ${(props) => (props.exceeded ? "#e74c3c" : "#1abc9c")};
  width: ${(props) => props.percent}%;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
`;

const InfoText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${(props) => (props.exceeded ? "#e74c3c" : "#444")};
  margin-top: 0.3rem;
`;

const BudgetProgress = ({ category, month }) => {
  const { budgets, expenses } = useContext(AppContent);
  const [percent, setPercent] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [exceeded, setExceeded] = useState(false);

  useEffect(() => {
    const b = budgets.find(
      (x) =>
        x.category?.toLowerCase() === category?.toLowerCase() &&
        x.month?.toLowerCase() === month?.toLowerCase()
    );

    if (!b) return;

    const spent = expenses
      .filter(
        (exp) =>
          exp.category?.toLowerCase() === category?.toLowerCase() &&
          exp.month?.toLowerCase() === month?.toLowerCase()
      )
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const perc = Math.round((spent / b.amount) * 100);
    setPercent(perc > 100 ? 100 : perc);
    setSpentAmount(spent);
    setTotalBudget(b.amount);
    setExceeded(spent > b.amount);
  }, [category, month, budgets, expenses]);

  return (
    <BarContainer>
      <Bar>
        <Filler percent={percent} exceeded={exceeded} />
      </Bar>
      <InfoText exceeded={exceeded}>
        {exceeded
          ? "Budget Exceeded!"
          : `Progress: ₦${spentAmount} / ₦${totalBudget}`}
        <span>{percent}%</span>
      </InfoText>
    </BarContainer>
  );
};

export default BudgetProgress;
