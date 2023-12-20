const express = require("express")
const userRoutes = express()
const NotesController = require("../controllers/NotesController")
const notesController = new NotesController()
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

userRoutes.use(ensureAuthenticated)


userRoutes.post("/", notesController.create)
userRoutes.get("/:id", notesController.show)
userRoutes.delete("/:id", notesController.delete)
userRoutes.get("/", notesController.index)



module.exports = userRoutes