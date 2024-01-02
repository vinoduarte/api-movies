const { Router } = require("express")
const userRoutes = require("./users.routes.js")
const notesRoutes = require("./notes.routes.js")
const tagsRoutes = require("./tags.routes.js")
const sessionsRoutes = require("./sessions.routes.js")
const cors = require("cors")



const routes = Router()


routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)
routes.use("/sessions", cors({ origin: "*" }), sessionsRoutes)




module.exports = routes