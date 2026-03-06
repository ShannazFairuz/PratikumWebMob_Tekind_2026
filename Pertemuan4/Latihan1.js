// 1. Deklarasi variable
let gajiPokok = 2300000;
let jamLembur = 10;

// 2. Perhitungan upah lembur perjam
let upahLemburPerJam = (1.5 * gajiPokok) / 173;

// 3. Perhitungan total upah lembur
let totalUpahLembur = upahLemburPerJam * jamLembur;

// 4. Perhitungan total gaji
let totalGaji = gajiPokok + totalUpahLembur;

// 5. Output
console.log("Gaji Pokok: Rp " + gajiPokok);
console.log("Upah Lembur per Jam: Rp " + upahLemburPerJam.toFixed(2));
console.log("Total Upah Lembur: Rp " + totalUpahLembur.toFixed(2));
console.log("Total Gaji: Rp " + totalGaji.toFixed(2));