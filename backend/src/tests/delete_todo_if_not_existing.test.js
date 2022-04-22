// THings we can test without hitting the database

// Does the api send us correct status codes back if the query actually succeds?
// - post request should always send back the created item and 201 status code for example

// Does the input check work correctly?
// - if I don't put description in my request for creating a todo, will i get a 404 back?

// Check auth at specific routes
// - Do we get a 401 error

const request = require("supertest");
const app = require("../app");
const statusCodes = require("../statusCodes");


// prevent hitting the actual db
jest.mock("../db", () => ({
    query: jest.fn(() => ({rows: []}))
}));

//disable auth
jest.mock("../middleware/authMiddleware", () => ({
    checkAuth: jest.fn((req,res, next) => {next()})
}));

afterAll(() => {
    jest.clearAllMocks();
})


describe("todo delete route", () => {
    test("it should return 400 error if id does not exist", async () => {
        const response = await request(app).delete("/todo/eresjf-234fes-234fgs");
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST);
    })
})