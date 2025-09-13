const express = require("express");
const bodyParser = require("body-parser");
const planRoutes = require("./routes/planRoutes");
const { init } = require("./models/plans");
const { connectDB } = require("./models/db");
const recommendationRoutes = require("./routes/recommendationRoutes");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/api/recommendations", recommendationRoutes);

async function startServer() {
  await connectDB();   // connect to MySQL
  await init();        // ensure plans table exists

  app.use("/api/plans", planRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(` Server running on port ${PORT}`)
  );
}

startServer();
