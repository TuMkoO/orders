const express = require("express");
const cors = require("cors");
// const config = require("config");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/system", require("./routes/system.routes"));
// app.use("/api/company", require("./routes/company.routes"));
app.use("/api/ownership-type", require("./routes/ownershipType.routes"));
app.use(
  "/api/certification-system",
  require("./routes/certificationSystem.routes")
);
app.use("/api/order-training", require("./routes/orderTraining.routes"));
app.use(
  "/api/order-training-numbering",
  require("./routes/orderTrainingNumbering.routes")
);
app.use("/api/listeners", require("./routes/listeners.routes"));

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
