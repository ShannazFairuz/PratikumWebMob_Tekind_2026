// Seleksi elemen
const formAudit = document.getElementById("formAudit");
const tabelBody = document.getElementById("tabelBody");
const btnHapusSemua = document.getElementById("btnHapusSemua");

const STORAGE_KEY = "DATA_AUDIT_5S";

// Load data saat halaman dibuka
document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage();
});

// Event submit form
formAudit.addEventListener("submit", function (event) {
  event.preventDefault();

  const auditor = document.getElementById("auditor").value;
  const seiri = document.getElementById("seiri").checked;
  const seiton = document.getElementById("seiton").checked;
  const seiso = document.getElementById("seiso").checked;
  const seiketsu = document.getElementById("seiketsu").checked;
  const shitsuke = document.getElementById("shitsuke").checked;

  // Hitung jumlah checklist yang dicentang
  let jumlahCeklis = 0;
  if (seiri) jumlahCeklis++;
  if (seiton) jumlahCeklis++;
  if (seiso) jumlahCeklis++;
  if (seiketsu) jumlahCeklis++;
  if (shitsuke) jumlahCeklis++;

  // Hitung skor
  const skor = (jumlahCeklis / 5) * 100;

  // Ambil tanggal hari ini
  const tanggal = new Date().toLocaleDateString("id-ID");

  const dataBaru = {
    id: Date.now(),
    tanggal: tanggal,
    auditor: auditor,
    skor: skor,
  };

  saveData(dataBaru);
  formAudit.reset();
  loadDataFromStorage();
});

// Simpan data ke localStorage
function saveData(data) {
  let dataLama = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  dataLama.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataLama));
}

// Tampilkan data ke tabel
function loadDataFromStorage() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  tabelBody.innerHTML = "";

  if (data.length === 0) {
    tabelBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">Belum ada data audit</td>
      </tr>
    `;
    return;
  }

  data.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td>${item.auditor}</td>
      <td>${item.skor}%</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="hapusData(${item.id})">
          Hapus
        </button>
      </td>
    `;
    tabelBody.appendChild(row);
  });
}

// Hapus data tertentu
window.hapusData = function (id) {
  if (confirm("Yakin ingin menghapus data audit ini?")) {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let dataBaru = data.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBaru));
    loadDataFromStorage();
  }
};

// Hapus semua data
btnHapusSemua.addEventListener("click", function () {
  if (confirm("Semua riwayat audit akan dihapus. Lanjutkan?")) {
    localStorage.removeItem(STORAGE_KEY);
    loadDataFromStorage();
  }
});