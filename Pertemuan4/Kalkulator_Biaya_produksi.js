document.getElementById("formProduksi").addEventListener("submit", function(event){

event.preventDefault();

// variabel input
let biayaBahanBaku = Number(document.getElementById("bahanBaku").value);
let biayaTenagaKerja = Number(document.getElementById("tenagaKerja").value);
let biayaOverhead = Number(document.getElementById("overhead").value);
let jumlahProduksi = Number(document.getElementById("jumlahProduksi").value);

// rumus perhitungan
let totalPerUnit = (biayaBahanBaku + biayaTenagaKerja + biayaOverhead) / jumlahProduksi;

// kondisi produksi
let status;

if(jumlahProduksi < 100){
status = "Biaya Tinggi (Ekonomi Skala Kecil)";
}else{
status = "Biaya Efisien";
}

// tampilkan hasil
let output = document.getElementById("hasilOutput");

output.innerHTML =
"Total Biaya per Unit : Rp " + totalPerUnit.toLocaleString("id-ID") +
"<br>Status Produksi : " + status;


// tampilkan juga di console
console.log("=== HASIL PERHITUNGAN ===");
console.log("Biaya Bahan Baku :", biayaBahanBaku);
console.log("Biaya Tenaga Kerja :", biayaTenagaKerja);
console.log("Biaya Overhead :", biayaOverhead);
console.log("Jumlah Produksi :", jumlahProduksi);
console.log("Total per Unit :", totalPerUnit);
console.log("Status :", status);

});