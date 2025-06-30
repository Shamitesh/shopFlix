const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require("cors");



const app = express()
app.use(cors());
const userRoute = require("./routes/userRoute");

app.use(express.json())
app.use("/", userRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB not connected"))

app.get("/", (req, res) => {
    res.send("Hello from Server shopFlix");
});

app.listen(process.env.PORT, (err) => err ? console.log(err) :
    console.log(`Server is running at PORT ${process.env.PORT}`));