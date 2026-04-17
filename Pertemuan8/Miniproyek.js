// Mengambil elemen HTML dan menyimpannya ke dalam variabel
const btnLoad = document.getElementById("btnLoadInsiden");
const btnTambah = document.getElementById("btnTambahInsiden");
const container = document.getElementById("containerInsiden");
const loading = document.getElementById("loading");

const inputSearch = document.getElementById("inputSearch");
const selectFilter = document.getElementById("selectFilter");

// Endpoint API yang diberikan oleh dosen
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Variabel Global untuk menyimpan data
let dataInsidenGlobal = [];

// =========================================================
// DATA DUMMY INDONESIA (PENGGANTI LOREM IPSUM)
// =========================================================
const laporanReal = [
    { title: "Pompa Air Pendingin Tidak Berfungsi",body: "Pompa utama di sistem pendingin unit 5 berhenti bekerja, menyebabkan suhu mesin naik dan produksi harus dihentikan sementara." },
    { title: "Lampu Penerangan Gudang Mati", body: "Beberapa lampu di area gudang bahan baku padam, mengganggu proses pengecekan stok dan distribusi barang." },
    { title: "Kompressor Udara Bocor", body: "Terdeteksi kebocoran pada pipa kompressor sektor C, tekanan udara tidak stabil sehingga mesin pneumatic terganggu." },
    { title: "Sensor Suhu Ruang Oven Error", body: "Indikator suhu pada panel kontrol oven nomor 3 tidak menunjukkan angka yang stabil, fluktuatif di luar batas normal." },
    { title: "Mesin Cetak Label Stuck", body: "Roll label macet di mesin cetak nomor 2, menghambat jalur produksi dan menyebabkan penundaan pengemasan." },
    { title: "Kualitas Bahan Baku Menurun", body: "Bahan baku dari supplier kloter pagi ini (batch #882) memiliki tingkat kelembapan di atas standar kualitas." },
    { title: "Kerusakan Forklift Gudang", body: "Garpu pengangkat pada Forklift unit 02 hidroliknya bocor sehingga tidak bisa mengangkat beban maksimal." },
    { title: "AC Ruang Kontrol Tidak Dingin", body: "AC di ruang kontrol utama tidak berfungsi dengan baik, suhu naik di atas batas nyaman untuk operator." },
    { title: "Kebakaran Kecil di Ruang Genset", body: "Terjadi korsleting ringan yang menimbulkan percikan api. Api sudah dipadamkan pakai APAR, tapi butuh perbaikan kabel." },
    { title: "Pintu Otomatis Loading Dock Rusak", body: "Sensor gerak pintu gerbang pemuatan barang tidak merespon, pintu harus dibuka secara manual." },
    { title: "Kipas Ventilasi Meledak", body: "Kipas ventilasi di sektor finishing mengalami kerusakan mekanik, menimbulkan percikan dan kebisingan tinggi." }
];

// =========================================================
// 1. FUNGSI READ: Mengambil Data dari Server API
// =========================================================
btnLoad.addEventListener("click", function () {
  loading.classList.remove("d-none"); 
  container.innerHTML = ""; 

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) throw new Error("Gagal terhubung ke server ERP");
      return response.json();
    })
    .then((dataPosts) => {
      // Ambil 10 data dari API
      let sepuluhLaporan = dataPosts.slice(0, 10);

      // KODE SULAP: Ganti isi Lorem Ipsum dengan data bahasa Indonesia kita
      sepuluhLaporan = sepuluhLaporan.map((insiden, index) => {
          return {
              id: insiden.id,
              title: laporanReal[index].title, 
              body: laporanReal[index].body    
          };
      });

      // Simpan ke variabel global
      dataInsidenGlobal = sepuluhLaporan;

      // Tampilkan ke layar
      renderListKeLayar(dataInsidenGlobal);
    })
    .catch((error) => {
      container.innerHTML = `<div class="alert alert-danger shadow-sm"><strong>Sistem Error:</strong> ${error.message}</div>`;
    })
    .finally(() => {
      loading.classList.add("d-none"); 
    });
});

