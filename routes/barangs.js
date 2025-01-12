var express = require('express');
var router = express.Router();


const BarangController = require("../controller/barang.js");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond dari Barang router');
// });


//insert
router.post('/',BarangController.createBarang);


//select
router.get("/",BarangController.readBarang);


//delete
router.delete('/:id',BarangController.deleteBarang);


//update
router.put('/:id',BarangController.updateBarang);

router.get("/stats", BarangController.getDashboardStats);


module.exports = router;