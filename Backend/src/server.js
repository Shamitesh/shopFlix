const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose
 .connect(
    "mongodb+srv://amiketesh36:asdf321@cluster0.ck3fz.mongodb.net/shopFlix"
)
 .then(() => console.log("DB connected"))
 .catch(() => console.log("DB not connected"))


const userRoute = require("./routes/userRoute");

// Use user routes
app.use("/", userRoute);
app.get("/", (req, res) => {
    res.send("Hello from Server");
});
const PORT = 4000;
app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server is running at PORT ${PORT}`));