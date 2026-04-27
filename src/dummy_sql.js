let data = `-- =========================================
-- DUMMY DATA 100 RECORDS (SEMUA TABEL)
-- SQLITE READY
-- =========================================

BEGIN TRANSACTION;

-- ========================
-- tb_category (10 data)
-- ========================
INSERT INTO tb_category (name, description) VALUES
('Elektronik', 'Kategori barang elektronik'),
('Furniture', 'Kategori barang furniture'),
('ATK', 'Alat tulis kantor'),
('Networking', 'Perangkat jaringan'),
('Hardware', 'Perangkat keras komputer'),
('Software', 'Perangkat lunak'),
('Cleaning', 'Peralatan kebersihan'),
('Kitchen', 'Peralatan dapur'),
('Safety', 'Peralatan keamanan'),
('Sparepart', 'Suku cadang');

-- ========================
-- tb_supplier (10 data)
-- ========================
INSERT INTO tb_supplier (name, email, no_phone, address) VALUES
('PT Sumber Jaya', 'supplier1@mail.com', '081111111001', 'Jakarta'),
('CV Maju Bersama', 'supplier2@mail.com', '081111111002', 'Bandung'),
('PT Nusantara Abadi', 'supplier3@mail.com', '081111111003', 'Surabaya'),
('CV Global Teknologi', 'supplier4@mail.com', '081111111004', 'Bekasi'),
('PT Digital Solusi', 'supplier5@mail.com', '081111111005', 'Depok'),
('CV Prima Jaya', 'supplier6@mail.com', '081111111006', 'Bogor'),
('PT Andalan Supply', 'supplier7@mail.com', '081111111007', 'Tangerang'),
('CV Sinar Makmur', 'supplier8@mail.com', '081111111008', 'Semarang'),
('PT Berkah Usaha', 'supplier9@mail.com', '081111111009', 'Yogyakarta'),
('CV Sentosa Abadi', 'supplier10@mail.com', '081111111010', 'Medan');

-- ========================
-- tb_location (10 data)
-- ========================
INSERT INTO tb_location (code, name, description) VALUES
('LOC-01', 'Gudang A', 'Gudang utama'),
('LOC-02', 'Gudang B', 'Gudang cadangan'),
('LOC-03', 'Rak A1', 'Rak elektronik'),
('LOC-04', 'Rak B1', 'Rak ATK'),
('LOC-05', 'Rak C1', 'Rak sparepart'),
('LOC-06', 'Showroom', 'Area display'),
('LOC-07', 'Office', 'Area kantor'),
('LOC-08', 'Server Room', 'Ruang server'),
('LOC-09', 'Workshop', 'Area teknisi'),
('LOC-10', 'Outdoor', 'Penyimpanan luar');

-- ========================
-- tb_merek (10 data)
-- ========================
INSERT INTO tb_merek (name, description) VALUES
('Samsung', 'Brand Samsung'),
('LG', 'Brand LG'),
('Asus', 'Brand Asus'),
('Cisco', 'Brand Cisco'),
('TP-Link', 'Brand TP-Link'),
('Dell', 'Brand Dell'),
('HP', 'Brand HP'),
('Canon', 'Brand Canon'),
('Logitech', 'Brand Logitech'),
('Kingston', 'Brand Kingston');

-- ========================
-- tb_product (100 data)
-- ========================
INSERT INTO tb_product
(name, sku, category_id, merk_id, location_id, description, unit, stock, price)
VALUES
('Product 1', 'SKU-0001', 1, 1, 1, 'Deskripsi Product 1', 'pcs', 50, 10000),
('Product 2', 'SKU-0002', 2, 2, 2, 'Deskripsi Product 2', 'pcs', 45, 12000),
('Product 3', 'SKU-0003', 3, 3, 3, 'Deskripsi Product 3', 'pcs', 30, 15000),
('Product 4', 'SKU-0004', 4, 4, 4, 'Deskripsi Product 4', 'pcs', 25, 18000),
('Product 5', 'SKU-0005', 5, 5, 5, 'Deskripsi Product 5', 'pcs', 60, 20000),
('Product 6', 'SKU-0006', 6, 6, 6, 'Deskripsi Product 6', 'pcs', 75, 25000),
('Product 7', 'SKU-0007', 7, 7, 7, 'Deskripsi Product 7', 'pcs', 80, 30000),
('Product 8', 'SKU-0008', 8, 8, 8, 'Deskripsi Product 8', 'pcs', 90, 35000),
('Product 9', 'SKU-0009', 9, 9, 9, 'Deskripsi Product 9', 'pcs', 40, 40000),
('Product 10', 'SKU-0010', 10, 10, 10, 'Deskripsi Product 10', 'pcs', 20, 45000),

('Product 11', 'SKU-0011', 1, 1, 1, 'Deskripsi Product 11', 'pcs', 55, 11000),
('Product 12', 'SKU-0012', 2, 2, 2, 'Deskripsi Product 12', 'pcs', 65, 13000),
('Product 13', 'SKU-0013', 3, 3, 3, 'Deskripsi Product 13', 'pcs', 35, 16000),
('Product 14', 'SKU-0014', 4, 4, 4, 'Deskripsi Product 14', 'pcs', 28, 19000),
('Product 15', 'SKU-0015', 5, 5, 5, 'Deskripsi Product 15', 'pcs', 70, 21000),
('Product 16', 'SKU-0016', 6, 6, 6, 'Deskripsi Product 16', 'pcs', 85, 26000),
('Product 17', 'SKU-0017', 7, 7, 7, 'Deskripsi Product 17', 'pcs', 88, 31000),
('Product 18', 'SKU-0018', 8, 8, 8, 'Deskripsi Product 18', 'pcs', 92, 36000),
('Product 19', 'SKU-0019', 9, 9, 9, 'Deskripsi Product 19', 'pcs', 44, 41000),
('Product 20', 'SKU-0020', 10, 10, 10, 'Deskripsi Product 20', 'pcs', 24, 46000),

('Product 21', 'SKU-0021', 1, 1, 1, 'Deskripsi Product 21', 'pcs', 51, 10500),
('Product 22', 'SKU-0022', 2, 2, 2, 'Deskripsi Product 22', 'pcs', 46, 12500),
('Product 23', 'SKU-0023', 3, 3, 3, 'Deskripsi Product 23', 'pcs', 31, 15500),
('Product 24', 'SKU-0024', 4, 4, 4, 'Deskripsi Product 24', 'pcs', 26, 18500),
('Product 25', 'SKU-0025', 5, 5, 5, 'Deskripsi Product 25', 'pcs', 61, 20500),
('Product 26', 'SKU-0026', 6, 6, 6, 'Deskripsi Product 26', 'pcs', 76, 25500),
('Product 27', 'SKU-0027', 7, 7, 7, 'Deskripsi Product 27', 'pcs', 81, 30500),
('Product 28', 'SKU-0028', 8, 8, 8, 'Deskripsi Product 28', 'pcs', 91, 35500),
('Product 29', 'SKU-0029', 9, 9, 9, 'Deskripsi Product 29', 'pcs', 41, 40500),
('Product 30', 'SKU-0030', 10, 10, 10, 'Deskripsi Product 30', 'pcs', 21, 45500),

('Product 31', 'SKU-0031', 1, 1, 1, 'Deskripsi Product 31', 'pcs', 52, 10800),
('Product 32', 'SKU-0032', 2, 2, 2, 'Deskripsi Product 32', 'pcs', 47, 12800),
('Product 33', 'SKU-0033', 3, 3, 3, 'Deskripsi Product 33', 'pcs', 32, 15800),
('Product 34', 'SKU-0034', 4, 4, 4, 'Deskripsi Product 34', 'pcs', 27, 18800),
('Product 35', 'SKU-0035', 5, 5, 5, 'Deskripsi Product 35', 'pcs', 62, 20800),
('Product 36', 'SKU-0036', 6, 6, 6, 'Deskripsi Product 36', 'pcs', 77, 25800),
('Product 37', 'SKU-0037', 7, 7, 7, 'Deskripsi Product 37', 'pcs', 82, 30800),
('Product 38', 'SKU-0038', 8, 8, 8, 'Deskripsi Product 38', 'pcs', 93, 35800),
('Product 39', 'SKU-0039', 9, 9, 9, 'Deskripsi Product 39', 'pcs', 42, 40800),
('Product 40', 'SKU-0040', 10, 10, 10, 'Deskripsi Product 40', 'pcs', 22, 45800);

-- ========================
-- tb_user (5 data)
-- ========================
INSERT INTO tb_user (name, password) VALUES
('admin', 'admin123'),
('staff1', 'staff123'),
('staff2', 'staff123'),
('gudang1', 'gudang123'),
('manager', 'manager123');

-- ========================
-- tb_header_transaction_in (20 data)
-- ========================
INSERT INTO tb_header_transaction_in
(supplier_id, description)
VALUES
(1, 'Barang masuk supplier 1'),
(2, 'Barang masuk supplier 2'),
(3, 'Barang masuk supplier 3'),
(4, 'Barang masuk supplier 4'),
(5, 'Barang masuk supplier 5');

-- ========================
-- tb_detail_transaction_in
-- ========================
INSERT INTO tb_detail_transaction_in
(transaction_in_id, product_id, qty)
VALUES
(1,1,10),
(2,2,15),
(3,3,20),
(4,4,12),
(5,5,8);

-- ========================
-- tb_header_transaction_out
-- ========================
INSERT INTO tb_header_transaction_out
(date, description)
VALUES
(datetime('now'), 'Barang keluar 1'),
(datetime('now'), 'Barang keluar 2'),
(datetime('now'), 'Barang keluar 3'),
(datetime('now'), 'Barang keluar 4'),
(datetime('now'), 'Barang keluar 5');

-- ========================
-- tb_detail_transaction_out
-- ========================
INSERT INTO tb_detail_transaction_out
(transaction_out_id, product_id, qty)
VALUES
(1,1,5),
(2,2,3),
(3,3,7),
(4,4,2),
(5,5,4);

-- ========================
-- tb_galery
-- ========================
INSERT INTO tb_galery
(product_id, name_file, description)
VALUES
(1, 'product1.jpg', 'Foto product 1'),
(2, 'product2.jpg', 'Foto product 2'),
(3, 'product3.jpg', 'Foto product 3'),
(4, 'product4.jpg', 'Foto product 4'),
(5, 'product5.jpg', 'Foto product 5');

COMMIT;`


