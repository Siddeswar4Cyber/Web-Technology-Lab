const express = require("express");

const mongoose = require("mongoose");

const PORT = 3000;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/userDB')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("err"));

const userRoutes = require("./routes/userRoutes");

app.use("/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});