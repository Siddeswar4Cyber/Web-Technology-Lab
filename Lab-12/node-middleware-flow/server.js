const express = require("express");

const app = express();

const PORT = 5000;

app.use((req,res,next) => {
    const time = new Date().toISOString();
    console.log(`[GLOBAL] ${req.method} ${req.url} - ${time}`);
    next();
});

app.use((req,res,next) => {
    console.log("[MIDDLEWARE 2] Request is being processed...");
    next();
});

const checkAuth = (req,res,next) => {
    console.log("[AUTH] Checking user authentication...");

    const isAuthenticated = true;

    if(isAuthenticated){
        next();
    }else{
        res.send("Access Denied");
    }
};

app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.get("/dashboard",checkAuth,(req,res)=>{
    res.send("Authentication Successful! Welcome to dashboard");
});

app.get("/about",(req,res)=>{
    res.send("about page");
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});