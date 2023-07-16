const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mechanicRoutes = require("./routes/mechanic");
const customerRoutes = require("./routes/customer");
const appointmentRoutes = require("./routes/appointment");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/Mechanic", mechanicRoutes);
app.use("/Customer", customerRoutes);
app.use("/Appointment", appointmentRoutes);

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`listening on port ${PORT}`));
