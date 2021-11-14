import React from "react";
import { useFormik } from "formik";
import { Alert, Button, TextField } from "@mui/material";

const Login = ({ setLogueando }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Campo vacío.";
    } else if (
      !/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/gi.test(
        values.email
      )
    ) {
      errors.email = "Escribe una dirección de email válida.";
    }

    if (!values.password) {
      errors.password = "Campo vacío.";
    } else if (values.password.length > 20) {
      errors.password = "No debe exceder los 20 carácteres.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: (values) => {
      setLogueando(values);
      formik.handleReset();
    },
  });

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem",
    alignSelf: "center",
    textAlign: "center",
    border: "2px solid #e2e2e2",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  };

  const inputStyle = {
    margin: "1rem",
    display: "block",
  };
  return (
    <div className="Inicio" style={style}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Correo Electrónico"
          id="email"
          name="email"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          style={inputStyle}
        />
        {formik.errors.email && (
          <Alert severity="error">{formik.errors.email}</Alert>
        )}

        <TextField
          label="Contraseña"
          id="pass"
          name="password"
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          style={inputStyle}
        />
        {formik.errors.password && (
          <Alert severity="error">{formik.errors.password}</Alert>
        )}
        <Button
          type="submit"
          sx={{
            marginTop: "2rem",
            borderRadius: "5px",
            color: "#e2e2e2",
            backgroundColor: "#003f72",
          }}
          variant="contained"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Login;
