import * as transaksiRepo from "../../repository/transaksi.js";
import pool from "../../db/db.js"; // Mocked pool

jest.mock("../../db/db.js"); // Mock the pool.query method

describe("Transaksi Repository", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPendaftaranTuntas", () => {
    it("should return all pendaftaran tuntas for today", async () => {
      const mockResult = [
        { id_pendaftaran: 1, status: "tuntas", tanggal_daftar: new Date() },
      ];

      pool.query.mockResolvedValue({ rows: mockResult });

      const result = await transaksiRepo.getAllPendaftaranTuntas();

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE;"
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe("getPendaftaranTuntas", () => {
    it("should return specific pendaftaran tuntas by id_pendaftaran", async () => {
      const mockIdPendaftaran = 5;
      const mockResult = [
        { id_pendaftaran: 5, status: "tuntas", tanggal_daftar: new Date() },
      ];

      pool.query.mockResolvedValue({ rows: mockResult });

      const result = await transaksiRepo.getPendaftaranTuntas({ id_pendaftaran: mockIdPendaftaran });

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE AND id_pendaftaran = $1",
        [mockIdPendaftaran]
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe("getIdDokter", () => {
    it("should return the id_pegawai for a given id_pendaftaran", async () => {
      const mockIdPendaftaran = 5;
      const mockResult = { rows: [{ id_pegawai: 2 }] };



      // Spy on the method to see how it's being called
      const getIdDokterSpy = jest.spyOn(transaksiRepo, 'getIdDokter');
      
      pool.query.mockResolvedValue(mockResult);

      const result = await transaksiRepo.getIdDokter({ id_pendaftaran :mockIdPendaftaran});

      // Log the calls to the method to understand what's happening


      expect(getIdDokterSpy).toHaveBeenCalledWith({ id_pendaftaran :mockIdPendaftaran});

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT id_pegawai FROM Pendaftaran p JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal AND p.id_pendaftaran = $1",
        [mockIdPendaftaran]
      );

      expect(result).toEqual(2);

      // Restore the original method
      getIdDokterSpy.mockRestore();
    });
  });

  describe("getBiayaTotal", () => {
    it("should return the total cost for a given id_pegawai", async () => {
      const mockIdDokter = 2;  // Mocked id_pegawai
      const mockBiayaKunjungan = 10000;  // Mocked biaya_kunjungan
  
      // Mock pool.query to return the biaya_kunjungan
      pool.query.mockResolvedValue({
        rows: [{ biaya_kunjungan: mockBiayaKunjungan }]
      });
  
      // Call the function under test
      const result = await transaksiRepo.getBiayaTotal({
        id_pegawai: mockIdDokter
      });
  
      // Verify pool.query was called with the correct SQL query and parameter
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT p.biaya_kunjungan FROM JadwalPraktikDokter jpd JOIN Pegawai p ON jpd.id_pegawai = p.id_pegawai WHERE jpd.id_pegawai = $1",
        [mockIdDokter]
      );
  
      // Verify the result is the expected biaya_kunjungan
      expect(result).toEqual(mockBiayaKunjungan);
    });
  });
  

  describe("insertTransaksi", () => {
    it("should insert a transaction and return the inserted row", async () => {
      const mockIdPendaftaran = 5;
      const mockBiayaTotal = 10000;
      const mockMetode = "ovo";
      const mockResult = { 
        rows: [{ 
          id_transaksi: 3, 
          id_pendaftaran: mockIdPendaftaran, 
          metode: mockMetode, 
          biaya_total: mockBiayaTotal 
        }] 
      };

      pool.query.mockResolvedValue(mockResult);

      const result = await transaksiRepo.insertTransaksi({
        id_pendaftaran: mockIdPendaftaran,
        biaya_total: mockBiayaTotal,
        metode: mockMetode,
      });

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO Transaksi (metode, biaya_total, id_pendaftaran) VALUES ($1, $2, $3) ",
        [mockMetode, mockBiayaTotal, mockIdPendaftaran]
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe("getTransaksi", () => {
    it("should return a transaction for a given id_pendaftaran", async () => {
      const mockIdPendaftaran = 5;
      const mockResult = [
        { id_transaksi: 3, id_pendaftaran: 5, metode: "ovo", biaya_total: 10000 },
      ];

      pool.query.mockResolvedValue({ rows: mockResult });

      const result = await transaksiRepo.getTransaksi({ id_pendaftaran: mockIdPendaftaran });

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND p.tanggal_daftar = CURRENT_DATE",
        [mockIdPendaftaran]
      );
      expect(result).toEqual(mockResult[0]);
    });
  });
});