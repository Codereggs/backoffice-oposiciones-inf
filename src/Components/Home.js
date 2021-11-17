import Grid from "@material-ui/core/Grid";
import CardsDashboard from "./Details/CardsDashboard";
import { MdWebAsset } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [pageNames, setPageNames] = useState([]);
  const iconStyle = {
    fontSize: "5rem",
  };

  const handlePage = (num) => {
    localStorage.setItem("num", `${num}`);
  };

  const namesReq = async () => {
    const req = await axios.get(
        "https://express-app-backoffice.herokuapp.com/infomonitor/pagenames"
      ),
      data = await req.data;
    let newData = data.split("\n");
    newData.pop();
    return setPageNames(newData);
  };

  useEffect(() => {
    namesReq();
  }, []);

  let data = [
    {
      card1: (
        <Grid item xs={12} sm={3} key={100}>
          <CardsDashboard
            titulo={"Página 1"}
            desc={pageNames[0]}
            imagen={<MdWebAsset style={iconStyle} />}
            link={"/monitor"}
            action={() => handlePage(1)}
          />
        </Grid>
      ),
    },
    {
      card2: (
        <Grid item xs={12} sm={3} key={200}>
          <CardsDashboard
            titulo={"Página 2"}
            desc={pageNames[1]}
            imagen={<MdWebAsset style={iconStyle} />}
            link={"/monitor"}
            action={() => handlePage(2)}
            page="2"
          />
        </Grid>
      ),
    },
    {
      card3: (
        <Grid item xs={12} sm={3} key={300}>
          <CardsDashboard
            titulo={"Página 3"}
            desc={pageNames[2]}
            imagen={<MdWebAsset style={iconStyle} />}
            link={"/monitor"}
            action={() => handlePage(3)}
            page="3"
          />
        </Grid>
      ),
    },
  ];

  const style = {
    overflow: "auto",
    textAlign: "center",
    backgroundColor: "var(--color-primary)",
    color: "#fff",
  };

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    height: "70vh",
  };

  //Verificar si ingresó a ver alguna página, de lo contrario volver a Home
  if (!localStorage.getItem("token")) return (window.location.href = "/");

  return (
    <div className="divInicial" style={style}>
      <main style={mainStyle}>
        <Grid
          container
          spacing={2}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {data.map((el) => {
            return Object.values(el)[0];
          })}
        </Grid>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
