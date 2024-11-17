DROP TABLE IF EXISTS Kecamatan,
                     Kelurahan,
                     Spesialisasi,
                     Ruang;


DROP TABLE IF EXISTS Pasien,
                     RekamMedis,
                     DokumenRekamMedis;


DROP TABLE IF EXISTS Pegawai,
                     Pendaftaran,
                     JadwalPraktikDokter;


DROP TABLE IF EXISTS Transaksi,
                     PendaftaranToJadwal;


DROP TYPE IF EXISTS GENDER,
                    ACTIVE,
                    GOL_DARAH,
                    ROLE_P,
                    STATUS_DAFTAR,
                    HARI,
                    METODE;


CREATE TABLE Kecamatan( id_kecamatan SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                    nama_kecamatan VARCHAR(20));


CREATE TABLE Kelurahan( id_kelurahan SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                    nama_kelurahan VARCHAR(20),
                                                                                   id_kecamatan SMALLINT REFERENCES Kecamatan(id_kecamatan));


CREATE TABLE Spesialisasi( id_spesialisasi SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                          nama_spesialisasi VARCHAR(20));


CREATE TABLE Ruang( id_ruang SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                            no_ruang SMALLINT UNIQUE NOT NULL);

-- P = Perempuan, L = Laki

CREATE TYPE GENDER AS ENUM ('P','L');

-- A = Active, D = Disabled

CREATE TYPE ACTIVE AS ENUM ('A','D');

-- golongan darah

CREATE TYPE GOL_DARAH AS ENUM ('A','B','AB','O');

-- PASIEN

CREATE TABLE Pasien( id_pasien SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                              nama VARCHAR(20) NOT NULL,
                                                                               no_telp CHAR(12) NOT NULL,
                                                                                                email VARCHAR(20) NOT NULL UNIQUE,
                                                                                                                           pass VARCHAR(20) NOT NULL,
                                                                                                                                            no_rkm_medis CHAR(6) NOT NULL UNIQUE,
                                                                                                                                                                          created_at DATE NOT NULL,
                                                                                                                                                                                          jenis_kelamin GENDER NOT NULL,
                                                                                                                                                                                                               tanggal_lahir DATE NOT NULL,
                                                                                                                                                                                                                                  is_active ACTIVE NOT NULL,
                                                                                                                                                                                                                                                   id_kelurahan SMALLINT REFERENCES Kelurahan(id_kelurahan));


CREATE TABLE RekamMedis( id_rkm_med SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                   resep_obat VARCHAR(30)[] NOT NULL,
                                                                                            prognosis_tindakan_lanjut VARCHAR(30)[] NOT NULL,
                                                                                                                                    diag_penunjang VARCHAR(30)[] NOT NULL,
                                                                                                                                                                 pemeriksaan_fisik VARCHAR(30)[] NOT NULL,
                                                                                                                                                                                                 pemeriksaan_penunjang VARCHAR(30)[] NOT NULL,
                                                                                                                                                                                                                                     riwayat_penyakit VARCHAR(30)[] NOT NULL,
                                                                                                                                                                                                                                                                    keluhan VARCHAR(30)[] NOT NULL,
                                                                                                                                                                                                                                                                                          tinggi_badan SMALLINT NOT NULL,
                                                                                                                                                                                                                                                                                                                berat_badan SMALLINT NOT NULL,
                                                                                                                                                                                                                                                                                                                                     golongan_darah GOL_DARAH NOT NULL,
                                                                                                                                                                                                                                                                                                                                                              diastolik SMALLINT NOT NULL,
                                                                                                                                                                                                                                                                                                                                                                                 sistolik SMALLINT NOT NULL,
                                                                                                                                                                                                                                                                                                                                                                                                   id_pasien SMALLINT REFERENCES Pasien(id_pasien));


CREATE TABLE DokumenRekamMedis ( id_dkm SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                       uploaded_at DATE NOT NULL,
                                                                                        path_file VARCHAR(30),
                                                                                                  id_rkm_med SMALLINT REFERENCES RekamMedis(id_rkm_med));

-- PEGAWAI
 -- role tambahan

CREATE TYPE ROLE_P AS ENUM ('Dokter', 'SisAdmin','PetAdmin','Perawat');


CREATE TABLE Pegawai( id_pegawai SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                nama VARCHAR(20) NOT NULL,
                                                                                 no_telp CHAR(12) NOT NULL,
                                                                                                  email VARCHAR(20) NOT NULL UNIQUE,
                                                                                                                             pass VARCHAR(20) NOT NULL,
                                                                                                                                              NIP CHAR(18) NOT NULL UNIQUE,
                                                                                                                                                                    created_at DATE NOT NULL,
                                                                                                                                                                                    is_active ACTIVE NOT NULL,
                                                                                                                                                                                                     id_kelurahan SMALLINT REFERENCES Kelurahan(id_kelurahan),
                                                                                                                                                                                                                                      role ROLE_P NOT NULL,
                                                                                                                                                                                                                                                  biaya_kunjungan INT NULL,
                                                                                                                                                                                                                                                                      id_spesialisasi SMALLINT REFERENCES Spesialisasi(id_spesialisasi) NULL);

--
CREATED TYPE STATUS_DAFTAR AS ENUM ('Pendaftaran',
                                    'Pemanggilan',
                                    'Dokter',
                                    'Pemeriksaan',
                                    'Tuntas')
CREATE TABLE Pendaftaran ( id_pendaftaran SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                         status STATUS_DAFTAR NOT NULL,
                                                                                              antrian INT NOT NULL,
                                                                                                          tanggal DATE NOT NULL,
                                                                                                                       id_pasien SMALLINT REFERENCES Pasien(id_pasien) NOT NULL);

CREATE TYPE HARI AS ENUM ('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu');


CREATE TABLE JadwalPraktikDokter ( id_jadwal SMALL INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                             hari HARI NOT NULL,
                                                                                       jam TIME NOT NULL,
                                                                                                kuota SMALLINT NOT NULL,
                                                                                                               id_pegawai SMALLINT REFERENCES Pegawai(id_pegawai)NOT NULL,
                                                                                                                                                                 id_ruang SMALLINT REFERENCES Ruang(id_ruang));


CREATE TYPE METODE AS ENUM ('OVO',
                            'GOPAY',
                            'BCA')
CREATE TABLE Transaksi( id_transaksi SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                                                    metode METODE NULL,
                                                                                  biaya_total INT NULL,
                                                                                                  id_pendaftaran SMALLINT REFERENCES Pendaftaran(id_pendaftaran));


CREATE TABLE PendaftaranToJadwal( id_pendaftaran SMALLINT REFERENCES Pendaftaran(id_pendaftaran) NOT NULL,
                                                                                                 id_jadwal SMALLINT REFERENCES JadwalPraktikDokter(id_jadwal) NOT NULL);

