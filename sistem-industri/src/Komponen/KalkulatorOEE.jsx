import { useState } from "react";

function KalkulatorOEE() {
  const [planTime, setPlanTime] = useState(8);
  const [runTime, setRunTime] = useState(7);
  const [totalParts, setTotalParts] = useState(100);
  const [goodParts, setGoodParts] = useState(90);

  const availability = planTime > 0 ? runTime / planTime : 0;
  const performance = runTime > 0 ? totalParts / (runTime * 20) : 0;
  const quality = totalParts > 0 ? goodParts / totalParts : 0;

  const oee = availability * performance * quality * 100;

  let warnaHasil = "text-dark";

  if (oee < 50) {
    warnaHasil = "text-danger";
  } else if (oee > 85) {
    warnaHasil = "text-success";
  }

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3 className="text-center mb-3">Kalkulator OEE Sederhana</h3>

      <div className="mb-3">
        <label className="form-label">Plan Time (jam)</label>
        <input
          type="number"
          className="form-control"
          value={planTime}
          onChange={(e) => setPlanTime(Number(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Run Time (jam)</label>
        <input
          type="number"
          className="form-control"
          value={runTime}
          onChange={(e) => setRunTime(Number(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Total Parts</label>
        <input
          type="number"
          className="form-control"
          value={totalParts}
          onChange={(e) => setTotalParts(Number(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Good Parts</label>
        <input
          type="number"
          className="form-control"
          value={goodParts}
          onChange={(e) => setGoodParts(Number(e.target.value))}
        />
      </div>

      <hr />

      <p>Availability: {(availability * 100).toFixed(2)}%</p>
      <p>Performance: {(performance * 100).toFixed(2)}%</p>
      <p>Quality: {(quality * 100).toFixed(2)}%</p>

      <h2 className={`text-center ${warnaHasil}`}>
        OEE: {oee.toFixed(2)}%
      </h2>
    </div>
  );
}

export default KalkulatorOEE;