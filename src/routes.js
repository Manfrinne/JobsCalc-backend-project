const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");

routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);




module.exports = routes;
