import "./form.css";
import React, { useState } from "react";
import UserServices from "../../../services/users.services";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Form({ inputs }) {
  const navigate = useNavigate();
  const inputFields = inputs.filter((input) => {
    return input.options.type === "input";
  });
  const buttons = inputs.filter((input) => {
    return input.options.type === "button";
  });
  const initialState = inputFields.reduce((entry, field) => {
    entry[field.id] = "";
    return entry;
  }, {});
  const [formData, setFormData] = useState(initialState);
  const [falseCredentials, setFalseCredentials] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const us = new UserServices();
    try {
      const response = await us.login(formData);
      if (response.message === "logged in") {
        setFalseCredentials(false);
        navigate("home");
      } else {
        setFalseCredentials(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {falseCredentials && (
          <div style={{ color: "red" }}>Invalid Credentials!</div>
        )}
        {inputFields.map(
          ({ id, type, label, name, selectValues, required }) => {
            if (type === "select") {
              return (
                <div key={id} className="input">
                  <select required={required} name={name}>
                    {label}
                    {selectValues.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            }
            return (
              <div key={id} className="input">
                <input
                  name={name}
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                  required={required}
                />
                <label htmlFor={id} className="placeholder">
                  {label}
                </label>
              </div>
            );
          }
        )}
      </div>
      <div className="form-buttons">
        {buttons.map((button) => (
          <button key={button.id} type={button.type}>
            {button.label}
          </button>
        ))}
        {buttons[0].label === "Login" && <a href="/">Forgot Password?</a>}
      </div>
    </form>
  );
}

Form.protoTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selectValues: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
        })
      ),
      options: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }).isRequired,
      required: PropTypes.bool.isRequired,
    }).isRequired
  ),
};
