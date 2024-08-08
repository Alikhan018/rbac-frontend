import "./login.css";
import React from "react";
import Form from "../../components/shared/Form/Form.jsx";
import { loginForm } from "../../props/forms.js";
import UserServices from "../../services/users.services.js";
import { useState } from "react";

export default function LoginView() {
  const [err, setErr] = useState(false);
  const handleLogin = async (logdata) => {
    const us = new UserServices();
    try {
      const data = await us.login(logdata);
      if (data.message === "logged in") {
        console.log(data);
        setErr(false);
      } else {
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="container">
      <Form
        Err={err}
        inputs={loginForm}
        type={"login"}
        showUsers={false}
        showGroups={false}
        showRoles={false}
        onClick={handleLogin}
      />
    </div>
  );
}
