const express = require("express")
const router = express()

//rota register.
// router.use("/api/users", require("./UserRoutes"))
router.use("/testes", require("./GamesRoutes"))
// teste route



module.exports = router