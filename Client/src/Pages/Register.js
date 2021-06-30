import React, { useRef } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context/AuthContext";
import { registerCall } from "../apiCalls";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const confirmPassword = useRef();
  const { dispatch, user } = useGlobalContext();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.current.value === confirmPassword.current.value) {
      registerCall(
        {
          email: email.current.value,
          username: username.current.value,
          password: password.current.value,
        },
        dispatch,
        history
      );
    } else {
      confirmPassword.current.setCustomValidity("password doesn't match");
    }
    console.log("data", user);
  };

  return (
    <RegisterStyled>
      <div className="login-container">
        <div className="login-left">
          <h3>NJoy</h3>
          <span className="desc">
            Socialise all around the world with just a click !!
          </span>
        </div>
        <div className="login-right">
          <form className="loginbox" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-email"
              placeholder="Username.."
              ref={username}
              required
            />
            <input
              type="email"
              className="input-email"
              placeholder="Email.."
              ref={email}
              required
            />
            <input
              type="password"
              className="input-password"
              placeholder="Password.."
              ref={password}
              required
              minLength="6"
            />
            <input
              type="password"
              className="input-password"
              placeholder="Confirm Password.."
              ref={confirmPassword}
              required
              minLength="6"
            />
            <button className="login-btn" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="login-register-btn">Have an account ?</button>
            </Link>
          </form>
        </div>
      </div>
    </RegisterStyled>
  );
};

const RegisterStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--background-dark-color);
  display: flex;
  align-items: center;
  justify-content: center;
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
        height: 400px;
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
          width: 100%;
        }
        .login-btn:focus,
        .login-register-btn:focus {
          outline: none;
        }
      }
    }
  }
`;

export default Register;
