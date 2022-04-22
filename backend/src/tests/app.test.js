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

const mockResponseRows = [1,2,3];

// prevent hitting the actual db, every query returns some mock rows
jest.mock("../db", () => ({
    query: jest.fn(() => ({rows: mockResponseRows}))
}));

//disable auth
jest.mock("../middleware/authMiddleware", () => ({
    checkAuth: jest.fn((req,res, next) => {next()})
}));

afterAll(() => {
    jest.clearAllMocks();
})

const objectsHaveSameStringRepresentation = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const responseHasBody = (response) => {
    return response.body && !objectsHaveSameStringRepresentation(response.body, {});
};


describe("todo post route", () => {
    test("it should return 400 error if user_id is missing", async () => {
        const response = await request(app).post("/todo").send({user_id: "12hjwrw-3434kskfe-234"});
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST);
    });

    test("it should return 400 error if description is missing", async () => {
        const response = await request(app).post("/todo").send({description: "do more work"});
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST);
    });

    test("it should return 201 if everything is good to go", async () => {
        const response = await request(app).post("/todo").send({
            description: "do more work",
            user_id: "1232131-3fssdf4-23sfser1"
        });
        expect(response.statusCode).toBe(statusCodes.CREATED);
    });
    test("it should return something on success", async () => {
        const response = await request(app).post("/todo").send({
            description: "do more work",
            user_id: "1232131-3fssdf4-23sfser1"
        });
        expect(responseHasBody(response)).toBeTruthy();
    });
});

describe("todo delete route", () => {
    test("it should return 404 error if route param for id is missing", async () => {
        const response = await request(app).delete("/todo");
        expect(response.statusCode).toBe(statusCodes.NOT_FOUND);
    });

    test("it should return 204 if delete successful", async () => {
        const response = await request(app).delete("/todo/eresjf-234fes-234fgs");
        expect(response.statusCode).toBe(statusCodes.SUCCESSFUL_DELETE);
    });

    test("it should return nothing on success", async () => {
        const response = await request(app).delete("/todo/eresjf-234fes-234fgs");
        expect(responseHasBody(response)).toBeFalsy();
    })
});

describe("todo get route", () => {
    test("It should return 200 on get", async () => {
        const response = await request(app).get("/todo");
        console.log(response.body);

        // returns all the rows
        expect(JSON.stringify(response.body)).toBe(JSON.stringify(mockResponseRows));
        expect(response.statusCode).toBe(statusCodes.OK);
    });
})

describe("todo update route", () => {
    test("it should return 404 error if route param for id is missing", async () => {
        const response = await request(app).put("/todo");
        expect(response.statusCode).toBe(statusCodes.NOT_FOUND);
    });
    test("it should return 400 error if description is missing", async () => {
        const response = await request(app).put("/todo/123-4232-swews");
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST);
    });
    test("it should return 200 if everything is correct", async () => {
        const response = await request(app).put("/todo/123-4232-swews").send({description: "new todo"});
        expect(response.statusCode).toBe(statusCodes.OK);
    });
    test("it returns the updated element after success", async () => {
        const response = await request(app).put("/todo/123-4232-swews").send({description: "new todo"});
        expect(responseHasBody(response)).toBeTruthy();
    });
})