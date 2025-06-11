const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const app = express()
const userRoute = require("./routes/userRoute");

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log("DB connected"))
 .catch(() => console.log("DB not connected"))




// Use user routes
app.use("/", userRoute);
app.get("/", (req, res) => {
    res.send("Hello from Server shopFlix");
});

app.listen(process.env.PORT, (err) => err ? console.log(err) : console.log(`Server is running at PORT ${process.env.PORT}`));