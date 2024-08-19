import express, { NextFunction, Request, Response } from "express";

/**
 * CsrfTokenController handles the retrieval of CSRF tokens for client requests.
 * It defines a single GET route for providing CSRF tokens to the client.
 */
class CsrfTokenController {

    // Express Router instance for handling HTTP requests
    public readonly router = express.Router();

    /**
     * Constructor registers the routes for the controller.
     */
    public constructor() {
        this.registerRoutes();
    }

    /**
     * Registers the routes for the controller.
     * Currently handles GET requests to provide a CSRF token.
     */
    private registerRoutes(): void {
        this.router.get("/", this.getCsrfToken);
    }

    /**
     * Handles GET requests to retrieve the CSRF token.
     * Responds with a JSON object containing the CSRF token.
     *
     * @param request - Express Request object
     * @param response - Express Response object
     * @param next - Express NextFunction for error handling
     */
    private async getCsrfToken(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {            
            response.json({ csrfToken: request.csrfToken() }); // Retrieve and send CSRF token
        } catch (err: any) {
            next(err); // Forward error to error-handling middleware
        }
    }
}

const csrfTokenController = new CsrfTokenController();
export const csrfTokenRouter = csrfTokenController.router;