import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPasswordStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #dfdddec5;
  padding: 1rem;

  form {
    text-align: center;
    background: #000000;
    color: #f7eeee;
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: 700;
      color: #ffffff;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      color: #dfdddec5;
      line-height: 1.4;
    }

    .fields {
      margin: 1.5rem 0;
      width: 100%;

      input {
        width: 100%;
        padding: 1rem;
        font-size: 1rem;
        border: 2px solid #333;
        border-radius: 10px;
        background: #f7eeee;
        color: #000;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #2e7d32;
          background: #fff;
        }

        &::placeholder {
          color: #666;
        }
      }
    }

    .input-fields {
      margin: 1.5rem 0;
      display: flex;
      justify-content: center;
      gap: 0.8rem;
      flex-wrap: nowrap;

      input {
        font-size: 1.4rem;
        font-weight: 700;
        border: 2px solid #333;
        border-radius: 10px;
        height: 60px;
        width: 50px;
        text-align: center;
        background: #f7eeee;
        color: #000;
        transition: all 0.3s ease;
        flex-shrink: 0;

        &:focus {
          outline: none;
          border-color: #2e7d32;
          background: #fff;
          transform: scale(1.05);
        }
      }
    }

    button {
      width: 100%;
      padding: 1rem;
      margin-top: 1rem;
      color: #ffffff;
      background: #2e7d32;
      border: none;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 30px;
      transition: all 0.3s ease;
      letter-spacing: 1px;
      cursor: pointer;

      &:hover {
        background: #256528;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        background: #666;
        cursor: not-allowed;
        transform: none;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem;

    form {
      padding: 1.5rem;
      max-width: 400px;

      h2 {
        font-size: 1.6rem;
      }

      p {
        font-size: 0.85rem;
      }

      .fields {
        margin: 1.2rem 0;

        input {
          padding: 0.9rem;
          font-size: 0.95rem;
        }
      }

      .input-fields {
        margin: 1.2rem 0;
        gap: 0.6rem;
        flex-wrap: nowrap;

        input {
          height: 55px;
          width: 45px;
          font-size: 1.3rem;
        }
      }

      button {
        padding: 0.9rem;
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    form {
      padding: 1.2rem;
      max-width: 350px;
      border-radius: 15px;

      h2 {
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
      }

      p {
        font-size: 0.8rem;
        margin-bottom: 1.2rem;
      }

      .fields {
        margin: 1rem 0;

        input {
          padding: 0.8rem;
          font-size: 0.9rem;
          border-radius: 8px;
        }
      }

      .input-fields {
        margin: 1rem 0;
        gap: 0.5rem;
        flex-wrap: nowrap;

        input {
          height: 50px;
          width: 40px;
          font-size: 1.2rem;
          border-radius: 8px;
        }
      }

      button {
        padding: 0.8rem;
        font-size: 0.95rem;
        border-radius: 25px;
      }
    }
  }

  @media (max-width: 360px) {
    form {
      padding: 1rem;
      max-width: 320px;

      h2 {
        font-size: 1.3rem;
      }

      p {
        font-size: 0.75rem;
      }

      .fields input {
        padding: 0.7rem;
      }

      .input-fields {
        gap: 0.4rem;
        flex-wrap: nowrap;

        input {
          height: 45px;
          width: 35px;
          font-size: 1.1rem;
        }
      }

      button {
        padding: 0.7rem;
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 320px) {
    form {
      padding: 0.8rem;
      max-width: 280px;

      .input-fields {
        gap: 0.3rem;
        flex-wrap: wrap;
        justify-content: space-between;

        input {
          height: 40px;
          width: 32px;
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }
      }
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    min-height: auto;
    padding: 2rem 1rem;

    form {
      max-width: 400px;

      .input-fields {
        margin: 1rem 0;
        flex-wrap: nowrap;

        input {
          height: 50px;
          width: 40px;
        }
      }

      button {
        margin-top: 0.5rem;
        padding: 0.8rem;
      }
    }
  }

  @media (min-width: 1200px) {
    form {
      max-width: 500px;
      padding: 2.5rem;

      h2 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
      }

      .fields input {
        padding: 1.2rem;
        font-size: 1.1rem;
      }

      .input-fields {
        gap: 1rem;
        flex-wrap: nowrap;

        input {
          height: 70px;
          width: 60px;
          font-size: 1.6rem;
        }
      }

      button {
        padding: 1.2rem;
        font-size: 1.2rem;
      }
    }
  }
`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [OTP, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, OTP, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordStyled>
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail}>
          <h2>Reset Password</h2>
          <p>Enter your registered email address</p>
          <div className="fields">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp}>
          <h2>Reset Password OTP</h2>
          <p>Enter the 6 digit code sent to your email</p>
          <div onPaste={handlePaste} className="input-fields">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button>Submit</button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword}>
          <h2>New Password</h2>
          <p>Enter new password below</p>
          <div className="fields">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button disabled={loading}>
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      )}
    </ResetPasswordStyled>
  );
};

export default ResetPassword;
