import "./login.css";
import React from "react";
import Form from "../../components/Form/Form.jsx";

export default function LoginView({ inputs }) {
  return (
    <div className="container">
      <Form inputs={inputs} />
    </div>
  );
}