// =========================================================
// 2. FUNGSI RENDER: Menggambar Kartu ke Layar HTML
// =========================================================
function renderListKeLayar(arrayData) {
  container.innerHTML = ""; 

  if (arrayData.length === 0) {
    container.innerHTML = `<div class="col-12 text-center text-muted mt-4"><em>Tidak ada tiket insiden yang sesuai dengan pencarian.</em></div>`;
    return;
  }

  arrayData.forEach((insiden) => {
    const lokasi = insiden.id % 2 === 0 ? "Line B" : "Line A";
    const badgeColor = insiden.id % 2 === 0 ? "bg-warning text-dark" : "bg-info text-dark";

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4";
    col.id = `tiket-${insiden.id}`;

    col.innerHTML = ` 
            <div class="card h-100 shadow-sm border-0 rounded-3"> 
                <div class="card-header card-header-corporate d-flex justify-content-between align-items-center rounded-top-3" style="background-color: #0c2340; color: white;">
                    <span class="fw-bold">ID: #${insiden.id}</span>
                    <span class="badge ${badgeColor}">${lokasi}</span>
                </div>
                <div class="card-body bg-white flex-column d-flex"> 
                    <h6 class="card-title text-capitalize fw-bold text-dark">${insiden.title}</h6> 
                    <p class="card-text text-secondary small mb-3">${insiden.body}</p> 
                </div> 
                <div class="card-footer bg-light border-top-0 d-flex gap-2 rounded-bottom-3">
                    <button class="btn btn-sm btn-primary flex-fill fw-semibold" onclick="tindakLanjut(${insiden.id})">Tindak Lanjut</button>
                    <button class="btn btn-sm btn-outline-danger fw-semibold" onclick="tutupTiket(${insiden.id})">Tutup</button>
                </div>
            </div> 
        `;
    container.appendChild(col);
  });
}

// =========================================================
// 3. FUNGSI PENCARIAN & FILTER REALTIME
// =========================================================
function jalankanSearchDanFilter() {
  const kataKunci = inputSearch.value.toLowerCase();
  const filterLokasi = selectFilter.value;

  const hasilFilter = dataInsidenGlobal.filter((insiden) => {
    const cocokTeks =
      insiden.title.toLowerCase().includes(kataKunci) ||
      insiden.body.toLowerCase().includes(kataKunci);

    let cocokLokasi = false;
    if (filterLokasi === "all") {
      cocokLokasi = true;
    } else if (filterLokasi === "lineA" && insiden.id % 2 !== 0) {
      cocokLokasi = true; 
    } else if (filterLokasi === "lineB" && insiden.id % 2 === 0) {
      cocokLokasi = true; 
    }

    return cocokTeks && cocokLokasi;
  });

  renderListKeLayar(hasilFilter);
}

inputSearch.addEventListener("input", jalankanSearchDanFilter);
selectFilter.addEventListener("change", jalankanSearchDanFilter);

// =========================================================
// 4. FUNGSI ACTION, CREATE (TAMBAH), & DELETE (HAPUS)
// =========================================================

function tindakLanjut(id) {
  alert(`[SISTEM ERP] Tiket ID #${id} sedang diproses oleh Tim Maintenance.`);
}

btnTambah.addEventListener("click", function () {
  const tiketBaru = {
    title: "Tumpahan Bahan Kimia (Data Baru)",
    body: "Drum penyimpanan bahan kimia H2O2 terguling. Area sudah diisolasi, butuh tim kebersihan khusus segera.",
    userId: 1,
  };
  loading.classList.remove("d-none");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tiketBaru),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`[SUKSES] Tiket baru dibuat dengan ID #${data.id}`);
      dataInsidenGlobal.unshift(data); 
      renderListKeLayar(dataInsidenGlobal);
    })
    .catch((error) => alert("Gagal membuat tiket: " + error.message))
    .finally(() => loading.classList.add("d-none"));
});

function tutupTiket(id) {
  if (confirm(`Apakah Anda yakin ingin menutup tiket #${id}?`)) {
    dataInsidenGlobal = dataInsidenGlobal.filter((insiden) => insiden.id !== id);
    renderListKeLayar(dataInsidenGlobal);
  }
}