import React from "react";
import BudgetLayout from "../components/BudgetLayout";
import { InnerLayOut } from "../styles/Layout";

function Budget() {
  return (
    <div>
      <InnerLayOut>
        <BudgetLayout />
      </InnerLayOut>
    </div>
  );
}

export default Budget;
