const { BarangMasuk, BarangKeluar } = require("../models/transaksi");
const Barang = require("../models/barang");

// Controller untuk Barang Masuk
const barangMasukController = {
  // Menambahkan Barang Masuk
  async tambahBarangMasuk(req, res) {
    try {
      const { barang, jumlah, keterangan } = req.body;

      // Validasi apakah barang ada di database
      const barangData = await Barang.findById(barang);
      if (!barangData) {
        return res.status(404).json({ error: "Barang tidak ditemukan" });
      }

      // Update stok barang
      barangData.stok += Number(jumlah);
      console.log('Stok setelah update:', barangData.stok);
      await barangData.save();

      const barangMasuk = new BarangMasuk({
        barang,
        jumlah,
        keterangan,
      });

      await barangMasuk.save();
      res.status(201).json({ message: "Barang masuk berhasil ditambahkan", data: barangMasuk });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mendapatkan semua data Barang Masuk
  async getBarangMasuk(req, res) {
    try {
      const barangMasuk = await BarangMasuk.find().populate("barang").sort({ createdAt: -1 });
      res.status(200).json(barangMasuk);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Menghapus Barang Masuk
  async hapusBarangMasuk(req, res) {
    try {
      const { id } = req.params;

      const barangMasuk = await BarangMasuk.findByIdAndDelete(id);
      if (!barangMasuk) {
        return res.status(404).json({ error: "Barang masuk tidak ditemukan" });
      }

      // Update stok barang
      const barangData = await Barang.findById(barangMasuk.barang);
      if (barangData) {
        barangData.stok -= barangMasuk.jumlah;
        await barangData.save();
      }

      res.status(200).json({ message: "Barang masuk berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

// Controller untuk Barang Keluar
const barangKeluarController = {
  // Menambahkan Barang Keluar
  async tambahBarangKeluar(req, res) {
    try {
      const { barang, jumlah, penerima, keterangan } = req.body;

      // Validasi apakah barang ada di database
      const barangData = await Barang.findById(barang);
      if (!barangData) {
        return res.status(404).json({ error: "Barang tidak ditemukan" });
      }

      // Cek stok barang
      if (barangData.stok < jumlah) {
        return res.status(400).json({ error: "Stok barang tidak mencukupi" });
      }

      // Update stok barang
      barangData.stok -= jumlah;
      console.log('Stok setelah update:', barangData.stok);
      await barangData.save();

      const barangKeluar = new BarangKeluar({
        barang,
        jumlah,
        penerima,
        keterangan,
      });

      await barangKeluar.save();
      res.status(201).json({ message: "Barang keluar berhasil ditambahkan", data: barangKeluar });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mendapatkan semua data Barang Keluar
  async getBarangKeluar(req, res) {
    try {
      const barangKeluar = await BarangKeluar.find().populate("barang").sort({ createdAt: -1 });
      res.status(200).json(barangKeluar);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Menghapus Barang Keluar
  async hapusBarangKeluar(req, res) {
    try {
      const { id } = req.params;

      const barangKeluar = await BarangKeluar.findByIdAndDelete(id);
      if (!barangKeluar) {
        return res.status(404).json({ error: "Barang keluar tidak ditemukan" });
      }

      // Update stok barang
      const barangData = await Barang.findById(barangKeluar.barang);
      if (barangData) {
        barangData.stok += barangKeluar.jumlah;
        await barangData.save();
      }

      res.status(200).json({ message: "Barang keluar berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = { barangMasukController, barangKeluarController };
