const mongoose = require("mongoose");

mongoose.connect(
    // online
    "mongodb+srv://admin:adminapotek123@apotek.bbncw.mongodb.net/?retryWrites=true&w=majority&appName=apotek"
  ).then(()=>{
    console.log("Connected to database");
  }).catch(()=>{
    // console.error("App Starting error: ", err.stack);
    console.log("Connected failed");
  });