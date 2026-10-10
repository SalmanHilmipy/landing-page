// 1. Buka/tutup menu di HP
document.getElementById("tombolMenu").onclick = function () {
  document.getElementById("menu").classList.toggle("buka");
};

// 7. Tombol kembali ke atas (muncul setelah scroll 400px)
var tombolAtas = document.getElementById("keAtas");

window.onscroll = function () {
  if (window.scrollY > 400) {
    tombolAtas.classList.add("tampil");
  } else {
    tombolAtas.classList.remove("tampil");
  }
};

tombolAtas.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
document.getElementById("tahun").textContent = new Date().getFullYear();

// 4. Animasi muncul saat di-scroll
var semua = document.querySelectorAll(".card, .box, .section h2, .lead, .faq-item");
var pengamat = new IntersectionObserver(function (daftar) {
  daftar.forEach(function (item) {
    if (item.isIntersecting) {
      item.target.classList.remove("sembunyi");
      item.target.classList.add("muncul");
      pengamat.unobserve(item.target);
    }
  });
}, { threshold: 0.15 });

semua.forEach(function (el) {
  el.classList.add("sembunyi");
  pengamat.observe(el);
});

// 5. Angka statistik berjalan naik dari 0
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
var pengamatAngka = new IntersectionObserver(function (daftar) {
  if (daftar[0].isIntersecting) {
    document.querySelectorAll(".statistik-isi b").forEach(hitungNaik);
    pengamatAngka.disconnect();
  }
});
pengamatAngka.observe(barStatistik);

// 6. FAQ: klik pertanyaan untuk buka/tutup jawaban
document.querySelectorAll(".faq-tanya").forEach(function (tombol) {
  tombol.onclick = function () {
    tombol.parentElement.classList.toggle("aktif");
  };
});