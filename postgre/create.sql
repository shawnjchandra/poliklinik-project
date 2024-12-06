DROP TABLE IF EXISTS Kelurahan, Pasien, RekamMedis, DokumenRekamMedis, Pegawai, Pendaftaran,JadwalPraktikDokter,Transaksi, PendaftaranToJadwal;

DROP TABLE IF EXISTS Pegawai, Pendaftaran, JadwalPraktikDokter;
DROP TABLE IF EXISTS Pasien, RekamMedis, DokumenRekamMedis;
DROP TABLE IF EXISTS Kecamatan, Kelurahan, Spesialisasi, Ruang;
DROP TABLE IF EXISTS Transaksi, PendaftaranToJadwal;

DROP TYPE IF EXISTS GENDER, GOL_DARAH,ROLE_P, STATUS_DAFTAR,HARI,METODE;

CREATE TABLE  Kecamatan(
    id_kecamatan INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nama_kecamatan VARCHAR(200) NOT NULL
);

CREATE TABLE Kelurahan(
    id_kelurahan INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nama_kelurahan VARCHAR(200) NOT NULL,
    id_kecamatan INT REFERENCES Kecamatan(id_kecamatan) NOT NULL,
	UNIQUE(id_kecamatan, nama_kelurahan)
);

CREATE TABLE Spesialisasi(
    id_spesialisasi INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nama_spesialisasi VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE Ruang(
    id_ruang INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    no_ruang VARCHAR(255) UNIQUE NOT NULL
);

-- P = Perempuan, L = Laki
CREATE TYPE GENDER AS ENUM ('perempuan','laki');

-- A = BOOLEAN, D = Disabled
-- CREATE TYPE BOOLEAN AS ENUM ('A','D');

-- golongan darah
CREATE TYPE GOL_DARAH AS ENUM ('a','b','ab','o');

CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- PASIEN
CREATE TABLE Pasien(
    id_pasien INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nama VARCHAR(255) NOT NULL,
    no_telp CHAR(12) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    no_rkm_medis UUID DEFAULT gen_random_uuid() NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    jenis_kelamin GENDER NOT NULL,
    tanggal_lahir DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    id_kelurahan INT REFERENCES Kelurahan(id_kelurahan) 
);

CREATE TABLE RekamMedis(
    id_rkm_med INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    resep_obat VARCHAR(255),
    prognosis_tindakan_lanjut VARCHAR(255),
    diag_penunjang VARCHAR(255),
    pemeriksaan_fisik VARCHAR(255),
    pemeriksaan_penunjang VARCHAR(255),
    riwayat_penyakit VARCHAR(255),
    keluhan VARCHAR(255),
    tinggi_badan REAL,
    berat_badan REAL,
    golongan_darah GOL_DARAH,
    diastolik INT,
    sistolik INT,
    denyut_nadi INT,
    id_pasien INT REFERENCES Pasien(id_pasien)
);


CREATE TABLE DokumenRekamMedis (
    id_dkm INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    uploaded_at DATE NOT NULL,
    path_file VARCHAR(255),
    id_rkm_med INT REFERENCES RekamMedis(id_rkm_med)
);

-- PEGAWAI

-- role tambahan
CREATE TYPE ROLE_P AS ENUM ('dokter', 'sis-admin','pet-admin','perawat');

CREATE TABLE Pegawai(
    id_pegawai INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nama VARCHAR(255) NOT NULL,
    no_telp CHAR(12) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    NIP CHAR(18) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    id_kelurahan INT REFERENCES Kelurahan(id_kelurahan) NOT NULL,
    role ROLE_P NOT NULL,
    biaya_kunjungan INT,
    id_spesialisasi INT REFERENCES Spesialisasi(id_spesialisasi) NULL
);


--
CREATE TYPE STATUS_DAFTAR AS ENUM ('pendaftaran','pemanggilan','dokter', 'pemeriksaan','tuntas');


-- TODO :
-- Antrian reset by day (daily)
-- Ide kepepet : count (di hari itu) + 1 (kalo trigger ga jalan) 
CREATE TABLE Pendaftaran (
    id_pendaftaran INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    status STATUS_DAFTAR NOT NULL,
    antrian INT NOT NULL ,
    tanggal_daftar DATE NOT NULL,
    id_pasien INT REFERENCES Pasien(id_pasien) NOT NULL
); 

CREATE TYPE HARI AS ENUM ('senin','selasa','rabu','kamis','jumat','sabtu','minggu');

-- TODO :
-- Constraint check untuk dokter 
CREATE TABLE JadwalPraktikDokter (
    id_jadwal INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    hari HARI NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL ,
    kuota INT NOT NULL,
    id_pegawai INT REFERENCES Pegawai(id_pegawai) NOT NULL,
    id_ruang INT REFERENCES Ruang(id_ruang) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TYPE METODE AS ENUM ('ovo','gopay','bca', 'tunai');

CREATE TABLE Transaksi(
    id_transaksi INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    metode METODE NOT NULL,
    biaya_total INT NOT NULL,
    id_pendaftaran INT REFERENCES Pendaftaran(id_pendaftaran) NOT NULL 
);

CREATE TABLE PendaftaranToJadwal(
    id_pendaftaran INT REFERENCES Pendaftaran(id_pendaftaran),
    id_jadwal INT REFERENCES JadwalPraktikDokter(id_jadwal),
    PRIMARY KEY(id_pendaftaran, id_jadwal)
);
