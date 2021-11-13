/* eslint-disable react-hooks/exhaustive-deps */
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
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgScreen } from "react-icons/cg";
import PortalModal from "./Details/PortalModal";
import TablePaginationActions from "./Details/TablePaginationActions";
import { Redirect } from "react-router-dom";
import { VscDebugDisconnect } from "react-icons/vsc";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import { AiOutlineClose } from "react-icons/ai";

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
  const [pos, setPos] = useState(null);
  const [value, setValue] = useState();
  const [tablaF, setTablaF] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mockedRows, setMockedRows] = useState([]);
  const [pagina, setPagina] = useState(null);
  let localnum = localStorage.getItem("num");

  const peticionModal = async (pos) => {
    try {
      const res = await axios.post(`http://localhost:8080/infomonitor/info`, {
          num: pos,
          page: localnum,
        }),
        data = await res.data;
      if (data.includes("undefined")) return setPagina(null);
      setPagina(data);
    } catch (err) {
      console.error(err);
    }
  };

  const reqPage = async () => {
    const res = await axios.get(
        `http://localhost:8080/infomonitor/page${localnum}`
      ),
      data = await res.data;
    setMockedRows(data);
  };

  useEffect(() => {
    reqPage();
    setTablaF(mockedRows);
  }, []);

  useEffect(() => {
    peticionModal(pos);
  }, [pos, peticionModal]);

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
  const handleModal = (e) => {
    setPos(e.target.id);
    setOpen(true);
  };
  //Cerrar Modal
  const handleClose = () => setOpen(false);

  //Filtrar tabla
  const filterTable = (valueR) => {
    let search = mockedRows.filter((item) => {
      if (item.createdAt.toString().includes(valueR)) {
        return item;
      }
      return null;
    });
    setTablaF(search);
  };

  //Realizar peticion de vuelta
  const secRequest = () => {
    reqPage();
    setTablaF(mockedRows);
  };

  //Verificar si ingresó a ver alguna página, de lo contrario volver a Home
  if (localStorage.getItem("num") === null) return <Redirect to="/" />;
  return (
    <>
      <Box
        style={{
          width: "30%",
          alignSelf: "flex-end",
          textAlign: "end",
          paddingRight: "1rem",
          margin: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha a buscar"
            value={value}
            onChange={(newValue) => {
              if (!newValue) return secRequest();
              let dia =
                new Date(newValue).getDate().toString().length === 1
                  ? "0" + new Date(newValue).getDate().toString()
                  : new Date(newValue).getDate();

              let mes = new Date(newValue).getMonth() + 1;
              let anio = new Date(newValue).getFullYear();

              let realV = anio + "-" + mes + "-" + dia;
              setValue(newValue);
              filterTable(realV);
            }}
            format="DD-MM-YYYY"
            renderInput={(params) => <TextField {...params} />}
          />
          <IconButton>
            <AiOutlineClose onClick={secRequest} />
          </IconButton>
        </LocalizationProvider>
      </Box>

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
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Estado
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Fecha
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Hora
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Ver
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tablaF.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tablaF
            ).map((rowsData) => (
              <TableRow key={rowsData.id}>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {rowsData.status ? (
                    <h4 style={{ color: "green", margin: "0" }}>OK</h4>
                  ) : (
                    <h4 style={{ color: "red", margin: "0" }}>ERROR</h4>
                  )}
                </TableCell>
                <TableCell align="center">{rowsData.createdAt}</TableCell>
                <TableCell align="center">{rowsData.hour}</TableCell>
                <TableCell align="center">
                  {rowsData.status ? (
                    <IconButton>
                      <CgScreen onClick={handleModal} id={rowsData.id} />
                    </IconButton>
                  ) : (
                    <VscDebugDisconnect style={{ fontSize: "2em" }} />
                  )}
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
      <PortalModal
        open={open}
        handleClose={handleClose}
        style={style}
        pagina={pagina}
      />
    </>
  );
};

export default ListDetails;
