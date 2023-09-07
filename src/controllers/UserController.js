const AppError = require("../utils/AppError")

class UserController {
  create(request, response) {
    const { name, email, password } = request.body

    if(!name) {
      return AppError("Você não colocou o nome", 102)
    }

    response.json({ name, email, password })
  }
}

module.exports = UserController