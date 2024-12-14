// tests/services/transaksiService.test.js

import * as transaksiService from "../../services/transaksi";
import * as transaksiRepo from "../../repository/transaksi";

// Mock repository methods
jest.mock("../../repository/transaksi.js");

describe("Transaksi Service", () => {
    it("should return all completed registrations", async () => {
        const mockList = [
            {
                id_pendaftaran: 5,
                status: "tuntas",
                antrian: null,
                tanggal_daftar: "2024-12-11",
                id_pasien: 2,
                id_jadwal: 3,
            },
        ];

        // Mock the repository method
        transaksiRepo.getAllPendaftaranTuntas.mockResolvedValue(mockList);

        const result = await transaksiService.getAllPendaftaranTuntas();

        expect(result).toEqual(mockList);
    });


    it("should insert a transaction with biaya_total and metode", async () => {
        const mockIdPendaftaran = 5;
        const mockMetode = "ovo";
        const mockBiayaTotal = 50000;
        const mockIdPegawai = 2;

        const mockInsertResult = {
          id_transaksi: 3,
          id_pendaftaran: 5,
          biaya_total: mockBiayaTotal,
          metode: "ovo",
        };
  
        // Mock repository methods
        transaksiRepo.getIdDokter.mockResolvedValue(mockIdPegawai);
        transaksiRepo.getBiayaTotal.mockResolvedValue(mockBiayaTotal);

        transaksiRepo.insertTransaksi.mockResolvedValue(mockInsertResult);
  
        // Call the service method
        const result = await transaksiService.insertTransaksi({
          id_pendaftaran: mockIdPendaftaran,
          biaya_total: mockBiayaTotal,
          metode: mockMetode,
        });
  
        // Assertions
        expect(transaksiRepo.getIdDokter).toHaveBeenCalledWith({ id_pendaftaran: mockIdPendaftaran });
    expect(transaksiRepo.getBiayaTotal).toHaveBeenCalledWith({ id_pegawai: mockIdPegawai });
    expect(transaksiRepo.insertTransaksi).toHaveBeenCalledWith({
      id_pendaftaran: mockIdPendaftaran,
      biaya_total: mockBiayaTotal,
      metode: mockMetode,
    });
  
        expect(result).toEqual(mockInsertResult);
      });
    


    it("should handle getting a specific transaksi", async () => {
        const mockTransaction = { id_transaksi: 3, status: "tuntas" };

        // Mock the repository method
        transaksiRepo.getTransaksi.mockResolvedValue(mockTransaction);

        const result = await transaksiService.getTransaksi({ id_pendaftaran: 5 });

        expect(result).toEqual(mockTransaction);
    });
});
