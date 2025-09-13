const express = require("express");
const bodyParser = require("body-parser");
const planRoutes = require("./src/routes/planRoutes");
const { initializeDatabase } = require("./src/database/db"); //
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/api/plans", planRoutes);

async function startServer() {
  try {
    await initializeDatabase(); 

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
 