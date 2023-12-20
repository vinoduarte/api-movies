const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const { hash } = require("bcryptjs")
const { compare } = require("bcryptjs")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if(checkUsersExists) {
      throw new AppError("Este e-mail já está em uso")
    }

    const hashedPassword = await hash(password, 8) 
    
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])


    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id
    
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user) {
      throw new AppError("Usuário não encontrado")
    }

    const updateUserEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(updateUserEmail && updateUserEmail.id !== user.id) {
      throw new AppError("Este email já está em uso")
    }

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para defirnir a nova senha")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere")
      }

      user.password = await hash(password, 8)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    await database.run(`UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?`, [user.name, user.email, user.password, new Date(), user_id])

    return response.json()
  }
}

module.exports = UserController