import { Link } from "react-router-dom";
import GrafikProduksi from "../Komponen/GrafikProduksi";
import GrafikCacat from "../Komponen/GrafikCacat";

function Dashboard() {
  const dataLog = [
    {
      waktu: "08:00",
      mesin: "CNC-01",
      produk: "Part A-12",
      jumlah: 115,
      status: "OK",
    },
    {
      waktu: "09:00",
      mesin: "CNC-02",
      produk: "Part B-05",
      jumlah: 145,
      status: "OK",
    },
    {
      waktu: "10:00",
      mesin: "Press-01",
      produk: "Part C-20",
      jumlah: 175,
      status: "Warning",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3">
          <h4 className="mb-4">TekInd System</h4>

          <div className="d-flex flex-md-column gap-2">
            <Link className="btn btn-outline-light text-start" to="/">
              Dashboard
            </Link>

            <Link className="btn btn-outline-light text-start" to="/inventori">
              Inventori
            </Link>

            <Link className="btn btn-outline-light text-start" to="/laporan-kualitas">
              Laporan
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <div>
              <h2>Dashboard Monitoring Produksi</h2>
              <p className="text-muted">
                Ringkasan performa produksi harian
              </p>
            </div>

            <div className="text-end">
              <strong>Shannaz Fairuz</strong>
              <br />
              <small>NIM: 23051430020</small>
            </div>
          </div>

          {/* KPI */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="card bg-primary text-white shadow-sm">
                <div className="card-body">
                  <h6>Total Output</h6>
                  <h2>1.025 Unit</h2>
                  <small>Update terakhir 13:00</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card bg-success text-white shadow-sm">
                <div className="card-body">
                  <h6>Efficiency Rate</h6>
                  <h2>92.4%</h2>
                  <small>Lebih baik dari kemarin</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card bg-warning text-dark shadow-sm">
                <div className="card-body">
                  <h6>Reject Rate</h6>
                  <h2>2.1%</h2>
                  <small>Perlu monitoring QC</small>
                </div>
              </div>
            </div>
          </div>

          {/* Grafik */}
          <div className="row mb-4">
            <div className="col-lg-8 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <GrafikProduksi />
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="text-center">Proporsi Cacat</h5>
                  <GrafikCacat />
                </div>
              </div>
            </div>
          </div>

          {/* Tabel */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Data Log Produksi</h5>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Mesin</th>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {dataLog.map((item, index) => (
                    <tr key={index}>
                      <td>{item.waktu}</td>
                      <td>{item.mesin}</td>
                      <td>{item.produk}</td>
                      <td>{item.jumlah}</td>
                      <td>
                        <span
                          className={
                            item.status === "OK"
                              ? "badge bg-success"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;