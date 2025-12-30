import React from "react";
import styled from "styled-components";
import { PieChart, LogIn, TrendingUp, Shield, Zap } from "lucide-react";
import landingImg from "../img/landingImg.png";
import { useNavigate } from "react-router-dom";

const LandingStyled = styled.div`
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e8f5e9, #f1f8e9);

  .hero {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 5rem;
    margin-top: 60px;
    background: #dfdddec5;
    border-bottom: 1px solid #eee;

    .hero-text {
      max-width: 500px;

      h1 {
        font-size: 3rem;
        font-weight: 700;
        color: #2e7d32;
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      p {
        font-size: 1.2rem;
        color: #444;
        margin-bottom: 2rem;
        line-height: 1.6;
      }

      .cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #2e7d32;
        color: #fff;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;

        &:hover {
          background: #256528;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }

    .hero-img {
      max-width: 450px;
      flex-shrink: 0;

      img {
        width: 100%;
        border-radius: 12px;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .features {
    padding: 4rem 5rem;
    text-align: center;
    background: #ffffff;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #2e7d32;
      margin-bottom: 3rem;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;

      .feature-card {
        background: #fff;
        padding: 2.5rem 2rem;
        border-radius: 16px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        border: 1px solid #f0f0f0;

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.15);
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #2e7d32, #4caf50);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;

          svg {
            color: white;
            width: 32px;
            height: 32px;
          }
        }

        h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2e7d32;
        }

        p {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }

  .stats {
    padding: 4rem 5rem;
    background: linear-gradient(135deg, #2e7d32, #4caf50);
    color: white;
    text-align: center;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 3rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;

      .stat-item {
        h3 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
      }
    }
  }

  footer {
    text-align: center;
    padding: 2rem;
    font-size: 0.9rem;
    color: #777;
    background: #f9f9f9;
    border-top: 1px solid #eee;

    p {
      margin: 0;
      line-height: 1.6;
    }
  }

  @media (max-width: 1200px) {
    .hero {
      padding: 3rem 4rem;

      .hero-text h1 {
        font-size: 2.5rem;
      }
    }

    .features,
    .stats {
      padding: 3rem 4rem;
    }
  }

  @media (max-width: 992px) {
    .hero {
      flex-direction: column;
      text-align: center;
      gap: 3rem;
      padding: 3rem 2rem;

      .hero-text {
        max-width: 100%;

        h1 {
          font-size: 2.2rem;
        }

        p {
          font-size: 1.1rem;
        }
      }

      .hero-img {
        max-width: 500px;
        width: 100%;
      }
    }

    .features,
    .stats {
      padding: 3rem 2rem;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 2rem 1.5rem;
      margin-top: 60px;
      gap: 2rem;

      .hero-text {
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .cta-btn {
          padding: 0.7rem 1.3rem;
          font-size: 0.95rem;
        }
      }
    }

    .features {
      padding: 2.5rem 1.5rem;

      h2 {
        font-size: 1.75rem;
        margin-bottom: 2rem;
      }

      .feature-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;

        .feature-card {
          padding: 2rem 1.5rem;

          .icon-wrapper {
            width: 60px;
            height: 60px;
            margin-bottom: 1.2rem;

            svg {
              width: 28px;
              height: 28px;
            }
          }

          h3 {
            font-size: 1.2rem;
          }

          p {
            font-size: 0.95rem;
          }
        }
      }
    }

    .stats {
      padding: 2.5rem 1.5rem;

      h2 {
        font-size: 1.75rem;
        margin-bottom: 2rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;

        .stat-item {
          h3 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 1.5rem 1rem;
      gap: 1.5rem;

      .hero-text {
        h1 {
          font-size: 1.8rem;
        }

        p {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .cta-btn {
          width: 100%;
          justify-content: center;
          padding: 0.8rem 1.5rem;
        }
      }

      .hero-img {
        max-width: 100%;
      }
    }

    .features {
      padding: 2rem 1rem;

      h2 {
        font-size: 1.5rem;
      }

      .feature-grid .feature-card {
        padding: 1.5rem 1rem;
      }
    }

    .stats {
      padding: 2rem 1rem;

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;

        .stat-item {
          h3 {
            font-size: 1.8rem;
          }
        }
      }
    }

    footer {
      padding: 1.5rem 1rem;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 360px) {
    .hero .hero-text h1 {
      font-size: 1.6rem;
    }

    .features h2,
    .stats h2 {
      font-size: 1.4rem;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .hero {
      min-height: auto;
      padding: 1.5rem 2rem;

      .hero-text h1 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .hero-text p {
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
    }
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingStyled>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Take Control of Your Finances</h1>
          <p>
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>W</span>
            elcome to Tracky - your
            <strong> Personal Expense Manager</strong>. The simplest way to
            track your income, categorize your expenses, and visualize your
            spending habits. Stay in charge of your money, every day.
          </p>
          <button className="cta-btn" onClick={() => navigate("/login")}>
            <LogIn size={20} /> Get Started
          </button>
        </div>
        <div className="hero-img">
          <img src={landingImg} alt="Expense tracking dashboard" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Why Choose Tracky?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon-wrapper">
              <TrendingUp />
            </div>
            <h3>Smart Tracking</h3>
            <p>
              Automatically categorize and track all your income sources and
              expenses in one secure place.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper">
              <PieChart />
            </div>
            <h3>Visual Insights</h3>
            <p>
              Understand your spending patterns with beautiful, interactive
              charts and detailed reports.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper">
              <Shield />
            </div>
            <h3>Secure & Private</h3>
            <p>
              Your financial data is encrypted and secure. We prioritize your
              privacy above all else.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper">
              <Zap />
            </div>
            <h3>Lightning Fast</h3>
            <p>
              Quickly add transactions and get instant insights without any
              delays or complicated setup.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <h2>Trusted by Thousands</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>$5M+</h3>
            <p>Tracked Monthly</p>
          </div>
          <div className="stat-item">
            <h3>99%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>
          © {new Date().getFullYear()} Tracky - Personal Expense Manager. All
          rights reserved.
        </p>
        <p>Take control of your financial future today.</p>
      </footer>
    </LandingStyled>
  );
};

export default LandingPage;
