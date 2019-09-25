const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

const questionsRoutes = require("./question.routes");
const vacanciesRoutes = require("./vacancy.routes");
const usersRoutes = require("./user.routes");
const applicationRoutes = require("./application.routes");
const systemVarsRoutes = require("./system_vars.routes");

router.use("/hc", (req, res) => res.status(200).json({}));
router.use("/users", usersRoutes);
router.use("/questions", checkAuth, questionsRoutes);
router.use("/vacancies", checkAuth, vacanciesRoutes);
router.use("/applications", checkAuth, applicationRoutes);
router.use("/system-vars", checkAuth, systemVarsRoutes);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json(err.message);
});

router.use("*", (req, res) => {
  res.status(404).json({ message: "Error 404: Not found" });
});

module.exports = router;
