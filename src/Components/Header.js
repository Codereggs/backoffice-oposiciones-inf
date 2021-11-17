import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Redirect } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { Button } from "@mui/material";

const Header = ({ logueado }) => {
  const [logOut, setLogOut] = useState(false);
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "" }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ bgcolor: "#e2e2e2" }}>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {logueado ? (
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "#003f72" }}
              >
                Monitoreo de Páginas
              </Link>
            ) : (
              <p style={{ color: "#003f72", padding: 0, margin: 0 }}>
                Monitoreo de Páginas
              </p>
            )}
          </Typography>
          {logueado && (
            <Button
              variant="outlined"
              sx={{ color: "#003f72", border: "#003f72 1px solid" }}
              endIcon={<HiLogout />}
              onClick={() => {
                window.localStorage.clear();
                setLogOut(true);
              }}
            >
              Salir
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {logOut && <Redirect to="/" />}
    </Box>
  );
};

export default Header;
