// Function menghitung luas dan keliling lingkaran
function hitungLingkaran(jariJari) {
  let phi = 3.14;

  let luas = phi * jariJari * jariJari;
  let keliling = 2 * phi * jariJari;

  return {
    luas: Math.round(luas),
    keliling: Math.round(keliling),
  };
}

// Function untuk mengambil input dari HTML
function hitung() {
  let r = document.getElementById("jariJari").value;

  if (r === "" || r <= 0) {
    alert("Masukkan jari-jari yang valid!");
    return;
  }

  let hasil = hitungLingkaran(Number(r));

  document.getElementById("luas").innerHTML = "Luas : " + hasil.luas;

  document.getElementById("keliling").innerHTML =
    "Keliling : " + hasil.keliling;
}