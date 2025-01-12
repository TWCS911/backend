const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
    jenis : {type : String, required : true},
    satuan : {type : String, required: true},
    merk : {type : String, required : true},
    nama : {type : String, required : true},
    stok : {type : Number, required : true},
    harga : {type : Number, required : true},
});
module.exports = mongoose.model("Barang", barangSchema);