- Aktor yang bisa mengakses sistem :
```bash
    1. Super Admin / Pemilik
    2. Admin 
    3. Customer
```

# Gambaran aplikasi
1. Menu super admin/pemilik
   - login ( username & password ) yang telah didaftarkan 
   - pemilik dapat melihat laporan penjualan 
	isi dari laporan penjualan :
		- tanggal penjualan
	 	- customer_code
		- sub total
		- diskon 
		- total penjualan 
		- pembayaran
	
2. Menu admin
	- login ( username & password ) yang telah didaftarkan
	- admin dapat mengelola data dan informasi mengenai tambah customer
	- admin dapat melakukan improve produk
	- admin dapat melakukan edit atau update produk
	- admin dapat memberi diskon untuk customer => jika customer melakukan pembelian dalam 1 bulan mencapai >= 1000, jika <1000 diskon isi 0
	- admin bisa juga melihat laporan penjualan seperti halnya super admin / pemilik
3. Menu Customer
	- registrasi => customer_code, password, nama
	- login ( customer_code & password ) yang telah didaftarkan sebelumnya
	- customer dapat melihat produk yag tersedia 
	- customer dapat melakukan pembelian produk

<h1>ERD</h1>

<img src="./assets/foto%20erd.png" alt="ERD" width="700"/>
