import "./scss/table.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function Table({ header, data }) {
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
              <span key={keyIndex} data-label={key}>
                {key === "actions" ? (
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "30%",
                      alignItems: "center",
                      padding: "3px 0px 0px 0px",
                    }}
                  />
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
