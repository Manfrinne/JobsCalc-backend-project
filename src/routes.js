const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController")

routes.get("/", DashboardController.index);

routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

routes.get("/job", JobController.create);
routes.post("/job", JobController.save);





module.exports = routes;
