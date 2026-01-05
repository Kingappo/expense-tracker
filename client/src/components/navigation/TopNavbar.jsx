import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../img/logo4.png";
import { LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { notification } from "../../utils/icon";

const TopNavStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #fcf6f9c6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
  z-index: 1000;

  /* Mobile styles */
  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 55px;
  }

  @media (max-width: 480px) {
    padding: 0 0.8rem;
  }

  .app-name {
    img {
      height: 60px;
      transition: height 0.3s ease;

      @media (max-width: 768px) {
        height: 50px;
      }

      @media (max-width: 480px) {
        height: 45px;
      }
    }
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2e7d32;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #256528;
    }

    svg {
      stroke-width: 2;
    }

    /* Mobile styles */
    @media (max-width: 480px) {
      padding: 0.4rem 0.8rem;
      font-size: 13px;
      gap: 6px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .profile-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 480px) {
      gap: 0.3rem;
    }

    .notification {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      color: black;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      transition: all 0.3s ease;
      border: 1px solid #ddd;

      &:hover {
        background: #e2f5e5;
        transform: scale(1.05);
      }

      svg {
        color: #2e7d32;
        width: 22px;
        height: 22px;
      }

      span {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #d32f2f;
        color: white;
        font-size: 11px;
        font-weight: 600;
        border-radius: 50%;
        padding: 2px 6px;
        line-height: 1;
        min-width: 18px;
        text-align: center;
      }

      /* Active state when on notification page */
      &.active {
        background: #2e7d32;
        border-color: #256528;

        i {
          color: white;
        }

        &:hover {
          background: #256528;
        }
      }

      /* Mobile styles */
      @media (max-width: 480px) {
        width: 34px;
        height: 34px;

        svg {
          width: 18px;
          height: 18px;
        }

        span {
          font-size: 10px;
          padding: 1px 4px;
          min-width: 16px;
        }
      }
    }

    .menu-icon {
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;
      padding: 6px;
      border-radius: 4px;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      @media (max-width: 480px) {
        padding: 4px;
      }
    }

    .dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      list-style: none;
      padding: 0.5rem 0;
      min-width: 150px;
      display: none;
      z-index: 1001;

      /* Mobile styles */
      @media (max-width: 480px) {
        top: 45px;
        min-width: 140px;
      }

      li {
        padding: 0.5rem 1rem;
        font-size: 14px;
        font-weight: 500;
        color: #222;
        transition: background 0.2s ease;
        cursor: pointer;

        &:hover {
          background: #f5f5f5;
        }

        /* Mobile styles */
        @media (max-width: 480px) {
          padding: 0.4rem 0.8rem;
          font-size: 13px;
        }
      }

      &.active {
        display: block;
      }
    }
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: #2e7d32;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(46, 125, 50, 0.1);
    }

    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
    }

    @media (max-width: 480px) {
      padding: 6px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  /* User info for mobile */
  .user-info-mobile {
    display: none;

    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
      margin-right: 0.5rem;

      .user-avatar {
        width: 32px;
        height: 32px;
        background: #474747;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
      }

      .user-name {
        font-size: 14px;
        color: #222260;
        font-weight: 500;

        @media (max-width: 480px) {
          display: none;
        }
      }
    }
  }
`;

const TopNavbar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { userData, isLoggedin, backendUrl } = useContext(AppContent);

  const [notificationCount, setNotificationCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isNotificationPage = location.pathname === "/notification";

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const fetchNotificationCount = async () => {
    if (isLoggedin && userData) {
      try {
        const { data } = await axios.get(`${backendUrl}/api/alert`, {
          withCredentials: true,
        });

        if (data.success) {
          const unreadCount = data.notifications.filter(
            (notif) => !notif.isRead
          ).length;
          setNotificationCount(unreadCount);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      fetchNotificationCount();

      const interval = setInterval(fetchNotificationCount, 2000);
      return () => clearInterval(interval);
    } else {
      setNotificationCount(0);
    }
  }, [isLoggedin, userData, backendUrl]);

  const handleNotificationClick = () => {
    navigation("/notification");
    if (isMobile) {
      // Close mobile menu if needed
    }
  };

  return (
    <TopNavStyled>
      <div className="app-name">
        <img src={logo} alt="App Logo" />
      </div>

      {userData && isLoggedin && (
        <div
          onClick={() => navigation("/account")}
          className="user-info-mobile"
        >
          <div className="user-avatar">
            {userData.firstName?.[0]?.toUpperCase() || "U"}
          </div>
          <span className="user-name">Hi, {userData.firstName || "User"}</span>
        </div>
      )}

      {isLoggedin ? (
        <div className="profile-wrapper">
          <div
            className={`notification ${isNotificationPage ? "active" : ""}`}
            onClick={handleNotificationClick}
            title="Notifications"
          >
            {notification}
            {notificationCount > 0 && (
              <span>{notificationCount > 99 ? "99+" : notificationCount}</span>
            )}
          </div>
        </div>
      ) : (
        <button className="logout-btn" onClick={() => navigation("/login")}>
          <LogIn size={18} />
          Login
        </button>
      )}
    </TopNavStyled>
  );
};

export default TopNavbar;
