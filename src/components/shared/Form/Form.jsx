import "./scss/form.css";
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BasicTable from "../MaterialTable/MT";
import { useLocation } from "react-router-dom";
import {
  fetchEntity,
  getAllDataForEntities,
} from "../../../services/index.services";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
  const isOptionEqualToValue = (option, value) => option.id !== value.id; //idk but its making autocomplete work
  const initialSelected = useMemo(() => {
    if (showRoles) return "roles";
    if (showUsers) return "users";
    if (showGroups) return "groups";
    return "";
  }, [showUsers, showGroups, showRoles]);

  //States declaration
  const [selectValueMap, setSelectValueMap] = useState({}); //states for all entities for all selects to retrive ids and names/email
  const [formData, setFormData] = useState({}); //formData state
  const [selected, setSelected] = useState(initialSelected); //to represent which entity is selected to view in table under the form
  const [selectList, setSelectList] = useState([]); //rendering list for select
  const [selectValues, setSelectValues] = useState({
    users: [],
    roles: [],
    groups: [],
  }); //state to show selected items by user
  const [selectValuesForRender, setSelectValuesForRender] = useState({
    users: [],
    roles: [],
    groups: [],
  }); //state to represent value of select
  //end of state declaration

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
      const allDataObj = await getAllDataForEntities();
      setSelectList(allDataObj);
      setSelectValuesForRender(allDataObj);
    };
    if (task !== "change-password") {
      fetchSelects();
    }
  }, [task]);

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
    Object.keys(selectValuesForRender).forEach((key) => {
      const values = selectValuesForRender[key];
      if (Array.isArray(values)) {
        values.forEach(({ id, name, email }) => {
          map[name || email] = id;
        });
      }
    });
    setSelectValueMap(map);
  }, [selectValuesForRender]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (name) => (event, newValue) => {
    if (!newValue) return;
    const value = newValue.name || newValue.email || "";
    const id = selectValueMap[value];
    if (id !== undefined) {
      setSelectValues((prevSelectValues) => {
        const updatedValues = prevSelectValues[name].some(
          (item) => item.id === id
        )
          ? prevSelectValues[name]
          : [{ value, id }];

        return {
          ...prevSelectValues,
          [name]: updatedValues,
        };
      });
    }
  };

  const handleButtonClick = (name) => {
    const selectValue = selectValues[name];
    if (!selectValue || selectValue.length === 0) {
      return;
    }

    setFormData((prevFormData) => {
      const existingEntries = prevFormData[name] || [];
      const newEntries = selectValue.filter(
        (entry) => !existingEntries.some((e) => e.id === entry.id)
      );
      return {
        ...prevFormData,
        [name]: [...existingEntries, ...newEntries],
      };
    });
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      [name]: [],
    }));
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
            const selectValue = selectValuesForRender[name]?.[0]?.name || "";

            if (type === "select" || type === "inputWithBtn") {
              const optionsList = Array.isArray(selectList[name])
                ? selectList[name]
                : [];
              return (
                <div key={id} className="input-select">
                  <Autocomplete
                    disablePortal
                    id={id}
                    options={optionsList}
                    sx={{
                      width: 430,
                      backgroundColor: "white",
                    }}
                    getOptionLabel={(option) =>
                      option.name || option.email || ""
                    }
                    isOptionEqualToValue={isOptionEqualToValue}
                    value={selectValue || "" || null}
                    onChange={handleSelectChange(name)}
                    renderInput={(params) => (
                      <TextField {...params} label={label} variant="outlined" />
                    )}
                  />
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
            {selected && (
              <div
                className={`
                  ${showRoles && showUsers ? `underline-${selected}-two` : ""}
                  ${showGroups && showUsers ? `underline-${selected}` : ""}
                  ${showRoles && showGroups ? `underline-${selected}` : ""}
                `}
              ></div>
            )}
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
            action={true}
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
    })
  ).isRequired,
  type: PropTypes.string,
  showUsers: PropTypes.bool,
  showGroups: PropTypes.bool,
  showRoles: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  Err: PropTypes.string,
};
