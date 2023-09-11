const express = require("express")
const userRoutes = express()
const UserController = require("../controllers/UserController")
const userController = new UserController()

userRoutes.post("/", userController.create)
userRoutes.put("/:id", userController.update)

module.exports = userRoutes