const btnLoad = document.getElementById('btnLoad'); 
const btnTambah = document.getElementById('btnTambah'); // ← BARU
const container = document.getElementById('containerKaryawan'); 
const loading = document.getElementById('loading'); 

// Endpoint API (Simulasi Database) 
const API_URL = 'https://jsonplaceholder.typicode.com/users'; 

btnLoad.addEventListener('click', function() { 
    // Tampilkan loading 
    loading.classList.remove('d-none'); 
    container.innerHTML = ''; // Bersihkan konten lama 
    
    // Fetch Data 
    fetch(API_URL) 
    .then(function(response) { 
        if (!response.ok) { 
            throw new Error('Gagal mengambil data'); 
        } 
        return response.json(); 
    }) 
    .then(function(dataKaryawan) { 
        console.log(dataKaryawan); 
        renderData(dataKaryawan); 
    }) 
    .catch(function(error) { 
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`; 
    }) 
    .finally(function() { 
        loading.classList.add('d-none'); 
    }); 
}); 

// ← FUNGSI BARU: Tambah Karyawan (POST)
btnTambah.addEventListener('click', function() {
    // Data dummy karyawan baru
    const karyawanBaru = {
        name: 'Budi Santoso',
        email: 'budi.santoso@perusahaan.com',
        phone: '081234567890',
        website: 'budisantoso.com',
        company: {
            name: 'PT Teknologi Maju',
            catchPhrase: 'Solusi Inovatif',
            bs: 'Enterprise Solutions'
        },
        address: {
            street: 'Jl. Sudirman No. 123',
            suite: 'Lantai 5',
            city: 'Jakarta',
            zipcode: '12190'
        }
    };

    // Tampilkan loading
    loading.classList.remove('d-none');
    
    // POST Request dengan fetch
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(karyawanBaru) // ← Convert object ke JSON string
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Gagal menambah karyawan');
        }
        return response.json(); // JSONPlaceholder akan mengembalikan data yang kita kirim + id=201
    })
    .then(function(dataResponse) {
        console.log('✅ BERHASIL MENAMBAH KARYAWAN!');
        console.log('Data yang dikirim:', karyawanBaru);
        console.log('Response dari server:', dataResponse);
        
        // Tampilkan notifikasi sukses
        container.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Berhasil!</strong> Karyawan baru ditambahkan dengan ID: ${dataResponse.id}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Auto reload data setelah 2 detik
        setTimeout(() => {
            btnLoad.click(); // Reload data otomatis
        }, 2000);
    })
    .catch(function(error) {
        console.error('❌ ERROR POST:', error);
        container.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    })
    .finally(function() {
        loading.classList.add('d-none');
    });
});

function renderData(data) { 
    data.forEach(function(karyawan) { 
        const col = document.createElement('div'); 
        col.className = 'col-md-4 mb-3'; 
         
        col.innerHTML = ` 
            <div class="card h-100 shadow-sm"> 
                <div class="card-body"> 
                    <h5 class="card-title">${karyawan.name}</h5> 
                    <p class="card-text text-muted">Email: ${karyawan.email}</p> 
                    <p class="card-text">Perusahaan: ${karyawan.company.name}</p> 
                    <p class="card-text"><small>Kota: ${karyawan.address.city}</small></p> 
                    <a href="#" class="btn btn-sm btn-outline-primary" onclick="cariKaryawan(${karyawan.id})">Detail Profil</a> 
                </div> 
            </div> 
        `; 
        container.appendChild(col); 
    }); 
}

// Fungsi cari karyawan (sudah ada, ditambahkan onclick)
async function cariKaryawan(id) { 
    try { 
        console.log(`Mencari data ID: ${id}...`); 
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`); 
        if (!response.ok) { 
            throw new Error('Data tidak ditemukan'); 
        } 
        const data = await response.json(); 
        console.log("Ditemukan:", data); 
        alert(`Ditemukan: ${data.name} - bekerja di ${data.company.name}`); 
    } catch (error) { 
        console.error(error); 
        alert(error.message); 
    } 
}