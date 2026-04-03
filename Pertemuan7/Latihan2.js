// Seleksi Elemen
const formProduksi = document.getElementById("formProduksi");
const tabelBody = document.getElementById("tabelBody");
const btnHapusSemua = document.getElementById("btnHapusSemua");
const cariOperator = document.getElementById("cariOperator");
const btnSort = document.getElementById("btnSort");

const STORAGE_KEY = "DATA_PRODUKSI_INDUSTRI";

// Status Sort
let isSorted = false;

// Load awal
document.addEventListener("DOMContentLoaded", loadDataFromStorage);

// Submit Form
formProduksi.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataBaru = {
    id: Date.now(),
    tanggal: document.getElementById("tanggal").value,
    operator: document.getElementById("operator").value,
    shift: document.getElementById("shift").value,
    jumlah: parseInt(document.getElementById("jumlah").value),
  };

  if (dataBaru.jumlah <= 0) {
    alert("Jumlah harus lebih dari 0!");
    return;
  }

  saveData(dataBaru);
  formProduksi.reset();
  loadDataFromStorage();
});

// Event Filter
cariOperator.addEventListener("input", loadDataFromStorage);

// Event Sort
btnSort.addEventListener("click", function () {
  isSorted = !isSorted;

  // Ubah teks tombol biar jelas
  btnSort.textContent = isSorted
    ? "Urutan Default"
    : "Sortir berdasarkan Jumlah (Terbesar)";

  loadDataFromStorage();
});

// Simpan Data
function saveData(data) {
  let dataLama = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  dataLama.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataLama));
}

// Load + Render
function loadDataFromStorage() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // FILTER
  const keyword = cariOperator.value.toLowerCase();
  let dataFilter = data.filter((item) =>
    item.operator.toLowerCase().includes(keyword)
  );

  // SORT
  if (isSorted) {
    dataFilter.sort((a, b) => b.jumlah - a.jumlah);
  }

  tabelBody.innerHTML = "";

  if (dataFilter.length === 0) {
    tabelBody.innerHTML =
      "<tr><td colspan='5' class='text-center'>Data tidak ditemukan</td></tr>";
    return;
  }

  dataFilter.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td>${item.operator}</td>
      <td>${item.shift}</td>
      <td>${item.jumlah}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="hapusData(${item.id})">
          Hapus
        </button>
      </td>
    `;
    tabelBody.appendChild(row);
  });
}

// Hapus Data
window.hapusData = function (id) {
  if (confirm("Yakin ingin menghapus data?")) {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let dataBaru = data.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBaru));
    loadDataFromStorage();
  }
};

// Hapus Semua
btnHapusSemua.addEventListener("click", function () {
  if (confirm("Semua data akan dihapus!")) {
    localStorage.removeItem(STORAGE_KEY);
    loadDataFromStorage();
  }
});