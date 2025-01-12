const Barang = require("../models/barang");
const { BarangMasuk, BarangKeluar } = require("../models/transaksi");


const createBarang= (req, res) => {
    const barang = new Barang({
        jenis : req.body.jenis,
        satuan : req.body.satuan,
        merk : req.body.merk,
        nama : req.body.nama,
        stok : req.body.stok,
        harga : req.body.harga,
    });


    //console.log(barang);
    barang.save()
    .then((createdBarang)=>{
        res.status(200).json({
                message : "Data berhasil disimpan",
                bookId : createdBarang._id
        });
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            message : "Internal server error"
        });
    });
   
};


const readBarang = (req, res)=>{
    Barang.find()
    .then((documents)=>{
        res.status(200).json({
            message : "Get Data barang",
            barangs : documents
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message : "Internal server error"
        });
    });
};


const deleteBarang= (req, res) => {
    Barang.deleteOne({_id : req.params.id})
    .then((result)=>{
        res.status(200).json({
            message : "barang berhasil dihapus ",
            result : result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message : "Internal server error"
        });
    });
};


const updateBarang = (req, res) => {
   
     const barang = new Barang({
        _id : req.params.id,
        jenis : req.body.jenis,
        satuan : req.body.satuan,
        merk : req.body.merk,
        nama : req.body.nama,
        stok : req.body.stok,
        harga : req.body.harga,
    });


    Barang.updateOne({_id : req.params.id}, barang)
    .then((hasil)=>{
        res.status(200).json({
            message : "Update Berhasil",
            result : hasil    
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message : "Internal server error"
        });
    });


};

const getDashboardStats = async (req, res) => {
    try {
      // Menghitung jumlah total barang
      const totalBarang = await Barang.countDocuments();
  
      // Menghitung jumlah jenis barang
      const jenisBarang = await Barang.distinct("jenis");
      const totalJenis = jenisBarang.length;
  
      // Menghitung jumlah satuan barang
      const satuanBarang = await Barang.distinct("satuan");
      const totalSatuan = satuanBarang.length;
  
      // Menghitung jumlah merk barang
      const merkBarang = await Barang.distinct("merk");
      const totalMerk = merkBarang.length;
  
      // Menghitung jumlah transaksi barang masuk (jumlah transaksi yang masuk)
      const totalMasuk = await BarangMasuk.countDocuments();
  
      // Menghitung jumlah transaksi barang keluar (jumlah transaksi yang keluar)
      const totalKeluar = await BarangKeluar.countDocuments();
  
      // Mengembalikan statistik dashboard
      res.status(200).json({
        message: "Dashboard data berhasil diambil",
        totalBarang,
        totalJenis,
        totalSatuan,
        totalMerk,
        totalMasuk,
        totalKeluar
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error mengambil data dashboard",
        error: err
      });
    }
  };




module.exports ={createBarang, readBarang, deleteBarang, updateBarang, getDashboardStats}
