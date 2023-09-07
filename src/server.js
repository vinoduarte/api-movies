const express = require("express")
const routes = require("./routes")

const app = express()

app.use(express.json())

const PORT = 9999

app.listen(PORT, () => {
  console.log(`O servidor está usando a porta ${PORT}`)
})

app.use(routes)
