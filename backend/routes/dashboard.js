const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

// Rutas protegidas
router.get("/dashboard-usuario", authMiddleware, (req, res) => {
  res.render("dash-usuario/dashboard-usuario", { user: req.user });
});

router.get("/dashboard-profesional", authMiddleware, (req, res) => {
  res.render("dash-profesional/dashboard-profesional", { user: req.user });
});

router.get("/dashboard-admin", authMiddleware, (req, res) => {
  res.render("dash-admin/dashboard-admin", { user: req.user });
});

module.exports = router;