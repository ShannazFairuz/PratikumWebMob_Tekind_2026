function KartuKaryawan({ nama, jabatan, bagian }) {
  return (
    <div className="card shadow-sm p-3 mb-3">
      <div className="card-body">
        <h5>{nama}</h5>
        <p>Jabatan: {jabatan}</p>
        <p>Bagian: {bagian}</p>
      </div>
    </div>
  );
}

export default KartuKaryawan;