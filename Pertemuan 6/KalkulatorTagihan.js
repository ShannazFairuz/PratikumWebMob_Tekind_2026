const daya = document.getElementById('daya');
const jam = document.getElementById('jam');
const kwhText = document.getElementById('kwh');
const biayaText = document.getElementById('biaya');
const resultBox = document.getElementById('result');

function hitung() {
    let d = parseFloat(daya.value);
    let j = parseFloat(jam.value);

    if (!d || !j) {
        kwhText.innerText = "0 kWh";
        biayaText.innerText = "Rp 0";
        resultBox.classList.remove('active');
        return;
    }

    let kwh = (d * j) / 1000;
    let biaya = kwh * 1500;

    kwhText.innerText = kwh.toFixed(2) + " kWh";
    biayaText.innerText = "Rp " + biaya.toLocaleString();

    resultBox.classList.add('active');
}

daya.addEventListener('input', hitung);
jam.addEventListener('input', hitung);