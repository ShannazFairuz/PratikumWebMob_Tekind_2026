import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailInventori() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!item) {
    return (
      <div className="container mt-4 text-center">
        <h3>Memuat detail item...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Detail Inventori</h1>

      <div className="card shadow-sm p-4">
        <h4>{item.title}</h4>
        <p>
          <strong>ID Item:</strong> {item.id}
        </p>
        <p>
          <strong>Deskripsi:</strong> {item.body}
        </p>
        <p>
          <strong>Status Supplier:</strong>{" "}
          <span className="badge bg-success">Available</span>
        </p>
      </div>

      <Link to="/inventori" className="btn btn-secondary mt-3">
        Kembali ke Inventori
      </Link>
    </div>
  );
}

export default DetailInventori;