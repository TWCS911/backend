const express = require("express");
const router = express.Router();
const { barangMasukController, barangKeluarController } = require("../controller/transaksi");

// Rute untuk Barang Masuk
router.post("/barang-masuk", barangMasukController.tambahBarangMasuk);
router.get("/barang-masuk", barangMasukController.getBarangMasuk);
router.delete("/barang-masuk/:id", barangMasukController.hapusBarangMasuk);

// Rute untuk Barang Keluar
router.post("/barang-keluar", barangKeluarController.tambahBarangKeluar);
router.get("/barang-keluar", barangKeluarController.getBarangKeluar);
router.delete("/barang-keluar/:id", barangKeluarController.hapusBarangKeluar);

module.exports = router;
