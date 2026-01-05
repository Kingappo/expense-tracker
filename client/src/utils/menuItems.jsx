import {
  LayoutDashboard,
  ReceiptText,
  Target,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";

export const menuItems = [
  { id: 1, title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    id: 2,
    title: "View Transactions",
    icon: ReceiptText,
    path: "/transactions",
  },
  { id: 3, title: "Income", icon: TrendingUp, path: "/income" },
  { id: 4, title: "Expenses", icon: Wallet, path: "/expenses" },
  { id: 5, title: "Budget", icon: Target, path: "/budget" },
  { id: 6, title: "Account", icon: User, path: "/account" },
];
