var fs = require('fs');

const path = require('path')

// import express
const express=require('express');
// import cors
const cors=require('cors');

// cimport multer for file upload

const multer=require('multer');


// assign server port
//const port=3000;

// set app to express
const app=express();

// apply corsoption 
// var corsOptions = {
//     origin: 'http://4200', //angular port  
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


// use cors() function
app.use(cors());

//The disk storage engine gives us full control on storing files to disk.
// such as file name, upload folder, mimetype, file size, destination etc
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads') // specify desctination of upload file
    },

    // specify upload file name
    filename: function (req, file, callback) {
      callback(null,`${Date.now()}_${file.originalname}`); 
    }
  })
  
  // multer will place the file in "storage" object
  var upload = multer({ storage })


// use multer and specify the destination of the uploaded file
// const upload= multer({
//     dest:"uploads",
// })

// route for upload  single file
app.post('/file',upload.single("file"),(req,res)=>
{
    // after req, get the file

    const file=req.file;
    if(file) // if file exists
    {
        
        const filepath = req.file.path; // file path
        
        
        res.json(filepath)
    }

    else

    {
        throw new Error("File Upload unsuccesfull");
    }

})



// route for upload  multiple files, with an array
app.post('/multifiles',upload.array("files"),(req,res)=>
{
    // after req, get the file

    const files=req.files;
    // check it's a file array and holds files
    if(Array.isArray(files) && files.length>0) 
    {
        //res.json(file.path) // get the server path
        res.json(files)
    }

    else

    {
        throw new Error("File Upload unsuccesfull");
    }

})




app.get('/',(req,res)=>
{
    res.send("App is running");
})


// app.listen(port,()=>
// {
//     console.log(`app running in ${port}`);
// })


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
