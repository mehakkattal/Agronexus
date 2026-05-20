require('dotenv').config();
const mongoose=require("mongoose")
const mongoURL = process.env.MONGO_URI;
mongoose.connect(mongoURL)
.then(()=>{
    console.log("Database is connected"); 
    console.log(process.env.MONGO_URI);
})
.catch((error)=>{
    console.log("Error while connecting database", error); 
})

