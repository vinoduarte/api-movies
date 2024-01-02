require("dotenv/config")
require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const migrationsRun = require("./database/sqlite/migrations");
const app = express();
const uploadConfig = require("./configs/upload");
const cors = require("cors")
app.use(cors({
  origin: "*",
  methods: ["*"],
}))
app.use(express.json());
migrationsRun();

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`O servidor está usando a porta ${PORT}`);
});
