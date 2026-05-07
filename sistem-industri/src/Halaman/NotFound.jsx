import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1">404</h1>
      <p>Halaman tidak ditemukan dalam sistem pabrik.</p>

      <Link to="/" className="btn btn-dark">
        Kembali ke Home
      </Link>
    </div>
  );
}

export default NotFound;