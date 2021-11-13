import Grid from "@material-ui/core/Grid";
import CardsDashboard from "./Details/CardsDashboard";
import { MdWebAsset } from "react-icons/md";

const Home = () => {
  const iconStyle = {
    fontSize: "5rem",
  };
  localStorage.clear();
  const handlePage = (num) => {
    localStorage.setItem("num", `${num}`);
  };

  let data = [
    {
      card1: (
        <Grid item xs={12} sm={3} key={100}>
          <CardsDashboard
            titulo={"Página 1"}
            imagen={<MdWebAsset style={iconStyle} />}
            link={"/pagelist"}
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
            imagen={<MdWebAsset style={iconStyle} />}
            link={"/pagelist"}
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
            imagen={<MdWebAsset style={iconStyle} />}
            link={"/pagelist"}
            action={() => handlePage(3)}
            page="3"
          />
        </Grid>
      ),
    },
  ];

  const style = {
    textAlign: "center",
    width: "100vw",
    height: "100vh",
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

  return (
    <div style={style}>
      <main style={mainStyle}>
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
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
