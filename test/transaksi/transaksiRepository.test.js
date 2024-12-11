import * as transaksiRepo from "../../repository/transaksi.js";
import pool from "../../db/db.js";

// Mock the database queries
jest.mock('../../db/db.js');

describe('Transaksi Repository Tests', () => {

  // Mock data for testing
  const mockPendaftaranId = 5;
  const mockTransaksiId = 3;
  const mockTransaksi = {
    id_transaksi: mockTransaksiId,
    metode: 'ovo',
    biaya_total: 10000,
    id_pendaftaran: mockPendaftaranId
  };

  const mockBiayaTotal = 10000;
  const mockIdDokter = 2;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllPendaftaranTuntas should return all "tuntas" Pendaftaran for today', async () => {
    const mockQueryResult = { id_pendaftaran: mockPendaftaranId, status: 'tuntas', tanggal_daftar: new Date() };
    
    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.getAllPendaftaranTuntas();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE");
    expect(result).toEqual(mockQueryResult.rows);
  });

  test('getPendaftaranTuntas should return a specific "tuntas" Pendaftaran by id', async () => {
    const mockQueryResult = {
   id_pendaftaran: mockPendaftaranId, status: 'tuntas', tanggal_daftar: new Date() };

    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.getPendaftaranTuntas({ id_pendaftaran: mockPendaftaranId });

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM Pendaftaran WHERE status = 'tuntas' AND tanggal_daftar = CURRENT_DATE AND id_pendaftaran = $1", 
      [mockPendaftaranId]
    );
    expect(result).toEqual(mockQueryResult.rows);
  });

  test('generateTransaksi should create a new transaction', async () => {
    const mockQueryResult = {  id_transaksi: mockTransaksiId };

    // Mock the helper methods
    transaksiRepo.getBiayaTotal = jest.fn().mockResolvedValue(mockBiayaTotal);
    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.generateTransaksi({ id_pendaftaran: mockPendaftaranId });

    expect(transaksiRepo.getBiayaTotal).toHaveBeenCalledWith(mockPendaftaranId);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO Transaksi (metode, biaya_total, id_pendaftaran) VALUES ($1, $2, $3)", 
      ['tunai', mockBiayaTotal, mockPendaftaranId]
    );
    expect(result).toEqual(mockQueryResult.rows[0]);
  });

  test('updateActiveTransaksi should update the transaction method', async () => {
    const mockQueryResult = { id_transaksi: mockTransaksiId };

    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.updateActiveTransaksi({ id_transaksi: mockTransaksiId, metode: 'transfer' });

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE Transaksi SET metode = $1 WHERE id_transaksi = $2", 
      ['transfer', mockTransaksiId]
    );
    expect(result).toEqual(mockQueryResult);
  });

  test('checkTodayTransaksi should return transaction for today', async () => {
    const mockQueryResult = {
     id_transaksi: mockTransaksiId, id_pendaftaran: mockPendaftaranId, metode: 'tunai', biaya_total: 50000
    };

    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.checkTodayTransaksi({ id_pendaftaran: mockPendaftaranId });

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND P.tanggal_daftar = CURRENT_DATE", 
      [mockPendaftaranId]
    );
    expect(result.rows).toEqual(mockQueryResult.rows);
  });

  test('getTransaksi should return transaction for specific Pendaftaran', async () => {
    const mockQueryResult = {
     id_transaksi: mockTransaksiId, id_pendaftaran: mockPendaftaranId, metode: 'tunai', biaya_total: 10000
    };

    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.getTransaksi({ id_pendaftaran: mockPendaftaranId });

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM Transaksi tr JOIN Pendaftaran p ON tr.id_pendaftaran = p.id_pendaftaran WHERE tr.id_pendaftaran = $1 AND p.tanggal_daftar = CURRENT_DATE", 
      [mockPendaftaranId]
    );
    expect(result).toEqual(mockQueryResult.rows[0].id_transaksi);
  });

  test('getBiayaTotal should return the total biaya for Pendaftaran', async () => {
    // Mocking helper method
    transaksiRepo.getIdDokter = jest.fn().mockResolvedValue(mockIdDokter);

    const mockQueryResult = {
        biaya_kunjungan: mockBiayaTotal
    };

    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.getBiayaTotal(mockPendaftaranId);

    expect(transaksiRepo.getIdDokter).toHaveBeenCalledWith(mockPendaftaranId);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT p.biaya_kunjungan FROM JadwalPraktikDokter jpd JOIN Pegawai p ON jpd.id_pegawai = p.id_pegawai WHERE jpd.id_pegawai = $1", 
      [mockIdDokter]
    );
    expect(result).toBe(mockBiayaTotal);
  });

  test('getIdDokter should return the doctor ID for Pendaftaran', async () => {
    const mockQueryResult = {
    id_pegawai: mockIdDokter 
    };

    pool.query.mockResolvedValue(mockQueryResult);

    const result = await transaksiRepo.getIdDokter(mockPendaftaranId);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT id_pegawai FROM Pendaftaran p JOIN JadwalPraktikDokter jpd ON p.id_jadwal = jpd.id_jadwal WHERE p.id_pendaftaran = $1", 
      [mockPendaftaranId]
    );
    expect(result).toBe(mockIdDokter);
  });
});
