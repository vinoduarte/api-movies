const express = require("express")
const userRoutes = express()
const multer = require("multer")
const UserController = require("../controllers/UserController")
const UserAvatarController = require("../controllers/UserAvatarController")

const userController = new UserController()
const userAvatarController = new UserAvatarController()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const uploadConfig = require("../configs/upload")

const upload = multer(uploadConfig.MULTER)

userRoutes.post("/", userController.create)
userRoutes.put("/", ensureAuthenticated,  userController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = userRoutes