const { Router } = require("express")
const userRoutes = require("./users.routes.js")
const notesRoutes = require("./notes.routes.js")


const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)


module.exports = routes