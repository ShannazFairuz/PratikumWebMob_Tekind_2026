function KartuMesin2({ nama, status, produksi = 0 }) {
  let badgeColor = "bg-secondary";

  if (status === "Running") badgeColor = "bg-success";
  if (status === "Stop") badgeColor = "bg-danger";
  if (status === "Maintenance") badgeColor = "bg-warning";

  return (
    <div className="card shadow-sm p-3 mb-3 border-primary">
      <div className="card-body">
        <h5 className="card-title">{nama}</h5>

        <span className={`badge ${badgeColor}`}>{status}</span>

        <hr />

        <p>
          Produksi Saat Ini: <strong>{produksi}</strong> Unit
        </p>

        <small className="text-muted">
          Default props produksi = 0
        </small>
      </div>
    </div>
  );
}

export default KartuMesin2;