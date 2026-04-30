import { useState } from "react";

function KartuMesin({ nama, status, produksi }) {
  const [statusLokal, setStatusLokal] = useState(status);

  let badgeColor = "bg-secondary";

  if (statusLokal === "Running") {
    badgeColor = "bg-success";
  }

  if (statusLokal === "Stop") {
    badgeColor = "bg-danger";
  }

  if (statusLokal === "Maintenance") {
    badgeColor = "bg-warning";
  }

  return (
    <div className="card shadow-sm p-3 mb-3">
      <div className="card-body">
        <h5>{nama}</h5>

        <span className={`badge ${badgeColor}`}>
          {statusLokal}
        </span>

        <hr />

        <p>
          Produksi: <b>{produksi}</b> Unit
        </p>

        <select
          className="form-select mt-2"
          value={statusLokal}
          onChange={(e) => setStatusLokal(e.target.value)}
        >
          <option value="Running">Running</option>
          <option value="Stop">Stop</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>
    </div>
  );
}

export default KartuMesin;