import { describe, it, before } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { StatusCode } from "../src/3-models/enums";

describe("Testing backend", () => {
    let csrfToken: string;
    let cookie: string;

    // Step 1: Retrieve CSRF token and cookie before running any tests
    before(async () => {
        const response = await supertest(app.server)
            .get("/api/csrf-token");
        csrfToken = response.body.csrfToken;  // Store CSRF token
        cookie = response.headers['set-cookie'][0];  // Extract and store the cookie
    });
    
    // Test that a valid CSRF token is retrieved
    it("should successfully GET a valid CSRF token", async () => {
        const response = await supertest(app.server)
            .get("/api/csrf-token");
        expect(response.body.csrfToken).to.have.length(36);  // Validate the CSRF token length
    });

    // Test a POST request with a valid CSRF token and cookie
    it("should successfully send POST request with CSRF token", async () => {
        const response = await supertest(app.server)
            .post("/api/urls")
            .set('X-CSRF-TOKEN', csrfToken)  // Set CSRF token in the headers
            .set('Cookie', cookie)  // Include the stored cookie in the request
            .send({ 
                urls: ['https://example.com/1', 'https://example.com/2', 'https://example.com/3']  // Test payload
            });

        expect(response.status).to.be.equal(StatusCode.OK);  // Ensure the response status is 200 OK
    });

    // Test that a POST request fails when not enough URLs are provided
    it("should fail due to only 2 URLs provided", async () => {
        const response = await supertest(app.server)
            .post("/api/urls")
            .set('X-CSRF-TOKEN', csrfToken)  // Set CSRF token in the headers
            .set('Cookie', cookie)  // Include the stored cookie in the request
            .send({ 
                urls: ['https://example.com/1', 'https://example.com/2']  // Test payload with insufficient URLs
            });

        expect(response.status).to.be.equal(StatusCode.BadRequest);  // Expect a BadRequest status
    });

    // Test that a POST request fails when duplicate URLs are provided
    it("should fail due to duplicate URLs", async () => {
        const response = await supertest(app.server)
            .post("/api/urls")
            .set('X-CSRF-TOKEN', csrfToken)  // Set CSRF token in the headers
            .set('Cookie', cookie)  // Include the stored cookie in the request
            .send({ 
                urls: ['https://example.com/1', 'https://example.com/2', 'https://example.com/2']  // Test payload with duplicate URLs
            });

        expect(response.status).to.be.equal(StatusCode.BadRequest);  // Expect a BadRequest status
    });

    // Test that a POST request fails when a non-HTTPS URL is provided
    it("should reject HTTP URLs (not HTTPS)", async () => {
        const response = await supertest(app.server)
            .post("/api/urls")
            .set('X-CSRF-TOKEN', csrfToken)  // Set CSRF token in the headers
            .set('Cookie', cookie)  // Include the stored cookie in the request
            .send({ 
                urls: ['http://example.com/1', 'https://example.com/2', 'https://example.com/3']  // Test payload with HTTP URL
            });

        expect(response.status).to.be.equal(StatusCode.BadRequest);  // Expect a BadRequest status
    });
});