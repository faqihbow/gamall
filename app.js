"use strict";

/* ============================================================
   Fungsi bantu
   ============================================================ */

const BAHASA_PEMILIK = "id"; /* Pesan WhatsApp selalu berbahasa Indonesia agar mudah dibaca Pak Ridwan */
const CACHE_FORMAT_ANGKA = {};

function rupiah(angka, bahasa) {
    const kode = bahasa || bahasaAktif;
    if (!CACHE_FORMAT_ANGKA[kode]) {
        CACHE_FORMAT_ANGKA[kode] = new Intl.NumberFormat(LOCALE[kode], { maximumFractionDigits: 0 });
    }
    return "Rp " + CACHE_FORMAT_ANGKA[kode].format(angka);
}

function tambahHari(jumlahHari) {
    const tanggal = new Date();
    tanggal.setDate(tanggal.getDate() + jumlahHari);
    return tanggal;
}

function formatTanggal(tanggal, bahasa) {
    return tanggal.toLocaleDateString(LOCALE[bahasa || bahasaAktif], {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function cariProduk(id) {
    return PRODUK.find(function (p) { return p.id === id; });
}

function cariTujuan(id) {
    return TUJUAN.find(function (tj) { return tj.id === id; });
}

function badgeStok(stok) {
    if (stok === 0) {
        return '<span class="badge badge-stok badge-habis">' + tr("badge.habis") + "</span>";
    }
    if (stok <= 15) {
        return '<span class="badge badge-stok badge-terbatas">' + tr("badge.sisa", { n: stok }) + "</span>";
    }
    return '<span class="badge badge-stok badge-ready">' + tr("badge.ready") + "</span>";
}

function linkWhatsApp(teks) {
    return "https://wa.me/" + BISNIS.whatsapp + "?text=" + encodeURIComponent(teks);
}

function hargaTermurah(produk) {
    const hargaReady = produk.varian
        .filter(function (v) { return v.stok > 0; })
        .map(function (v) { return v.harga; });
    return Math.min.apply(null, hargaReady);
}

/* Perhitungan inti: total harga, ongkir, dan estimasi sampai */
function hitungPesanan(daftar, idTujuan, metode) {
    let subtotal = 0;
    let berat = 0;

    daftar.forEach(function (item) {
        const varian = cariProduk(item.produkId).varian[item.varianIdx];
        subtotal += varian.harga * item.jumlah;
        berat += varian.berat * item.jumlah;
    });

    const tujuan = cariTujuan(idTujuan);
    const beratTagih = Math.ceil(berat);
    let ongkir = 0;
    let hari = null;

    if (tujuan && daftar.length > 0) {
        const tarif = tujuan[metode];
        ongkir = Math.max(beratTagih * tarif.perKg, tarif.minimum);
        hari = tarif.hari;
    }

    return {
        subtotal: subtotal,
        berat: berat,
        beratTagih: beratTagih,
        ongkir: ongkir,
        total: subtotal + ongkir,
        hari: hari,
        tujuan: tujuan
    };
}

function teksEstimasi(hari, bahasa) {
    const awal = formatTanggal(tambahHari(PERSIAPAN_HARI + hari[0]), bahasa);
    const akhir = formatTanggal(tambahHari(PERSIAPAN_HARI + hari[1]), bahasa);
    return awal + " - " + akhir;
}

function teksHari(hari) {
    return tr("hari", { a: hari[0], b: hari[1] });
}

/* ============================================================
   Kartu produk (beranda dan halaman produk)
   ============================================================ */

function fotoProduk(produk) {
    const f = typeof FOTO !== "undefined" ? FOTO[produk.id] : null;
    if (!f) {
        return '<div class="produk-visual" aria-hidden="true"><span>' + produk.ikon + "</span></div>";
    }
    return '<div class="produk-visual produk-foto"><img src="' + f.src + '" alt="' + namaProduk(produk) +
        '" width="' + f.w + '" height="' + f.h + '" loading="lazy" style="object-fit:' + f.fit + '"></div>';
}

function kartuProduk(produk) {
    const baris = produk.varian.map(function (v, i) {
        const tombol = v.stok > 0
            ? '<a class="btn btn-sm btn-outline-moss" href="#pesan" data-produk="' + produk.id + '" data-varian="' + i + '">' + tr("tbl.pesan") + "</a>"
            : "";
        return "<tr>" +
            "<td>" + namaVarian(v) + "</td>" +
            '<td class="text-end">' + rupiah(v.harga) + "</td>" +
            '<td class="text-center">' + badgeStok(v.stok) + "</td>" +
            '<td class="text-end">' + tombol + "</td>" +
            "</tr>";
    }).join("");

    return '<div class="col-md-6 col-xl-4">' +
        '<article class="kartu-produk h-100">' +
        fotoProduk(produk) +
        '<div class="produk-isi">' +
        '<p class="produk-kategori">' + namaKategori(produk.kategori) + "</p>" +
        "<h3>" + namaProduk(produk) + "</h3>" +
        "<p>" + deskripsiProduk(produk) + "</p>" +
        '<div class="table-responsive"><table class="table table-sm tabel-varian align-middle mb-0">' +
        '<thead><tr><th>' + tr("tbl.varian") + '</th><th class="text-end">' + tr("tbl.harga") +
        '</th><th class="text-center">' + tr("tbl.stok") + "</th><th></th></tr></thead>" +
        "<tbody>" + baris + "</tbody></table></div>" +
        "</div></article></div>";
}

/* ============================================================
   Beranda
   ============================================================ */

function inisialisasiBeranda() {
    const wadah = document.getElementById("produkUnggulan");
    if (!wadah) { return; }

    const teksReady = document.getElementById("teksReady");
    const teksNegara = document.getElementById("teksNegara");

    let ready = 0;
    PRODUK.forEach(function (p) {
        p.varian.forEach(function (v) { if (v.stok > 0) { ready++; } });
    });

    function tampilkan() {
        wadah.innerHTML = PRODUK.slice(0, 3).map(kartuProduk).join("");
        if (teksNegara) { teksNegara.textContent = tr("hero.negara", { n: TUJUAN.length }); }
        if (teksReady) { teksReady.textContent = tr("hero.ready", { n: ready }); }
    }

    HOOK_BAHASA.push(tampilkan);
    tampilkan();
}

/* ============================================================
   Halaman produk
   ============================================================ */

function inisialisasiProduk() {
    const wadah = document.getElementById("daftarProduk");
    const inputCari = document.getElementById("cariProduk");
    const pilihKategori = document.getElementById("filterKategori");
    const cekReady = document.getElementById("hanyaReady");
    const kosong = document.getElementById("produkKosong");
    if (!wadah || !inputCari || !pilihKategori || !cekReady || !kosong) { return; }

    const kategori = [];
    PRODUK.forEach(function (p) {
        if (kategori.indexOf(p.kategori) === -1) { kategori.push(p.kategori); }
    });

    function isiKategori() {
        const dipilih = pilihKategori.value;
        pilihKategori.innerHTML = '<option value="">' + tr("kategori.semua") + "</option>" +
            kategori.map(function (k) {
                return '<option value="' + k + '">' + namaKategori(k) + "</option>";
            }).join("");
        pilihKategori.value = dipilih;
    }

    function tampilkan() {
        const kata = inputCari.value.trim().toLowerCase();
        const hasil = PRODUK.filter(function (p) {
            const bahanCari = [namaProduk(p), deskripsiProduk(p), p.nama, p.deskripsi].join(" ").toLowerCase();
            const cocokNama = bahanCari.indexOf(kata) !== -1;
            const cocokKategori = pilihKategori.value === "" || p.kategori === pilihKategori.value;
            const adaReady = p.varian.some(function (v) { return v.stok > 0; });
            return cocokNama && cocokKategori && (!cekReady.checked || adaReady);
        });
        wadah.innerHTML = hasil.map(kartuProduk).join("");
        kosong.hidden = hasil.length !== 0;
    }

    inputCari.addEventListener("input", tampilkan);
    pilihKategori.addEventListener("change", tampilkan);
    cekReady.addEventListener("change", tampilkan);

    HOOK_BAHASA.push(function () {
        isiKategori();
        tampilkan();
    });

    isiKategori();
    tampilkan();
}

/* ============================================================
   Halaman pesan (kalkulator harga, ongkir, estimasi)
   ============================================================ */

function inisialisasiPesan() {
    const selProduk = document.getElementById("selProduk");
    const selVarian = document.getElementById("selVarian");
    const inpJumlah = document.getElementById("inpJumlah");
    const infoVarian = document.getElementById("infoVarian");
    const btnTambah = document.getElementById("btnTambah");
    const pesanAlert = document.getElementById("pesanAlert");
    const badanTabel = document.getElementById("badanKeranjang");
    const keranjangKosong = document.getElementById("keranjangKosong");
    const wadahTabel = document.getElementById("wadahKeranjang");
    const btnKosongkan = document.getElementById("btnKosongkan");
    const selTujuan = document.getElementById("selTujuan");
    const inpNama = document.getElementById("inpNama");
    const inpCatatan = document.getElementById("inpCatatan");
    const btnWA = document.getElementById("btnWA");
    const peringatanWA = document.getElementById("peringatanWA");

    const out = {
        subtotal: document.getElementById("outSubtotal"),
        berat: document.getElementById("outBerat"),
        ongkir: document.getElementById("outOngkir"),
        total: document.getElementById("outTotal"),
        tarif: document.getElementById("outTarif"),
        estimasi: document.getElementById("outEstimasi"),
        lamaHari: document.getElementById("outLamaHari")
    };

    if (!selProduk || !selVarian || !inpJumlah || !btnTambah || !badanTabel || !selTujuan || !btnWA) { return; }

    let keranjang = [];

    function isiOpsiProduk() {
        selProduk.innerHTML = PRODUK.map(function (p) {
            return '<option value="' + p.id + '">' + namaProduk(p) + "</option>";
        }).join("");
    }

    function isiOpsiTujuan() {
        selTujuan.innerHTML = '<option value="">' + tr("pesan.pilihnegara") + "</option>" +
            TUJUAN.map(function (tj) {
                return '<option value="' + tj.id + '">' + namaNegara(tj) + "</option>";
            }).join("");
    }

    isiOpsiProduk();
    isiOpsiTujuan();

    function metodeTerpilih() {
        return document.querySelector('input[name="metode"]:checked').value;
    }

    function tampilPesan(teks, jenis) {
        pesanAlert.className = "alert alert-" + jenis + " py-2 mb-3";
        pesanAlert.textContent = teks;
        pesanAlert.hidden = false;
    }

    function sembunyiPesan() {
        pesanAlert.hidden = true;
    }

    function jumlahDiKeranjang(produkId, varianIdx) {
        const ada = keranjang.find(function (k) {
            return k.produkId === produkId && k.varianIdx === varianIdx;
        });
        return ada ? ada.jumlah : 0;
    }

    function tampilInfoVarian() {
        const produk = cariProduk(selProduk.value);
        const idx = Number(selVarian.value);
        const varian = produk.varian[idx];
        if (!varian) {
            infoVarian.innerHTML = tr("info.habis");
            return;
        }
        const sisa = varian.stok - jumlahDiKeranjang(produk.id, idx);
        infoVarian.innerHTML = badgeStok(varian.stok) +
            ' <span class="ms-2">' + tr("info.sisa", { n: "<strong>" + tr("unit", { n: sisa }) + "</strong>" }) + "</span>" +
            '<br><span class="text-muted">' + tr("info.harga", { harga: rupiah(varian.harga), berat: varian.berat }) + "</span>";
    }

    function isiVarian(pilihIdx) {
        const produk = cariProduk(selProduk.value);
        selVarian.innerHTML = produk.varian.map(function (v, i) {
            const habis = v.stok === 0;
            return '<option value="' + i + '"' + (habis ? " disabled" : "") + ">" +
                namaVarian(v) + " - " + rupiah(v.harga) + (habis ? " " + tr("opt.habis") : "") + "</option>";
        }).join("");

        let awal = pilihIdx;
        if (typeof awal !== "number" || !produk.varian[awal] || produk.varian[awal].stok === 0) {
            awal = produk.varian.findIndex(function (v) { return v.stok > 0; });
        }
        if (awal === -1) {
            selVarian.selectedIndex = -1;
        } else {
            selVarian.value = String(awal);
        }
        tampilInfoVarian();
    }

    function renderKeranjang() {
        const adaIsi = keranjang.length > 0;
        keranjangKosong.hidden = adaIsi;
        wadahTabel.hidden = !adaIsi;
        btnKosongkan.hidden = !adaIsi;

        badanTabel.innerHTML = keranjang.map(function (item, i) {
            const produk = cariProduk(item.produkId);
            const varian = produk.varian[item.varianIdx];
            return "<tr>" +
                "<td><strong>" + namaProduk(produk) + '</strong><br><small class="text-muted">' + namaVarian(varian) + "</small></td>" +
                '<td class="text-end">' + rupiah(varian.harga) + "</td>" +
                '<td class="text-center"><div class="btn-group btn-group-sm" role="group" aria-label="' + tr("aria.ubah") + '">' +
                '<button type="button" class="btn btn-outline-secondary" data-aksi="kurang" data-i="' + i + '" aria-label="' + tr("aria.kurang") + '"><i class="bi bi-dash"></i></button>' +
                '<span class="btn btn-light disabled jumlah-item">' + item.jumlah + "</span>" +
                '<button type="button" class="btn btn-outline-secondary" data-aksi="tambah" data-i="' + i + '" aria-label="' + tr("aria.tambah") + '"><i class="bi bi-plus"></i></button>' +
                "</div></td>" +
                '<td class="text-end">' + rupiah(varian.harga * item.jumlah) + "</td>" +
                '<td class="text-end"><button type="button" class="btn btn-sm btn-outline-danger" data-aksi="hapus" data-i="' + i + '" aria-label="' + tr("aria.hapus") + '"><i class="bi bi-trash"></i></button></td>' +
                "</tr>";
        }).join("");
    }

    function renderRingkasan() {
        const metode = metodeTerpilih();
        const hasil = hitungPesanan(keranjang, selTujuan.value, metode);

        out.subtotal.textContent = rupiah(hasil.subtotal);
        out.berat.textContent = hasil.beratTagih + " kg";

        if (keranjang.length === 0) {
            out.ongkir.textContent = "-";
            out.total.textContent = rupiah(0);
            out.tarif.textContent = tr("ring.tarif.awal");
            out.estimasi.textContent = "-";
            out.lamaHari.textContent = "";
            return;
        }

        if (!hasil.tujuan) {
            out.ongkir.textContent = tr("ring.pilihtujuan");
            out.total.textContent = rupiah(hasil.subtotal);
            out.tarif.textContent = tr("ring.pilihtujuan.info");
            out.estimasi.textContent = "-";
            out.lamaHari.textContent = "";
            return;
        }

        const tarif = hasil.tujuan[metode];
        out.ongkir.textContent = rupiah(hasil.ongkir);
        out.total.textContent = rupiah(hasil.total);
        out.tarif.textContent = tr("ring.tarif", { perkg: rupiah(tarif.perKg), min: rupiah(tarif.minimum) });
        out.estimasi.textContent = teksEstimasi(hasil.hari);
        out.lamaHari.textContent = tr("ring.lama", { a: hasil.hari[0], b: hasil.hari[1], p: PERSIAPAN_HARI });
    }

    function perbarui() {
        renderKeranjang();
        renderRingkasan();
        tampilInfoVarian();
    }

    /* Menambah produk ke daftar pesanan */
    btnTambah.addEventListener("click", function () {
        const produk = cariProduk(selProduk.value);
        const idx = Number(selVarian.value);
        const varian = produk.varian[idx];
        const jumlah = Number(inpJumlah.value);

        if (!varian || varian.stok === 0) {
            tampilPesan(tr("msg.habis"), "danger");
            return;
        }
        if (!Number.isInteger(jumlah) || jumlah < 1) {
            tampilPesan(tr("msg.jumlah"), "danger");
            return;
        }

        const sudahAda = jumlahDiKeranjang(produk.id, idx);
        if (sudahAda + jumlah > varian.stok) {
            tampilPesan(tr("msg.stok", {
                p: namaProduk(produk), v: namaVarian(varian), s: varian.stok, a: sudahAda
            }), "warning");
            return;
        }

        const item = keranjang.find(function (k) {
            return k.produkId === produk.id && k.varianIdx === idx;
        });
        if (item) {
            item.jumlah += jumlah;
        } else {
            keranjang.push({ produkId: produk.id, varianIdx: idx, jumlah: jumlah });
        }

        tampilPesan(tr("msg.ditambah", { p: namaProduk(produk), v: namaVarian(varian), j: jumlah }), "success");
        inpJumlah.value = 1;
        perbarui();
    });

    /* Ubah jumlah dan hapus di tabel pesanan */
    badanTabel.addEventListener("click", function (e) {
        const tombol = e.target.closest("button[data-aksi]");
        if (!tombol) { return; }

        const i = Number(tombol.dataset.i);
        const item = keranjang[i];
        if (!item) { return; }

        const varian = cariProduk(item.produkId).varian[item.varianIdx];
        sembunyiPesan();

        if (tombol.dataset.aksi === "hapus") {
            keranjang.splice(i, 1);
        } else if (tombol.dataset.aksi === "tambah") {
            if (item.jumlah + 1 > varian.stok) {
                tampilPesan(tr("msg.maks", { s: varian.stok }), "warning");
            } else {
                item.jumlah++;
            }
        } else if (tombol.dataset.aksi === "kurang") {
            item.jumlah--;
            if (item.jumlah < 1) { keranjang.splice(i, 1); }
        }
        perbarui();
    });

    btnKosongkan.addEventListener("click", function () {
        keranjang = [];
        sembunyiPesan();
        perbarui();
    });

    selProduk.addEventListener("change", function () { isiVarian(); });
    selVarian.addEventListener("change", tampilInfoVarian);
    selTujuan.addEventListener("change", renderRingkasan);
    document.querySelectorAll('input[name="metode"]').forEach(function (radio) {
        radio.addEventListener("change", renderRingkasan);
    });

    /* Kirim ringkasan pesanan lewat WhatsApp (selalu dalam bahasa Indonesia untuk pemilik) */
    btnWA.addEventListener("click", function () {
        const nama = inpNama.value.trim();
        peringatanWA.hidden = true;

        if (keranjang.length === 0) {
            peringatanWA.textContent = tr("wa.kosong");
            peringatanWA.hidden = false;
            return;
        }
        if (!selTujuan.value) {
            peringatanWA.textContent = tr("wa.tujuan");
            peringatanWA.hidden = false;
            return;
        }
        if (nama === "") {
            peringatanWA.textContent = tr("wa.nama");
            peringatanWA.hidden = false;
            return;
        }

        const metode = metodeTerpilih();
        const hasil = hitungPesanan(keranjang, selTujuan.value, metode);
        const baris = keranjang.map(function (item, i) {
            const produk = cariProduk(item.produkId);
            const varian = produk.varian[item.varianIdx];
            return (i + 1) + ". " + produk.nama + " (" + varian.nama + ") x " + item.jumlah +
                " = " + rupiah(varian.harga * item.jumlah, BAHASA_PEMILIK);
        });

        const teks = [
            "Halo " + BISNIS.pemilik + ", saya ingin memesan:",
            baris.join("\n"),
            "",
            "Subtotal produk: " + rupiah(hasil.subtotal, BAHASA_PEMILIK),
            "Tujuan: " + hasil.tujuan.negara + " (" + NAMA_METODE[metode] + ")",
            "Berat tagih: " + hasil.beratTagih + " kg",
            "Ongkir: " + rupiah(hasil.ongkir, BAHASA_PEMILIK),
            "Total: " + rupiah(hasil.total, BAHASA_PEMILIK),
            "Estimasi tiba: " + teksEstimasi(hasil.hari, BAHASA_PEMILIK),
            "",
            "Nama: " + nama,
            inpCatatan.value.trim() !== "" ? "Catatan: " + inpCatatan.value.trim() : ""
        ].join("\n");

        window.open(linkWhatsApp(teks), "_blank", "noopener");
    });

    /* Saat bahasa diganti: isi ulang pilihan dan teks tanpa menghapus daftar pesanan */
    HOOK_BAHASA.push(function () {
        const produkDipilih = selProduk.value;
        const tujuanDipilih = selTujuan.value;
        const varianDipilih = selVarian.selectedIndex === -1 ? undefined : Number(selVarian.value);

        isiOpsiProduk();
        selProduk.value = produkDipilih;
        isiOpsiTujuan();
        selTujuan.value = tujuanDipilih;
        isiVarian(varianDipilih);

        sembunyiPesan();
        peringatanWA.hidden = true;
        perbarui();
    });

    /* Klik tombol Pesan pada kartu produk: pilih produk dan varian di kalkulator */
    document.addEventListener("click", function (e) {
        const a = e.target.closest("a[data-produk]");
        if (!a || !cariProduk(a.dataset.produk)) { return; }
        selProduk.value = a.dataset.produk;
        isiVarian(Number(a.dataset.varian));
        perbarui();
    });

    /* Pilihan awal dari tautan halaman produk (?produk=...&varian=...) */
    const parameter = new URLSearchParams(window.location.search);
    const produkAwal = parameter.get("produk");
    if (produkAwal && cariProduk(produkAwal)) {
        selProduk.value = produkAwal;
    }
    isiVarian(parameter.has("varian") ? Number(parameter.get("varian")) : undefined);
    perbarui();
}

/* ============================================================
   Halaman FAQ
   ============================================================ */

function tabelStok() {
    let baris = "";
    PRODUK.forEach(function (p) {
        p.varian.forEach(function (v) {
            baris += "<tr><td>" + namaProduk(p) + "</td><td>" + namaVarian(v) + "</td>" +
                '<td class="text-end">' + v.stok + "</td>" +
                '<td class="text-center">' + badgeStok(v.stok) + "</td></tr>";
        });
    });
    return '<div class="table-responsive"><table class="table table-sm tabel-varian align-middle mb-0">' +
        "<thead><tr><th>" + tr("tbl.produk") + "</th><th>" + tr("tbl.varian") + '</th><th class="text-end">' + tr("tbl.stok") +
        '</th><th class="text-center">' + tr("tbl.status") + "</th></tr></thead>" +
        "<tbody>" + baris + "</tbody></table></div>";
}

function daftarVarian() {
    return '<ul class="mb-0">' + PRODUK.map(function (p) {
        const nama = p.varian.map(function (v) { return namaVarian(v); }).join(", ");
        return "<li><strong>" + namaProduk(p) + ":</strong> " + nama + "</li>";
    }).join("") + "</ul>";
}

function tabelOngkir() {
    const baris = TUJUAN.map(function (tj) {
        return "<tr><td>" + namaNegara(tj) + "</td>" +
            '<td class="text-end">' + rupiah(tj.laut.perKg) + "</td>" +
            '<td class="text-end">' + rupiah(tj.udara.perKg) + "</td></tr>";
    }).join("");
    return '<div class="table-responsive"><table class="table table-sm tabel-varian align-middle mb-0">' +
        "<thead><tr><th>" + tr("tbl.negara") + '</th><th class="text-end">' + tr("tbl.laut.kg") +
        '</th><th class="text-end">' + tr("tbl.udara.kg") + "</th></tr></thead>" +
        "<tbody>" + baris + "</tbody></table></div>";
}

function tabelEstimasi() {
    const baris = TUJUAN.map(function (tj) {
        return "<tr><td>" + namaNegara(tj) + "</td>" +
            '<td class="text-center">' + teksHari(tj.laut.hari) + "</td>" +
            '<td class="text-center">' + teksHari(tj.udara.hari) + "</td></tr>";
    }).join("");
    return '<div class="table-responsive"><table class="table table-sm tabel-varian align-middle mb-0">' +
        "<thead><tr><th>" + tr("tbl.negara") + '</th><th class="text-center">' + tr("metode.laut") +
        '</th><th class="text-center">' + tr("metode.udara") + "</th></tr></thead>" +
        "<tbody>" + baris + "</tbody></table></div>";
}

const FAQ = [
    {
        tanya: "faq.q1",
        jawab: function () {
            return "<p>" + tr("faq.a1") + "</p>" + tabelStok();
        }
    },
    {
        tanya: "faq.q2",
        jawab: function () {
            return "<p>" + tr("faq.a2.intro") + "</p>" + daftarVarian() +
                '<p class="mt-3 mb-0">' + tr("faq.a2.outro") + "</p>";
        }
    },
    {
        tanya: "faq.q3",
        jawab: function () {
            return "<p>" + tr("faq.a3.p1") + "</p>" +
                '<p class="mb-0">' + tr("faq.a3.p2", { a: rupiah(165000), b: rupiah(1650000) }) + "</p>";
        }
    },
    {
        tanya: "faq.q4",
        jawab: function () {
            return "<p>" + tr("faq.a4") + "</p>" + tabelOngkir();
        }
    },
    {
        tanya: "faq.q5",
        jawab: function () {
            return "<p>" + tr("faq.a5.intro", { p: PERSIAPAN_HARI }) + "</p>" + tabelEstimasi() +
                '<p class="mt-3 mb-0">' + tr("faq.a5.outro") + "</p>";
        }
    },
    {
        tanya: "faq.q6",
        jawab: function () {
            return '<ol class="mb-0">' +
                "<li>" + tr("faq.a6.1") + "</li>" +
                "<li>" + tr("faq.a6.2") + "</li>" +
                "<li>" + tr("faq.a6.3") + "</li>" +
                "<li>" + tr("faq.a6.4", { pemilik: BISNIS.pemilik }) + "</li>" +
                "</ol>";
        }
    },
    {
        tanya: "faq.q7",
        jawab: function () {
            return "<p>" + tr("faq.a7.p1") + "</p>" +
                '<p class="mb-0">' + tr("faq.a7.p2") + "</p>";
        }
    },
    {
        tanya: "faq.q8",
        jawab: function () {
            return '<p class="mb-0">' + tr("faq.a8", { telp: BISNIS.teleponTampil }) + "</p>";
        }
    }
];

function inisialisasiFaq() {
    const wadah = document.getElementById("accordionFaq");
    const inputCari = document.getElementById("cariFaq");
    const kosong = document.getElementById("faqKosong");
    if (!wadah || !inputCari || !kosong) { return; }

    function terapkanFilter() {
        const kata = inputCari.value.trim().toLowerCase();
        let terlihat = 0;
        wadah.querySelectorAll(".accordion-item").forEach(function (el) {
            const cocok = el.dataset.tanya.indexOf(kata) !== -1;
            el.hidden = !cocok;
            if (cocok) { terlihat++; }
        });
        kosong.hidden = terlihat !== 0;
    }

    function bangun() {
        /* Ingat pertanyaan yang sedang terbuka agar tetap terbuka setelah ganti bahasa */
        let terbuka = -1;
        const aktif = wadah.querySelector(".accordion-collapse.show");
        if (aktif) { terbuka = Number(aktif.id.replace("faq-isi-", "")); }

        wadah.innerHTML = FAQ.map(function (item, i) {
            const idIsi = "faq-isi-" + i;
            const buka = i === terbuka;
            return '<div class="accordion-item">' +
                '<h2 class="accordion-header">' +
                '<button class="accordion-button' + (buka ? "" : " collapsed") + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + idIsi + '" aria-expanded="' + (buka ? "true" : "false") + '" aria-controls="' + idIsi + '">' +
                tr(item.tanya) + "</button></h2>" +
                '<div id="' + idIsi + '" class="accordion-collapse collapse' + (buka ? " show" : "") + '" data-bs-parent="#accordionFaq">' +
                '<div class="accordion-body">' + item.jawab() + "</div></div></div>";
        }).join("");

        wadah.querySelectorAll(".accordion-item").forEach(function (el, i) {
            el.dataset.tanya = tr(FAQ[i].tanya).toLowerCase();
        });
        terapkanFilter();
    }

    inputCari.addEventListener("input", terapkanFilter);
    HOOK_BAHASA.push(bangun);
    bangun();
}

/* ============================================================
   Halaman kontak
   ============================================================ */

function inisialisasiKontak() {
    const nama = document.getElementById("kontakNama");
    const topik = document.getElementById("kontakTopik");
    const pesan = document.getElementById("kontakPesan");
    const tombol = document.getElementById("kontakKirim");
    const peringatan = document.getElementById("kontakPeringatan");
    if (!nama || !topik || !pesan || !tombol || !peringatan) { return; }

    tombol.addEventListener("click", function () {
        if (nama.value.trim() === "" || pesan.value.trim() === "") {
            peringatan.textContent = tr("kontak.wajib");
            peringatan.hidden = false;
            return;
        }
        peringatan.hidden = true;

        /* Nilai topik (value) selalu berbahasa Indonesia, jadi pesan ke pemilik tetap terbaca */
        const teks = "Halo " + BISNIS.pemilik + ", saya " + nama.value.trim() +
            ".\nTopik: " + topik.value + "\n" + pesan.value.trim();
        window.open(linkWhatsApp(teks), "_blank", "noopener");
    });

    HOOK_BAHASA.push(function () { peringatan.hidden = true; });
}

/* ============================================================
   Mulai
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-telepon]").forEach(function (el) {
        el.textContent = BISNIS.teleponTampil;
    });
    document.querySelectorAll("[data-wa-link]").forEach(function (el) {
        el.href = linkWhatsApp("Halo " + BISNIS.pemilik + ", saya ingin bertanya tentang produk rotan.");
    });

    inisialisasiBahasa();

    inisialisasiBeranda();
    inisialisasiProduk();
    inisialisasiPesan();
    inisialisasiFaq();
    inisialisasiKontak();
});

