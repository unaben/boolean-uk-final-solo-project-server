require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const authRouter = require("./resources/auth/router");
const userRouter = require("./resources/users/router");
const contactRouter = require("./resources/contacts/router");
const taxiRouter = require("./resources/taxis/router");
const driverRouter = require("./resources/drivers/router");
const tripRouter = require("./resources/trips/router");

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use("/", authRouter);
app.use("/contacts", contactRouter);
app.use("/users", userRouter);
app.use("/taxis", taxiRouter);
app.use("/drivers", driverRouter);
app.use("/trips", tripRouter);

/* For admin users only */

// app.use("/users", protect, adminRoute, userRouter)

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
