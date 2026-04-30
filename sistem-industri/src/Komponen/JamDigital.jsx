import { useState, useEffect } from "react";

function JamDigital() {
  const [waktu, setWaktu] = useState(new Date());
  const [kota, setKota] = useState("Yogyakarta");

  useEffect(() => {
    const timerID = setInterval(() => {
      setWaktu(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    document.title = `Jam ${kota}`;
  }, [kota]);

  return (
    <div className="alert alert-info text-center">
      <h4>Waktu Sistem: {waktu.toLocaleTimeString()}</h4>

      <input
        type="text"
        className="form-control mt-3"
        placeholder="Masukkan nama kota"
        value={kota}
        onChange={(e) => setKota(e.target.value)}
      />

      <p className="mt-2">
        Kota saat ini: <strong>{kota}</strong>
      </p>
    </div>
  );
}

export default JamDigital;