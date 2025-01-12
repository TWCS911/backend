const mongoose = require("mongoose");

// Model Barang (dari schema yang sudah Anda buat)
const Barang = require("../models/barang");

// Schema untuk Barang Masuk
const barangMasukSchema = new mongoose.Schema({
  barang: { type: mongoose.Schema.Types.ObjectId, ref: "Barang", required: true }, // Referensi ke Barang
  jumlah: { type: Number, required: true }, // Jumlah barang yang masuk
  tanggalMasuk: { type: Date, default: Date.now }, // Tanggal masuk barang
  keterangan: { type: String } // Keterangan tambahan (opsional)
},{ timestamps: true });

// Schema untuk Barang Keluar
const barangKeluarSchema = new mongoose.Schema({
  barang: { type: mongoose.Schema.Types.ObjectId, ref: "Barang", required: true }, // Referensi ke Barang
  jumlah: { type: Number, required: true }, // Jumlah barang yang keluar
  tanggalKeluar: { type: Date, default: Date.now }, // Tanggal keluar barang
  penerima: { type: String, required: true }, // Penerima barang (nama)
  keterangan: { type: String } // Keterangan tambahan (opsional)
},{ timestamps: true });

// Membuat model untuk Barang Masuk dan Barang Keluar
const BarangMasuk = mongoose.model("BarangMasuk", barangMasukSchema);
const BarangKeluar = mongoose.model("BarangKeluar", barangKeluarSchema);

module.exports = { BarangMasuk, BarangKeluar};
