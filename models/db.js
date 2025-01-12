const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:adminapotek123@apotek.bbncw.mongodb.net/?retryWrites=true&w=majority&appName=apotek")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    console.log("Connected failed");
  });
