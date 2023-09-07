const AppError = require("../utils/AppError")

class UserController {
  create(request, response) {
    const { name, email, password } = request.body

    if(!name) {
      throw new AppError("Você não colocou o nome")
    }

    response.json({ name, email, password })
  }
}

module.exports = UserController