import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "" }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ bgcolor: "#e2e2e2" }}>
          <Typography variant="h6" color="inherit" component="div">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "#003f72" }}
            >
              Monitoreo de Páginas
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
