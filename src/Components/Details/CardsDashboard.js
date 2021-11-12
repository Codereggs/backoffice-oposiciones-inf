import * as React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

export default function CardsDashboard({ titulo, imagen, link }) {
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {titulo}
        </Typography>
        {imagen}
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
              backgroundColor: "#9ac9fb",
              color: "#fff",
            }}
          >
            Go
          </Button>
        </NavLink>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ maxWidth: 200, margin: "0 auto" }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
