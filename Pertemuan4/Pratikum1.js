// ============================
// 1. Variabel dan Tipe Data
// ============================

let namaMesin = "CNC-01";   // String
let targetHarian = 500;     // Number
let statusMesin = true;     // Boolean

console.log("Nama Mesin:", namaMesin);
console.log("Target Produksi:", targetHarian);
console.log("Status Mesin:", statusMesin);


// ============================
// 2. Operator Aritmatika
// ============================

let produksiPagi = 200;
let produksiSiang = 150;

let totalProduksi = produksiPagi + produksiSiang;

console.log("Total Produksi Saat Ini:", totalProduksi);

let kekurangan = targetHarian - totalProduksi;

console.log("Sisa Target:", kekurangan);


// ============================
// 3. Control Flow (If / Else)
// ============================

let jamOperasional = 1250;
let batasMaintenance = 1200;

console.log("=== Status Mesin ===");

if (jamOperasional >= batasMaintenance) {
    console.log("PERINGATAN: Mesin perlu maintenance!");
    console.log("Status: STOP PRODUKSI");
}
else if (jamOperasional > 1000) {
    console.log("Status: Segera jadwalkan maintenance");
}
else {
    console.log("Status: Mesin berjalan normal");
}


// ============================
// 4. Perhitungan Availability
// ============================

let jamKerjaPlanned = 8;
let jamKerjaAktual = 6.5;

let availability = (jamKerjaAktual / jamKerjaPlanned) * 100;

availability = availability.toFixed(2);

console.log("Planned Time:", jamKerjaPlanned, "Jam");
console.log("Actual Time:", jamKerjaAktual, "Jam");
console.log("Availability:", availability + "%");

if (availability >= 90) {
    console.log("Kategori: WORLD CLASS");
}
else if (availability >= 80) {
    console.log("Kategori: BAIK");
}
else {
    console.log("Kategori: BURUK");
}


// ============================
// 5. Interaksi User
// ============================

let namaOperator = prompt("Masukkan nama operator:");
let shiftKerja = prompt("Masukkan shift kerja (Pagi / Siang / Malam):");

if (shiftKerja === "Malam") {
    alert("Halo " + namaOperator + ", shift malam mendapat tambahan uang makan Rp20.000.");
}
else {
    alert("Halo " + namaOperator + ", selamat bekerja!");
}