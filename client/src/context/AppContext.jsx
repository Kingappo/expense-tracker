import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();
export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  // const backendUrl = "http://localhost:7000";
  const backendUrl = "https://expense-tracker-backend-valo.onrender.com";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [adminUsers, setAdminUsers] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [adminDeletedUsers, setAdminDeletedUsers] = useState([]);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsLoggedin(false);
        setUserData(null);
      } else {
        toast.error(error.message);
      }
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-user");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/check-admin");
      return data.isAdmin;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/users");
      if (data.success) {
        setAdminUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const fetchAdminStats = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/stats");
      if (data.success) {
        setAdminStats(data);
      }
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const fetchDeletedUsers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/users/deleted");
      if (data.success) {
        setAdminDeletedUsers(data.deletedUsers);
      }
    } catch (error) {
      console.error("Error fetching deleted users:", error);
    }
  };

  const toggleUserStatus = async (userId, action) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/admin/users/${userId}/status`,
        { action }
      );

      if (data.success) {
        toast.success(data.message);
        fetchAdminUsers();
        fetchDeletedUsers();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  const promoteToAdmin = async (userId) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/admin/users/${userId}/make-admin`
      );

      if (data.success) {
        toast.success(data.message);
        fetchAdminUsers();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  const removeAdminRole = async (userId) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/admin/users/${userId}/remove-admin`
      );

      if (data.success) {
        toast.success(data.message);
        fetchAdminUsers();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  const addIncome = async (income) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/income/add-income`,
        income
      );
      if (data.success) {
        toast.success(data.message);
        getIncomes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getIncomes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/income/get-incomes`);
      if (data.success) {
        setIncomes(data.incomes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteIncome = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/income/delete-income/${id}`
      );
      if (data.success) {
        getIncomes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addExpense = async (expense) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/expense/add-expense`,
        expense
      );
      if (data.success) {
        toast.success(data.message);
        getExpenses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const getExpenses = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/expense/get-expenses`
      );
      if (data.success) {
        setExpenses(data.expenses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const deleteExpense = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/expense/delete-expense/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getExpenses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const getBudgets = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/budget`);
      if (data.success) {
        setBudgets(data.budgets);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const addBudget = async ({ month, title, category, amount }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/budget/set/${month}`,
        { title, category, amount },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        getBudgets();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const deleteBudget = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/budget/${id}`);
      if (data.success) {
        toast.success(data.message);
        getBudgets();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const budgetProgress = (category, month) => {
    if (!budgets.length || !expenses.length) return 0;
    const b = budgets.find(
      (x) =>
        x.category?.toLowerCase() === category?.toLowerCase() &&
        x.month?.toLowerCase() === month?.toLowerCase()
    );
    if (!b) return 0;
    const spent = expenses
      .filter(
        (exp) =>
          exp.category?.toLowerCase() === category?.toLowerCase() &&
          exp.month?.toLowerCase() === month?.toLowerCase()
      )
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const percent = Math.round((spent / b.amount) * 100);
    return percent > 100 ? 100 : percent;
  };
  const totalIncome = () => {
    let total = 0;
    incomes.forEach((income) => {
      total += income.amount || 0;
    });
    return total;
  };
  const totalExpense = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount || 0;
    });
    return total;
  };
  const balance = () => {
    return totalIncome() - totalExpense();
  };
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };
  useEffect(() => {
    getAuthState();
  }, []);
  useEffect(() => {
    if (isLoggedin) {
      getIncomes();
      getExpenses();
      getBudgets();
    }
  }, [isLoggedin]);
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    checkAdminStatus,

    adminUsers,
    adminStats,
    adminDeletedUsers,
    fetchAdminUsers,
    fetchAdminStats,
    fetchDeletedUsers,
    toggleUserStatus,
    promoteToAdmin,
    removeAdminRole,
    addIncome,
    incomes,
    getIncomes,
    deleteIncome,
    addExpense,
    expenses,
    getExpenses,
    deleteExpense,
    budgets,
    getBudgets,
    addBudget,
    deleteBudget,
    budgetProgress,
    totalIncome,
    totalExpense,
    balance,
    transactionHistory,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
