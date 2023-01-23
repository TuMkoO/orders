// Import packages
const config = require("config");
const express = require("express");
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);

// connection
const port = config.get("port") || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));
