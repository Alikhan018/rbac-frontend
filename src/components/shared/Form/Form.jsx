import "./scss/form.css";
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BasicTable from "../MaterialTable/MT";
import { useLocation } from "react-router-dom";
import { fetchEntity } from "../../../services/index.services";

export default function Form({
  task,
  inputs,
  type,
  showUsers,
  showGroups,
  showRoles,
  onClick,
  Err,
}) {
  const initialSelected = useMemo(() => {
    if (showRoles) return "roles";
    if (showUsers) return "users";
    if (showGroups) return "groups";
    return "";
  }, [showUsers, showGroups, showRoles]);
  const [selectValueMap, setSelectValueMap] = useState({});
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const map = {};
    inputs.forEach(({ selectValues }) => {
      if (selectValues) {
        selectValues.forEach(({ id, name, email }) => {
          map[name || email] = id;
        });
      }
    });
    setSelectValueMap(map);
  }, [inputs]);

  const [selected, setSelected] = useState(initialSelected);

  const initialState = inputs.reduce((entry, field) => {
    if (field.options.type === "input") {
      entry[field.id] = "";
    } else if (["roles", "users", "groups"].includes(field.name)) {
      entry[field.name] = [];
    }
    return entry;
  }, {});

  useEffect(() => {
    if (task === "update") {
      const fetchData = async () => {
        const data = await fetchEntity(showUsers, showGroups, showRoles, id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
        }));
      };
      fetchData();
    }
  }, [task, showUsers, showGroups, showRoles]);

  const [formData, setFormData] = useState(initialState);
  const [selectValue, setSelectValue] = useState("");

  const inputFields = inputs.filter((input) => input.options.type === "input");
  const buttons = inputs.filter((input) => input.options.type === "button");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    const id = selectValueMap[value];
    console.log(id, value, e.target);
    setSelectValue({ value, id });
  };

  const handleButtonClick = (name) => {
    if (
      selectValue === "Select Roles" ||
      selectValue === "Select Groups" ||
      selectValue === "Select Users"
    ) {
      return;
    }
    setFormData((prevFormData) => {
      const existingEntries = prevFormData[name] || [];
      if (existingEntries.some((entry) => entry.id === selectValue.id)) {
        return prevFormData;
      }
      return {
        ...prevFormData,
        [name]: [...existingEntries, selectValue],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    onClick(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {Err && <div style={{ color: "red" }}>Invalid Credentials!</div>}
        {inputFields.map(
          ({ id, type, label, name, selectValues, required }) => {
            if (task === "update" && type === "password") {
              return;
            }
            const inputValue = formData[id] || ""; // Get value from formData

            if (type === "select" || type === "inputWithBtn") {
              return (
                <div key={id} className="input-select">
                  <select
                    name={name}
                    onChange={handleSelectChange}
                    value={selectValue.value || ""}
                  >
                    <option value="" disabled>
                      {label}
                    </option>
                    {selectValues.map((value, index) => (
                      <option key={index} value={value.name || value.email}>
                        {value.name || value.email}
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
                  value={inputValue}
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
            {showRoles && <p onClick={() => setSelected("roles")}>Roles</p>}
            {showUsers && <p onClick={() => setSelected("users")}>Users</p>}
            {showGroups && <p onClick={() => setSelected("groups")}>Groups</p>}
            {((showGroups && showRoles) || (showUsers && showGroups)) && (
              <div
                className={`${
                  selected === "groups" ? `underline-groups` : `underline-roles`
                }`}
              ></div>
            )}
            {showRoles && showUsers && (
              <div
                className={`${
                  selected === "roles"
                    ? `underline-roles-two`
                    : `underline-users`
                }`}
              ></div>
            )}
          </div>
          <div>
            <BasicTable
              rows={formData[selected]}
              onDelete={(id) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [selected]: prevFormData[selected].filter(
                    (item) => item.id !== id
                  ),
                }));
              }}
            />
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
      id: PropTypes.string.isRequired,
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
