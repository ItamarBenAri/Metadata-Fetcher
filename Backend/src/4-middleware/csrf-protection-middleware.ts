import { NextFunction, Request, Response } from "express";
import csrf from "csurf";

/**
 * Middleware class for handling CSRF protection.
 * This class configures and applies CSRF protection to incoming requests.
 * Protection is applied by setting a CSRF token in the user's cookies, which is then validated on subsequent requests.
 */
class CsrfProtectionMiddleware {

    /**
     * Middleware function to apply CSRF protection.
     * The CSRF protection is configured to use cookies for storing the CSRF token.
     * @param request - Express request object
     * @param response - Express response object
     * @param next - Express next function to pass control to the next middleware
     */
    public protect(request: Request, response: Response, next: NextFunction): void {
        const csrfProtection = csrf({
            cookie: {
                httpOnly: true,
                secure: true, // Requires HTTPS
                sameSite: "none" // Enables cross-origin requests
            }
        });
        csrfProtection(request, response, next); // Apply CSRF protection middleware
    }
}

// Export an instance of the CSRF protection middleware
export const csrfProtectionMiddleware = new CsrfProtectionMiddleware();
