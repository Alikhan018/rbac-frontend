import "./login.css";
import React from "react";
import Form from "../../components/shared/Form/Form.jsx";
import { loginForm } from "../../props/forms.js";

export default function LoginView() {
  return (
    <div className="container">
      <Form inputs={loginForm} />
    </div>
  );
}
