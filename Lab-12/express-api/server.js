const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/users',userRoutes);

app.listen(PORT,()=> {
    console.log(`Server running at http://localhost:${PORT}`);
})

