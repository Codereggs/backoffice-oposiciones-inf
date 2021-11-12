import {
  IconButton,
  Modal,
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
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgScreen } from "react-icons/cg";
import TablePaginationActions from "./Details/TablePaginationActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "70vh",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListDetails = () => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mockedRows, setMockedRows] = useState([
    {
      0: "2021-08-28T18:23:35.000000Z",
    },
    {
      1: "2021-08-28T18:23:35.000000Z",
    },
    {
      2: "2021-08-28T18:23:35.000000Z",
    },
  ]);
  const [pagina, setPagina] = useState(null);
  let localnum = localStorage.getItem("num");

  const peticionModal = async () => {
    const res = await axios.post(`http://localhost:8080/infomonitor/info`, {
        num: 1,
        page: localnum,
      }),
      data = await res.data;
    setPagina(data);
  };

  const reqPage = async () => {
    const res = await axios.get(
        `http://localhost:8080/infomonitor/page${localnum}`
      ),
      data = await res.data;
    setMockedRows(data);
  };
  useEffect(() => {
    peticionModal();
    reqPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mockedRows.length) : 0;

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  //Entrada para ver
  const handleModal = () => setOpen(true);
  //Cerrar
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">Estados Monitor</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Ver</TableCell>
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
                <TableCell align="center">{rowsData.createdAt}</TableCell>
                <TableCell align="center">
                  <IconButton children={<CgScreen />} onClick={handleModal} />
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            src={`${pagina}`}
            frameborder="0"
            title="página web elegida"
            style={{ width: "inherit", height: "inherit" }}
          ></iframe>
        </Box>
      </Modal>
    </>
  );
};

export default ListDetails;
