import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Inventori() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    const dataDummy = [
      {
        id: 1,
        nama: "Baja Ringan",
        status: "Available"
      },
      {
        id: 2,
        nama: "Aluminium Sheet",
        status: "Available"
      },
      {
        id: 3,
        nama: "Bearing SKF",
        status: "Limited"
      },
      {
        id: 4,
        nama: "Cat Industri",
        status: "Available"
      },
      {
        id: 5,
        nama: "Mur dan Baut",
        status: "Out of Stock"
      }
    ];

    setTimeout(() => {

      setProducts(dataDummy);

      setLoading(false);

    }, 1000);

  }, []);

  return (
    <div className="container mt-4">

      <h1>Data Inventori Bahan Baku</h1>

      <Link
        to="/"
        className="btn btn-secondary mb-3"
      >
        Kembali ke Dashboard
      </Link>

      {loading ? (

        <div className="alert alert-info text-center">
          Memuat data...
        </div>

      ) : (

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID Item</th>
              <th>Nama Bahan</th>
              <th>Status Supplier</th>
            </tr>
          </thead>

          <tbody>

            {products.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>

                  <Link to={`/inventori/${item.id}`}>

                    {item.nama}

                  </Link>

                </td>

                <td>

                  <span className="badge bg-success">

                    {item.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default Inventori;