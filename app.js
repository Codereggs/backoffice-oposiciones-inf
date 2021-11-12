//Requerimientos
const express = require("express");
const app = express();
const fs = require("fs");

//Extensiones a usar
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Variables
var files1 = fs.readdirSync("./monitor/pages/1"),
  files2 = fs.readdirSync("./monitor/pages/2"),
  files3 = fs.readdirSync("./monitor/pages/3");

let data = [];

//Endpoints
app.get("/infomonitor/page1", (req, res) => {
  files1.forEach((e) => {
    let objeto = { createdAt: e };
    data.push(objeto);
  });
  res.status(200).send(data);
  data = [];
});

app.get("/infomonitor/page2", (req, res) => {
  files2.forEach((e) => {
    let objeto = { createdAt: e };
    data.push(objeto);
  });
  res.status(200).send(data);
  data = [];
});

app.get("/infomonitor/page3", (req, res) => {
  files3.forEach((e) => {
    let objeto = { createdAt: e };
    data.push(objeto);
  });
  res.status(200).send(data);
  data = [];
});

app.post("/infomonitor/info", (req, res) => {
  var num = req.body;
  var direction = directionMonitor(num.num, num.page);
  console.log(direction);
  res.status(200).send(direction);
});

//Configuración servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Función Buscar Dirección de la carpeta
const directionMonitor = (num, where) => {
  var searchPage = fs.readdirSync(`./monitor/pages/${where}`);
  var index = searchPage[num];
  var dir = `/monitor/pages/${where}/${index}`;
  return dir;
};

//Buscar HTML
/* const accesarPage = (num, where) => {
  const fs = require("fs");
  var searchPage = fs.readdirSync(`./src/monitor/pages/${where}`);
  var index = searchPage[num];
  var resultPage = fs.readdirSync(`./src/monitor/pages/${where}/${index}`);
  var indexHtml = resultPage.indexOf("index.html");
  let fs_data = fs.readFileSync(
    `./src/monitor/pages/${where}/${index}/${resultPage[indexHtml]}`
  );
  return fs_data;
}; */
