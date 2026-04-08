const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

//Register listeners
eventEmitter.on('userLogin',(username)=>{
    console.log(`Listener 1 : ${username} is logged in.`);
});

eventEmitter.on('userLogin',(username)=> {
    console.log(`Listener 2 : welcome ${username}`);
});

eventEmitter.on('fileUploaded',(filename)=>{
    console.log(`File Uploaded: ${filename}`);
});

console.log("Starting application...");

eventEmitter.emit('userLogin','Arjun');

eventEmitter.emit('fileUploaded','example.pdf');

setTimeout(()=>{
    eventEmitter.emit('userLogin','Ajay');
},2000);