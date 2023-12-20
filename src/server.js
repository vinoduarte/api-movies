require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const migrationsRun = require("./database/sqlite/migrations");
const app = express();
const uploadConfig = require("./configs/upload");
const cors = require("cors")
app.use(express.json());
migrationsRun();

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(cors())
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

const PORT = 9999;

app.listen(PORT, () => {
  console.log(`O servidor está usando a porta ${PORT}`);
});
