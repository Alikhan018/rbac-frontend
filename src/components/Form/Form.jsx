import "./form.css";
import React, { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className="form">
      <div className="form-fields">
        <div className="input">
          <input
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            name="email"
            required
          />
          <label htmlFor="email" className="placeholder">
            Enter Email
          </label>
        </div>
        <div className="input">
          <input
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            name="password"
            required
          />
          <label htmlFor="password" className="placeholder">
            Enter Password
          </label>
        </div>
      </div>
      <div className="form-buttons">
        <button type="submit">Login</button>
        <a href="/">Forgot Password?</a>
      </div>
    </form>
  );
}
