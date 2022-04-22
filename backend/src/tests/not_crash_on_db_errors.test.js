const request = require("supertest");
const app = require("../app");
const statusCodes = require("../statusCodes");


// prevent hitting the actual db
jest.mock("../db", () => ({
    query: jest.fn(() => {
        throw new Error("some random errors")
    })
}));

// disable checking if id actually exists for delete and update routes
jest.mock("../middleware/todoValidationMiddleware", () => ({
    checkIfTodoExists: jest.fn((req,res, next) => {next()})
}));

// disable auth
jest.mock("../middleware/authMiddleware", () => ({
    checkAuth: jest.fn((req,res, next) => {next()})
}));

afterAll(() => {
    jest.clearAllMocks();
})


describe("todo get route", () => {
    test("it should handle error thrown from db", async () => {
        const response = await request(app).get("/todo");
        expect(response.statusCode).toBe(statusCodes.SERVER_ERROR);
    })
})

describe("todo post route", () => {
    test("it should handle error thrown from db", async () => {
        const response = await request(app).post("/todo").send({
            description: "hallo",
            user_id: "jsdsd"
        });
        expect(response.statusCode).toBe(statusCodes.SERVER_ERROR);
    })
})

describe("todo delete route", () => {
    test("it should handle error thrown from db", async () => {
        const response = await request(app).delete("/todo/eesrs");
        expect(response.statusCode).toBe(statusCodes.SERVER_ERROR);
    })
})

describe("todo put route", () => {
    test("it should handle error thrown from db", async () => {
        const response = await request(app).put("/todo/eesrs").send({description: "something"});
        expect(response.statusCode).toBe(statusCodes.SERVER_ERROR);
    })
})