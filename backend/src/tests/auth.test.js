const request = require("supertest");
const app = require("../app");
const statusCodes = require("../statusCodes");


// prevent hitting the actual db
jest.mock("../db", () => ({
    query: jest.fn(() => {
        throw new Error("some random errors")
    })
}));

afterAll(() => {
    jest.clearAllMocks();
})


describe("todo route", () => {
    test("get is protected and not public", async () => {
        const response = await request(app).get("/todo");
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
    });
    test("post is protected and not public", async () => {
        const response = await request(app).post("/todo");
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
    });
    test("delete is protected and not public", async () => {
        const response = await request(app).delete("/todo/huh");
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
    });
    test("put is protected and not public", async () => {
        const response = await request(app).delete("/todo/jiij");
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
    });
})

const validButExpiredToken = "eyJraWQiOiJnZHNRUzFDXC85SGxCTnFxQlNCVjhhSTRkNVY3WndKTk1pQnZ0XC9lY2h3cVU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmQwZWQwNi02Mjc5LTRiMzUtYWFmNC1hNWEwMTk1YzcwNzQiLCJldmVudF9pZCI6ImE1MzQ1ODhhLWI2ZTAtNDMyOC1hNTdkLTI5MGEwNmJmZWY5OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NDkzNDE3ODcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3JZSlhaZmlmeSIsImV4cCI6MTY0OTM0NTM4NywiaWF0IjoxNjQ5MzQxNzg3LCJ2ZXJzaW9uIjoyLCJqdGkiOiJjYTA5YjI5NC01NTdkLTQwNjQtYTE4ZC0wY2IwMTQ5MDM1YzkiLCJjbGllbnRfaWQiOiI3NDBqcTE5OXJqcG1iYzI5dTdlcXEwdm0waSIsInVzZXJuYW1lIjoiMzJkMGVkMDYtNjI3OS00YjM1LWFhZjQtYTVhMDE5NWM3MDc0In0.tZutddzFYYFdaqK3aF-FLgxhqKQwdf-zhT3EFyGY43_ty7xpcVukTooqiLId7XeOuRymuvhY_6ddFwdb5xJBF8iwE3H0B03uif0wTw7QAsExNId_EjJ80_PO0LBPDRXT38eIhZ_o8l2Gsw-yVOTuCbJce-aiBn97QP7ApFKck-UTlgh7lJi0JLCE0e2Z6aSt34ULWvHHBsNbOP-w0rncsd6cRxm5jyi0vwkkdoANajRxevjngAMdrj7F9gsoAZl2qacWUcaMR_sBwchEoDNqzwTt658skRKYLwwk4GmqXMCtNXEDgYdmUm2Pa6cVlzQcL_-1TRw2yjHTyTiQXjr6zw";
const invalidToken = "eyJraWWiOiJnZHNRUzFDXC85SGxCTnFxQlNCVjhhSTRkNVY3WndKTk1pQnZ0XC9lY2h3cVU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmQwZWQwNi02Mjc5LTRiMzUtYWFmNC1hNWEwMTk1YzcwNzQiLCJldmVudF9pZCI6ImE1MzQ1ODhhLWI2ZTAtNDMyOC1hNTdkLTI5MGEwNmJmZWY5OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NDkzNDE3ODcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3JZSlhaZmlmeSIsImV4cCI6MTY0OTM0NTM4NywiaWF0IjoxNjQ5MzQxNzg3LCJ2ZXJzaW9uIjoyLCJqdGkiOiJjYTA5YjI5NC01NTdkLTQwNjQtYTE4ZC0wY2IwMTQ5MDM1YzkiLCJjbGllbnRfaWQiOiI3NDBqcTE5OXJqcG1iYzI5dTdlcXEwdm0waSIsInVzZXJuYW1lIjoiMzJkMGVkMDYtNjI3OS00YjM1LWFhZjQtYTVhMDE5NWM3MDc0In0.tZutddzFYYFdaqK3aF-FLgxhqKQwdf-zhT3EFyGY43_ty7xpcVukTooqiLId7XeOuRymuvhY_6ddFwdb5xJBF8iwE3H0B03uif0wTw7QAsExNId_EjJ80_PO0LBPDRXT38eIhZ_o8l2Gsw-yVOTuCbJce-aiBn97QP7ApFKck-UTlgh7lJi0JLCE0e2Z6aSt34ULWvHHBsNbOP-w0rncsd6cRxm5jyi0vwkkdoANajRxevjngAMdrj7F9gsoAZl2qacWUcaMR_sBwchEoDNqzwTt658skRKYLwwk4GmqXMCtNXEDgYdmUm2Pa6cVlzQcL_-1TRw2yjHTyTiQXjr6zw";
describe("jwt validation", () => {
    test("should detect that jwt is valid but expired", async () => {
        const auth_header = `Bearer ${validButExpiredToken}`;
        const response = await request(app).get("/todo").set("Authorization", auth_header);
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
        expect(response.body.message).toContain("expired");
    });

    test("should detect that jwt is not valid", async () => {
        const auth_header = `Bearer ${invalidToken}`;
        const response = await request(app).get("/todo").set("Authorization", auth_header);
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
        expect(response.body.message).toContain("invalid");
    });

    test("should detect wrong format in authorization header", async () => {
        const auth_header_with_no_bearer = `${invalidToken}`;
        const response = await request(app).get("/todo").set("Authorization", auth_header_with_no_bearer);
        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED);
        expect(response.body.message).toContain("format");
    });
})