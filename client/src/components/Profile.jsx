import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileStyled = styled.div`
  position: relative;
  margin-top: 10rem;
  padding: 1rem;
  .profil-con {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    h3 {
      margin-bottom: 1.5rem;
      font-weight: 900;
      font-size: 1.8rem;
      letter-spacing: 1px;
      text-align: center;
      color: #222260;
    }
    .initials {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background: #474747;
      color: white;
      margin: 0 auto 2rem;

      p {
        font-size: 2.8rem;
        font-weight: 700;
      }
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;

      .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        background: white;
        border-radius: 12px;
        border: 1px solid #e0e0e0;

        span {
          font-size: 0.9rem;
          color: #666;
          font-weight: 600;
        }

        .info-value {
          font-size: 1.1rem;
          color: #222260;
          font-weight: 500;
        }
      }
    }
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      button {
        padding: 0.8rem 1.5rem;
        background-color: #008000;
        color: #fff;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
        max-width: 250px;

        &:hover {
          background-color: #016901;
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .v-btn {
        background-color: #54f654;

        &:hover {
          background-color: #008000;
        }
      }

      .del-btn {
        background: #ff0000;

        &:hover {
          background: #ca0404;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-align: center;

    h4 {
      margin-bottom: 0.5rem;
      color: #222;
      font-size: 1.4rem;
      font-weight: 700;
    }

    p {
      font-size: 0.95rem;
      color: #444;
      line-height: 1.5;
    }

    input {
      padding: 0.8rem 1rem;
      border: 2px solid #d4d1d1;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #008000;
      }

      &::placeholder {
        color: #999;
      }
    }

    .btns {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;

      button {
        flex: 1;
        padding: 0.8rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.95rem;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .confirm-btn {
        background: #ff0000;

        &:hover:not(:disabled) {
          background: #ca0404;
        }
      }

      .cancel-btn {
        background: #008000;

        &:hover:not(:disabled) {
          background: #016901;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    .profil-con {
      padding: 1.5rem;
      margin: 1rem auto;

      h3 {
        font-size: 1.6rem;
        margin-bottom: 1.2rem;
      }

      .initials {
        height: 80px;
        width: 80px;
        margin-bottom: 1.5rem;

        p {
          font-size: 2.2rem;
        }
      }

      .profile-info {
        gap: 1rem;
        margin-bottom: 1.5rem;

        .info-item {
          padding: 0.8rem;

          span {
            font-size: 0.85rem;
          }

          .info-value {
            font-size: 1rem;
          }
        }
      }

      .button-group {
        gap: 0.8rem;

        button {
          padding: 0.7rem 1.2rem;
          font-size: 0.95rem;
          max-width: 220px;
        }
      }
    }

    .modal {
      padding: 1.5rem;
      max-width: 350px;

      h4 {
        font-size: 1.3rem;
      }

      p {
        font-size: 0.9rem;
      }

      input {
        padding: 0.7rem 0.9rem;
        font-size: 0.95rem;
      }

      .btns {
        gap: 0.8rem;

        button {
          padding: 0.7rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .profil-con {
      padding: 1rem;
      margin: 0.5rem auto;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }

      .initials {
        height: 70px;
        width: 70px;
        margin-bottom: 1.2rem;

        p {
          font-size: 2rem;
        }
      }

      .profile-info {
        gap: 0.8rem;

        .info-item {
          padding: 0.7rem;

          span {
            font-size: 0.8rem;
          }

          .info-value {
            font-size: 0.95rem;
          }
        }
      }

      .button-group {
        gap: 0.7rem;

        button {
          padding: 0.6rem 1rem;
          font-size: 0.9rem;
          max-width: 200px;
          border-radius: 10px;
        }
      }
    }

    .modal {
      padding: 1.2rem;
      max-width: 300px;
      gap: 1rem;

      h4 {
        font-size: 1.2rem;
      }

      p {
        font-size: 0.85rem;
      }

      input {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
      }

      .btns {
        flex-direction: column;
        gap: 0.6rem;

        button {
          padding: 0.7rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    .profil-con {
      padding: 0.8rem;

      h3 {
        font-size: 1.3rem;
      }

      .initials {
        height: 60px;
        width: 60px;

        p {
          font-size: 1.8rem;
        }
      }

      .profile-info .info-item {
        padding: 0.6rem;
      }

      .button-group button {
        max-width: 180px;
        font-size: 0.85rem;
      }
    }

    .modal {
      padding: 1rem;
      max-width: 280px;

      h4 {
        font-size: 1.1rem;
      }

      input {
        padding: 0.5rem 0.7rem;
      }
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .overlay {
      align-items: flex-start;
      padding-top: 2rem;
    }

    .modal {
      max-height: 90vh;
      overflow-y: auto;
    }
  }
`;

const Profile = () => {
  const { userData, backendUrl, setIsLoggedin, setUserData } =
    useContext(AppContent);
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendVerificationOtp = async () => {
    try {
      setIsVerifying(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send verification OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.put(
        `${backendUrl}/api/user/update-password`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setShowPasswordModal(false);
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.delete(
        `${backendUrl}/api/user/delete-account`
      );

      if (data.success) {
        toast.success(data.message);
        setUserData(null);
        setIsLoggedin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <ProfileStyled>
      <div className="profil-con">
        <h3>Profile Page</h3>

        {!userData ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="initials">
              <p>
                {userData.firstName[0].toUpperCase()}
                {userData.surname[0].toUpperCase()}
              </p>
            </div>

            <div className="profile-info">
              <div className="info-item">
                <span>Full Name:</span>
                <div className="info-value">
                  {userData.firstName} {userData.surname}
                </div>
              </div>
              <div className="info-item">
                <span>Email:</span>
                <div className="info-value">{userData.email}</div>
              </div>
              <div className="info-item">
                <span>Account Status:</span>
                <div className="info-value">
                  {userData.isAccountVerify ? "Verified" : "Not Verified"}
                </div>
              </div>
              <div className="info-item">
                <span>Registration Date:</span>
                <div className="info-value">{userData.registrationDate}</div>
              </div>
            </div>

            <div className="button-group">
              {/* Verify Email Button - Only show if account is not verified */}
              {!userData.isAccountVerify && (
                <button
                  className="v-btn"
                  onClick={sendVerificationOtp}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Sending..." : "Verify Email"}
                </button>
              )}

              <button onClick={() => setShowPasswordModal(true)}>
                Change Password
              </button>
              <button
                className="del-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>

      {showPasswordModal && (
        <div className="overlay">
          <div className="modal">
            <h4>Change Password</h4>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="btns">
              <button
                className="confirm-btn"
                onClick={handlePasswordChange}
                disabled={loading}
              >
                {loading ? "Saving..." : "Submit"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="overlay">
          <div className="modal">
            <h4>Confirm Account Deletion</h4>
            <p>
              This action cannot be undone.
              <br />
              Are you sure you want to delete your account?
            </p>
            <div className="btns">
              <button
                className="confirm-btn"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </ProfileStyled>
  );
};

export default Profile;
