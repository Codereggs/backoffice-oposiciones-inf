/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Swal from "sweetalert2";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ListDetails from "./Components/ListDetails";
import Login from "./Components/Login";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [logueando, setLogueando] = useState(null);
  const [logueado, setLogueado] = useState(false);

  let tlfSize = useMediaQuery("(max-width: 575px)");

  const postUser = async (url, data) => {
    try {
      const datosEnviados = await axios.post(url, data);
      window.localStorage.setItem(
        "token",
        JSON.stringify(datosEnviados.data.token)
      );
      return datosEnviados.data;
    } catch (err) {
      let error = err.response;
      return error;
    }
  };

  useEffect(() => {
    if (logueando === null) return;
    const axiosData = async () => {
      let url =
        "https://express-app-backoffice.herokuapp.com/infomonitor/login";
      const [resData] = await Promise.all([postUser(url, logueando)]);
      if (!resData) return;
      if (resData.status < 200 || resData.status > 299)
        return tlfSize
          ? alert(resData.data)
          : Swal.fire({
              icon: "error",
              title: "Ha ocurrido un error.",
              text: resData.data,
            });
      setLogueado(true);
      window.localStorage.setItem("token", resData.response);
    };
    axiosData();
  }, [logueando]);

  //Verificar si estoy activo o no
  useEffect(() => {
    if (window.localStorage.getItem("token")) setLogueado(true);
    else setLogueado(false);
  }, [logueado]);

  //Eliminar el token
  window.onbeforeunload = () => {
    window.localStorage.removeItem("token");
    setLogueado(false);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/pagelist">
            <ListDetails />
          </Route>
          <Route path="/dashboard">
            <Home />
          </Route>
          <Route path="/">
            {logueado && <Redirect to="/dashboard" />}
            <Login setLogueando={setLogueando} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
