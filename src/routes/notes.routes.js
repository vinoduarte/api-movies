const express = require("express")
const userRoutes = express()
const NotesController = require("../controllers/NotesController")
const notesController = new NotesController()

userRoutes.post("/:user_id", notesController.create)
userRoutes.get("/:id", notesController.show)
userRoutes.delete("/:id", notesController.delete)
userRoutes.get("/", notesController.index)



module.exports = userRoutes