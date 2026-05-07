function LaporanKualitas() {
  const dataCacat = [
    {
      id: 1,
      produk: "Part A-12",
      jenisCacat: "Scratch",
      jumlah: 5,
      shift: "Pagi",
    },
    {
      id: 2,
      produk: "Part B-05",
      jenisCacat: "Dent",
      jumlah: 3,
      shift: "Siang",
    },
    {
      id: 3,
      produk: "Part C-20",
      jenisCacat: "Dimensi Tidak Sesuai",
      jumlah: 2,
      shift: "Malam",
    },
  ];

  return (
    <div className="container mt-4">
      <h1>Laporan Kualitas</h1>
      <p>Data cacat produksi berdasarkan hasil inspeksi.</p>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Jenis Cacat</th>
            <th>Jumlah</th>
            <th>Shift</th>
          </tr>
        </thead>

        <tbody>
          {dataCacat.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.produk}</td>
              <td>{item.jenisCacat}</td>
              <td>{item.jumlah}</td>
              <td>{item.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LaporanKualitas;