import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #dfdddec5;
  padding: 1rem;

  @media (max-height: 600px) and (orientation: landscape) {
    justify-content: flex-start;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .form-container {
    background: #000000;
    color: white;
    border-radius: 30px;
    width: 100%;
    max-width: 400px;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;

    @media (max-height: 600px) and (orientation: landscape) {
      padding: 1.5rem 2rem;
      max-width: 380px;
    }

    .heading {
      width: 100%;
      margin-bottom: 1.5rem;

      h2 {
        text-align: center;
        color: white;
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }
      p {
        text-align: center;
        color: #dfdddec5;
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.4;
      }
    }

    form {
      width: 100%;

      .input-fields {
        margin-bottom: 1rem;

        input {
          width: 100%;
          padding: 0.8rem 0.7rem;
          outline: none;
          border: none;
          border-bottom: 2px solid white;
          background: transparent;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 0;

          &:focus {
            color: white;
            background: transparent;
            border-bottom-color: #2e7d32;
          }

          &::placeholder {
            color: #8f8c8c;
            transition: color 0.3s ease;
          }

          &:focus::placeholder {
            color: #b8b8b8;
          }
        }
      }

      .forgot-password {
        margin: 0.8rem 0;
        color: #6565ff;
        font-size: 0.85rem;
        cursor: pointer;
        text-align: right;
        transition: all 0.3s ease;

        &:hover {
          text-decoration: underline;
          color: #7a7aff;
        }
      }

      button {
        width: 100%;
        padding: 0.8rem 0.7rem;
        margin: 1rem 0 0.5rem 0;
        color: #ffffff;
        background: #2e7d32;
        border: none;
        font-size: 16px;
        font-weight: 700;
        border-radius: 30px;
        transition: all 0.3s ease;
        cursor: pointer;
        letter-spacing: 0.5px;

        &:hover {
          background: #256528;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(46, 125, 50, 0.4);
        }

        &:active {
          transform: translateY(0);
        }

        &:disabled {
          background: #cccccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      }
    }

    .toggle-state {
      font-size: 0.9rem;
      text-align: center;
      margin-top: 1.5rem;
      color: #dfdddec5;

      span {
        color: #6565ff;
        letter-spacing: 0.5px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;

        &:hover {
          text-decoration: underline;
          background: rgba(101, 101, 255, 0.1);
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    .form-container {
      padding: 1.8rem 2rem;
      max-width: 380px;
      border-radius: 25px;

      .heading {
        margin-bottom: 1.2rem;

        h2 {
          font-size: 1.6rem;
        }
        p {
          font-size: 0.85rem;
        }
      }

      form {
        .input-fields {
          margin-bottom: 0.8rem;

          input {
            font-size: 0.95rem;
            padding: 0.75rem 0.6rem;
          }
        }

        .forgot-password {
          font-size: 0.8rem;
          margin: 0.6rem 0;
        }

        button {
          font-size: 15px;
          padding: 0.75rem 0.6rem;
          margin: 0.8rem 0 0.4rem 0;
        }
      }

      .toggle-state {
        font-size: 0.85rem;
        margin-top: 1.2rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    min-height: 100dvh;

    .form-container {
      width: 100%;
      max-width: 100%;
      padding: 1.5rem 1.5rem;
      border-radius: 20px;
      margin: 0;

      .heading {
        margin-bottom: 1rem;

        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.4rem;
        }
        p {
          font-size: 0.8rem;
          line-height: 1.3;
        }
      }

      form {
        .input-fields {
          margin-bottom: 0.7rem;

          input {
            font-size: 16px;
            padding: 0.7rem 0.5rem;
            border-bottom-width: 1.5px;
          }
        }

        .forgot-password {
          font-size: 0.75rem;
          margin: 0.5rem 0;
        }

        button {
          font-size: 16px;
          padding: 0.7rem 0.5rem;
          margin: 0.7rem 0 0.3rem 0;
          border-radius: 25px;
        }
      }

      .toggle-state {
        font-size: 0.8rem;
        margin-top: 1rem;

        span {
          padding: 0.15rem 0.4rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    .form-container {
      padding: 1.2rem 1.2rem;

      .heading {
        h2 {
          font-size: 1.4rem;
        }
        p {
          font-size: 0.75rem;
        }
      }

      form {
        .input-fields input {
          padding: 0.6rem 0.4rem;
          font-size: 14px;
        }

        button {
          padding: 0.6rem 0.4rem;
          font-size: 14px;
        }
      }

      .toggle-state {
        font-size: 0.75rem;
      }
    }
  }
  @media (min-width: 1200px) {
    .form-container {
      max-width: 450px;
      padding: 2.5rem 3rem;

      .heading h2 {
        font-size: 2rem;
      }
    }
  }
`;

const LoginForm = () => {
  const navigation = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Login");
  const [inputState, setInputState] = useState({
    surname: "",
    firstName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);

  const { surname, firstName, email, password } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          surname,
          firstName,
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          await getUserData();
          setState("Login");
          setInputState({
            surname: "",
            firstName: "",
            email: "",
            password: "",
          });
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success(data.message);
          navigation("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleState = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
    setInputState({
      surname: "",
      firstName: "",
      email: "",
      password: "",
    });
  };

  return (
    <LoginFormStyled>
      <div className="form-container">
        <div className="heading">
          <h2>{state === "Sign Up" ? "Create Account" : "Welcome Back"}</h2>
          <p>
            {state === "Sign Up"
              ? "Create your account to get started"
              : "Login to your account to continue"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <>
              <div className="input-fields">
                <input
                  type="text"
                  id="surname"
                  placeholder="Surname"
                  value={surname}
                  name="surname"
                  onChange={handleInput("surname")}
                  required
                />
              </div>
              <div className="input-fields">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  name="firstName"
                  onChange={handleInput("firstName")}
                  required
                />
              </div>
            </>
          )}

          <div className="input-fields">
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              name="email"
              onChange={handleInput("email")}
              required
            />
          </div>

          <div className="input-fields">
            <input
              type={ShowPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleInput("password")}
              required
              minLength={6}
            />
          </div>
          <span
            style={{
              color: "#fffffff5",
              fontSize: "16px",
              marginBottom: 0,
              fontStyle: "italic",
              display: "flex",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              onClick={() => setShowPassword(!ShowPassword)}
            />
            {ShowPassword ? "Hide" : "Show"}
          </span>

          {state === "Login" && (
            <p
              className="forgot-password"
              onClick={() => navigation("/reset-password")}
            >
              Forgot Password?
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : state}
          </button>
        </form>

        <div className="toggle-state">
          {state === "Sign Up" ? (
            <p>
              Already have an account? <span onClick={toggleState}>Login</span>
            </p>
          ) : (
            <p>
              Don't have an account? <span onClick={toggleState}>Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </LoginFormStyled>
  );
};

export default LoginForm;
