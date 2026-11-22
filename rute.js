
document.addEventListener("DOMContentLoaded", function () {
    const HALAMAN = ["beranda", "produk", "pesan", "faq", "kontak"];
    function rute() {
        let p = location.hash.replace("#", "");
        if (HALAMAN.indexOf(p) === -1) { p = "beranda"; }
        document.querySelectorAll(".halaman").forEach(function (el) { el.hidden = el.dataset.page !== p; });
        document.body.dataset.halaman = p;
        document.querySelectorAll(".navbar-situs .nav-link").forEach(function (a) {
            const aktif = a.getAttribute("href") === "#" + p;
            a.classList.toggle("active", aktif);
            if (aktif) { a.setAttribute("aria-current", "page"); } else { a.removeAttribute("aria-current"); }
        });
        const menu = document.getElementById("menuUtama");
        if (menu) { menu.classList.remove("show"); }
        if (typeof terapkanTeksTetap === "function") { terapkanTeksTetap(); }
        window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", rute);
    rute();
});

