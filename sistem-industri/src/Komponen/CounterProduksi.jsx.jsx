import { useState } from "react";

function CounterProduksi() {
  const [jumlah, setJumlah] = useState(0);
  const [target] = useState(5);
  const [status, setStatus] = useState("NORMAL");

  const tambahProduksi = () => {
    setJumlah(jumlah + 1);
  };

  const reset = () => {
    setJumlah(0);
    setStatus("NORMAL");
  };

  const emergencyStop = () => {
    setStatus("EMERGENCY");
  };

  return (
    <div className="text-center p-4 border rounded bg-light mb-4">
      <h3>Simulasi Hitung Produk</h3>

      <h1 className="display-4">{jumlah}</h1>

      <p>Target: {target} Unit</p>

      {status === "EMERGENCY" ? (
        <div className="alert alert-danger">
          EMERGENCY STOP! Produksi dihentikan sementara.
        </div>
      ) : jumlah >= target ? (
        <div className="alert alert-success">
          Target Tercapai!
        </div>
      ) : (
        <div className="alert alert-secondary">
          Produksi Berjalan...
        </div>
      )}

      <button
        className="btn btn-primary me-2"
        onClick={tambahProduksi}
        disabled={status === "EMERGENCY"}
      >
        +1 Unit
      </button>

      <button className="btn btn-warning me-2" onClick={emergencyStop}>
        Emergency Stop
      </button>

      <button className="btn btn-danger" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default CounterProduksi;