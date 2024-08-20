import { csrfTokenService } from "../Services/CsrfTokenService";

/**
 * AppConfig class handles application configuration and API URLs.
 * Provides fetch options for making POST requests with CSRF protection.
 */
class AppConfig {
    // API endpoint for retrieving CSRF tokens
    public readonly csrfTokenUrl = "http://localhost:4000/api/csrf-token";
    
    // API endpoint for sending URLs for metadata extraction
    public readonly urlsUrl = "http://localhost:4000/api/urls";

    /**
     * Returns configuration options for making a POST request.
     * Includes CSRF token in headers and serializes the provided URLs in the body.
     * @param urls - Array of URLs to be sent in the request body
     * @returns Request configuration object
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

export const appConfig = new AppConfig();