import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./Halaman/Dashboard";
import Inventori from "./Halaman/Inventori";
import DetailInventori from "./Halaman/DetailInventori";
import LaporanKualitas from "./Halaman/LaporanKualitas";
import NotFound from "./Halaman/NotFound";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">

      <div className="container">

        <Link className="navbar-brand" to="/">
          Sistem Pabrik
        </Link>

        <div className="navbar-nav">

          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          <Link className="nav-link" to="/inventori">
            Inventori
          </Link>

          <Link
            className="nav-link"
            to="/laporan-kualitas"
          >
            Laporan Kualitas
          </Link>

        </div>

      </div>

    </nav>
  );
}

function App() {
  return (
    <div>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/inventori"
          element={<Inventori />}
        />

        <Route
          path="/inventori/:id"
          element={<DetailInventori />}
        />

        <Route
          path="/laporan-kualitas"
          element={<LaporanKualitas />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </div>
  );
}

export default App;