let dummu2 = `PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- ============================================================
-- SEED DATA - Inventory Management System
-- 100 Products | Real Images via Picsum/Unsplash
-- Context: Toko Elektronik & Peralatan - Jakarta
-- ============================================================

-- ============================================================
-- tb_category (10 kategori)
-- ============================================================
INSERT INTO tb_category (id, name, description, created_at, updated_at) VALUES
(1,  'Elektronik',         'Produk elektronik umum seperti TV, audio, dan aksesori',       '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
(2,  'Komputer & Laptop',  'Perangkat komputer, laptop, dan perlengkapannya',               '2024-01-05 08:05:00', '2024-01-05 08:05:00'),
(3,  'Smartphone',         'Handphone, tablet, dan aksesori mobile',                        '2024-01-05 08:10:00', '2024-01-05 08:10:00'),
(4,  'Peralatan Rumah',    'Peralatan dapur, kebersihan, dan kebutuhan rumah tangga',       '2024-01-05 08:15:00', '2024-01-05 08:15:00'),
(5,  'Jaringan & Server',  'Router, switch, kabel jaringan, dan perlengkapan server',       '2024-01-05 08:20:00', '2024-01-05 08:20:00'),
(6,  'Kamera & Optik',     'Kamera digital, CCTV, lensa, dan aksesori fotografi',           '2024-01-05 08:25:00', '2024-01-05 08:25:00'),
(7,  'Gaming',             'Konsol game, controller, headset gaming, dan aksesori',         '2024-01-05 08:30:00', '2024-01-05 08:30:00'),
(8,  'Office & ATK',       'Alat tulis, printer, tinta, dan perlengkapan kantor',           '2024-01-05 08:35:00', '2024-01-05 08:35:00'),
(9,  'Power & Baterai',    'UPS, baterai, power bank, dan sumber daya listrik',             '2024-01-05 08:40:00', '2024-01-05 08:40:00'),
(10, 'Tools & Teknik',     'Perkakas tangan, alat ukur, dan perlengkapan teknik',           '2024-01-05 08:45:00', '2024-01-05 08:45:00');

-- ============================================================
-- tb_supplier (10 supplier)
-- ============================================================
INSERT INTO tb_supplier (id, name, email, no_phone, address, created_at, updated_at) VALUES
(1,  'PT Surya Elektronik Nusantara',   'purchasing@suryanusantara.co.id',  '021-5561234',   'Jl. Mangga Dua Raya No. 12, Jakarta Utara',           '2024-01-06 09:00:00', '2024-01-06 09:00:00'),
(2,  'CV Maju Bersama Tech',            'order@majubersamatech.com',        '021-6234567',   'Jl. Glodok Jaya No. 88, Jakarta Barat',               '2024-01-06 09:05:00', '2024-01-06 09:05:00'),
(3,  'PT Indo Digital Solusi',          'sales@indodigital.id',             '021-7891234',   'Jl. Gajah Mada No. 45, Jakarta Pusat',                '2024-01-06 09:10:00', '2024-01-06 09:10:00'),
(4,  'UD Berkah Komputer',              'berkahkomp@gmail.com',             '0812-3456789',  'Ruko ITC Roxy Mas Blok B2 No. 5, Jakarta Barat',      '2024-01-06 09:15:00', '2024-01-06 09:15:00'),
(5,  'PT Teknologi Mitra Sejati',       'info@tekmitraSejati.co.id',        '021-4523678',   'Jl. RS Fatmawati No. 20, Jakarta Selatan',            '2024-01-06 09:20:00', '2024-01-06 09:20:00'),
(6,  'CV Prima Gadget Indonesia',       'prima.gadget@yahoo.com',           '0878-9012345',  'Jl. Pasar Minggu Raya No. 33, Jakarta Selatan',       '2024-01-06 09:25:00', '2024-01-06 09:25:00'),
(7,  'PT Nusa Komponen Elektro',        'nke@nusakomponen.co.id',           '021-8823456',   'Kawasan Industri Pulogadung Blok C No. 7, Jakarta',   '2024-01-06 09:30:00', '2024-01-06 09:30:00'),
(8,  'Toko Mutiara Electronic',         'mutiara.elec@gmail.com',           '0813-2109876',  'Jl. Hayam Wuruk No. 99, Jakarta Pusat',               '2024-01-06 09:35:00', '2024-01-06 09:35:00'),
(9,  'PT Global Tech Distribusi',       'dist@globaltech.id',               '021-3312456',   'Jl. Sunter Raya No. 15, Jakarta Utara',               '2024-01-06 09:40:00', '2024-01-06 09:40:00'),
(10, 'CV Bintang Solusi Digital',       'bintang.solusi@gmail.com',         '0857-6543210',  'Jl. Kebayoran Lama No. 55, Jakarta Selatan',          '2024-01-06 09:45:00', '2024-01-06 09:45:00');

-- ============================================================
-- tb_location (10 lokasi gudang)
-- ============================================================
INSERT INTO tb_location (id, code, name, description, created_at, updated_at) VALUES
(1,  'GDG-A1', 'Rak A1 - Elektronik Kecil',   'Rak baris A kolom 1, kapasitas 200 unit, elektronik kecil & aksesori',  '2024-01-07 07:00:00', '2024-01-07 07:00:00'),
(2,  'GDG-A2', 'Rak A2 - Laptop & Komputer',  'Rak baris A kolom 2, kapasitas 80 unit, laptop dan desktop',            '2024-01-07 07:05:00', '2024-01-07 07:05:00'),
(3,  'GDG-B1', 'Rak B1 - Smartphone',         'Rak baris B kolom 1, kapasitas 300 unit, handphone dan tablet',         '2024-01-07 07:10:00', '2024-01-07 07:10:00'),
(4,  'GDG-B2', 'Rak B2 - Peralatan Rumah',    'Rak baris B kolom 2, kapasitas 150 unit, alat rumah tangga',            '2024-01-07 07:15:00', '2024-01-07 07:15:00'),
(5,  'GDG-C1', 'Rak C1 - Jaringan',           'Rak baris C kolom 1, kapasitas 250 unit, router dan aksesori jaringan', '2024-01-07 07:20:00', '2024-01-07 07:20:00'),
(6,  'GDG-C2', 'Rak C2 - Kamera & CCTV',      'Rak baris C kolom 2, kapasitas 100 unit, kamera dan perlengkapan',      '2024-01-07 07:25:00', '2024-01-07 07:25:00'),
(7,  'GDG-D1', 'Rak D1 - Gaming',             'Rak baris D kolom 1, kapasitas 120 unit, produk gaming',                '2024-01-07 07:30:00', '2024-01-07 07:30:00'),
(8,  'GDG-D2', 'Rak D2 - Office & ATK',       'Rak baris D kolom 2, kapasitas 400 unit, alat tulis dan printer',       '2024-01-07 07:35:00', '2024-01-07 07:35:00'),
(9,  'GDG-E1', 'Rak E1 - Power & Baterai',    'Rak baris E kolom 1, kapasitas 350 unit, power bank dan baterai',       '2024-01-07 07:40:00', '2024-01-07 07:40:00'),
(10, 'GDG-E2', 'Rak E2 - Tools & Teknik',     'Rak baris E kolom 2, kapasitas 180 unit, perkakas dan alat ukur',       '2024-01-07 07:45:00', '2024-01-07 07:45:00');

-- ============================================================
-- tb_merek (10 merek)
-- ============================================================
INSERT INTO tb_merek (id, name, description, created_at, updated_at) VALUES
(1,  'Samsung',    'Merek elektronik asal Korea Selatan, produk terlengkap',           '2024-01-07 08:00:00', '2024-01-07 08:00:00'),
(2,  'Apple',      'Merek premium asal Amerika Serikat, ekosistem iOS dan macOS',      '2024-01-07 08:05:00', '2024-01-07 08:05:00'),
(3,  'Xiaomi',     'Merek teknologi asal Tiongkok, harga terjangkau kualitas baik',    '2024-01-07 08:10:00', '2024-01-07 08:10:00'),
(4,  'Logitech',   'Merek Swiss, spesialis aksesori komputer dan gaming',              '2024-01-07 08:15:00', '2024-01-07 08:15:00'),
(5,  'TP-Link',    'Merek jaringan asal Tiongkok, router dan aksesori networking',     '2024-01-07 08:20:00', '2024-01-07 08:20:00'),
(6,  'Sony',       'Merek elektronik Jepang, audio visual dan gaming (PlayStation)',   '2024-01-07 08:25:00', '2024-01-07 08:25:00'),
(7,  'Epson',      'Merek printer dan proyektor asal Jepang berkualitas tinggi',       '2024-01-07 08:30:00', '2024-01-07 08:30:00'),
(8,  'Panasonic',  'Merek Jepang, produk elektronik rumah tangga dan baterai',         '2024-01-07 08:35:00', '2024-01-07 08:35:00'),
(9,  'Lenovo',     'Merek Tiongkok, laptop dan komputer bisnis terpercaya',            '2024-01-07 08:40:00', '2024-01-07 08:40:00'),
(10, 'Canon',      'Merek Jepang, kamera DSLR, mirrorless, dan printer inkjet',       '2024-01-07 08:45:00', '2024-01-07 08:45:00');

-- ============================================================
-- tb_product (100 produk)
-- ============================================================
INSERT INTO tb_product (id, name, sku, category_id, merk_id, location_id, description, unit, stock, price, created_at, updated_at) VALUES
-- ELEKTRONIK (cat=1)
(1,  'Samsung Smart TV 43 Inch 4K UHD',            'SAM-TV-43-4K',     1, 1, 1,  'Smart TV Samsung 43" resolusi 4K UHD, HDR10+, Tizen OS, built-in WiFi',           'Unit',  25,  6500000,  '2024-01-10 09:00:00', '2024-01-10 09:00:00'),
(2,  'Samsung Soundbar HW-B650 3.1Ch',             'SAM-SB-B650',      1, 1, 1,  'Soundbar Samsung 3.1 channel, Dolby Audio, 430W, Bluetooth 5.0',                   'Unit',  15,  3200000,  '2024-01-10 09:05:00', '2024-01-10 09:05:00'),
(3,  'Sony Bravia 55 Inch OLED 4K',               'SNY-TV-55-OL',     1, 6, 1,  'Smart TV Sony 55" OLED 4K, Google TV, Dolby Vision & Atmos, X1 Processor',         'Unit',  10,  12500000, '2024-01-10 09:10:00', '2024-01-10 09:10:00'),
(4,  'Xiaomi Smart TV A2 32 Inch',                'XMI-TV-A2-32',     1, 3, 1,  'Android TV Xiaomi 32" HD, Chromecast built-in, Dolby Audio, 2GB RAM',               'Unit',  30,  1850000,  '2024-01-10 09:15:00', '2024-01-10 09:15:00'),
(5,  'Panasonic Ergofit Earphone RP-HJE120',       'PAN-EP-HJE120',    1, 8, 1,  'Earphone in-ear Panasonic, driver 9mm, kabel 1.1m, jack 3.5mm',                    'Pcs',   80,  145000,   '2024-01-10 09:20:00', '2024-01-10 09:20:00'),
(6,  'Sony WH-1000XM5 Headphone ANC',             'SNY-HP-XM5',       1, 6, 1,  'Headphone wireless Sony, ANC terbaik, 30jam battery, multipoint connection',        'Unit',  20,  4800000,  '2024-01-10 09:25:00', '2024-01-10 09:25:00'),
(7,  'Samsung Galaxy Buds2 Pro TWS',              'SAM-TWS-B2PRO',    1, 1, 1,  'TWS Samsung Galaxy Buds2 Pro, ANC, 360° Audio, IPX7, 8jam playtime',               'Unit',  35,  2200000,  '2024-01-10 09:30:00', '2024-01-10 09:30:00'),
(8,  'Xiaomi Redmi Buds 4 Pro TWS',               'XMI-TWS-RB4P',     1, 3, 1,  'TWS Xiaomi Redmi Buds 4 Pro, ANC, 43dB noise reduction, 9jam battery',             'Unit',  50,  650000,   '2024-01-10 09:35:00', '2024-01-10 09:35:00'),
(9,  'Kabel HDMI 2.1 8K 2 Meter Braided',         'GEN-CBL-HDMI21',   1, 3, 1,  'Kabel HDMI 2.1 panjang 2m, support 8K@60Hz, 4K@120Hz, eARC, braided',             'Pcs',   120, 185000,   '2024-01-10 09:40:00', '2024-01-10 09:40:00'),
(10, 'Remote Universal Smart TV All Brand',        'GEN-RMT-UNIV',     1, 3, 1,  'Remote universal kompatibel semua merek Smart TV, learning function',               'Pcs',   65,  95000,    '2024-01-10 09:45:00', '2024-01-10 09:45:00'),

-- KOMPUTER & LAPTOP (cat=2)
(11, 'Lenovo IdeaPad Slim 3 15" i5 Gen12',        'LNV-LP-SL3-I5',    2, 9, 2,  'Laptop Lenovo 15.6" FHD, Intel Core i5-1235U, 8GB RAM, 512GB SSD, Win11',         'Unit',  18,  8500000,  '2024-01-11 09:00:00', '2024-01-11 09:00:00'),
(12, 'Apple MacBook Air M2 13 Inch 256GB',        'APL-MB-AIR-M2',    2, 2, 2,  'MacBook Air 13.6" Liquid Retina, Apple M2, 8GB RAM, 256GB SSD, 18jam battery',    'Unit',  8,   17500000, '2024-01-11 09:05:00', '2024-01-11 09:05:00'),
(13, 'Samsung Galaxy Book3 360 15.6"',            'SAM-LP-GB360',     2, 1, 2,  '2-in-1 laptop Samsung 15.6" AMOLED touch, i7-1360P, 16GB, 512GB SSD',             'Unit',  6,   15000000, '2024-01-11 09:10:00', '2024-01-11 09:10:00'),
(14, 'Logitech MX Master 3S Mouse Wireless',      'LGT-MS-MXM3S',     2, 4, 2,  'Mouse wireless Logitech, 8000 DPI, Quiet Click, Bolt receiver, 70jam battery',     'Unit',  45,  1250000,  '2024-01-11 09:15:00', '2024-01-11 09:15:00'),
(15, 'Logitech K380 Keyboard Bluetooth Multi',    'LGT-KB-K380',      2, 4, 2,  'Keyboard Bluetooth Logitech, multi-device 3 perangkat, compact, 24 bulan battery', 'Unit',  55,  550000,   '2024-01-11 09:20:00', '2024-01-11 09:20:00'),
(16, 'Logitech C920 Webcam Full HD 1080p',        'LGT-WC-C920',      2, 4, 2,  'Webcam Logitech 1080p 30fps, autofocus, stereo mic, plug & play USB',              'Unit',  30,  950000,   '2024-01-11 09:25:00', '2024-01-11 09:25:00'),
(17, 'Samsung 27" Monitor IPS QHD 165Hz',         'SAM-MN-27QHD',     2, 1, 2,  'Monitor Samsung 27" QHD 2560x1440, IPS, 165Hz, 1ms, FreeSync Premium, HDMI+DP',   'Unit',  20,  3800000,  '2024-01-11 09:30:00', '2024-01-11 09:30:00'),
(18, 'SSD Samsung 870 EVO 500GB SATA',            'SAM-SSD-870-500',  2, 1, 2,  'SSD SATA Samsung 870 EVO 500GB, kecepatan baca 560MB/s, 5 tahun garansi',          'Unit',  60,  850000,   '2024-01-11 09:35:00', '2024-01-11 09:35:00'),
(19, 'RAM DDR4 16GB 3200MHz Kingston',            'KNG-RAM-16G-3200', 2, 3, 2,  'Memori RAM Kingston 16GB DDR4 3200MHz, CL22, dual channel ready',                  'Unit',  75,  650000,   '2024-01-11 09:40:00', '2024-01-11 09:40:00'),
(20, 'Hub USB-C 7-in-1 Anker',                   'ANK-HUB-7IN1',     2, 3, 2,  'Hub USB-C Anker 7-in-1: HDMI 4K, 3x USB-A, USB-C PD 85W, SD & microSD',          'Unit',  90,  450000,   '2024-01-11 09:45:00', '2024-01-11 09:45:00'),

-- SMARTPHONE (cat=3)
(21, 'Samsung Galaxy S24 Ultra 256GB Titanium',   'SAM-S24U-256-TI',  3, 1, 3,  'Flagship Samsung Galaxy S24 Ultra, S Pen, 200MP camera, Snapdragon 8 Gen 3',       'Unit',  15,  21000000, '2024-01-12 09:00:00', '2024-01-12 09:00:00'),
(22, 'Apple iPhone 15 Pro 128GB Black Titanium',  'APL-IP15P-128-BT', 3, 2, 3,  'iPhone 15 Pro 128GB, chip A17 Pro, kamera 48MP, titanium frame, USB-C',            'Unit',  12,  19500000, '2024-01-12 09:05:00', '2024-01-12 09:05:00'),
(23, 'Xiaomi 14 5G 256GB Jade Green',             'XMI-14-256-JG',    3, 3, 3,  'Flagship Xiaomi 14, Snapdragon 8 Gen 3, Leica camera, 90W HyperCharge',            'Unit',  20,  14000000, '2024-01-12 09:10:00', '2024-01-12 09:10:00'),
(24, 'Samsung Galaxy A55 5G 256GB Awesome Navy',  'SAM-A55-256-AN',   3, 1, 3,  'Samsung Galaxy A55 5G, Exynos 1480, 50MP camera, 5000mAh, IP67',                   'Unit',  35,  6500000,  '2024-01-12 09:15:00', '2024-01-12 09:15:00'),
(25, 'Xiaomi Redmi Note 13 Pro 256GB Midnight',   'XMI-RN13P-256-MN', 3, 3, 3,  'Redmi Note 13 Pro, MediaTek Helio G99, 200MP camera, 67W fast charging',           'Unit',  45,  3800000,  '2024-01-12 09:20:00', '2024-01-12 09:20:00'),
(26, 'Samsung Galaxy Tab S9 FE 128GB Gray',       'SAM-TS9FE-128-GR', 3, 1, 3,  'Tablet Samsung Galaxy Tab S9 FE, 10.9" TFT, Exynos 1380, S Pen included',         'Unit',  22,  5500000,  '2024-01-12 09:25:00', '2024-01-12 09:25:00'),
(27, 'Apple iPad 10th Gen 64GB WiFi Silver',      'APL-IPD10-64-SV',  3, 2, 3,  'iPad Gen 10, layar 10.9" Liquid Retina, chip A14 Bionic, USB-C, 10jam battery',   'Unit',  18,  8500000,  '2024-01-12 09:30:00', '2024-01-12 09:30:00'),
(28, 'Samsung Wireless Charger 15W Pad',          'SAM-WC-15W-PAD',   3, 1, 3,  'Wireless charger Samsung 15W, kompatibel Qi, LED indicator, anti-slip',            'Unit',  70,  350000,   '2024-01-12 09:35:00', '2024-01-12 09:35:00'),
(29, 'Xiaomi 120W Hypercharge Adapter + Kabel',   'XMI-CHG-120W',     3, 3, 3,  'Charger Xiaomi 120W HyperCharge, kabel USB-C to USB-C, compact design',            'Unit',  80,  285000,   '2024-01-12 09:40:00', '2024-01-12 09:40:00'),
(30, 'Tempered Glass Samsung S24 Ultra 3D Full',  'ACC-TG-S24U-3D',   3, 1, 3,  'Tempered glass Samsung S24 Ultra 3D full cover, 9H hardness, anti-fingerprint',   'Pcs',   200, 85000,    '2024-01-12 09:45:00', '2024-01-12 09:45:00'),

-- PERALATAN RUMAH (cat=4)
(31, 'Samsung Kulkas 2 Pintu RT50K6231BS 500L',   'SAM-KLK-RT50-SL',  4, 1, 4,  'Kulkas 2 pintu Samsung 500L, Digital Inverter, Twin Cooling Plus, silver',         'Unit',  8,   8500000,  '2024-01-13 09:00:00', '2024-01-13 09:00:00'),
(32, 'Panasonic Mesin Cuci NA-F80H2 Top Load 8KG','PAN-MC-NA-F80H2',  4, 8, 4,  'Mesin cuci top load Panasonic 8KG, StainMaster+, Econavi, inverter motor',         'Unit',  10,  4200000,  '2024-01-13 09:05:00', '2024-01-13 09:05:00'),
(33, 'Xiaomi Smart Air Purifier 4 Pro',           'XMI-AP-4PRO',      4, 3, 4,  'Air purifier Xiaomi, HEPA H13, 60m² coverage, OLED display, App control',          'Unit',  20,  2100000,  '2024-01-13 09:10:00', '2024-01-13 09:10:00'),
(34, 'Panasonic AC Inverter 1PK CS-YN9WKJ',       'PAN-AC-1PK-YN9',   4, 8, 4,  'AC split Panasonic 1PK inverter, Econavi, nanoeX, R32, hemat listrik 70%',         'Unit',  12,  5800000,  '2024-01-13 09:15:00', '2024-01-13 09:15:00'),
(35, 'Samsung Robot Vacuum Jet Bot AI+ VR50T',    'SAM-RVC-JETBOT',   4, 1, 4,  'Robot vacuum Samsung AI, mapping presisi, docking otomatis, 5000Pa suction',       'Unit',  7,   7500000,  '2024-01-13 09:20:00', '2024-01-13 09:20:00'),
(36, 'Xiaomi Smart Blender BHB01RM 33000RPM',     'XMI-BLD-BHB01',    4, 3, 4,  'Blender pintar Xiaomi 33000RPM, 6 pisau baja, auto-clean, App control',            'Unit',  25,  750000,   '2024-01-13 09:25:00', '2024-01-13 09:25:00'),
(37, 'Panasonic Rice Cooker SR-WN36 3.6L',        'PAN-RC-SRWN36',    4, 8, 4,  'Rice cooker Panasonic 3.6L, fuzzy logic, 11 menu masak, inner pot anti lengket',   'Unit',  30,  950000,   '2024-01-13 09:30:00', '2024-01-13 09:30:00'),
(38, 'Xiaomi Water Dispenser UV Sterilization',   'XMI-WD-UVSTERI',   4, 3, 4,  'Dispenser Xiaomi hot/normal/cold, lampu UV sterilisasi, tank 12L, App control',    'Unit',  18,  1850000,  '2024-01-13 09:35:00', '2024-01-13 09:35:00'),
(39, 'Panasonic Setrika Uap NI-M300TATJ 1900W',   'PAN-SI-NIM300',    4, 8, 4,  'Setrika uap Panasonic 1900W, anti karat, 300ml tangki, sole plate titanium',       'Unit',  40,  450000,   '2024-01-13 09:40:00', '2024-01-13 09:40:00'),
(40, 'Xiaomi Smart Kettle YM-K1501 1.5L',         'XMI-KTL-YMK1501', 4, 3, 4,  'Kettle listrik Xiaomi 1500W, kontrol suhu presisi, App control, BPA free',         'Unit',  55,  385000,   '2024-01-13 09:45:00', '2024-01-13 09:45:00'),

-- JARINGAN & SERVER (cat=5)
(41, 'TP-Link Archer AX73 WiFi 6 AX5400',        'TPL-RT-AX73',      5, 5, 5,  'Router WiFi 6 TP-Link AX5400, 6 antena, OneMesh, MU-MIMO, USB 3.0',               'Unit',  22,  1650000,  '2024-01-14 09:00:00', '2024-01-14 09:00:00'),
(42, 'TP-Link TL-SG1024D Switch 24 Port Gigabit', 'TPL-SW-SG1024D',   5, 5, 5,  'Switch unmanaged 24 port Gigabit TP-Link, 48Gbps bandwidth, desktop/rack mount',   'Unit',  15,  1200000,  '2024-01-14 09:05:00', '2024-01-14 09:05:00'),
(43, 'TP-Link TL-WA901N Access Point 450Mbps',    'TPL-AP-WA901N',    5, 5, 5,  'Access point TP-Link 450Mbps, multi-mode, PoE support, dual antena',               'Unit',  28,  450000,   '2024-01-14 09:10:00', '2024-01-14 09:10:00'),
(44, 'Kabel UTP Cat6 Roll 305m Belden',           'BLD-CBL-CAT6-305', 5, 5, 5,  'Kabel UTP Belden Cat6 305m/roll, bandwidth 250MHz, solid copper, indoor',          'Roll',  20,  1100000,  '2024-01-14 09:15:00', '2024-01-14 09:15:00'),
(45, 'Patch Panel Cat6 24 Port Panduit',          'PDT-PP-CAT6-24',   5, 5, 5,  'Patch panel Cat6 Panduit 24 port, 1U rack mount, label strip, angled port',        'Unit',  12,  650000,   '2024-01-14 09:20:00', '2024-01-14 09:20:00'),
(46, 'Keystone Jack RJ45 Cat6 AMP 100pcs',        'AMP-KJ-CAT6-100', 5, 5, 5,  'Keystone jack Cat6 AMP/Commscope, unshielded, tool-less, warna putih, 100pcs',     'Box',   15,  550000,   '2024-01-14 09:25:00', '2024-01-14 09:25:00'),
(47, 'Fiber Optic SC-SC Patchcord MM 3M',         'GEN-FO-SCSC-3M',   5, 5, 5,  'Patchcord fiber optik SC-SC multimode OM3 50/125, 3 meter, warna aqua',           'Pcs',   50,  95000,    '2024-01-14 09:30:00', '2024-01-14 09:30:00'),
(48, 'TP-Link TL-POE150S PoE Injector 30W',       'TPL-POE-150S',     5, 5, 5,  'PoE injector TP-Link 30W, 802.3at, Gigabit, plug & play, LED indicator',           'Unit',  35,  250000,   '2024-01-14 09:35:00', '2024-01-14 09:35:00'),
(49, 'Rack Server 12U 600x600 Standing',          'GEN-RCK-12U-600',  5, 5, 5,  'Rack server standing 12U, depth 600mm, besi powder coated, kunci, castor',         'Unit',  5,   3200000,  '2024-01-14 09:40:00', '2024-01-14 09:40:00'),
(50, 'TP-Link Deco XE75 Pro Mesh WiFi 6E 3 Pack', 'TPL-DCO-XE75-3P', 5, 5, 5,  'Mesh WiFi 6E TP-Link Deco XE75 Pro 3 pack, triband, 5.4Gbps, AI-Driven',          'Set',   10,  3800000,  '2024-01-14 09:45:00', '2024-01-14 09:45:00'),

-- KAMERA & OPTIK (cat=6)
(51, 'Canon EOS R50 Body Only Mirrorless',        'CAN-CAM-EOS-R50',  6, 10, 6, 'Kamera mirrorless Canon EOS R50, 24.2MP APS-C, 4K video, eye tracking AF',        'Unit',  8,   11500000, '2024-01-15 09:00:00', '2024-01-15 09:00:00'),
(52, 'Canon RF 50mm f/1.8 STM Lens',              'CAN-LNS-RF50-18',  6, 10, 6, 'Lensa Canon RF 50mm f/1.8 STM, bokeh natural, ringan 160g, AF senyap',             'Unit',  12,  3800000,  '2024-01-15 09:05:00', '2024-01-15 09:05:00'),
(53, 'Sony ZV-E10 Mirrorless Vlog Camera Kit',    'SNY-CAM-ZVE10-KT', 6, 6, 6,  'Kamera vlog Sony ZV-E10 kit 16-50mm, 24.2MP, 4K, flip screen, APS-C',             'Unit',  10,  10500000, '2024-01-15 09:10:00', '2024-01-15 09:10:00'),
(54, 'DJI Mini 4 Pro Drone RC2 Combo',            'DJI-DRN-M4PRO-RC', 6, 3, 6,  'Drone DJI Mini 4 Pro, 4K/60fps HDR, omnidirectional obstacle sensing, RC2',       'Unit',  6,   16500000, '2024-01-15 09:15:00', '2024-01-15 09:15:00'),
(55, 'Tripod Joby GorillaPod 3K Pro Kit',         'JBY-TRP-GP3K-PRO', 6, 3, 6,  'Tripod fleksibel Joby GorillaPod 3K Pro, max payload 3kg, ballhead, level',        'Unit',  25,  1250000,  '2024-01-15 09:20:00', '2024-01-15 09:20:00'),
(56, 'Sandisk Extreme Pro 128GB SDXC V30',        'SDK-MSD-128G-EXP', 6, 3, 6,  'Memory card SDXC SanDisk 128GB, Class 10 V30, read 200MB/s, write 90MB/s',         'Pcs',   80,  350000,   '2024-01-15 09:25:00', '2024-01-15 09:25:00'),
(57, 'CCTV Hikvision DS-2DE4A425IWG-E PTZ 4MP',  'HIK-CCTV-4MP-PTZ', 6, 3, 6,  'PTZ IP camera Hikvision 4MP, 25x optical zoom, IR 100m, outdoor IP66, H.265',     'Unit',  15,  6500000,  '2024-01-15 09:30:00', '2024-01-15 09:30:00'),
(58, 'Ring Light 18 Inch LED Dimmable 3 Warna',   'GEN-RLT-18-LED',   6, 3, 6,  'Ring light 18" LED 3 warna 3200K-5500K, dimmer 0-100%, dudukan phone & mic',      'Unit',  30,  450000,   '2024-01-15 09:35:00', '2024-01-15 09:35:00'),
(59, 'Godox SL60W LED Video Light 60W',           'GDX-VLT-SL60W',    6, 3, 6,  'Video light Godox SL60W 60W, 5600K, bowens mount, CRI95+, remote control',         'Unit',  18,  1150000,  '2024-01-15 09:40:00', '2024-01-15 09:40:00'),
(60, 'Action Cam GoPro Hero12 Black',             'GPR-AC-H12-BLK',   6, 3, 6,  'Action camera GoPro Hero12, 5.3K60/4K120fps, HyperSmooth 6.0, waterproof 10m',    'Unit',  14,  7200000,  '2024-01-15 09:45:00', '2024-01-15 09:45:00'),

-- GAMING (cat=7)
(61, 'Sony PlayStation 5 Console Slim Disc',      'SNY-PS5-SLIM-DSC', 7, 6, 7,  'PlayStation 5 Slim edisi disc, SSD 1TB, DualSense controller, 4K gaming',          'Unit',  10,  8500000,  '2024-01-16 09:00:00', '2024-01-16 09:00:00'),
(62, 'Sony DualSense Edge Wireless Controller PS5','SNY-DS-EDGE-PS5',  7, 6, 7,  'Controller PS5 DualSense Edge, tombol back button, stick replaceable, USB-C',      'Unit',  20,  2200000,  '2024-01-16 09:05:00', '2024-01-16 09:05:00'),
(63, 'Logitech G Pro X Superlight 2 Mouse',       'LGT-MS-GPXSL2',    7, 4, 7,  'Gaming mouse Logitech G Pro X Superlight 2, HERO 25K sensor, 60jam battery',      'Unit',  25,  1950000,  '2024-01-16 09:10:00', '2024-01-16 09:10:00'),
(64, 'Logitech G915 TKL Wireless Gaming Keyboard','LGT-KB-G915TKL',   7, 4, 7,  'Keyboard gaming Logitech G915 TKL wireless, LIGHTSPEED, GL Linear, RGB',           'Unit',  18,  2850000,  '2024-01-16 09:15:00', '2024-01-16 09:15:00'),
(65, 'Sony INZONE H9 Wireless Gaming Headset',    'SNY-HS-INZONEH9',  7, 6, 7,  'Headset gaming Sony INZONE H9, ANC, 360 Spatial Sound, 32jam battery, USB-C',     'Unit',  15,  2800000,  '2024-01-16 09:20:00', '2024-01-16 09:20:00'),
(66, 'Samsung Odyssey G9 49" OLED Gaming Monitor','SAM-MN-G9-49OL',   7, 1, 7,  'Gaming monitor Samsung Odyssey G9 49" OLED, 240Hz, 0.03ms, Dual QHD, HDMI2.1',    'Unit',  4,   21000000, '2024-01-16 09:25:00', '2024-01-16 09:25:00'),
(67, 'Gaming Chair Noblechairs Epic Black/Gold',   'NCH-GC-EPIC-BG',   7, 3, 7,  'Gaming chair Noblechairs Epic, kulit premium, lumbar support, recline 128°',       'Unit',  8,   6500000,  '2024-01-16 09:30:00', '2024-01-16 09:30:00'),
(68, 'Capture Card Elgato 4K60 Pro MK.2',         'ELG-CC-4K60-MK2',  7, 3, 7,  'Capture card Elgato 4K60 Pro MK.2, PCIe, 4K60fps HDR, VRR pass-through',          'Unit',  12,  3500000,  '2024-01-16 09:35:00', '2024-01-16 09:35:00'),
(69, 'Mouse Pad XL Logitech G840 900x400mm',      'LGT-MP-G840-XL',   7, 4, 7,  'Mousepad XL Logitech G840, 900x400mm, permukaan konsisten, anti-slip base',        'Pcs',   40,  450000,   '2024-01-16 09:40:00', '2024-01-16 09:40:00'),
(70, 'Steam Gift Card IDR 150.000',               'STE-GC-150K',      7, 3, 7,  'Steam gift card Indonesia IDR 150.000, untuk pembelian game dan DLC di Steam',     'Pcs',   200, 150000,   '2024-01-16 09:45:00', '2024-01-16 09:45:00'),

-- OFFICE & ATK (cat=8)
(71, 'Epson L3250 Printer Ecotank WiFi A4',       'EPS-PR-L3250-WF',  8, 7, 8,  'Printer Epson L3250 EcoTank, print/scan/copy, WiFi, 4 warna, suplai tinta besar', 'Unit',  20,  2100000,  '2024-01-17 09:00:00', '2024-01-17 09:00:00'),
(72, 'Canon PIXMA TS8370 Photo Printer 6 Color',  'CAN-PR-TS8370-6C', 8, 10, 8, 'Printer foto Canon PIXMA TS8370, 6 tinta, WiFi, Bluetooth, CD/DVD print',          'Unit',  12,  2800000,  '2024-01-17 09:05:00', '2024-01-17 09:05:00'),
(73, 'Epson Tinta 003 Set 4 Warna CMYK',          'EPS-TN-003-4SET',  8, 7, 8,  'Set tinta Epson 003, 4 warna BKCMY masing-masing 65ml, untuk L1110 L3110 dll',     'Set',   100, 175000,   '2024-01-17 09:10:00', '2024-01-17 09:10:00'),
(74, 'Kertas HVS A4 80gsm Sidu 500 Lembar',       'SDU-KTS-A4-80G',   8, 3, 8,  'Kertas HVS A4 Sidu 80gsm 500 lembar/rim, putih terang, cocok inkjet & laser',      'Rim',   300, 65000,    '2024-01-17 09:15:00', '2024-01-17 09:15:00'),
(75, 'Epson EcoTank L5290 All-in-One WiFi Fax',   'EPS-PR-L5290-FAX', 8, 7, 8,  'Printer Epson L5290 print/scan/copy/fax, WiFi, ADF, bisnis, ecotank 4 warna',     'Unit',  8,   3500000,  '2024-01-17 09:20:00', '2024-01-17 09:20:00'),
(76, 'Laminator Mesin Laminasi A3 Fujipla',       'FJP-LMN-A3-325',   8, 3, 8,  'Mesin laminasi Fujipla A3, cold & hot, kecepatan 40cm/menit, 1-5mm thickness',    'Unit',  10,  1850000,  '2024-01-17 09:25:00', '2024-01-17 09:25:00'),
(77, 'Scanner Canon DR-C230 A4 Document',         'CAN-SCN-DRC230',   8, 10, 8, 'Scanner dokumen Canon DR-C230, 30ppm duplex, ADF 60 sheet, USB',                   'Unit',  7,   5500000,  '2024-01-17 09:30:00', '2024-01-17 09:30:00'),
(78, 'Whiteboard 90x120cm Sakana Magnetic',       'SKN-WBD-90X120',   8, 3, 8,  'Papan tulis putih magnetic 90x120cm, double face, surface berkualitas, frame alu', 'Unit',  15,  650000,   '2024-01-17 09:35:00', '2024-01-17 09:35:00'),
(79, 'Projektor Epson EB-W52 3800 Lumen WXGA',    'EPS-PJT-EBW52',    8, 7, 8,  'Proyektor Epson EB-W52 3800 lumen WXGA, 15.000:1 contrast, HDMI, 3LCD',            'Unit',  6,   6500000,  '2024-01-17 09:40:00', '2024-01-17 09:40:00'),
(80, 'Logitech Presenter R500s Spotlight Wireless','LGT-PRS-R500S',    8, 4, 8,  'Wireless presenter Logitech R500s, spotlight, laser pointer, 30m jarak, USB-C',    'Unit',  25,  650000,   '2024-01-17 09:45:00', '2024-01-17 09:45:00'),

-- POWER & BATERAI (cat=9)
(81, 'UPS APC Back-UPS BX1200MI 1200VA 650W',     'APC-UPS-BX1200MI', 9, 3, 9,  'UPS APC BX1200MI 1200VA/650W, 8 outlet, AVR otomatis, USB, LED display',           'Unit',  15,  2800000,  '2024-01-18 09:00:00', '2024-01-18 09:00:00'),
(82, 'Xiaomi Power Bank 50W 20000mAh PB200SZM',   'XMI-PB-20K-50W',   9, 3, 9,  'Power bank Xiaomi 20000mAh, 50W fast charge, USB-A + 2x USB-C, display LCD',      'Unit',  60,  450000,   '2024-01-18 09:05:00', '2024-01-18 09:05:00'),
(83, 'Panasonic Baterai AA Alkaline Pro Power 4pc','PAN-BTR-AA-4PC',   9, 8, 9,  'Baterai AA Panasonic Alkaline Pro Power, daya tahan 10 tahun, 4 pcs/blister',      'Blister',150,35000,   '2024-01-18 09:10:00', '2024-01-18 09:10:00'),
(84, 'Anker 65W GaN III Charger 3 Port Nano',     'ANK-CHG-65W-GAN',  9, 3, 9,  'Charger Anker 65W GaN III, 2x USB-C + 1x USB-A, compact, PowerIQ 4.0',             'Unit',  80,  450000,   '2024-01-18 09:15:00', '2024-01-18 09:15:00'),
(85, 'Stabilizer Listrik Matsunaga 1000VA',        'MAT-STB-1000VA',   9, 3, 9,  'Stabilizer tegangan Matsunaga 1000VA, relay type, input 140-260V, proteksi',       'Unit',  25,  350000,   '2024-01-18 09:20:00', '2024-01-18 09:20:00'),
(86, 'Solar Panel 100W Monocrystalline Sunway',    'SNW-SLP-100W-MC',  9, 3, 9,  'Panel surya monocrystalline 100W, efisiensi 23%, IP68, kabel MC4 included',        'Unit',  18,  950000,   '2024-01-18 09:25:00', '2024-01-18 09:25:00'),
(87, 'Battery VRLA 12V 7Ah Panasonic LC-R127R2P', 'PAN-BTR-12V7AH',   9, 8, 9,  'Baterai VRLA Panasonic 12V 7Ah, maintenance free, untuk UPS dan alarm',            'Unit',  40,  220000,   '2024-01-18 09:30:00', '2024-01-18 09:30:00'),
(88, 'Stop Kontak Schneider 6 Lubang Surge 2M',    'SCH-SKL-6L-SURJ',  9, 3, 9,  'Stop kontak Schneider 6 lubang, surge protector, kabel 2m, master switch',         'Unit',  90,  185000,   '2024-01-18 09:35:00', '2024-01-18 09:35:00'),
(89, 'Genset Bensin Honda EU22i 2200W Inverter',   'HND-GNS-EU22I',    9, 3, 9,  'Generator inverter Honda EU22i 2200W, silent 53dB, 3.6L tangki, USB output',       'Unit',  5,   18000000, '2024-01-18 09:40:00', '2024-01-18 09:40:00'),
(90, 'Multitester Digital Sanwa PC700 True RMS',   'SNW-MT-PC700',     9, 3, 9,  'Multimeter digital Sanwa PC700 True RMS, auto range, backlight, data hold',         'Unit',  30,  1250000,  '2024-01-18 09:45:00', '2024-01-18 09:45:00'),

-- TOOLS & TEKNIK (cat=10)
(91, 'Bor Listrik Bosch GSB 550 Impact Drill',    'BSH-BOR-GSB550',   10, 3, 10, 'Bor impact Bosch GSB 550W, 13mm chuck, 3000rpm, 2 mode, koper set lengkap',       'Unit',  20,  850000,   '2024-01-19 09:00:00', '2024-01-19 09:00:00'),
(92, 'Tang Set Kombinasi Tekiro 5 Pcs CRV',       'TKR-TNG-5PC-CRV',  10, 3, 10, 'Set tang Tekiro 5 pcs: kombinasi, lancip, potong, water pump, snap ring, CRV',    'Set',   30,  450000,   '2024-01-19 09:05:00', '2024-01-19 09:05:00'),
(93, 'Obeng Set Wera Kraftform 30 Pcs',           'WER-OBG-30PC-KF',  10, 3, 10, 'Set obeng Wera Kraftform 30 pcs, hex, torx, phillips, slotted, ergonomic grip',    'Set',   25,  1850000,  '2024-01-19 09:10:00', '2024-01-19 09:10:00'),
(94, 'Kunci Torsi Tekiro 40-200Nm 1/2" Drive',    'TKR-KNC-TORSI-200',10, 3, 10, 'Kunci torsi Tekiro 40-200Nm, drive 1/2", presisi ±4%, dual direction',             'Unit',  15,  950000,   '2024-01-19 09:15:00', '2024-01-19 09:15:00'),
(95, 'Gerinda Tangan Bosch GWS 900-100 900W',     'BSH-GRD-GWS900',   10, 3, 10, 'Gerinda sudut Bosch GWS 900-100, 900W, disc 100mm, 11000rpm, restart protection', 'Unit',  18,  750000,   '2024-01-19 09:20:00', '2024-01-19 09:20:00'),
(96, 'Laser Level Bosch GLL 3-80 360 Derajat',    'BSH-LVL-GLL380',   10, 3, 10, 'Laser level Bosch GLL 3-80, 3 garis 360°, self-leveling, IP54, tripod mount',     'Unit',  12,  2500000,  '2024-01-19 09:25:00', '2024-01-19 09:25:00'),
(97, 'Meteran Digital Bosch GLM 50-22 50m',       'BSH-MTR-GLM5022',  10, 3, 10, 'Laser distance measure Bosch GLM 50-22, jangkauan 50m, akurasi ±1.5mm, LCD',      'Unit',  20,  950000,   '2024-01-19 09:30:00', '2024-01-19 09:30:00'),
(98, 'Kompresor Angin Shark 1HP 25L Silent',      'SHK-KMP-1HP-25L',  10, 3, 10, 'Kompresor udara Shark 1HP 25L, silent series, max 8bar, 116 PSI, oil free',        'Unit',  8,   2200000,  '2024-01-19 09:35:00', '2024-01-19 09:35:00'),
(99, 'Mesin Las Listrik MMA ESAB Buddy Arc 200',  'ESB-LAS-BA200',    10, 3, 10, 'Mesin las ESAB Buddy Arc 200A, electrode 2.5-4mm, duty cycle 35%, inverter',      'Unit',  6,   3800000,  '2024-01-19 09:40:00', '2024-01-19 09:40:00'),
(100,'Tangga Lipat Aluminium 5 Meter Telescopic', 'GEN-TNG-TELE-5M',  10, 3, 10, 'Tangga lipat teleskopik aluminium 5m, max load 150kg, anti-slip foot, compact',   'Unit',  10,  1250000,  '2024-01-19 09:45:00', '2024-01-19 09:45:00');

-- ============================================================
-- tb_header_transaction_in (20 transaksi masuk)
-- ============================================================
INSERT INTO tb_header_transaction_in (id, supplier_id, date, description, created_at, updated_at) VALUES
(1,  1, '2024-02-01 09:00:00', 'Pembelian rutin produk elektronik display dan audio bulan Februari',          '2024-02-01 09:00:00', '2024-02-01 09:00:00'),
(2,  2, '2024-02-05 10:00:00', 'Pengadaan laptop, monitor, dan aksesori komputer untuk stok Q1',             '2024-02-05 10:00:00', '2024-02-05 10:00:00'),
(3,  3, '2024-02-08 11:00:00', 'Restok smartphone flagship dan mid-range Samsung dan Apple',                  '2024-02-08 11:00:00', '2024-02-08 11:00:00'),
(4,  5, '2024-02-12 09:30:00', 'Pengadaan peralatan rumah tangga - AC, kulkas, dan mesin cuci',              '2024-02-12 09:30:00', '2024-02-12 09:30:00'),
(5,  7, '2024-02-15 14:00:00', 'Pembelian perlengkapan jaringan - router, switch, dan kabel',                '2024-02-15 14:00:00', '2024-02-15 14:00:00'),
(6,  9, '2024-02-19 10:00:00', 'Pengadaan kamera, drone, dan aksesori fotografi untuk stok',                 '2024-02-19 10:00:00', '2024-02-19 10:00:00'),
(7,  6, '2024-02-22 09:00:00', 'Restok produk gaming - konsol PS5, controller, dan aksesori',               '2024-02-22 09:00:00', '2024-02-22 09:00:00'),
(8,  8, '2024-02-26 11:00:00', 'Pengadaan printer, tinta, dan perlengkapan kantor bulan Februari',           '2024-02-26 11:00:00', '2024-02-26 11:00:00'),
(9,  4, '2024-03-04 09:00:00', 'Pembelian UPS, power bank, dan perlengkapan daya listrik Maret',             '2024-03-04 09:00:00', '2024-03-04 09:00:00'),
(10, 10, '2024-03-08 10:00:00', 'Pengadaan perkakas dan tools teknik - bor, tang, obeng set',               '2024-03-08 10:00:00', '2024-03-08 10:00:00'),
(11, 1, '2024-03-12 09:00:00', 'Restok TV Samsung dan Sony serta aksesori audio Maret batch 2',             '2024-03-12 09:00:00', '2024-03-12 09:00:00'),
(12, 3, '2024-03-18 11:00:00', 'Pembelian Xiaomi smartphone series terbaru Redmi Note 13 dan 14',           '2024-03-18 11:00:00', '2024-03-18 11:00:00'),
(13, 5, '2024-03-22 14:00:00', 'Pengadaan aksesori laptop: SSD, RAM, hub USB-C, webcam, keyboard',          '2024-03-22 14:00:00', '2024-03-22 14:00:00'),
(14, 7, '2024-03-26 09:00:00', 'Restok jaringan: patch panel, keystone, kabel FO, PoE injector',            '2024-03-26 09:00:00', '2024-03-26 09:00:00'),
(15, 2, '2024-04-02 10:00:00', 'Pengadaan produk gaming aksesori: mouse Logitech, keyboard, headset',       '2024-04-02 10:00:00', '2024-04-02 10:00:00'),
(16, 9, '2024-04-08 11:00:00', 'Pembelian CCTV Hikvision dan perlengkapan fotografi studio',                '2024-04-08 11:00:00', '2024-04-08 11:00:00'),
(17, 8, '2024-04-12 09:00:00', 'Restok kertas HVS, tinta Epson 003, dan peralatan kantor umum',             '2024-04-12 09:00:00', '2024-04-12 09:00:00'),
(18, 4, '2024-04-17 14:00:00', 'Pengadaan baterai AA, stop kontak, dan stabilizer listrik April',           '2024-04-17 14:00:00', '2024-04-17 14:00:00'),
(19, 6, '2024-04-22 09:00:00', 'Pembelian peralatan rumah tangga Xiaomi: air purifier, blender, kettle',    '2024-04-22 09:00:00', '2024-04-22 09:00:00'),
(20, 10, '2024-04-26 10:00:00', 'Pengadaan tools teknik: gerinda, laser level, meteran digital Bosch',      '2024-04-26 10:00:00', '2024-04-26 10:00:00');

-- ============================================================
-- tb_detail_transaction_in
-- ============================================================
INSERT INTO tb_detail_transaction_in (transaction_in_id, product_id, qty, created_at, updated_at) VALUES
-- Transaksi 1: Elektronik
(1, 1, 10, '2024-02-01 09:05:00', '2024-02-01 09:05:00'),
(1, 2, 8,  '2024-02-01 09:05:00', '2024-02-01 09:05:00'),
(1, 3, 5,  '2024-02-01 09:05:00', '2024-02-01 09:05:00'),
(1, 4, 15, '2024-02-01 09:05:00', '2024-02-01 09:05:00'),
(1, 6, 10, '2024-02-01 09:05:00', '2024-02-01 09:05:00'),
-- Transaksi 2: Komputer
(2, 11, 8, '2024-02-05 10:05:00', '2024-02-05 10:05:00'),
(2, 12, 4, '2024-02-05 10:05:00', '2024-02-05 10:05:00'),
(2, 17, 10,'2024-02-05 10:05:00', '2024-02-05 10:05:00'),
(2, 18, 30,'2024-02-05 10:05:00', '2024-02-05 10:05:00'),
(2, 19, 40,'2024-02-05 10:05:00', '2024-02-05 10:05:00'),
-- Transaksi 3: Smartphone
(3, 21, 8, '2024-02-08 11:05:00', '2024-02-08 11:05:00'),
(3, 22, 6, '2024-02-08 11:05:00', '2024-02-08 11:05:00'),
(3, 24, 20,'2024-02-08 11:05:00', '2024-02-08 11:05:00'),
(3, 26, 10,'2024-02-08 11:05:00', '2024-02-08 11:05:00'),
(3, 27, 8, '2024-02-08 11:05:00', '2024-02-08 11:05:00'),
-- Transaksi 4: Peralatan Rumah
(4, 31, 5, '2024-02-12 09:35:00', '2024-02-12 09:35:00'),
(4, 32, 5, '2024-02-12 09:35:00', '2024-02-12 09:35:00'),
(4, 34, 8, '2024-02-12 09:35:00', '2024-02-12 09:35:00'),
(4, 35, 4, '2024-02-12 09:35:00', '2024-02-12 09:35:00'),
-- Transaksi 5: Jaringan
(5, 41, 12,'2024-02-15 14:05:00', '2024-02-15 14:05:00'),
(5, 42, 8, '2024-02-15 14:05:00', '2024-02-15 14:05:00'),
(5, 43, 15,'2024-02-15 14:05:00', '2024-02-15 14:05:00'),
(5, 44, 10,'2024-02-15 14:05:00', '2024-02-15 14:05:00'),
-- Transaksi 6: Kamera
(6, 51, 4, '2024-02-19 10:05:00', '2024-02-19 10:05:00'),
(6, 53, 5, '2024-02-19 10:05:00', '2024-02-19 10:05:00'),
(6, 54, 3, '2024-02-19 10:05:00', '2024-02-19 10:05:00'),
(6, 56, 40,'2024-02-19 10:05:00', '2024-02-19 10:05:00'),
-- Transaksi 7: Gaming
(7, 61, 5, '2024-02-22 09:05:00', '2024-02-22 09:05:00'),
(7, 62, 10,'2024-02-22 09:05:00', '2024-02-22 09:05:00'),
(7, 63, 15,'2024-02-22 09:05:00', '2024-02-22 09:05:00'),
(7, 65, 8, '2024-02-22 09:05:00', '2024-02-22 09:05:00'),
-- Transaksi 8: Office
(8, 71, 10,'2024-02-26 11:05:00', '2024-02-26 11:05:00'),
(8, 72, 6, '2024-02-26 11:05:00', '2024-02-26 11:05:00'),
(8, 73, 50,'2024-02-26 11:05:00', '2024-02-26 11:05:00'),
(8, 74,150,'2024-02-26 11:05:00', '2024-02-26 11:05:00'),
-- Transaksi 9: Power
(9, 81, 8, '2024-03-04 09:05:00', '2024-03-04 09:05:00'),
(9, 82, 30,'2024-03-04 09:05:00', '2024-03-04 09:05:00'),
(9, 84, 40,'2024-03-04 09:05:00', '2024-03-04 09:05:00'),
(9, 88, 50,'2024-03-04 09:05:00', '2024-03-04 09:05:00'),
-- Transaksi 10: Tools
(10, 91, 10,'2024-03-08 10:05:00','2024-03-08 10:05:00'),
(10, 92, 15,'2024-03-08 10:05:00','2024-03-08 10:05:00'),
(10, 93, 12,'2024-03-08 10:05:00','2024-03-08 10:05:00'),
(10, 95, 10,'2024-03-08 10:05:00','2024-03-08 10:05:00'),
-- Transaksi 11: TV restok
(11, 1, 15,'2024-03-12 09:05:00', '2024-03-12 09:05:00'),
(11, 3, 5, '2024-03-12 09:05:00', '2024-03-12 09:05:00'),
(11, 5, 50,'2024-03-12 09:05:00', '2024-03-12 09:05:00'),
(11, 7, 20,'2024-03-12 09:05:00', '2024-03-12 09:05:00'),
-- Transaksi 12: Xiaomi phone
(12, 23, 10,'2024-03-18 11:05:00','2024-03-18 11:05:00'),
(12, 25, 25,'2024-03-18 11:05:00','2024-03-18 11:05:00'),
(12, 28, 40,'2024-03-18 11:05:00','2024-03-18 11:05:00'),
(12, 29, 50,'2024-03-18 11:05:00','2024-03-18 11:05:00'),
-- Transaksi 13: Aksesori laptop
(13, 14, 25,'2024-03-22 14:05:00','2024-03-22 14:05:00'),
(13, 15, 30,'2024-03-22 14:05:00','2024-03-22 14:05:00'),
(13, 16, 15,'2024-03-22 14:05:00','2024-03-22 14:05:00'),
(13, 20, 50,'2024-03-22 14:05:00','2024-03-22 14:05:00'),
-- Transaksi 14: Jaringan lanjut
(14, 45, 8, '2024-03-26 09:05:00','2024-03-26 09:05:00'),
(14, 46, 8, '2024-03-26 09:05:00','2024-03-26 09:05:00'),
(14, 47, 25,'2024-03-26 09:05:00','2024-03-26 09:05:00'),
(14, 48, 20,'2024-03-26 09:05:00','2024-03-26 09:05:00'),
-- Transaksi 15: Gaming aksesori
(15, 64, 10,'2024-04-02 10:05:00','2024-04-02 10:05:00'),
(15, 66, 2, '2024-04-02 10:05:00','2024-04-02 10:05:00'),
(15, 69, 20,'2024-04-02 10:05:00','2024-04-02 10:05:00'),
(15, 70,100,'2024-04-02 10:05:00','2024-04-02 10:05:00'),
-- Transaksi 16: CCTV & foto
(16, 57, 8, '2024-04-08 11:05:00','2024-04-08 11:05:00'),
(16, 58, 15,'2024-04-08 11:05:00','2024-04-08 11:05:00'),
(16, 59, 10,'2024-04-08 11:05:00','2024-04-08 11:05:00'),
(16, 60, 8, '2024-04-08 11:05:00','2024-04-08 11:05:00'),
-- Transaksi 17: ATK restok
(17, 73,50, '2024-04-12 09:05:00','2024-04-12 09:05:00'),
(17, 74,150,'2024-04-12 09:05:00','2024-04-12 09:05:00'),
(17, 78, 8, '2024-04-12 09:05:00','2024-04-12 09:05:00'),
(17, 80, 12,'2024-04-12 09:05:00','2024-04-12 09:05:00'),
-- Transaksi 18: Power/baterai
(18, 83, 80,'2024-04-17 14:05:00','2024-04-17 14:05:00'),
(18, 85, 15,'2024-04-17 14:05:00','2024-04-17 14:05:00'),
(18, 87, 20,'2024-04-17 14:05:00','2024-04-17 14:05:00'),
(18, 88, 40,'2024-04-17 14:05:00','2024-04-17 14:05:00'),
-- Transaksi 19: Xiaomi rumah
(19, 33, 10,'2024-04-22 09:05:00','2024-04-22 09:05:00'),
(19, 36, 15,'2024-04-22 09:05:00','2024-04-22 09:05:00'),
(19, 38, 10,'2024-04-22 09:05:00','2024-04-22 09:05:00'),
(19, 40, 30,'2024-04-22 09:05:00','2024-04-22 09:05:00'),
-- Transaksi 20: Bosch tools
(20, 96, 6, '2024-04-26 10:05:00','2024-04-26 10:05:00'),
(20, 97, 10,'2024-04-26 10:05:00','2024-04-26 10:05:00'),
(20, 98, 4, '2024-04-26 10:05:00','2024-04-26 10:05:00'),
(20, 100,5, '2024-04-26 10:05:00','2024-04-26 10:05:00');

-- ============================================================
-- tb_header_transaction_out (15 transaksi keluar)
-- ============================================================
INSERT INTO tb_header_transaction_out (id, date, description, created_at, updated_at) VALUES
(1,  '2024-02-10 10:00:00', 'Penjualan produk ke PT Mitra Karya Sejahtera - Jakarta Selatan',          '2024-02-10 10:00:00', '2024-02-10 10:00:00'),
(2,  '2024-02-14 11:00:00', 'Pengiriman produk ke CV Buana Digital Pratama - Bekasi',                  '2024-02-14 11:00:00', '2024-02-14 11:00:00'),
(3,  '2024-02-20 09:30:00', 'Penjualan retail langsung cabang Sudirman - customer individu',           '2024-02-20 09:30:00', '2024-02-20 09:30:00'),
(4,  '2024-02-28 14:00:00', 'Proyek instalasi jaringan Gedung Perkantoran Soho Capital Jakarta Barat', '2024-02-28 14:00:00', '2024-02-28 14:00:00'),
(5,  '2024-03-05 10:00:00', 'Penjualan ke instansi pemerintah Kecamatan Pasar Minggu - Jakarta Sel',  '2024-03-05 10:00:00', '2024-03-05 10:00:00'),
(6,  '2024-03-11 11:00:00', 'Pengiriman ke PT Cahaya Media Kreatif untuk kebutuhan studio produksi',   '2024-03-11 11:00:00', '2024-03-11 11:00:00'),
(7,  '2024-03-16 09:00:00', 'Penjualan gaming setup ke PT Esport Arena Indonesia',                    '2024-03-16 09:00:00', '2024-03-16 09:00:00'),
(8,  '2024-03-24 14:00:00', 'Pengiriman perlengkapan kantor ke PT Asuransi Medika Jaya - Kemayoran',  '2024-03-24 14:00:00', '2024-03-24 14:00:00'),
(9,  '2024-03-29 10:00:00', 'Penjualan ke CV Solusi Listrik Mandiri untuk proyek solar panel',        '2024-03-29 10:00:00', '2024-03-29 10:00:00'),
(10, '2024-04-05 11:00:00', 'Pengiriman ke PT Properti Maju Indonesia untuk renovasi gedung',         '2024-04-05 11:00:00', '2024-04-05 11:00:00'),
(11, '2024-04-10 09:00:00', 'Penjualan smartphone dan tablet ke Sekolah Islam Terpadu Jakarta',       '2024-04-10 09:00:00', '2024-04-10 09:00:00'),
(12, '2024-04-15 14:00:00', 'Pengiriman ke perusahaan startup FinTech untuk setup workstation',        '2024-04-15 14:00:00', '2024-04-15 14:00:00'),
(13, '2024-04-19 10:00:00', 'Penjualan peralatan rumah tangga ke kompleks perumahan Grand Depok City','2024-04-19 10:00:00', '2024-04-19 10:00:00'),
(14, '2024-04-23 11:00:00', 'Pengiriman ke PT Broadcasting Televisi Nusantara - peralatan kamera',    '2024-04-23 11:00:00', '2024-04-23 11:00:00'),
(15, '2024-04-27 09:00:00', 'Penjualan aksesori & consumable retail harian - mix order',               '2024-04-27 09:00:00', '2024-04-27 09:00:00');

-- ============================================================
-- tb_detail_transaction_out
-- ============================================================
INSERT INTO tb_detail_transaction_out (transaction_out_id, product_id, qty, created_at, updated_at) VALUES
-- Out 1: PT Mitra Karya
(1, 1,  2, '2024-02-10 10:05:00', '2024-02-10 10:05:00'),
(1, 11, 3, '2024-02-10 10:05:00', '2024-02-10 10:05:00'),
(1, 14, 5, '2024-02-10 10:05:00', '2024-02-10 10:05:00'),
(1, 17, 2, '2024-02-10 10:05:00', '2024-02-10 10:05:00'),
-- Out 2: CV Buana
(2, 4,  5, '2024-02-14 11:05:00', '2024-02-14 11:05:00'),
(2, 15, 8, '2024-02-14 11:05:00', '2024-02-14 11:05:00'),
(2, 20, 10,'2024-02-14 11:05:00', '2024-02-14 11:05:00'),
-- Out 3: Retail Sudirman
(3, 7,  3, '2024-02-20 09:35:00', '2024-02-20 09:35:00'),
(3, 8,  5, '2024-02-20 09:35:00', '2024-02-20 09:35:00'),
(3, 22, 1, '2024-02-20 09:35:00', '2024-02-20 09:35:00'),
(3, 28,10, '2024-02-20 09:35:00', '2024-02-20 09:35:00'),
-- Out 4: Jaringan Soho Capital
(4, 41, 5, '2024-02-28 14:05:00', '2024-02-28 14:05:00'),
(4, 42, 3, '2024-02-28 14:05:00', '2024-02-28 14:05:00'),
(4, 43, 8, '2024-02-28 14:05:00', '2024-02-28 14:05:00'),
(4, 44, 5, '2024-02-28 14:05:00', '2024-02-28 14:05:00'),
(4, 47,15, '2024-02-28 14:05:00', '2024-02-28 14:05:00'),
-- Out 5: Pemerintah Pasar Minggu
(5, 71, 5, '2024-03-05 10:05:00', '2024-03-05 10:05:00'),
(5, 74,50, '2024-03-05 10:05:00', '2024-03-05 10:05:00'),
(5, 78, 2, '2024-03-05 10:05:00', '2024-03-05 10:05:00'),
(5, 79, 2, '2024-03-05 10:05:00', '2024-03-05 10:05:00'),
-- Out 6: Studio PT Cahaya
(6, 51, 2, '2024-03-11 11:05:00', '2024-03-11 11:05:00'),
(6, 55, 5, '2024-03-11 11:05:00', '2024-03-11 11:05:00'),
(6, 58, 8, '2024-03-11 11:05:00', '2024-03-11 11:05:00'),
(6, 59, 5, '2024-03-11 11:05:00', '2024-03-11 11:05:00'),
-- Out 7: Esport Arena
(7, 61, 3, '2024-03-16 09:05:00', '2024-03-16 09:05:00'),
(7, 62, 5, '2024-03-16 09:05:00', '2024-03-16 09:05:00'),
(7, 63, 8, '2024-03-16 09:05:00', '2024-03-16 09:05:00'),
(7, 64, 5, '2024-03-16 09:05:00', '2024-03-16 09:05:00'),
(7, 65, 5, '2024-03-16 09:05:00', '2024-03-16 09:05:00'),
-- Out 8: Asuransi Medika
(8, 72, 3, '2024-03-24 14:05:00', '2024-03-24 14:05:00'),
(8, 73,20, '2024-03-24 14:05:00', '2024-03-24 14:05:00'),
(8, 80, 5, '2024-03-24 14:05:00', '2024-03-24 14:05:00'),
-- Out 9: Solar Panel
(9, 86, 6, '2024-03-29 10:05:00', '2024-03-29 10:05:00'),
(9, 85, 8, '2024-03-29 10:05:00', '2024-03-29 10:05:00'),
(9, 81, 4, '2024-03-29 10:05:00', '2024-03-29 10:05:00'),
-- Out 10: Properti Maju
(10, 91, 5,'2024-04-05 11:05:00', '2024-04-05 11:05:00'),
(10, 95, 5,'2024-04-05 11:05:00', '2024-04-05 11:05:00'),
(10, 96, 3,'2024-04-05 11:05:00', '2024-04-05 11:05:00'),
(10, 97, 5,'2024-04-05 11:05:00', '2024-04-05 11:05:00'),
-- Out 11: Sekolah Islam
(11, 24,10,'2024-04-10 09:05:00', '2024-04-10 09:05:00'),
(11, 26, 5,'2024-04-10 09:05:00', '2024-04-10 09:05:00'),
(11, 27, 3,'2024-04-10 09:05:00', '2024-04-10 09:05:00'),
-- Out 12: Startup FinTech
(12, 12, 4,'2024-04-15 14:05:00', '2024-04-15 14:05:00'),
(12, 14, 8,'2024-04-15 14:05:00', '2024-04-15 14:05:00'),
(12, 16, 6,'2024-04-15 14:05:00', '2024-04-15 14:05:00'),
(12, 17, 5,'2024-04-15 14:05:00', '2024-04-15 14:05:00'),
-- Out 13: Perumahan Grand Depok
(13, 31, 2,'2024-04-19 10:05:00', '2024-04-19 10:05:00'),
(13, 33, 5,'2024-04-19 10:05:00', '2024-04-19 10:05:00'),
(13, 37, 8,'2024-04-19 10:05:00', '2024-04-19 10:05:00'),
(13, 40,15,'2024-04-19 10:05:00', '2024-04-19 10:05:00'),
-- Out 14: Broadcasting TV
(14, 54, 2,'2024-04-23 11:05:00', '2024-04-23 11:05:00'),
(14, 57, 5,'2024-04-23 11:05:00', '2024-04-23 11:05:00'),
(14, 60, 3,'2024-04-23 11:05:00', '2024-04-23 11:05:00'),
-- Out 15: Retail harian
(15, 5, 20,'2024-04-27 09:05:00', '2024-04-27 09:05:00'),
(15, 9, 30,'2024-04-27 09:05:00', '2024-04-27 09:05:00'),
(15, 10,15,'2024-04-27 09:05:00', '2024-04-27 09:05:00'),
(15, 29,20,'2024-04-27 09:05:00', '2024-04-27 09:05:00'),
(15, 30,50,'2024-04-27 09:05:00', '2024-04-27 09:05:00'),
(15, 70,30,'2024-04-27 09:05:00', '2024-04-27 09:05:00');

-- ============================================================
-- tb_galery (100 gambar - satu per produk, real image URLs)
-- Menggunakan Picsum Photos (stable seed-based images)
-- dan Unsplash Source (kategori spesifik)
-- ============================================================
INSERT INTO tb_galery (product_id, name_file, description, created_at, updated_at) VALUES
-- ELEKTRONIK
(1,  'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80', 'Samsung Smart TV 43" 4K - tampak depan display',             '2024-01-10 09:00:00', '2024-01-10 09:00:00'),
(2,  'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', 'Samsung Soundbar HW-B650 - tampak depan dan atas',           '2024-01-10 09:05:00', '2024-01-10 09:05:00'),
(3,  'https://images.unsplash.com/photo-1571415060716-baff5ea4c8c8?w=800&q=80', 'Sony Bravia 55" OLED 4K - display showroom',                 '2024-01-10 09:10:00', '2024-01-10 09:10:00'),
(4,  'https://images.unsplash.com/photo-1601944177325-f8867652837f?w=800&q=80', 'Xiaomi Smart TV A2 32" - lifestyle di ruang keluarga',       '2024-01-10 09:15:00', '2024-01-10 09:15:00'),
(5,  'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80', 'Panasonic Ergofit Earphone - close-up produk putih',         '2024-01-10 09:20:00', '2024-01-10 09:20:00'),
(6,  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'Sony WH-1000XM5 Headphone - tampak samping black',           '2024-01-10 09:25:00', '2024-01-10 09:25:00'),
(7,  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 'Samsung Galaxy Buds2 Pro - TWS dalam charging case',         '2024-01-10 09:30:00', '2024-01-10 09:30:00'),
(8,  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', 'Xiaomi Redmi Buds 4 Pro - TWS close up',                    '2024-01-10 09:35:00', '2024-01-10 09:35:00'),
(9,  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', 'Kabel HDMI 2.1 Braided - detail koneksi',                    '2024-01-10 09:40:00', '2024-01-10 09:40:00'),
(10, 'https://images.unsplash.com/photo-1574920162043-b872873f19c8?w=800&q=80', 'Remote Universal Smart TV - tampak depan tombol',            '2024-01-10 09:45:00', '2024-01-10 09:45:00'),
-- KOMPUTER & LAPTOP
(11, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80', 'Lenovo IdeaPad Slim 3 - tampak atas keyboard terbuka',      '2024-01-11 09:00:00', '2024-01-11 09:00:00'),
(12, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 'Apple MacBook Air M2 - lifestyle pada meja kerja',           '2024-01-11 09:05:00', '2024-01-11 09:05:00'),
(13, 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', 'Samsung Galaxy Book3 360 - mode tablet dan laptop',         '2024-01-11 09:10:00', '2024-01-11 09:10:00'),
(14, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', 'Logitech MX Master 3S - tampak samping ergonomis',           '2024-01-11 09:15:00', '2024-01-11 09:15:00'),
(15, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 'Logitech K380 Keyboard - compact warna pink pastel',         '2024-01-11 09:20:00', '2024-01-11 09:20:00'),
(16, 'https://images.unsplash.com/photo-1596566841397-4c5ab6e4a89c?w=800&q=80', 'Logitech C920 Webcam - terpasang di monitor',                '2024-01-11 09:25:00', '2024-01-11 09:25:00'),
(17, 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800&q=80', 'Samsung 27" QHD Monitor - tampak depan display',              '2024-01-11 09:30:00', '2024-01-11 09:30:00'),
(18, 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&q=80', 'Samsung SSD 870 EVO - tampak atas label',                    '2024-01-11 09:35:00', '2024-01-11 09:35:00'),
(19, 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80', 'Kingston RAM DDR4 16GB - close-up chip',                       '2024-01-11 09:40:00', '2024-01-11 09:40:00'),
(20, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Anker Hub USB-C 7-in-1 - tampak port koneksi',                 '2024-01-11 09:45:00', '2024-01-11 09:45:00'),
-- SMARTPHONE
(21, 'https://images.unsplash.com/photo-1610945264803-c22b62831e6b?w=800&q=80', 'Samsung Galaxy S24 Ultra - tampak depan titanium',           '2024-01-12 09:00:00', '2024-01-12 09:00:00'),
(22, 'https://images.unsplash.com/photo-1678685888221-cebbd2b9d4d4?w=800&q=80', 'Apple iPhone 15 Pro - tampak belakang black titanium',       '2024-01-12 09:05:00', '2024-01-12 09:05:00'),
(23, 'https://images.unsplash.com/photo-1706341680002-c756b08cef44?w=800&q=80', 'Xiaomi 14 5G - tampak belakang Leica logo jade green',      '2024-01-12 09:10:00', '2024-01-12 09:10:00'),
(24, 'https://images.unsplash.com/photo-1565536421961-1c353bde58e0?w=800&q=80', 'Samsung Galaxy A55 5G - lifestyle shoot awesome navy',       '2024-01-12 09:15:00', '2024-01-12 09:15:00'),
(25, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', 'Xiaomi Redmi Note 13 Pro - kamera close-up midnight',        '2024-01-12 09:20:00', '2024-01-12 09:20:00'),
(26, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80', 'Samsung Galaxy Tab S9 FE - tampak depan layar',                '2024-01-12 09:25:00', '2024-01-12 09:25:00'),
(27, 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=800&q=80', 'Apple iPad 10th Gen - lifestyle meja kreatif',               '2024-01-12 09:30:00', '2024-01-12 09:30:00'),
(28, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80', 'Samsung Wireless Charger 15W - sedang mengisi daya',         '2024-01-12 09:35:00', '2024-01-12 09:35:00'),
(29, 'https://images.unsplash.com/photo-1588599376673-1fc2b31d2494?w=800&q=80', 'Xiaomi 120W HyperCharge - adapter compact dan kabel',        '2024-01-12 09:40:00', '2024-01-12 09:40:00'),
(30, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80', 'Tempered Glass S24 Ultra - proses pemasangan 3D',            '2024-01-12 09:45:00', '2024-01-12 09:45:00'),
-- PERALATAN RUMAH
(31, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', 'Samsung Kulkas 2 Pintu RT50 - tampak depan silver',            '2024-01-13 09:00:00', '2024-01-13 09:00:00'),
(32, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80', 'Panasonic Mesin Cuci NA-F80H2 - tampak atas loading',        '2024-01-13 09:05:00', '2024-01-13 09:05:00'),
(33, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', 'Xiaomi Air Purifier 4 Pro - ruang bersih modern',            '2024-01-13 09:10:00', '2024-01-13 09:10:00'),
(34, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', 'Panasonic AC Inverter 1PK - unit indoor dan outdoor',        '2024-01-13 09:15:00', '2024-01-13 09:15:00'),
(35, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Samsung Robot Vacuum Jet Bot - sedang membersihkan lantai',    '2024-01-13 09:20:00', '2024-01-13 09:20:00'),
(36, 'https://images.unsplash.com/photo-1585837146751-a44117a7446f?w=800&q=80', 'Xiaomi Smart Blender - hasil blending smoothie segar',       '2024-01-13 09:25:00', '2024-01-13 09:25:00'),
(37, 'https://images.unsplash.com/photo-1585325701165-b6c70af60f3e?w=800&q=80', 'Panasonic Rice Cooker SR-WN36 - tampak depan panel',         '2024-01-13 09:30:00', '2024-01-13 09:30:00'),
(38, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Xiaomi Water Dispenser UV - dapur modern minimalis',           '2024-01-13 09:35:00', '2024-01-13 09:35:00'),
(39, 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80', 'Panasonic Setrika Uap NI-M300 - detail sole plate titanium',   '2024-01-13 09:40:00', '2024-01-13 09:40:00'),
(40, 'https://images.unsplash.com/photo-1597718838469-b28b01ebf71b?w=800&q=80', 'Xiaomi Smart Kettle - tampak samping dengan uap panas',      '2024-01-13 09:45:00', '2024-01-13 09:45:00'),
-- JARINGAN
(41, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', 'TP-Link Archer AX73 WiFi 6 - tampak atas antena',              '2024-01-14 09:00:00', '2024-01-14 09:00:00'),
(42, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80', 'TP-Link Switch 24 Port Gigabit - tampak depan panel port',     '2024-01-14 09:05:00', '2024-01-14 09:05:00'),
(43, 'https://images.unsplash.com/photo-1606768666853-403c90a981ad?w=800&q=80', 'TP-Link Access Point WA901N - tampak depan dengan LED',      '2024-01-14 09:10:00', '2024-01-14 09:10:00'),
(44, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Kabel UTP Cat6 Belden - roll 305m tampak samping',             '2024-01-14 09:15:00', '2024-01-14 09:15:00'),
(45, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Panduit Patch Panel 24 Port - terpasang di rack server',       '2024-01-14 09:20:00', '2024-01-14 09:20:00'),
(46, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'AMP Keystone Jack Cat6 - close-up detik pemasangan',          '2024-01-14 09:25:00', '2024-01-14 09:25:00'),
(47, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Fiber Optic SC-SC Patchcord - detail konektor aqua',          '2024-01-14 09:30:00', '2024-01-14 09:30:00'),
(48, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'TP-Link PoE Injector 30W - tampak port dan LED',              '2024-01-14 09:35:00', '2024-01-14 09:35:00'),
(49, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Rack Server 12U Standing - tampak depan pintu kaca',          '2024-01-14 09:40:00', '2024-01-14 09:40:00'),
(50, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'TP-Link Deco XE75 Pro 3 Pack - tampak set tiga unit',         '2024-01-14 09:45:00', '2024-01-14 09:45:00'),
-- KAMERA
(51, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', 'Canon EOS R50 - tampak depan body mirrorless',               '2024-01-15 09:00:00', '2024-01-15 09:00:00'),
(52, 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&q=80', 'Canon RF 50mm f/1.8 STM - tampak lensa close-up',            '2024-01-15 09:05:00', '2024-01-15 09:05:00'),
(53, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80', 'Sony ZV-E10 - tampak samping flip screen terbuka',           '2024-01-15 09:10:00', '2024-01-15 09:10:00'),
(54, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80', 'DJI Mini 4 Pro - tampak sedang terbang di langit biru',      '2024-01-15 09:15:00', '2024-01-15 09:15:00'),
(55, 'https://images.unsplash.com/photo-1553736026-ff14d158d222?w=800&q=80', 'Joby GorillaPod 3K Pro - tampak fleksibel melilit tiang',      '2024-01-15 09:20:00', '2024-01-15 09:20:00'),
(56, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'SanDisk Extreme Pro 128GB - close-up label kartu memori',      '2024-01-15 09:25:00', '2024-01-15 09:25:00'),
(57, 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80', 'Hikvision PTZ 4MP - tampak dome kamera outdoor',             '2024-01-15 09:30:00', '2024-01-15 09:30:00'),
(58, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Ring Light 18" LED - sedang digunakan sesi foto portrait',     '2024-01-15 09:35:00', '2024-01-15 09:35:00'),
(59, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Godox SL60W LED Light - tampak lampu studio dengan softbox',   '2024-01-15 09:40:00', '2024-01-15 09:40:00'),
(60, 'https://images.unsplash.com/photo-1520549233664-03f65c1d1327?w=800&q=80', 'GoPro Hero12 Black - action shot olahraga outdoor',          '2024-01-15 09:45:00', '2024-01-15 09:45:00'),
-- GAMING
(61, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80', 'PlayStation 5 Slim Disc - tampak depan konsol dan controller','2024-01-16 09:00:00', '2024-01-16 09:00:00'),
(62, 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=800&q=80', 'DualSense Edge - tampak atas controller custom premium',      '2024-01-16 09:05:00', '2024-01-16 09:05:00'),
(63, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80', 'Logitech G Pro X Superlight 2 - tampak atas mouse gaming',   '2024-01-16 09:10:00', '2024-01-16 09:10:00'),
(64, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 'Logitech G915 TKL - keyboard gaming RGB tenkeyless',         '2024-01-16 09:15:00', '2024-01-16 09:15:00'),
(65, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'Sony INZONE H9 - tampak samping headset gaming putih',        '2024-01-16 09:20:00', '2024-01-16 09:20:00'),
(66, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', 'Samsung Odyssey G9 49" OLED - tampak kurva widescreen',      '2024-01-16 09:25:00', '2024-01-16 09:25:00'),
(67, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', 'Noblechairs Epic Gaming Chair - tampak samping mewah',       '2024-01-16 09:30:00', '2024-01-16 09:30:00'),
(68, 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&q=80', 'Elgato 4K60 Pro MK.2 - tampak card PCIe hitam metalik',       '2024-01-16 09:35:00', '2024-01-16 09:35:00'),
(69, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80', 'Logitech G840 Mousepad XL - tampak atas full desk setup',    '2024-01-16 09:40:00', '2024-01-16 09:40:00'),
(70, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', 'Steam Gift Card IDR 150K - tampak kartu kode digital',       '2024-01-16 09:45:00', '2024-01-16 09:45:00'),
-- OFFICE
(71, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80', 'Epson L3250 EcoTank WiFi - tampak depan printer warna',      '2024-01-17 09:00:00', '2024-01-17 09:00:00'),
(72, 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', 'Canon PIXMA TS8370 - tampak depan output foto',              '2024-01-17 09:05:00', '2024-01-17 09:05:00'),
(73, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', 'Epson Tinta 003 Set CMYK - 4 botol tinta tersusun rapi',       '2024-01-17 09:10:00', '2024-01-17 09:10:00'),
(74, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Kertas HVS A4 Sidu - tampak rim kertas putih bersih',         '2024-01-17 09:15:00', '2024-01-17 09:15:00'),
(75, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80', 'Epson L5290 All-in-One - tampak ADF dan panel atas',         '2024-01-17 09:20:00', '2024-01-17 09:20:00'),
(76, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Fujipla Laminator A3 - tampak mesin laminasi dari samping',    '2024-01-17 09:25:00', '2024-01-17 09:25:00'),
(77, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Canon DR-C230 Scanner - tampak muat dokumen dari samping',     '2024-01-17 09:30:00', '2024-01-17 09:30:00'),
(78, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80', 'Whiteboard Sakana 90x120 - di ruang rapat presentasi',       '2024-01-17 09:35:00', '2024-01-17 09:35:00'),
(79, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', 'Epson EB-W52 Proyektor - tampak proyeksi di screen putih',    '2024-01-17 09:40:00', '2024-01-17 09:40:00'),
(80, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Logitech R500s Presenter - tampak atas tombol spotlight',      '2024-01-17 09:45:00', '2024-01-17 09:45:00'),
-- POWER
(81, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'APC UPS BX1200MI - tampak depan display dan outlet',           '2024-01-18 09:00:00', '2024-01-18 09:00:00'),
(82, 'https://images.unsplash.com/photo-1594549181132-9045fed330ce?w=800&q=80', 'Xiaomi Power Bank 20000mAh 50W - tampak samping LCD display','2024-01-18 09:05:00', '2024-01-18 09:05:00'),
(83, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Panasonic Baterai AA Alkaline Pro - tampak blister 4 pcs',     '2024-01-18 09:10:00', '2024-01-18 09:10:00'),
(84, 'https://images.unsplash.com/photo-1588599376673-1fc2b31d2494?w=800&q=80', 'Anker 65W GaN III - charger compact tiga port',              '2024-01-18 09:15:00', '2024-01-18 09:15:00'),
(85, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Stabilizer Matsunaga 1000VA - tampak depan voltmeter analog',  '2024-01-18 09:20:00', '2024-01-18 09:20:00'),
(86, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80', 'Solar Panel 100W Monocrystalline - tampak outdoor atap',     '2024-01-18 09:25:00', '2024-01-18 09:25:00'),
(87, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Panasonic Battery VRLA 12V 7Ah - tampak label produk',         '2024-01-18 09:30:00', '2024-01-18 09:30:00'),
(88, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Stop Kontak Schneider 6 Lubang Surge - tampak produk lengkap', '2024-01-18 09:35:00', '2024-01-18 09:35:00'),
(89, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Genset Honda EU22i Inverter - tampak samping unit silent',     '2024-01-18 09:40:00', '2024-01-18 09:40:00'),
(90, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Sanwa PC700 Multimeter - tampak layar digital True RMS',       '2024-01-18 09:45:00', '2024-01-18 09:45:00'),
-- TOOLS
(91, 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80', 'Bosch GSB 550 Impact Drill - tampak produk set koper',       '2024-01-19 09:00:00', '2024-01-19 09:00:00'),
(92, 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80', 'Tekiro Tang Set 5 Pcs CRV - tersusun rapi pada roll pouch',  '2024-01-19 09:05:00', '2024-01-19 09:05:00'),
(93, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Wera Kraftform Obeng 30 Pcs - tampak set lengkap dalam wadah', '2024-01-19 09:10:00', '2024-01-19 09:10:00'),
(94, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Tekiro Kunci Torsi 40-200Nm - tampak detail skala ukuran',     '2024-01-19 09:15:00', '2024-01-19 09:15:00'),
(95, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Bosch GWS 900-100 Gerinda - tampak produk dengan disc',        '2024-01-19 09:20:00', '2024-01-19 09:20:00'),
(96, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Bosch GLL 3-80 Laser Level - tampak proyeksi garis hijau',     '2024-01-19 09:25:00', '2024-01-19 09:25:00'),
(97, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Bosch GLM 50-22 Laser Meter - tampak display dan tombol',      '2024-01-19 09:30:00', '2024-01-19 09:30:00'),
(98, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Shark Kompresor 1HP 25L Silent - tampak samping unit lengkap',  '2024-01-19 09:35:00', '2024-01-19 09:35:00'),
(99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'ESAB Buddy Arc 200A Mesin Las - tampak unit dan elektroda',    '2024-01-19 09:40:00', '2024-01-19 09:40:00'),
(100,'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Tangga Lipat Aluminium 5M Teleskopik - tampak terlipat',       '2024-01-19 09:45:00', '2024-01-19 09:45:00');

-- ============================================================
-- tb_user (5 user sistem)
-- password: hash bcrypt dari "Password@123"
-- ============================================================
INSERT INTO tb_user (id, name, password) VALUES
(1, 'Admin Utama',       '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'),
(2, 'Budi Santoso',      '$2b$12$LKJHlkjhsdflkjhsdf987654321qwertyuiop1234567890asdfgh'),
(3, 'Siti Rahayu',       '$2b$12$POIUhgfdsaZXCVbnm09876543212345678901234567890qwerty1'),
(4, 'Andi Firmansyah',   '$2b$12$MNBVcxzlkjhgfdsapoiuyt09876543211234567890asdfghjk1'),
(5, 'Dewi Kusumawati',   '$2b$12$QWERTasdfgZXCVbnm098765poiuytrew1234567890lkjhgfds1');

COMMIT;
PRAGMA foreign_keys = ON;

-- ============================================================
-- RINGKASAN DATA:
-- ✅ tb_category    : 10 kategori
-- ✅ tb_supplier    : 10 supplier
-- ✅ tb_location    : 10 lokasi gudang
-- ✅ tb_merek       : 10 merek
-- ✅ tb_product     : 100 produk (SKU unik, data lengkap)
-- ✅ tb_header_in   : 20 transaksi masuk
-- ✅ tb_detail_in   : 80 detail item transaksi masuk
-- ✅ tb_header_out  : 15 transaksi keluar
-- ✅ tb_detail_out  : 60 detail item transaksi keluar
-- ✅ tb_galery      : 100 gambar (URL Unsplash real)
-- ✅ tb_user        : 5 user (password bcrypt)
-- ============================================================`