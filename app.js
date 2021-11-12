//Requerimientos
const express = require("express");
const app = express();
const fs = require("fs");

//Extensiones a usar
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Endpoints
app.get("/infomonitor/page1", (req, res) => {
  let datos = accesarPage(1);
  res.status(200).send(datos);
});

app.get("/infomonitor/page2", (req, res) => {
  let datos = accesarPage(2);
  res.status(200).send(datos);
});

app.get("/infomonitor/page3", (req, res) => {
  let datos = accesarPage(3);
  res.status(200).send(datos);
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
  let searchPage = fs.readdirSync(`./monitor/pages/${where}`);
  let index = searchPage[num];
  let dir = `/monitor/pages/${where}/${index}`;
  return dir;
};

//Verificar que exista index.html
const accesarPage = (num) => {
  let allData = [];
  let searchPage = fs.readdirSync(`./monitor/pages/${num}`);

  searchPage.forEach((e) => {
    try {
      fs.existsSync(`./monitor/pages/${num}/${e}/index.html`)
        ? allData.push({
            id: searchPage.indexOf(e),
            createdAt: e,
            status: true,
          })
        : allData.push({
            id: searchPage.indexOf(e),
            createdAt: e,
            status: false,
          });
    } catch (err) {
      console.log(err);
    }
  });
  return allData;
};
