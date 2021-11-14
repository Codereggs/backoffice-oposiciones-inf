import * as React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

export default function CardsDashboard({ titulo, imagen, link, action, desc }) {
  const card = (
    <>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          {titulo}
        </Typography>
        {imagen}
        <Typography
          variant="p"
          component="p"
          style={{
            fontSize: "1em",
            margin: "0.5rem 1rem",
            color: "#003f72",
          }}
        >
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink
          exact
          to={link}
          style={{ margin: "0 auto", textDecoration: "none" }}
        >
          <Button
            size="small"
            variant="contained"
            style={{
              margin: "0 auto",
              backgroundColor: "#003f72",
              color: "#e2e2e2",
            }}
            onClick={action}
          >
            Ver
          </Button>
        </NavLink>
      </CardActions>
    </>
  );
  return (
    <Box sx={{ maxWidth: 200, margin: "0 auto" }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
