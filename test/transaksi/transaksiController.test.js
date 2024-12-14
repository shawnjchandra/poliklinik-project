import * as transaksiService from "../../services/transaksi.js";
import * as transaksiController from "../../controllers/transaksi.js";

jest.mock("../../services/transaksi.js");

describe("Transaksi Controller", ()=>{
    let req, res;

    beforeEach(()=>{
        req = { params: {}, body : {} };
        res = {
            json: jest.fn(),
        };
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    describe("getAllPendaftaranTuntas", () => {
        it("should return all completed registrations", async () => {
            const mockList = [
                {
                    id_pendaftaran: 5,
                    status: "getPendaftaranTuntas",
                    antrian: 10,
                    tanggal_daftar: "10-12-2024",
                    id_pasien: 2,
                    id_jadwal: 3,
                },
            ];

            transaksiService.getAllPendaftaranTuntas.mockReturnValue(mockList);

            await transaksiController.getAllPendaftaranTuntas(req, res);

            expect(transaksiService.getAllPendaftaranTuntas).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ success: true, list: mockList });
        });
    });

    // describe("checkTodayTransaksi", () => {
    //     it("should call checkTodayTransaksi with params and return success", async () => {
    //       req.params = { id_pendaftaran: 5 };
    
    //       await transaksiController.checkTodayTransaksi(req, res);
    
    //       expect(transaksiService.checkTodayTransaksi).toHaveBeenCalledWith(req.params);
    //       expect(res.json).toHaveBeenCalledWith({ success: true });
    //     });
    //   });
    
      
      // describe("updateActiveTransaksi", () => {
      //   it("should update active transaction and return success", async () => {
      //     req.params = { id_pendaftaran: 5 };
      //     req.body = { metode: "ovo" };
    
      //     await transaksiController.updateActiveTransaksi(req, res);
    
      //     expect(transaksiService.updateActiveTransaksi).toHaveBeenCalledWith({
      //       id_pendaftaran: 5,
      //       metode: "ovo",
      //     });
      //     expect(res.json).toHaveBeenCalledWith({ success: true });
      //   });
      // });
    
      describe("insertTransaksi",()=>{
        it("insert new transaksi with metode", async ()=>{
          req.params = { id_pendaftaran : 5};
          req.body = { metode: "ovo" };

          await transaksiController.insertTransaksi(req,res);

          expect(transaksiService.insertTransaksi).toHaveBeenCalledWith({
            id_pendaftaran : 5,
            metode: "ovo"});
          expect(res.json).toHaveBeenCalledWith({ success : true});
          });
      });
      
      describe("getTransaksi", () => {
        it("should return a specific transaction", async () => {
          req.params = { id_pendaftaran: 5 };
          const mockResult = { id_pendaftaran: 5,
            metode: "ovo",
            biaya_total: 10000,
            id_pendaftaran: 5,
            id_pendaftaran: 5,
            status: "tuntas",
            antrian: 10,
            tanggal_daftar: "2024-12-11",
            id_pasien: 2,
            id_jadwal: 3
        };
          transaksiService.getTransaksi.mockResolvedValue(mockResult);
    
          await transaksiController.getTransaksi(req, res);
    
          expect(transaksiService.getTransaksi).toHaveBeenCalledWith(req.params);
          expect(res.json).toHaveBeenCalledWith({ success: true, result: mockResult });
        });
      });
    
});