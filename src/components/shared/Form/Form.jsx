import "./scss/form.css";
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BasicTable from "../MaterialTable/MT";

export default function Form({
  inputs,
  type,
  showUsers,
  showGroups,
  showRoles,
}) {
  const initialSelected = useMemo(() => {
    if (showRoles) return "roles";
    if (showUsers) return "users";
    if (showGroups) return "groups";
    return "";
  }, [showUsers, showGroups, showRoles]);

  const [selected, setSelected] = useState(initialSelected);
  const [data, setData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  const inputFields = inputs.filter((input) => input.options.type === "input");
  const buttons = inputs.filter((input) => input.options.type === "button");

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

  const handleSelectChange = (e, id) => {
    const { value } = e.target;
    setSelectValue(value);
  };

  const handleButtonClick = (id) => {
    setData((prevData) => ({
      ...prevData,
      [id]: [...(prevData[id] || []), selectValue],
    }));
    setTableData(data[id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
  };
  useEffect(() => {
    if (selected) {
      setTableData(data[selected] || []);
    }
  }, [data, selected]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {falseCredentials && (
          <div style={{ color: "red" }}>Invalid Credentials!</div>
        )}
        {inputFields.map(
          ({ id, type, label, name, selectValues, required }) => {
            if (type === "select" || type === "inputWithBtn") {
              return (
                <div key={id} className="input-select">
                  <select
                    required={required}
                    name={name}
                    onChange={(e) => handleSelectChange(e, id)}
                  >
                    <option value="" disabled selected>
                      {label}
                    </option>
                    {selectValues.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <Button
                    text={"Add"}
                    type={"button"}
                    onClick={() => handleButtonClick(name)}
                    icon={faAdd}
                  />
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

      {type === "add/update" && (
        <div className="table-view">
          <div className="form-nav">
            {showRoles && (
              <p
                onClick={() => {
                  setSelected("roles");
                  setTableData(data["roles"] || []);
                }}
              >
                Roles
              </p>
            )}
            {showUsers && (
              <p
                onClick={() => {
                  setSelected("users");
                  setTableData(data["users"] || []);
                }}
              >
                Users
              </p>
            )}
            {showGroups && (
              <p
                onClick={() => {
                  setSelected("groups");
                  setTableData(data["groups"] || []);
                }}
              >
                Groups
              </p>
            )}
            {(showGroups || showRoles || showUsers) && (
              <div
                className={`${
                  selected === "groups" ? `underline-groups` : `underline-roles`
                }`}
              ></div>
            )}
          </div>
          <div>
            <BasicTable rows={tableData} />
          </div>
        </div>
      )}
      <div className="form-buttons">
        {buttons.map((button) => (
          <button key={button.id} type={button.type}>
            {button.label}
          </button>
        ))}
        {buttons[0]?.label === "Login" && <a href="/">Forgot Password?</a>}
      </div>
    </form>
  );
}

Form.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selectValues: PropTypes.arrayOf(PropTypes.string),
      options: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }).isRequired,
      required: PropTypes.bool.isRequired,
    }).isRequired
  ),
};
