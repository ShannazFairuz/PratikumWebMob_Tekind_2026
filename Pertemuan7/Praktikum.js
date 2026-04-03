// 1. Seleksi Elemen
const formProduksi = document.getElementById("formProduksi");
const tabelBody = document.getElementById("tabelBody");
const btnHapusSemua = document.getElementById("btnHapusSemua");
// Kunci untuk LocalStorage
const STORAGE_KEY = "DATA_PRODUKSI_INDUSTRI";
// Fungsi Load Data saat halaman dibuka
document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage();
});
// 2. Event Listener: Submit Form
formProduksi.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah refresh halaman
  // Ambil Value dari Form
  const tanggal = document.getElementById("tanggal").value;
  const operator = document.getElementById("operator").value;
  const shift = document.getElementById("shift").value;
  const jumlah = document.getElementById("jumlah").value;
  // Validasi Sederhana (JavaScript)
  if (jumlah <= 0) {
    alert("Jumlah produksi harus lebih dari 0!");
    return;
  }
  // Buat Object Data
  const dataBaru = {
    id: Date.now(), // ID unik berdasarkan waktu
    tanggal: tanggal,
    operator: operator,
    shift: shift,
    jumlah: parseInt(jumlah),
  };
  // Simpan ke LocalStorage
  saveData(dataBaru);
  // Reset Form
  formProduksi.reset();
  // Refresh Tampilan Tabel
  loadDataFromStorage();
});
// 3. Fungsi Simpan ke LocalStorage
function saveData(data) {
  // Ambil data lama (jika ada), jika tidak ada array kosong
  let dataLama = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  // Tambah data baru ke array
  dataLama.push(data);
  // Simpan kembali ke LocalStorage (Convert ke JSON String)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataLama));
}
// 4. Fungsi Baca & Render Tabel
function loadDataFromStorage() {
  // Ambil data
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  // Kosongkan tabel dulu

  tabelBody.innerHTML = "";
  // Loop data dan buat baris tabel
  data.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `
             <td>${item.tanggal}</td>
             <td>${item.operator}</td>
             <td>${item.shift}</td>
             <td>${item.jumlah}</td>
             <td>
                 <button class="btn btn-sm btn-danger"
 onclick="hapusData(${item.id})">Hapus</button>
 </td> `;
    tabelBody.appendChild(row);
  });
}
// 5. Fungsi Hapus Data Spesifik
// Kita pasang di window agar bisa dipanggil dari inline HTML onclick
window.hapusData = function (id) {
  if (confirm("Yakin ingin menghapus log ini?")) {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // Filter data: hapus item yang id-nya cocok
    let dataBaru = data.filter((item) => item.id !== id);
    // Simpan ulang
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBaru));
    // Refresh tampilan
    loadDataFromStorage();
  }
};
// 6. Event Hapus Semua
btnHapusSemua.addEventListener("click", function () {
  if (confirm("PERINGATAN: Semua data akan dihapus permanen!")) {
    localStorage.removeItem(STORAGE_KEY);
    loadDataFromStorage();
  }
});
