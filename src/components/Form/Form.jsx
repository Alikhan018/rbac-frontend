import "./form.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Form({ inputs }) {
  const initialState = inputs.reduce((entry, field) => {
    entry[field.id] = "";
    return entry;
  }, {});
  const inputFields = inputs.filter((input) => {
    return input.options.type === "input";
  });
  const buttons = inputs.filter((input) => {
    return input.options.type === "button";
  });
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <form className="form">
      <div className="form-fields">
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
