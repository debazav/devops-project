const request = require("supertest");
const app = require("../src/app");

describe("API Tests", () => {
  it("should return a 200 status and the correct message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello, DevOps!" });
  });

  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown");
    expect(response.status).toBe(404);
  });
});
