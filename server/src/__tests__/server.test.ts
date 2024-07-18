// import request from "supertest";
import server, { connection } from "../server";
import db from "../config/db";

// describe("GET /api", () => {
//   it("should send bacl a json response", async () => {
//     const res = await request(server).get("/api");

//     expect(res.status).toBe(200);
//     expect(res.header["content-type"]).toMatch(/json/);
//     expect(res.body.msg).toBe("Desde api");

//     expect(res.status).not.toBe(404);
//     expect(res.body.msg).not.toBe("desde api");
//   });
// });

// simulacion de error
jest.mock("../config/db");

describe("connection DB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("No se ha podido conectar con la base de datos")
      );

    const consoleSpy = jest.spyOn(console, "log");

    await connection();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("No se ha podido conectar con la base de datos")
    );
  });
});
