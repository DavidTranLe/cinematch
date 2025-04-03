import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import "../CSS/AccountInfo.css";
import SplashPage from '../SplashPage';

function AccountInfo({ token }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchAccountInformation = async () => {
      const response = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/accounts/current`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      }
    };
    fetchAccountInformation();
  }, [token]);

  if(token===null){
    return (
        <Routes>
          <Route
            path="*"
            element={
              <SplashPage
              />
            }
          />
        </Routes>
      )
  } else {

  return (
    <div
      className="account-information-container"
      style={{
        background:
          "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
        color: "white",
      }}
    >
      <div
        className="account-information"
        style={{ border: "0.7px solid #fff" }}
      >
        <h2>Hello {name}!</h2>
        <p>
          <strong>Account Information</strong>
        </p>
        <div className="account-values"></div>
        <p>
          <strong>Name:</strong> <span className="account-value">{name}</span>
        </p>
        <p>
          <strong>Email:</strong> <span className="account-value">{email}</span>
        </p>
      </div>
    </div>
  );
}}
export default AccountInfo;
