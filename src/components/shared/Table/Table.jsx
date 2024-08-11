import "./scss/table.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../DropDown/DropDown";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function Table({
  header,
  data,
  onDelete,
  btnText,
  onAdd,
  addBtn,
  onEdit,
}) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const keys = Object.keys(header);

  return (
    <div className="table-component-container">
      {addBtn && (
        <Button text={btnText} type={"submit"} icon={faAdd} onClick={onAdd} />
      )}
      <div className="table">
        <div className="table-head">
          {keys.map((key, index) => (
            <span className="table-cell" key={index}>
              {header[key]}
            </span>
          ))}
        </div>
        <div className="table-body">
          {data.map((tuple, tupleIndex) => (
            <div
              key={tupleIndex}
              className="table-row"
              style={{ color: hoveredIndex === tupleIndex ? "blue" : "black" }}
              onMouseEnter={() => setHoveredIndex(tupleIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                navigate(`display/${tuple.id}`, {
                  state: { id: tuple.id },
                });
              }}
            >
              {keys.map((key, keyIndex) => (
                <span
                  key={keyIndex}
                  data-label={key}
                  style={{ position: "relative" }}
                >
                  {key === "actions" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        style={{
                          width: "10px",
                          cursor: "pointer",
                          color: hoveredIndex === tupleIndex ? "blue" : "black",
                          display: "flex",
                          position: "absolute",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: "3px 0px 0px 0px",
                          zIndex: 10,
                        }}
                        onMouseEnter={() => setHoveredIndex(tupleIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setClickedIndex(
                            clickedIndex === tupleIndex ? null : tupleIndex
                          );
                        }}
                      />
                      {clickedIndex === tupleIndex && (
                        <DropDown
                          onDelete={(e) => {
                            e.stopPropagation();
                            onDelete(tuple.id);
                          }}
                          onEdit={(e) => {
                            e.stopPropagation();
                            onEdit(tuple.id);
                          }}
                        />
                      )}
                    </>
                  ) : (
                    tuple[key]
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
