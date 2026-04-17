const btnLoad = document.getElementById('btnLoad'); 
const btnTambah = document.getElementById('btnTambah'); 
const btnFilter = document.getElementById('btnFilter'); // ← BARU
const inputFilter = document.getElementById('filterKota'); // ← BARU
const container = document.getElementById('containerKaryawan'); 
const loading = document.getElementById('loading'); 

const API_URL = 'https://jsonplaceholder.typicode.com/users'; 

// Event listener yang sudah ada (btnLoad & btnTambah) - TIDAK BERUBAH
btnLoad.addEventListener('click', function() { 
    loading.classList.remove('d-none'); 
    container.innerHTML = ''; 
    
    fetch(API_URL) 
    .then(function(response) { 
        if (!response.ok) { 
            throw new Error('Gagal mengambil data'); 
        } 
        return response.json(); 
    }) 
    .then(function(dataKaryawan) { 
        console.log('📥 Data mentah (10 karyawan):', dataKaryawan.length);
        renderData(dataKaryawan); 
    }) 
    .catch(function(error) { 
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`; 
    }) 
    .finally(function() { 
        loading.classList.add('d-none'); 
    }); 
}); 

btnTambah.addEventListener('click', function() {
    const karyawanBaru = {
        name: 'Budi Santoso',
        email: 'budi.santoso@perusahaan.com',
        phone: '081234567890',
        website: 'budisantoso.com',
        company: { name: 'PT Teknologi Maju', catchPhrase: 'Solusi Inovatif', bs: 'Enterprise Solutions' },
        address: { street: 'Jl. Sudirman No. 123', suite: 'Lantai 5', city: 'Jakarta', zipcode: '12190' }
    };

    loading.classList.remove('d-none');
    
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(karyawanBaru)
    })
    .then(response => {
        if (!response.ok) throw new Error('Gagal menambah karyawan');
        return response.json();
    })
    .then(dataResponse => {
        console.log(' BERHASIL MENAMBAH KARYAWAN!', dataResponse);
        container.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show">
                <strong>Berhasil!</strong> Karyawan baru ditambahkan (ID: ${dataResponse.id})
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        setTimeout(() => btnLoad.click(), 2000);
    })
    .catch(error => {
        console.error(' ERROR POST:', error);
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    })
    .finally(() => loading.classList.add('d-none'));
});

// ← FUNGSI BARU: Filter berdasarkan input
btnFilter.addEventListener('click', function() {
    const filterText = inputFilter.value.toLowerCase().trim();
    if (filterText) {
        console.log(` Mencari kota mengandung: "${filterText}"`);
        btnLoad.click(); // Reload dan filter otomatis
    }
});

// Enter key di input filter
inputFilter.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        btnFilter.click();
    }
});

// ← FUNGSI renderData DIPERBAIKI DENGAN FILTER!
function renderData(data) {
    const filterText = inputFilter.value.toLowerCase().trim();
    
    // FILTER: Hanya tampilkan kota yang MENGANDUNG huruf tertentu
    let dataFiltered;
    if (filterText) {
        dataFiltered = data.filter(function(karyawan) {
            // Cek apakah kota mengandung huruf yang dicari (case insensitive)
            return karyawan.address.city.toLowerCase().includes(filterText);
        });
        console.log(` Filter "${filterText}": ${dataFiltered.length}/${data.length} karyawan ditemukan`);
    } else {
        dataFiltered = data; // Tidak ada filter
        console.log(` Semua data: ${dataFiltered.length} karyawan`);
    }
    
    // Bersihkan container
    container.innerHTML = '';
    
    if (dataFiltered.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    <h5>Tidak ada karyawan ditemukan</h5>
                    <p>Kota yang mengandung "${filterText}" tidak ditemukan</p>
                    <button class="btn btn-outline-primary" onclick="inputFilter.value='';btnLoad.click()">
                        Hapus Filter & Muat Ulang
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // Render filtered data
    dataFiltered.forEach(function(karyawan) { 
        const col = document.createElement('div'); 
        col.className = 'col-md-4 mb-3'; 
        col.innerHTML = ` 
            <div class="card h-100 shadow-sm border-primary"> 
                <div class="card-body"> 
                    <h5 class="card-title">${karyawan.name}</h5> 
                    <p class="card-text text-muted">Email: ${karyawan.email}</p> 
                    <p class="card-text fw-bold text-primary">🏙️ ${karyawan.address.city}</p> 
                    <p class="card-text">Perusahaan: ${karyawan.company.name}</p> 
                    <a href="#" class="btn btn-sm btn-outline-primary" onclick="cariKaryawan(${karyawan.id})">Detail Profil</a> 
                </div> 
            </div> 
        `; 
        container.appendChild(col); 
    }); 
    
    // Tampilkan info filter di atas
    const infoFilter = document.createElement('div');
    infoFilter.className = 'col-12 mb-3';
    infoFilter.innerHTML = `
        <div class="alert alert-info">
             Menampilkan <strong>${dataFiltered.length}</strong> dari <strong>${data.length}</strong> karyawan
            ${filterText ? `| Filter: <em>"${filterText}"</em> di kota` : ''}
        </div>
    `;
    container.insertBefore(infoFilter, container.firstChild);
}

// Fungsi cariKaryawan - TIDAK BERUBAH
async function cariKaryawan(id) { 
    try { 
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`); 
        if (!response.ok) throw new Error('Data tidak ditemukan'); 
        const data = await response.json(); 
        alert(` ${data.name}\n ${data.email}\n ${data.company.name}\n ${data.address.city}`);
    } catch (error) { 
        alert('Error: ' + error.message); 
    } 
}