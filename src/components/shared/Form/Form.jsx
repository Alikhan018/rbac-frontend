import "./scss/form.css";
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BasicTable from "../MaterialTable/MT";
import { useLocation } from "react-router-dom";
import { fetchEntity } from "../../../services/index.services";
import RolesServices from "../../../services/roles.services";
import UserServices from "../../../services/users.services";
import GroupServices from "../../../services/groups.services";

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
  const [formData, setFormData] = useState({});
  const [selected, setSelected] = useState(initialSelected);
  const [selectList, setSelectList] = useState([]);
  const [selectValues, setSelectValues] = useState({
    users: [],
    roles: [],
    groups: [],
  });
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const initializeFormData = inputs.reduce((entry, field) => {
      if (field.options.type === "input") {
        entry[field.id] = "";
      } else if (["roles", "users", "groups"].includes(field.name)) {
        entry[field.name] = [];
      }
      return entry;
    }, {});

    setFormData(initializeFormData);
  }, [inputs]);

  useEffect(() => {
    const fetchSelects = async () => {
      const rs = new RolesServices();
      const us = new UserServices();
      const gs = new GroupServices();

      const [users, roles, groups] = await Promise.all([
        us.getAllUsers(),
        rs.getAllRoles(),
        gs.getAllGroups(),
      ]);

      setSelectList({
        users: users.data.map((user) => ({
          id: user.id,
          name: user.name || user.email,
        })),
        roles: roles.data.map((role) => ({
          id: role.id,
          name: role.name,
        })),
        groups: groups.data.map((group) => ({
          id: group.id,
          name: group.name,
        })),
      });
      setSelectValues({
        users: users.data.map((user) => ({
          id: user.id,
          name: user.name || user.email,
        })),
        roles: roles.data.map((role) => ({
          id: role.id,
          name: role.name,
        })),
        groups: groups.data.map((group) => ({
          id: group.id,
          name: group.name,
        })),
      });
    };
    fetchSelects();
  }, []);

  useEffect(() => {
    if (task === "update" && id) {
      const fetchData = async () => {
        const data = await fetchEntity(showUsers, showGroups, showRoles, id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
        }));
      };
      fetchData();
    }
  }, [task, showUsers, showGroups, showRoles, id]);

  useEffect(() => {
    const map = {};
    Object.keys(selectValues).forEach((key) => {
      const values = selectValues[key];
      if (Array.isArray(values)) {
        values.forEach(({ id, name, email }) => {
          map[name || email] = id;
        });
      }
    });
    setSelectValueMap(map);
  }, [selectValues]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (name) => (e) => {
    const { value, name } = e.target;
    const id = selectValueMap[value];
    if (id !== undefined) {
      setSelectValues((prevSelectValues) => ({
        ...prevSelectValues,
        [name]: { value, id },
      }));
    }
  };

  const handleButtonClick = (name) => {
    const selectValue = selectValues[name];
    if (!selectValue || !selectValue.value) {
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
    onClick(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {Err && <div style={{ color: "red" }}>Invalid Credentials!</div>}
        {inputs
          .filter((input) => input.options.type !== "button")
          .map(({ id, type, label, name, required }) => {
            if (task === "update" && type === "password") return null;

            const inputValue = formData[id] || "";
            const selectValue = selectValues[name]?.value || "";

            if (type === "select" || type === "inputWithBtn") {
              const optionsList = Array.isArray(selectList[name])
                ? selectList[name]
                : [];
              return (
                <div key={id} className="input-select">
                  <select
                    name={name}
                    onChange={handleSelectChange(name)}
                    value={selectValue}
                  >
                    <option value="" disabled>
                      {label}
                    </option>
                    {optionsList &&
                      optionsList.map((value, index) => (
                        <option
                          key={index}
                          id={id}
                          value={value.name || value.email}
                        >
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
          })}
      </div>

      {type === "add/update" && (
        <div className="table-view">
          <div className="form-nav">
            {showRoles && <p onClick={() => setSelected("roles")}>Roles</p>}
            {showUsers && <p onClick={() => setSelected("users")}>Users</p>}
            {showGroups && <p onClick={() => setSelected("groups")}>Groups</p>}
            {selected && <div className={`underline-${selected}`}></div>}
          </div>
          <BasicTable
            rows={formData[selected] || []}
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
      )}
      <div className="form-buttons">
        {inputs
          .filter((input) => input.options.type === "button")
          .map((button) => (
            <button key={button.id} type={button.type}>
              {button.label}
            </button>
          ))}
        {inputs[0]?.label === "Login" && <a href="/">Forgot Password?</a>}
      </div>
    </form>
  );
}

Form.propTypes = {
  task: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selectValues: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string,
          email: PropTypes.string,
        })
      ),
      options: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }).isRequired,
      required: PropTypes.bool.isRequired,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  showUsers: PropTypes.bool,
  showGroups: PropTypes.bool,
  showRoles: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  Err: PropTypes.string,
};
