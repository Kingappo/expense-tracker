import styled from "styled-components";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { notification as notificationIcon, trash, circle } from "../utils/icon";
import { useContext, useEffect, useState } from "react";

const NotificationContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 80px auto 2rem;
  background: #fcf6f9;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 70px 1rem 1rem;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  h1 {
    color: #222260;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background: #2e7d32;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #256528;
      transform: translateY(-2px);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    &.secondary {
      background: #6c757d;

      &:hover {
        background: #545b62;
      }
    }

    @media (max-width: 480px) {
      padding: 0.4rem 0.8rem;
      font-size: 0.875rem;

      span {
        display: none;
      }
    }
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  background: white;
  border: 1px solid ${(props) => (props.$isRead ? "#e2e8f0" : "#2e7d32")};
  border-left: 4px solid
    ${(props) => {
      switch (props.$type) {
        case "warning":
          return "#ffc107";
        case "success":
          return "#28a745";
        case "danger":
          return "#dc3545";
        default:
          return "#2e7d32";
      }
    }};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isRead ? 0.8 : 1)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const NotificationHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const NotificationTitle = styled.h3`
  color: #222260;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NotificationMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
  align-items: center;
`;

const NotificationBadge = styled.span`
  background: ${(props) => {
    switch (props.$type) {
      case "warning":
        return "#ffc107";
      case "success":
        return "#28a745";
      case "danger":
        return "#dc3545";
      default:
        return "#2e7d32";
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const UnreadDot = styled.span`
  color: #2e7d32;
  font-size: 0.5rem;
  margin-right: 0.25rem;
`;

const NotificationTime = styled.span`
  color: #6c757d;
  font-size: 0.875rem;
  white-space: nowrap;
`;

const NotificationMessage = styled.p`
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
`;

const NotificationActionsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 6px;
    background: #f8f9fa;
    color: #495057;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e9ecef;
    }

    &.read {
      background: #2e7d32;
      color: white;

      &:hover {
        background: #256528;
      }
    }

    &.delete {
      background: #dc3545;
      color: white;

      &:hover {
        background: #c82333;
      }
    }

    @media (max-width: 480px) {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;

      span {
        display: none;
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6c757d;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #495057;
  }

  p {
    font-size: 1rem;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
`;

function Alert() {
  const { backendUrl, userData } = useContext(AppContent);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/alert`, {
        withCredentials: true,
      });

      if (data.success) {
        setNotifications(data.notifications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch notifications");
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      setMarkingRead(true);
      const { data } = await axios.put(
        `${backendUrl}/api/alert/${notificationId}/read`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
        // toast.success("Notification marked as read");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to mark notification as read");
      console.error("Error marking notification as read:", error);
    } finally {
      setMarkingRead(false);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      setMarkingRead(true);
      const unreadNotifications = notifications.filter(
        (notif) => !notif.isRead
      );

      // Mark each unread notification as read
      for (const notif of unreadNotifications) {
        await axios.put(
          `${backendUrl}/api/alert/${notif._id}/read`,
          {},
          { withCredentials: true }
        );
      }

      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );

      // toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    } finally {
      setMarkingRead(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  // Fetch notifications on component mount
  useEffect(() => {
    if (userData) {
      fetchNotifications();
    }
  }, [userData]);

  if (loading) {
    return (
      <NotificationContainer>
        <LoadingState>
          <div>Loading notifications...</div>
        </LoadingState>
      </NotificationContainer>
    );
  }

  return (
    <NotificationContainer>
      <NotificationHeader>
        <h1>
          {notificationIcon}
          Notifications
          {unreadCount > 0 && (
            <NotificationBadge $type="danger" style={{ marginLeft: "0.5rem" }}>
              {unreadCount} new
            </NotificationBadge>
          )}
        </h1>

        {notifications.length > 0 && unreadCount > 0 && (
          <NotificationActions>
            <button onClick={markAllAsRead} disabled={markingRead}>
              <i className="fa-solid fa-check"></i>
              <span>Mark all as read</span>
            </button>
          </NotificationActions>
        )}
      </NotificationHeader>

      <NotificationList>
        {notifications.length === 0 ? (
          <EmptyState>
            <div className="icon">{notificationIcon}</div>
            <h3>No notifications yet</h3>
            <p>You're all caught up! New alerts will appear here.</p>
          </EmptyState>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              $isRead={notification.isRead}
              $type={notification.type}
            >
              <NotificationHeaderRow>
                <NotificationTitle>
                  {!notification.isRead && <UnreadDot>{circle}</UnreadDot>}
                  {notification.title}
                </NotificationTitle>
                <NotificationMeta>
                  <NotificationBadge $type={notification.type}>
                    {notification.type}
                  </NotificationBadge>
                  <NotificationTime>
                    {formatDate(notification.createdAt)}
                  </NotificationTime>
                </NotificationMeta>
              </NotificationHeaderRow>

              <NotificationMessage>{notification.message}</NotificationMessage>

              {!notification.isRead && (
                <NotificationActionsRow>
                  <button
                    className="read"
                    onClick={() => markAsRead(notification._id)}
                    disabled={markingRead}
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>Mark as read</span>
                  </button>
                </NotificationActionsRow>
              )}
            </NotificationItem>
          ))
        )}
      </NotificationList>
    </NotificationContainer>
  );
}

export default Alert;
