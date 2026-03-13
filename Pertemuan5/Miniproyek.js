let antrianMesin = [
  { idJob: "J01", namaProses: "Drilling", durasi: 30 },
  { idJob: "J02", namaProses: "Milling", durasi: 45 },
  { idJob: "J03", namaProses: "Turning", durasi: 25 },
];

function tampilkanAntrian() {
  let ul = document.getElementById("daftarAntrian");
  ul.innerHTML = "";

  antrianMesin.forEach((job) => {
    let li = document.createElement("li");
    li.textContent = `${job.idJob} - ${job.namaProses} (${job.durasi} menit)`;
    ul.appendChild(li);
  });
}

function tambahLog(teks) {
  let log = document.getElementById("logProses");

  let div = document.createElement("div");
  div.className = "logItem";
  div.textContent = teks;

  log.appendChild(div);
}

function prosesAntrian(antrian) {
  let index = 0;

  function prosesBerikutnya() {
    if (index >= antrian.length) {
      document.getElementById("statusMesin").textContent = "Semua job selesai";
      document.getElementById("progressBar").style.width = "100%";
      return;
    }

    let job = antrian[index];

    document.getElementById(
      "statusMesin"
    ).textContent = `Memproses ${job.idJob} - ${job.namaProses}`;

    tambahLog(
      `Memproses Job ${job.idJob} - ${job.namaProses} selama ${job.durasi} menit`
    );

    let progress = 0;

    let interval = setInterval(() => {
      progress += 10;
      document.getElementById("progressBar").style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        index++;
        setTimeout(prosesBerikutnya, 500);
      }
    }, 200);
  }

  prosesBerikutnya();
}

function jalankanSimulasi() {
  document.getElementById("logProses").innerHTML = "";
  document.getElementById("progressBar").style.width = "0%";

  tampilkanAntrian();

  prosesAntrian(antrianMesin);

  // tambah job baru
  setTimeout(() => {
    let jobBaru = { idJob: "J04", namaProses: "Grinding", durasi: 40 };

    antrianMesin.push(jobBaru);

    tambahLog("Job baru ditambahkan ke antrian");

    tampilkanAntrian();
  }, 3000);
}

tampilkanAntrian();