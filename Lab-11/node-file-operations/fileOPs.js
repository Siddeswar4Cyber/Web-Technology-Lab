const fs = require("fs");

fs.writeFile("example.txt","This is the initial content in example text file.\n",(err)=>{
    if(err){
        console.log("Error creating file: ",err);
        return;
    }
    console.log("File created successfully");

    fs.readFile("example.txt","utf8",(err,data)=>{
        if(err){
            console.log("Error reading file: ",err);
            return;
        }
        console.log("Reading File...\nFile content:\n",data);

        fs.appendFile("example.txt","This is appended content.\n",(err)=>{
            if(err){
                console.log("Error appending file: ",err);
                return;
            }
            console.log("Data appended successfully");

            fs.readFile("example.txt","utf8",(err,updatedData)=>{
                if(err){
                    console.log("Error reading updated data: ",err);
                    return;
                }
                console.log("Reading File...\nUpdated File content:\n",updatedData);

                fs.unlink("example.txt",(err)=>{
                    if(err){
                        console.log("Error deleting File: ",err);
                        return;
                    }
                    console.log("File deleted Successfully");
                });
            });
        });
    });
});