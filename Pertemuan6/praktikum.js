// 1. FUNCTION Declaration 
// Fungsi untuk menghitung konsumsi daya (P = V x I) 
function hitungDaya(tegangan, arus) {
    let daya = tegangan * arus;
    return daya; // Mengembalikan hasil 
}
// Pemanggilan Function 
let teganganMesin = 220; // Volt 
let arusMesin = 10; // Ampere 
let totalDaya = hitungDaya(teganganMesin, arusMesin);
console.log("Daya Mesin: " + totalDaya + " Watt");

// 2. ARRAY 
let daftarCacat = ["C-003", "C-007", "C-015", "C-003", "C-020"]; // C-003 terjadi 2 kali 
console.log("Jumlah Cacat: " + daftarCacat.length);
// Looping (Perulangan) untuk menampilkan setiap cacat 
console.log("--- Laporan Detail Cacat ---");
for (let i = 0; i < daftarCacat.length; i++) {
    console.log("Item ke-" + (i + 1) + " : " + daftarCacat[i]);
}
// Menambahkan data baru ke array 
daftarCacat.push("C-099");
console.log("Setelah penambahan: " + daftarCacat);

// 3. OBJECT 
let mesinA = {
    id: "M-01",
    nama: "Injection Molding 70 Ton",
    merk: "Toyota",
    tahunBeli: 2020,
    status: "Running",
    spesifikasi: {
        kecepatanMax: 200, // mm/s 
        tekananMax: 150
    }
};
// bar 
// Mengakses data object 
console.log("Nama Mesin: " + mesinA.nama);
console.log("Status: " + mesinA.status);
console.log("Tekanan Max: " + mesinA.spesifikasi.tekananMax + " bar");
// Mengubah data object (Simulasi mesin rusak) 
mesinA.status = "Breakdown";
console.log("Status Baru: " + mesinA.status);

// Array berisi beberapa object 
let gudangMaterial = [
    { kode: "MAT-01", nama: "Aluminium", stok: 30, satuan: "Kg" },
    { kode: "MAT-02", nama: "Besi Hollow", stok: 120, satuan: "Batang" },
    { kode: "MAT-03", nama: "Oli Mesin", stok: 10, satuan: "Liter" }
];
console.log("--- Cek Stok Gudang ---");
// Menggunakan forEach untuk iterasi array object 
gudangMaterial.forEach(function (item) {
    console.log(item.kode + " - " + item.nama + " : " + item.stok + " " + item.satuan);
    // Logika Re-order 
    if (item.stok < 20) {
        console.log("  >>> PERINGATAN: Stok " + item.nama + " menipis! Segera PO.");
    }
});

// Function menghitung daya
function hitungDaya(tegangan, arus) {
    let daya = tegangan * arus;
    return daya;
}

function hitung() {

    let tegangan = document.getElementById("tegangan").value;
    let arus = document.getElementById("arus").value;

    let totalDaya = hitungDaya(tegangan, arus);

    document.getElementById("hasil").innerText =
        "Daya Mesin: " + totalDaya + " Watt";

}

// 1. Seleksi Elemen DOM 
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnReset = document.getElementById('btnReset');
const statusIndicator = document.getElementById('statusIndicator');
const suhuMesin = document.getElementById('suhuMesin');
const teksStatus = statusIndicator.querySelector('strong'); // Mengambil elemen <strong> di dalam alert

// Variabel State 
let suhu = 25;
let intervalId = null; // Untuk menyimpan ID timer 

// Event Listener Tombol START 
btnStart.addEventListener('click', function () {
    // Ubah UI Status 
    statusIndicator.className = 'alert alert-success'; // Ganti class Bootstrap (Hijau) 
    teksStatus.innerText = 'RUNNING';
    // Logika simulasi kenaikan suhu 
    intervalId = setInterval(function () {
        suhu += 1;
        suhuMesin.innerText = suhu + " °C";
        // Peringatan jika suhu overheat 
        if (suhu > 80) {
            statusIndicator.className = 'alert alert-danger';
            teksStatus.innerText = 'OVERHEAT WARNING';
            suhuMesin.style.color = 'red';
        }
    }, 1000); // Jalankan setiap 1 detik 
    // Matikan tombol Start agar tidak double click 
    btnStart.disabled = true;
    btnStop.disabled = false;
});
// Event Listener Tombol STOP 
btnStop.addEventListener('click', function () {
    clearInterval(intervalId); // Hentikan timer kenaikan suhu 
    statusIndicator.className = 'alert alert-secondary';
    teksStatus.innerText = 'STOPPED';

    // Reset tombol 
    btnStart.disabled = false;
    btnStop.disabled = true;
});

// Event Listener Tombol RESET 
btnReset.addEventListener('click', function () {
    clearInterval(intervalId);
    suhu = 25;
    suhuMesin.innerText = suhu + " °C";
    suhuMesin.style.color = 'black';
    statusIndicator.className = 'alert alert-secondary';
    teksStatus.innerText = 'UNKNOWN';

    btnStart.disabled = false;
    btnStop.disabled = true;
});

const inputRPM = document.getElementById('inputRPM');
const pesanError = document.getElementById('pesanError');

inputRPM.addEventListener('input', function () {
    let val = parseInt(this.value);

    if (!this.value) {
        pesanError.classList.add('d-none');
        this.classList.remove('is-invalid');
    }
    else if (val > 2000) {
        pesanError.classList.remove('d-none');
        this.classList.add('is-invalid');
    } else {
        pesanError.classList.add('d-none');
        this.classList.remove('is-invalid');
    }
});

// Tombol Maintenance Mode
const btnMaintenance = document.getElementById('btnMaintenance');
const card = document.querySelector('.card');

btnMaintenance.addEventListener('click', function () {
    // Ubah background card jadi abu-abu
    card.classList.add('bg-light');

    // Ubah status
    statusIndicator.className = 'alert alert-warning';
    teksStatus.innerText = 'MAINTENANCE';
});

// Mouseover teks jadi biru & tebal
suhuMesin.addEventListener('mouseover', function () {
    suhuMesin.style.color = 'blue';
    suhuMesin.style.fontWeight = 'bold';
});

// Mouseout balik normal
suhuMesin.addEventListener('mouseout', function () {
    suhuMesin.style.color = 'black';
    suhuMesin.style.fontWeight = 'normal';
});