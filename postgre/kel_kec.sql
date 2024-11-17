
-- Insert Kecamatan
INSERT INTO Kecamatan (nama_kecamatan) VALUES 
('Andir'),
('Astana Anyar'),
('Antapani'),
('Arcamanik'),
('Babakan Ciparay'),
('Bandung Kidul'),
('Bandung Kulon'),
('Bandung Wetan'),
('Batununggal'),
('Bojongloa Kaler'),
('Bojongloa Kidul'),
('Buahbatu'),
('Cibeunying Kaler'),
('Cibeunying Kidul'),
('Cibiru'),
('Cicendo'),
('Cidadap'),
('Cinambo'),
('Coblong'),
('Gedebage'),
('Kiaracondong'),
('Lengkong'),
('Mandalajati'),
('Panyileukan'),
('Rancasari'),
('Regol'),
('Sukajadi'),
('Sukasari'),
('Sumur Bandung'),
('Ujungberung');

-- Insert Kelurahan
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES
('Campaka', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Andir')),
('Ciroyom', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Andir')),
('Dunguscariang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Andir')),
('Garuda', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Andir')),
('Kebonjeruk', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Andir')),
('Maleber', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Andir')),

('Cibadak', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Astana Anyar')),
('Karanganyar', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Astana Anyar')),
('Karasak', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Astana Anyar')),
('Nyengseret', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Astana Anyar')),
('Panjunan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Astana Anyar')),
('Pelindunghewan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Astana Anyar')),

('Antapani Kidul', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Antapani')),
('Antapani Kulon', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Antapani')),
('Antapani Tengah', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Antapani')),
('Antapani Wetan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Antapani')),

('Cisaranten Bina Harapan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Arcamanik')),
('Cisaranten Endah', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Arcamanik')),
('Cisaranten Kulon', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Arcamanik')),
('Sukamiskin', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Arcamanik')),

('Babakan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Babakan Ciparay')),
('Babakanciparay', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Babakan Ciparay')),
('Cirangrang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Babakan Ciparay')),
('Margahayu Utara', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Babakan Ciparay')),
('Margasuka', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Babakan Ciparay')),
('Sukahaji', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Babakan Ciparay')),

('Batununggal', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kidul')),
('Kujangsari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kidul')),
('Mengger', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kidul')),
('Wates', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kidul')),

('Caringin', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Cibuntu', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Cigondewah Kaler', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Cigondewah Kidul', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Cigondewah Rahayu', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Cijerah', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Gempolsari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),
('Warungmuncang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Kulon')),

('Cihapit', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Wetan')),
('Citarum', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Wetan')),
('Tamansari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bandung Wetan')),

('Binong', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Cibangkong', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Gumuruh', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Kacapiring', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Kebongedang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Kebonwaru', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Maleer', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),
('Samaja', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Batununggal')),

('Babakan Asih', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kaler')),
('Babakan Tarogong', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kaler')),
('Jamika', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kaler')),
('Kopo', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kaler')),
('Suka Asih', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kaler')),

-- Bojongloa Kidul (id_kecamatan 11)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cibaduyut', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kidul')),
('Cibaduyut Kidul', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kidul')),
('Cibaduyut Wetan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kidul')),
('Kebon Lega', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kidul')),
('Mekarwangi', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kidul')),
('Situsaeur', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Bojongloa Kidul'));

-- Buahbatu (id_kecamatan 12)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cijawura', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Buahbatu')),
('Jatisari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Buahbatu')),
('Margasari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Buahbatu')),
('Sekejati', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Buahbatu'));

-- Cibeunying Kaler (id_kecamatan 13)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cigadung', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kaler')),
('Cihaurgeulis', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kaler')),
('Neglasari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kaler')),
('Sukaluyu', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kaler'));

-- Cibeunying Kidul (id_kecamatan 14)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cicadas', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kidul')),
('Cikutra', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kidul')),
('Padasuka', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kidul')),
('Pasirlayung', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kidul')),
('Sukamaju', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kidul')),
('Sukapada', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibeunying Kidul'));

-- Cibiru (id_kecamatan 15)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cipadung', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibiru')),
('Cisurupan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibiru')),
('Palasari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibiru')),
('Pasirbiru', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cibiru'));

-- Cicendo (id_kecamatan 16)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Arjuna', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cicendo')),
('Husen Sastranegara', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cicendo')),
('Pajajaran', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cicendo')),
('Pamoyanan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cicendo')),
('Pasirkaliki', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cicendo')),
('Sukaraja', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cicendo'));

-- Cidadap (id_kecamatan 17)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Ciumbuleuit', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cidadap')),
('Hegarmanah', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cidadap')),
('Ledeng', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cidadap'));

-- Cinambo (id_kecamatan 18)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Babakan Penghulu', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cinambo')),
('Cisaranten Wetan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cinambo')),
('Pakemitan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cinambo')),
('Sukamulya', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Cinambo'));

-- Coblong (id_kecamatan 19)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cipaganti', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Coblong')),
('Dago', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Coblong')),
('Lebakgede', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Coblong')),
('Lebaksiliwangi', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Coblong')),
('Sadangserang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Coblong')),
('Sekeloa', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Coblong'));

-- Gedebage (id_kecamatan 20)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cimincrang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Gedebage')),
('Cisaranten Kidul', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Gedebage')),
('Rancabolang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Gedebage')),
('Rancanumpang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Gedebage'));

-- Kiaracondong (id_kecamatan 21)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Babakansari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Kiaracondong')),
('Babakansurabaya', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Kiaracondong')),
('Cicaheum', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Kiaracondong')),
('Kebonkangkung', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Kiaracondong')),
('Kebunjayanti', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Kiaracondong')),
('Sukapura', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Kiaracondong'));

-- Lengkong (id_kecamatan 22)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Burangrang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong')),
('Cijagra', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong')),
('Cikawao', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong')),
('Lingkar Selatan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong')),
('Malabar', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong')),
('Paledang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong')),
('Turangga', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Lengkong'));

-- Mandalajati (id_kecamatan 23)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Jatihandap', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Mandalajati')),
('Karangpamulang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Mandalajati')),
('Pasir Impun', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Mandalajati')),
('Sindangjaya', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Mandalajati'));

-- Panyileukan (id_kecamatan 24)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cipadung Kidul', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Panyileukan')),
('Cipadung Kulon', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Panyileukan')),
('Cipadung Wetan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Panyileukan')),
('Mekarmulya', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Panyileukan'));

-- Rancasari (id_kecamatan 25)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cisaranten', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Rancasari')),
('Kampung Baru', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Rancasari')),
('Rancanera', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Rancasari'));

-- Regol (id_kecamatan 26)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Kebon Kelapa', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Regol')),
('Kebon Pala', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Regol')),
('Neglasari', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Regol')),
('Sukamaju', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Regol'));

-- Sukajadi (id_kecamatan 27)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cijagra', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukajadi')),
('Husein Sastranegara', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukajadi')),
('Indihiang', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukajadi')),
('Ledeng', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukajadi')),
('Mekarwangi', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukajadi'));

-- Sumur Bandung (id_kecamatan 28)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cikawao', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sumur Bandung')),
('Cidadap', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sumur Bandung')),
('Kebon Kawung', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sumur Bandung')),
('Pahlawan', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sumur Bandung')),
('Pasirkaliki', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sumur Bandung')),
('Sukaraja', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sumur Bandung'));

-- Ujungberung (id_kecamatan 29)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Cicalengka', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Ujungberung')),
('Cicadas', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Ujungberung')),
('Cimekar', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Ujungberung')),
('Sukamulya', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Ujungberung')),
('Ujungberung', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Ujungberung')),
('Pasirjati', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Ujungberung'));

-- Sukasari (id_kecamatan 30)
INSERT INTO Kelurahan (nama_kelurahan, id_kecamatan) VALUES 
('Gegerkalong', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukasari')),
('Isola', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukasari')),
('Sarijadi', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukasari')),
('Sukarasa', (SELECT id_kecamatan FROM Kecamatan WHERE nama_kecamatan = 'Sukasari'));


-- Sesuaikan kode kecamatan dan kelurahan lainnya dengan cara yang sama


---------------------------------------------

