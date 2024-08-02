import "./scss/table.css";
import React from "react";

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
                {key === "actions"
                  ? tuple[key].map((action, actionIndex) => (
                      <span key={actionIndex}>
                        {typeof action === "object"
                          ? JSON.stringify(action)
                          : action}
                      </span>
                    ))
                  : tuple[key]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
