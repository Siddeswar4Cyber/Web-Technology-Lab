const http = require('http');

const PORT = 3000;

const server = http.createServer((req,res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    res.setHeader('Content-Type','text/plain');

    res.write("Hello! I'm Deepak.\n");

    res.end("Server response completed");
});


server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})