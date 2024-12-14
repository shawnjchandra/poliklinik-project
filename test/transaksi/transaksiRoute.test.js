// test/transaksiRoutes.test.js
import request from 'supertest';
import express from "express";
import transaksiRouter from "../../routes/transaksi.js";
import * as transaksiService from "../../services/transaksi.js";

jest.mock("../../services/transaksi.js");

const app = express();
app.use(express.json());
app.use("/api/transaksi", transaksiRouter);  

describe("Transaksi Routes", () => {
  describe("GET /api/transaksi", () => {
    it("should return all completed registrations", async () => {
      const mockList = {};


      // Mocking the service call
      transaksiService.getAllPendaftaranTuntas.mockResolvedValue(mockList);

      const response = await request(app).get("/api/transaksi/");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.list).toEqual(mockList);
    });
  });

  // describe("POST /api/transaksi/:id_pendaftaran", () => {
  //   it("should check if a transaction is completed today", async () => {
  //     const mockResult = { success: true };

  //     // Mocking the service call
  //     transaksiService.checkTodayTransaksi.mockResolvedValue(mockResult);

  //     const response = await request(app)
  //       .post("/api/transaksi/5")
  //       .send({});

  //     expect(response.status).toBe(200);
  //     expect(response.body.success).toBe(true);
  //     expect(transaksiService.checkTodayTransaksi).toHaveBeenCalledWith({
  //       id_pendaftaran: "5",
  //     });
  //   });
  // });

  describe("POST /api/transaksi/bayar/:id_pendaftaran/", ()=>{
    it("should check if a transaction is completed with certain payment",async ()=>{
      const mockResult = { success: true };

      transaksiService.insertTransaksi.mockResolvedValue(mockResult);

      const response = await request(app).post("/api/transaksi/bayar/5/").send({ metode : "ovo"});

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(transaksiService.insertTransaksi).toHaveBeenCalledWith({
         id_pendaftaran : "5",
        metode: "ovo"
       });
    });
  });

  describe("GET /api/transaksi/:id_pendaftaran", () => {
    it("should return a specific transaction", async () => {
      const mockTransaction = {
        id_pendaftaran: 5,
        metode: "ovo",
        biaya_total: 10000,
        status: "tuntas",
        antrian: 10,
        tanggal_daftar: "2024-12-11",
        id_pasien: 2,
        id_jadwal: 3,
      };

      // Mocking the service call
      transaksiService.getTransaksi.mockResolvedValue(mockTransaction);

      const response = await request(app).get("/api/transaksi/5");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toEqual(mockTransaction);
    });
  });

  // describe("POST /api/transaksi/:id_pendaftaran/confirm", () => {
  //   it("should update an active transaction and return success", async () => {
  //     const mockUpdateResult = { success: true };

  //     // Mocking the service call
  //     transaksiService.updateActiveTransaksi.mockResolvedValue(mockUpdateResult);

  //     const response = await request(app)
  //       .post("/api/transaksi/5/confirm")
  //       .send({ metode: "ovo" });

  //     expect(response.status).toBe(200);
  //     expect(response.body.success).toBe(true);
  //     expect(transaksiService.updateActiveTransaksi).toHaveBeenCalledWith({
  //       id_pendaftaran: "5",
  //       metode: "ovo",
  //     });
  //   });
  // });
});
