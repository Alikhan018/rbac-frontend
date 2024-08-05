import "./scss/table.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../DropDown/DropDown";

export default function Table({ header, data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const keys = Object.keys(header);

  return (
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
          <div key={tupleIndex} className="table-row">
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
                        cursor: "pointer",
                        color: hoveredIndex === tupleIndex ? "blue" : "black",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "30%",
                        alignItems: "center",
                        padding: "3px 0px 0px 0px",
                      }}
                      onMouseEnter={() => setHoveredIndex(tupleIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() =>
                        setClickedIndex(
                          clickedIndex === tupleIndex ? null : tupleIndex
                        )
                      }
                    />
                    {clickedIndex === tupleIndex && <DropDown />}
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
  );
}
