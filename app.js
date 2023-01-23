const express = require("express");
const cors = require("cors");
const config = require("config");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: config.get("clientUrl"),
  })
);

app.use("/home", require("./routes/home"));
app.use("/api/system", require("./routes/system.routes"));

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const PORT = config.get("port") || 5000;

console.log("PORT: ", PORT);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
