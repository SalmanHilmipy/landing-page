// navbar jadi lebih padat dan berbayang saat di-scroll
var navbar = document.getElementById("navbar");

function perbaruiNavbar() {
  if (window.scrollY > 10) {
    navbar.classList.add("mengecil");
  } else {
    navbar.classList.remove("mengecil");
  }
}
window.addEventListener("scroll", perbaruiNavbar);
perbaruiNavbar();

// menu HP: buka dan tutup, termasuk lewat overlay dan tombol Esc
var tombolMenu = document.getElementById("tombolMenu");
var menu = document.getElementById("menu");
var overlay = document.getElementById("menuOverlay");

function bukaMenu() {
  menu.classList.add("buka");
  overlay.classList.add("tampil");
  tombolMenu.classList.add("buka");
  tombolMenu.setAttribute("aria-expanded", "true");
}

function tutupMenu() {
  menu.classList.remove("buka");
  overlay.classList.remove("tampil");
  tombolMenu.classList.remove("buka");
  tombolMenu.setAttribute("aria-expanded", "false");
}

tombolMenu.onclick = function () {
  if (menu.classList.contains("buka")) {
    tutupMenu();
  } else {
    bukaMenu();
  }
};

overlay.onclick = tutupMenu;

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") tutupMenu();
});

// menu tertutup otomatis setelah link diklik
document.querySelectorAll(".menu-link").forEach(function (link) {
  link.addEventListener("click", tutupMenu);
});

// sorot menu sesuai bagian yang sedang dibaca
var semuaSection = document.querySelectorAll("section[id], header[id]");
var semuaLinkMenu = document.querySelectorAll(".menu-link");

function perbaruiMenuAktif() {
  var posisiSekarang = window.scrollY + 120;
  var idAktif = "";

  semuaSection.forEach(function (bagian) {
    if (posisiSekarang >= bagian.offsetTop) {
      idAktif = bagian.id;
    }
  });

  semuaLinkMenu.forEach(function (link) {
    var cocok = link.getAttribute("href") === "#" + idAktif;
    link.classList.toggle("aktif", cocok);
  });
}
window.addEventListener("scroll", perbaruiMenuAktif);
perbaruiMenuAktif();

// elemen muncul saat terlihat di layar
var elemenReveal = document.querySelectorAll(".reveal");

var pengamatReveal = new IntersectionObserver(function (daftar) {
  daftar.forEach(function (item) {
    if (item.isIntersecting) {
      item.target.classList.add("muncul");
      pengamatReveal.unobserve(item.target);
    }
  });
}, { threshold: 0.15 });

elemenReveal.forEach(function (el) {
  pengamatReveal.observe(el);
});

// angka statistik naik dari 0
function hitungNaik(el) {
  var target = Number(el.dataset.target);
  var sekarang = 0;
  var timer = setInterval(function () {
    sekarang = sekarang + Math.ceil(target / 40);
    if (sekarang >= target) {
      sekarang = target;
      clearInterval(timer);
    }
    el.textContent = sekarang + (el.dataset.suffix || "");
  }, 40);
}

var barStatistik = document.querySelector(".statistik-bar");
if (barStatistik) {
  var pengamatAngka = new IntersectionObserver(function (daftar) {
    if (daftar[0].isIntersecting) {
      document.querySelectorAll(".statistik-isi b").forEach(hitungNaik);
      pengamatAngka.disconnect();
    }
  });
  pengamatAngka.observe(barStatistik);
}

// faq: klik pertanyaan untuk buka dan tutup jawaban
document.querySelectorAll(".faq-tanya").forEach(function (tombol) {
  tombol.onclick = function () {
    var item = tombol.closest(".faq-item");
    var sedangAktif = item.classList.contains("aktif");
    item.classList.toggle("aktif");
    tombol.setAttribute("aria-expanded", String(!sedangAktif));
  };
});

// tombol kembali ke atas
var tombolAtas = document.getElementById("keAtas");

window.addEventListener("scroll", function () {
  tombolAtas.classList.toggle("tampil", window.scrollY > 500);
});

tombolAtas.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// tahun footer otomatis
document.getElementById("tahun").textContent = new Date().getFullYear();