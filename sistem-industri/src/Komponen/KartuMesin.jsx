function KartuMesin(props) {
  const namaMesin = props.nama;
  const status = props.status;
  const produksi = props.produksi;

  let badgeColor = "bg-secondary";

  if (status === "Running") {
    badgeColor = "bg-success";
  }

  if (status === "Stop") {
    badgeColor = "bg-danger";
  }

  if (status === "Maintenance") {
    badgeColor = "bg-warning";
  }

  return (
    <div className="card shadow-sm p-3 mb-3">
      <div className="card-body">
        <h5>{namaMesin}</h5>

        <span className={`badge ${badgeColor}`}>
          {status}
        </span>

        <hr />

        <p>
          Produksi: <b>{produksi}</b> Unit
        </p>
      </div>
    </div>
  );
}

export default KartuMesin;