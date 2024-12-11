// tests/services/transaksiService.test.js

import * as transaksiService from "../../services/transaksi";
import * as transaksiRepo from "../../repository/transaksi";

// Mock repository methods
jest.mock("../../repository/transaksi");

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

    it("should handle checking today's transaksi and generate a new one if necessary", async () => {
        const mockTransaction = { id_transaksi: 3, status: "tuntas" };
        const mockExists = { rows: [null] };  // Simulate no existing transaction

        // Mock the repository methods
        transaksiRepo.checkTodayTransaksi.mockResolvedValue(mockExists);
        transaksiRepo.generateTransaksi.mockResolvedValue(mockTransaction);

        const result = await transaksiService.checkTodayTransaksi({ id_pendaftaran: 5 });

        expect(result).toEqual(mockTransaction);
    });

    it("should update active transaksi", async () => {
        const mockTransaction = { id_transaksi: 3, status: "tuntas" };
        const mockUpdateResult = { id_transaksi: 3, status: "tuntas", metode: "ovo " };

        // Mock the repository methods
        transaksiRepo.getTransaksi.mockResolvedValue(mockTransaction);
        transaksiRepo.updateActiveTransaksi.mockResolvedValue(mockUpdateResult);

        const result = await transaksiService.updateActiveTransaksi({
            id_pendaftaran: 5,
            metode: "ovo ",
        });

        expect(result).toEqual(mockUpdateResult);
    });

    it("should handle getting a specific transaksi", async () => {
        const mockTransaction = { id_transaksi: 3, status: "tuntas" };

        // Mock the repository method
        transaksiRepo.getTransaksi.mockResolvedValue(mockTransaction);

        const result = await transaksiService.getTransaksi({ id_pendaftaran: 5 });

        expect(result).toEqual(mockTransaction);
    });
});
