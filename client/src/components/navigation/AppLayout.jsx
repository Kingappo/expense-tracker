import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import bg from "../../img/bg.png";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import { menuItems } from "../../utils/menuItems";

const LayoutStyled = styled.div`
  display: flex;
  height: 100vh;
  background-image: url(${(props) => props.bg});

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavigationStyled = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background: #dfdddec5;
  color: #222260;
  box-shadow: 0px 30px 17px rgba(0, 0, 0, 0.01);
  padding: 3.5rem 1rem;
  overflow-y: auto;
  transition: transform 0.3s ease, width 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 60%;
    height: auto;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(-100%)"};
    height: calc(100vh - 60px);
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }

  .profil-con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;

    cursor: pointer;
    margin-left: 0.5rem;

    @media (max-width: 480px) {
      margin-left: 0.2rem;
      gap: 0.5rem;
      padding-top: 2.5rem;
      font-size: 4rem;
    }

    .initial {
      padding: 0.2rem 0.5rem;
      border-radius: 50%;
      background: #474747;
      color: #f8f2f2;
      font-weight: 500;
      font-size: 23px;

      @media (max-width: 480px) {
        font-size: 18px;
        padding: 0.15rem 0.4rem;
      }
    }

    p {
      margin: 0;
      font-size: 14px;

      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 2rem;

    @media (max-width: 480px) {
      margin-top: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;

      @media (max-width: 480px) {
        margin-bottom: 0.3rem;
      }

      a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        text-decoration: none;
        color: #222260;
        font-size: 16px;
        font-weight: 500;
        transition: background 0.3s ease;

        @media (max-width: 480px) {
          padding: 0.6rem 0.8rem;
          font-size: 14px;
          gap: 8px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
      a.active {
        background: #2e7d32;
        color: white;
      }
    }
  }
`;

const LogoutStyled = styled.div`
  margin-top: auto;
  padding: 1rem;

  .logout-btn {
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 0.8rem 1.6rem;
    border-radius: 30px;
    background: #f56692;
    color: #fff;
    border: none;
    font-size: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    width: 100%;

    &:hover:not(:disabled) {
      background: green !important;
      transform: translateY(-2px);
    }

    &:disabled {
      background: #ccc !important;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const ContentStyled = styled.div`
  margin-top: 60px;
  margin-left: 250px;
  flex: 1;
  padding: 1.5rem;
  background: #fcf6f9c1;
  height: calc(100vh - 60px);
  overflow: auto;
  transition: margin-left 0.3s ease;

  /* Mobile styles */
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 70px;
  left: 15px;
  z-index: 1100;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    top: 65px;
    left: 10px;
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

const INACTIVITY_TIMEOUT = 30 * 60 * 1000;
const WARNING_TIMEOUT = 29 * 60 * 1000;

const AppLayout = () => {
  const { userData, setIsLoggedin, setUserData, backendUrl } =
    useContext(AppContent);

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const isWarningShownRef = useRef(false);

  const performLogout = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }

        // Clear all timers
        clearAllTimers();

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      }
    } catch (error) {
      toast.error(error.message || "Failed to logout");
    }
  }, [backendUrl, setIsLoggedin, setUserData, isMobileMenuOpen, navigate]);

  const clearAllTimers = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    isWarningShownRef.current = false;
  }, []);

  const showWarning = useCallback(async () => {
    if (isWarningShownRef.current) return;

    isWarningShownRef.current = true;

    const result = await Swal.fire({
      title: "Inactivity Warning",
      text: "You will be logged out in 1 minute due to inactivity. Click 'Stay Logged In' to continue.",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Stay Logged In",
      showCancelButton: true,
      cancelButtonText: "Logout Now",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      timer: 60000, // 1 minute
      timerProgressBar: true,
    });

    if (result.isConfirmed) {
      // User clicked "Stay Logged In", reset timer
      isWarningShownRef.current = false;
      resetInactivityTimer();
    } else if (result.dismiss === Swal.DismissReason.timer) {
      // Timer expired - auto logout
      handleAutoLogout();
    } else if (result.isDismissed) {
      // User clicked "Logout Now" or closed dialog
      performLogout();
    }
  }, [performLogout]);

  const handleAutoLogout = useCallback(async () => {
    try {
      // Show logout notification
      Swal.fire({
        title: "Session Timeout",
        text: "You have been inactive for 30 minutes. You have been logged out for security reasons.",
        icon: "info",
        timer: 5000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      // Perform logout
      await performLogout();
    } catch (error) {
      console.error("Auto logout error:", error);
    }
  }, [performLogout]);

  const resetInactivityTimer = useCallback(() => {
    // Clear existing timers
    clearAllTimers();

    // Set new warning timer (29 minutes)
    warningTimerRef.current = setTimeout(() => {
      showWarning();
    }, WARNING_TIMEOUT);

    // Set new logout timer (30 minutes)
    logoutTimerRef.current = setTimeout(() => {
      handleAutoLogout();
    }, INACTIVITY_TIMEOUT);
  }, [clearAllTimers, showWarning, handleAutoLogout]);

  const handleUserActivity = useCallback(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await performLogout();
        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error!", "Failed to logout. Please try again.", "error");
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    resetInactivityTimer();

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "wheel",
    ];

    const handleActivity = () => {
      handleUserActivity();
    };

    events.forEach((event) => {
      document.addEventListener(event, handleActivity, {
        capture: true,
        passive: true,
      });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, { capture: true });
      });

      clearAllTimers();
    };
  }, [handleUserActivity, clearAllTimers, resetInactivityTimer]);

  return (
    <LayoutStyled bg={bg}>
      {/* Mobile Menu Button */}
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </MobileMenuButton>

      {/* Overlay for mobile */}
      <Overlay isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

      {/* Navigation Sidebar */}
      <NavigationStyled isOpen={isMobileMenuOpen}>
        <div
          className="profil-con"
          onClick={() => {
            navigate("/account");
            handleNavLinkClick();
          }}
        >
          <div className="initial">
            {userData ? userData.firstName[0].toUpperCase() : "A"}
          </div>
          <p style={{ fontSize: "1rem", fontWeight: 800 }}>
            Hello <span>{userData ? userData.firstName : "User"}</span>
          </p>
        </div>
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <NavLink to={item.path} onClick={handleNavLinkClick}>
                  <Icon size={25} strokeWidth={2} />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Logout Button in Sidebar */}
        <LogoutStyled>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </LogoutStyled>
      </NavigationStyled>

      {/* Page Content */}
      <ContentStyled>
        <Outlet context={{ logout }} />
      </ContentStyled>
    </LayoutStyled>
  );
};

export default AppLayout;
