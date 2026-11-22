"use strict";

/*
 * Semua data website disimpan di sini (profil bisnis, produk, varian,
 * harga, tarif ongkir, dan estimasi). Ubah angka di file ini
 * dan seluruh halaman akan ikut menyesuaikan.
 */

const BISNIS = {
    nama: "Ridwan Rotan Cirebon",
    pemilik: "Pak Ridwan",
    kota: "Cirebon, Jawa Barat",
    alamat: "Jl. Industri Rotan No. 12, Plumbon, Kabupaten Cirebon, Jawa Barat",
    whatsapp: "6282320399093",
    teleponTampil: "0823-2039-9093",
    jamKerja: "Senin - Sabtu, 08.00 - 17.00 WIB",
    berdiri: 2008
};

/* Hari yang dibutuhkan untuk packing dan pengurusan dokumen ekspor */
const PERSIAPAN_HARI = 2;

/* Harga dalam rupiah, berat dalam kilogram per satu unit, stok dalam unit */
const PRODUK = [
    {
        id: "kursi-rotan",
        nama: "Kursi Rotan Natural",
        kategori: "Furnitur",
        ikon: "🪑",
        deskripsi: "Kursi anyaman rotan dengan rangka kuat, nyaman untuk ruang tamu, teras, dan kafe.",
        varian: [
            { nama: "Natural", harga: 450000, stok: 40, berat: 4.5 },
            { nama: "Honey Brown", harga: 475000, stok: 12, berat: 4.5 },
            { nama: "Hitam", harga: 495000, stok: 0, berat: 4.5 }
        ]
    },
    {
        id: "meja-bundar",
        nama: "Meja Rotan Bundar",
        kategori: "Furnitur",
        ikon: "🟤",
        deskripsi: "Meja bundar berkaki rotan dengan permukaan rata, cocok untuk ruang santai.",
        varian: [
            { nama: "Diameter 60 cm", harga: 380000, stok: 25, berat: 6 },
            { nama: "Diameter 80 cm", harga: 560000, stok: 9, berat: 9 }
        ]
    },
    {
        id: "keranjang-anyam",
        nama: "Keranjang Anyaman",
        kategori: "Anyaman",
        ikon: "🧺",
        deskripsi: "Keranjang serbaguna untuk pakaian, mainan, atau penyimpanan. Tepi dirapikan dan halus.",
        varian: [
            { nama: "Kecil", harga: 120000, stok: 120, berat: 1.2 },
            { nama: "Sedang", harga: 165000, stok: 85, berat: 1.8 },
            { nama: "Besar", harga: 225000, stok: 30, berat: 2.5 }
        ]
    },
    {
        id: "tikar-rotan",
        nama: "Tikar Rotan",
        kategori: "Anyaman",
        ikon: "🟫",
        deskripsi: "Tikar anyaman rotan tipis untuk lantai atau dekorasi dinding bergaya tropis.",
        varian: [
            { nama: "120 x 180 cm", harga: 275000, stok: 50, berat: 3 },
            { nama: "160 x 230 cm", harga: 410000, stok: 14, berat: 5 }
        ]
    },
    {
        id: "lampu-gantung",
        nama: "Lampu Gantung Rotan",
        kategori: "Dekorasi",
        ikon: "💡",
        deskripsi: "Kap lampu gantung dari anyaman rotan yang memberi cahaya hangat. Fitting tidak termasuk.",
        varian: [
            { nama: "Diameter 40 cm", harga: 210000, stok: 70, berat: 1 },
            { nama: "Diameter 60 cm", harga: 320000, stok: 35, berat: 1.8 }
        ]
    },
    {
        id: "rotan-mentah",
        nama: "Batang Rotan Mentah",
        kategori: "Bahan baku",
        ikon: "🌿",
        deskripsi: "Batang rotan kering untuk bahan baku produsen furnitur. Dijual per bundel 50 kg.",
        varian: [
            { nama: "Diameter 6-8 mm", harga: 1750000, stok: 60, berat: 50 },
            { nama: "Diameter 10-12 mm", harga: 2150000, stok: 0, berat: 50 }
        ]
    }
];

/*
 * Tarif ongkir per kilogram (dibulatkan ke atas), biaya minimum,
 * dan rentang hari pengiriman setelah masa persiapan.
 */
const TUJUAN = [
    { id: "sg", negara: "Singapura",
      laut: { perKg: 12000, minimum: 500000, hari: [5, 8] },
      udara: { perKg: 65000, minimum: 750000, hari: [2, 4] } },
    { id: "my", negara: "Malaysia",
      laut: { perKg: 11000, minimum: 500000, hari: [6, 9] },
      udara: { perKg: 60000, minimum: 750000, hari: [2, 4] } },
    { id: "jp", negara: "Jepang",
      laut: { perKg: 18000, minimum: 650000, hari: [12, 18] },
      udara: { perKg: 95000, minimum: 900000, hari: [3, 5] } },
    { id: "kr", negara: "Korea Selatan",
      laut: { perKg: 17000, minimum: 650000, hari: [12, 17] },
      udara: { perKg: 90000, minimum: 900000, hari: [3, 5] } },
    { id: "au", negara: "Australia",
      laut: { perKg: 20000, minimum: 700000, hari: [14, 21] },
      udara: { perKg: 105000, minimum: 950000, hari: [3, 6] } },
    { id: "ae", negara: "Uni Emirat Arab",
      laut: { perKg: 21000, minimum: 700000, hari: [16, 22] },
      udara: { perKg: 105000, minimum: 950000, hari: [3, 6] } },
    { id: "sa", negara: "Arab Saudi",
      laut: { perKg: 22000, minimum: 700000, hari: [18, 25] },
      udara: { perKg: 110000, minimum: 950000, hari: [4, 7] } },
    { id: "nl", negara: "Belanda",
      laut: { perKg: 26000, minimum: 850000, hari: [28, 35] },
      udara: { perKg: 125000, minimum: 1100000, hari: [4, 7] } },
    { id: "de", negara: "Jerman",
      laut: { perKg: 26000, minimum: 850000, hari: [28, 36] },
      udara: { perKg: 125000, minimum: 1100000, hari: [4, 7] } },
    { id: "us", negara: "Amerika Serikat",
      laut: { perKg: 32000, minimum: 950000, hari: [30, 40] },
      udara: { perKg: 140000, minimum: 1250000, hari: [5, 8] } }
];

const NAMA_METODE = { laut: "Kapal laut", udara: "Pesawat udara" };

