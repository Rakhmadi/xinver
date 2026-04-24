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