const express = require("express")
const userRoutes = express()
const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

userRoutes.get("/", tagsController.index)

module.exports = userRoutes
