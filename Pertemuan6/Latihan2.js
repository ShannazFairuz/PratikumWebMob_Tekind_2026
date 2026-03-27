// Array daftar produk cacat
let daftarCacat = ["C-001", "C-005", "C-012", "C-001", "C-020"];

// tampilkan daftar di halaman
document.getElementById("daftar").innerHTML = daftarCacat.join(" , ");

// function menghitung jumlah C-001
function hitungCacat() {
  let jumlah = 0;

  // looping untuk mengecek setiap item array
  for (let i = 0; i < daftarCacat.length; i++) {
    if (daftarCacat[i] === "C-001") {
      jumlah++;
    }
  }

  // tampilkan hasil
  document.getElementById("hasil").innerHTML =
    "Jumlah C-001 : " + jumlah + " kali ditemukan";
}