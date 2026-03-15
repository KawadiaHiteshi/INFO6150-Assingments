const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const userRoutes = require("./routes/userRoutes");

const swaggerDocument = YAML.load("./swagger/swagger.yaml");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  if (err.message === "Invalid file format. Only JPEG, PNG, and GIF are allowed.") {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Server error.",
    details: err.message,
  });
});

module.exports = app;