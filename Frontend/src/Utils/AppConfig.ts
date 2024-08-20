import { csrfTokenService } from "../Services/CsrfTokenService";

/**
 * Development configuration for API URLs and fetch options.
 * Contains endpoints for local development and methods for making HTTP POST requests.
 */
class DevConfig {
    public readonly csrfTokenUrl = "http://localhost:4000/api/csrf-token"; // Local CSRF token endpoint
    public readonly urlsUrl = "http://localhost:4000/api/urls"; // Local URLs processing endpoint

    /**
     * Generates fetch options for making HTTP POST requests to the server.
     * @param urls - Array of URLs to be sent in the request body.
     * @returns Fetch options with headers, body, and credentials included.
     */
    public readonly fetchOptions = (urls: string[]) => {
        return {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenService.retrieveCsrfTokenFromCookie() // CSRF token retrieved from cookies
            },
            body: JSON.stringify({ urls }), // Serialize URLs into JSON format
            credentials: 'include' as RequestCredentials // Include credentials (e.g., cookies) in the request
        }
    }
}

/**
 * Production configuration for API URLs and fetch options.
 * Contains endpoints for the production environment and methods for making HTTP POST requests.
 */
class ProdConfig {
    public readonly csrfTokenUrl = "https://metadata-fetcher-backend.onrender.com/api/csrf-token"; // Production CSRF token endpoint
    public readonly urlsUrl = "https://metadata-fetcher-backend.onrender.com/api/urls"; // Production URLs processing endpoint

    /**
     * Generates fetch options for making HTTP POST requests to the production server.
     * @param urls - Array of URLs to be sent in the request body.
     * @returns Fetch options with headers, body, and credentials included.
     */
    public readonly fetchOptions = (urls: string[]) => {
        return {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenService.retrieveCsrfTokenFromCookie() // CSRF token retrieved from cookies
            },
            body: JSON.stringify({ urls }), // Serialize URLs into JSON format
            credentials: 'include' as RequestCredentials // Include credentials (e.g., cookies) in the request
        }
    }
}

export const appConfig = new ProdConfig(); // Export production configuration as the default