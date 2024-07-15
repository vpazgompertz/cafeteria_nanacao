const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  describe("GET /cafes", () => {
    it("Obteniendo un status 200 y un producto", async () => {
      const response = await request(server).get("/cafes").send();
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toBeInstanceOf(Object);
    });
  });

  describe("DELETE /cafes/:id", () => {
    it("obteniendo un status 404 al eliminar un café con id inexistente", async () => {
      const response = await request(server).delete("/cafes/100").set("Authorization", "token");
      expect(response.status).toBe(404);
    });
  });

  describe("POST /cafes", () => {
    it("devuelve un status 201 al agregar un nuevo café", async () => {
      const newCafe = {
        id: Math.floor(Math.random() * 999),
        nombre: "Latte"
      };
      const response = await request(server).post("/cafes").send(newCafe);
      expect(response.status).toBe(201);
      expect(response.body).toContainEqual(newCafe);
    });
  });

  describe("PUT /cafes/:id", () => {
    it("devuelve un status 400 al intentar actualizar un café enviando un id diferente", async () => {
      const cafeUpdate = {
        id: 1,
        nombre: "Latte"
      };
      const response = await request(server).put("/cafes/2").send(cafeUpdate);
      expect(response.status).toBe(400);
    });
  });
});
