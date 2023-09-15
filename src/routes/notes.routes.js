const express = require("express")
const userRoutes = express()
const NotesController = require("../controllers/NotesController")
const notesController = new NotesController()

userRoutes.post("/:user_id", notesController.create)
userRoutes.get("/:id", notesController.show)

module.exports = userRoutes