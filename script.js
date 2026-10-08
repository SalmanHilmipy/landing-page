// 1. Buka/tutup menu di HP
document.getElementById("tombolMenu").onclick = function () {
  document.getElementById("menu").classList.toggle("buka");
};

// 2. Isi tahun footer otomatis
document.getElementById("tahun").textContent = new Date().getFullYear();