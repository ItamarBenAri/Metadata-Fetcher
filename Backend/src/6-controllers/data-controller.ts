import express, { NextFunction, Request, Response } from "express";
import { dataService } from "../5-services/data-service";

/**
 * Controller to handle data fetching routes.
 * Exposes an Express router for handling HTTP requests related to metadata fetching.
 */
class DataController {

    public readonly router = express.Router(); // Express router instance.

    /**
     * Constructor - Initializes and registers routes.
     */
    public constructor() {
        this.registerRoutes();
    }

    /**
     * Registers the route for fetching metadata.
     */
    private registerRoutes(): void {
        this.router.post("/", this.getMetadata);
    }

    /**
     * Handles POST requests to fetch metadata for a list of URLs.
     * Streams the metadata response chunk by chunk to improve performance.
     * 
     * @param request - Express Request object containing the URLs in the body.
     * @param response - Express Response object for sending the streamed response.
     * @param next - Next function for handling errors.
     */
    private async getMetadata(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const urls = request.body.urls; // Extract URLs from request body.
            response.setHeader('Content-Type', 'application/json'); // Set JSON response header.
            response.setHeader('Transfer-Encoding', 'chunked'); // Enable chunked transfer encoding for streaming.

            response.write('['); // Start JSON array.

            let first = true;
            for (const url of urls) {
                if (!first) response.write(',\n'); // Separate objects with commas and newlines.
                first = false;

                const metadata = await dataService.fetchMetadata(url); // Fetch metadata for each URL.
                response.write(JSON.stringify(metadata) + '\n'); // Write metadata as a JSON string.
            }

            response.write(']'); // Close JSON array.
            response.end(); // End response.
        } catch (err: any) {
            next(err); // Pass errors to error-handling middleware.
        }
    }
}

// Export the router to be used in the main app.
const dataController = new DataController();
export const dataRouter = dataController.router;