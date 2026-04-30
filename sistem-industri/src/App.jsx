import KartuMesin from "./Komponen/KartuMesin";
import KartuMesin2 from "./Komponen/KartuMesin2";
import KartuKaryawan from "./Komponen/KartuKaryawan";
import CounterProduksi from "./Komponen/CounterProduksi.jsx";
import JamDigital from "./Komponen/JamDigital"; 
import KalkulatorOEE from "./Komponen/KalkulatorOEE";

function App() {
  return (
    <div className="container mt-4">
      <h5>Nama: Shannaz Fairuz</h5>
      <h5>NIM: 23051430020</h5>
      <h1>Monitoring Produksi</h1>
      
      <JamDigital />
      <CounterProduksi />
      <KalkulatorOEE />

      <h2>Data Mesin</h2>

      <KartuMesin nama="CNC-01" status="Running" produksi={150} />

      {/* Ini latihan 2 (default props) */}
      <KartuMesin2 nama="CNC-02" status="Maintenance" />

      <KartuMesin nama="Press-01" status="Stop" produksi={85} />

      <hr />

      <h2>Data Karyawan</h2>

      <KartuKaryawan
        nama="Jonathan"
        jabatan="Manager"
        bagian="Produksi"
      />

      <KartuKaryawan
        nama="Flauren"
        jabatan="Operator"
        bagian="Lini A"
      />

      <KartuKaryawan
        nama="David"
        jabatan="QC"
        bagian="Quality"
      />
    </div>
  );
}

export default App;