import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import TablePaginationActions from "./Details/TablePaginationActions";

const ListDetails = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mockedRows, setMockedRows] = useState([
    {
      id: 1,
      name: "Error 505",
      image: "http://ongapi.alkemy.org/storage/c1NyJKnQtO.jpeg",
      createdAt: "2021-08-28T18:23:35.000000Z",
    },

    {
      id: 2,
      name: "Error 500",
      image: "http://ongapi.alkemy.org/storage/AmrSwNshrt.jpeg",
      createdAt: "2021-08-28T18:20:47.000000Z",
    },

    {
      id: 3,
      name: "Error 500",
      image: "http://ongapi.alkemy.org/storage/c1NyJKnQtO.jpeg",
      createdAt: "2021-08-28T18:25:50.000000Z",
    },
  ]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mockedRows.length) : 0;

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  //Entrada para editar
  const handleEdit = (e) => {};
  //Entrada para borrar
  const handleDelete = (e) => {};
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">Listado de errores</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Error</TableCell>
              <TableCell align="center">Estado página</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? mockedRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : mockedRows
            ).map((rowsData) => (
              <TableRow key={rowsData.id}>
                <TableCell component="th" scope="row">
                  {rowsData.name}
                </TableCell>
                <TableCell align="center">
                  {rowsData.image && (
                    <img
                      src={rowsData.image}
                      alt={rowsData.name}
                      style={{
                        maxWidth: "8rem",
                        boxShadow: "0px 0px 8px 3px rgba(0,0,0,0.7)",
                        WebkitBoxShadow: "0px 0px 8px 3px rgba(0,0,0,0.7)",
                        MozBoxShadow: "0px 0px 8px 3px rgba(0,0,0,0.7)",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">{rowsData.createdAt}</TableCell>
                <TableCell align="center">
                  <IconButton children={<MdModeEdit />} onClick={handleEdit} />
                </TableCell>
                <TableCell align="center">
                  <IconButton children={<MdDelete />} onClick={handleDelete} />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={mockedRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListDetails;
