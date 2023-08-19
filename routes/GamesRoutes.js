const express = require("express");
const router = express.Router();

// Controller
const {
  getAllGames,
  
  
} = require("../controllers/gameControllers");

// Middlewares

router.post("/", getAllGames);



module.exports = router;