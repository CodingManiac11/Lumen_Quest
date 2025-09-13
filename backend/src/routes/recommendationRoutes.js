const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/recommendationController");

router.get("/", ctrl.getAll);       // GET /api/recommendations
router.get("/:id", ctrl.getById);   // GET /api/recommendations/:id

module.exports = router;