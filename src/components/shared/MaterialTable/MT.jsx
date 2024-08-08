import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function BasicTable({ rows }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250, width: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        {rows && (
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row}
                </TableCell>
                <TableCell align="right">
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{
                      color: hoveredIndex === rowIndex ? "#EF0003" : "red",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredIndex(rowIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
