const express = require("express")
const userRoutes = express()
const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()
const ensureAuthenticated = require("../middleware/ensureAuthenticated")



userRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = userRoutes
