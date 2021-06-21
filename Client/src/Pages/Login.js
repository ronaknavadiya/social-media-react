import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <LoginStyled>
      <div className="login-container">
        <div className="login-left">
          <h3>NJoy</h3>
          <span className="desc">
            Socialise all around the world with just a click !!
          </span>
        </div>
        <div className="login-right">
          <div className="loginbox">
            <input type="email" className="input-email" placeholder="Email.." />
            <input
              type="text"
              className="input-password"
              placeholder="Password.."
            />
            <button className="login-btn">Log In</button>
            <span className="forgot-pass">Forgot Password ?</span>
            <button className="login-register-btn">
              Don't have an account ?
            </button>
          </div>
        </div>
      </div>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--background-dark-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .login-container {
    width: 70%;
    height: 70%;
    display: flex;

    .login-left,
    .login-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }

    .login-left {
      h3 {
        font-size: 50px;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 10px;
      }
      .desc {
        color: white;
        font-size: 25px;
      }
    }
    .login-right {
      .loginbox {
        height: 300px;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .input-email,
        .input-password {
          height: 50px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          padding-left: 20px;
          font-size: 18px;
        }
        .input-email:focus,
        .input-password:focus {
          border: 2px solid var(--primary-color);
          outline: none;
        }
        .login-btn {
          height: 50px;
          border-radius: 10px;
          border: none;
          background-color: var(--primary-color);
          font-size: 20px;
          color: white;
          font-weight: 500;
          cursor: pointer;
        }

        .forgot-pass {
          text-align: center;
          color: var(--background-color);
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .login-register-btn {
          height: 30px;
          border-radius: 10px;
          border: none;
          background-color: #42b72a;
          font-size: 20px;
          color: white;
          font-weight: 500;
          cursor: pointer;
        }
        .login-btn:focus,
        .login-register-btn:focus {
          outline: none;
        }
      }
    }
  }
`;

export default Login;
