const formProduksi = document.getElementById("formProduksi");
const tabelBody = document.getElementById("tabelBody");
const btnHapusSemua = document.getElementById("btnHapusSemua");
const cariOperator = document.getElementById("cariOperator");

const STORAGE_KEY = "DATA_PRODUKSI_INDUSTRI";

document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage();
});

formProduksi.addEventListener("submit", function (event) {
  event.preventDefault();

  const tanggal = document.getElementById("tanggal").value;
  const operator = document.getElementById("operator").value;
  const shift = document.getElementById("shift").value;
  const jumlah = document.getElementById("jumlah").value;

  if (jumlah <= 0) {
    alert("Jumlah produksi harus lebih dari 0!");
    return;
  }

  const dataBaru = {
    id: Date.now(),
    tanggal: tanggal,
    operator: operator,
    shift: shift,
    jumlah: parseInt(jumlah),
  };

  saveData(dataBaru);
  formProduksi.reset();
  loadDataFromStorage();
});

cariOperator.addEventListener("input", function () {
  loadDataFromStorage();
});

function saveData(data) {
  let dataLama = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  dataLama.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataLama));
}

function loadDataFromStorage() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const keyword = cariOperator.value.toLowerCase();

  const dataFilter = data.filter(function (item) {
    return item.operator.toLowerCase().includes(keyword);
  });

  tabelBody.innerHTML = "";

  if (dataFilter.length === 0) {
    tabelBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Data tidak ditemukan</td>
      </tr>
    `;
    return;
  }

  dataFilter.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td>${item.operator}</td>
      <td>${item.shift}</td>
      <td>${item.jumlah}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="hapusData(${item.id})">
          Hapus
        </button>
      </td>
    `;
    tabelBody.appendChild(row);
  });
}

window.hapusData = function (id) {
  if (confirm("Yakin ingin menghapus log ini?")) {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let dataBaru = data.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBaru));
    loadDataFromStorage();
  }
};

btnHapusSemua.addEventListener("click", function () {
  if (confirm("PERINGATAN: Semua data akan dihapus permanen!")) {
    localStorage.removeItem(STORAGE_KEY);
    loadDataFromStorage();
  }
});