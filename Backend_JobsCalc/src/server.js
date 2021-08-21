const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

// usar template engine
server.set("view engine", "ejs");

// Mudar local da pasta views
server.set("views", path.join(__dirname, "views"));

// habilitar arquivos estáticos
server.use(express.static("public"));

// para usar o req.body
server.use(express.urlencoded({ extended: true }));

// para usar routes em outro arquivo
server.use(routes);

// iniciar o servidor e avisar no backende
server.listen(8080, () => console.log("Hacking the planet! Server run...!"));
