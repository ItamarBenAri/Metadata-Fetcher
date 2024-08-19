import { appConfig } from "../Utils/AppConfig";

class CsrfTokenService {

    // Request CSRF token and store it in a cookie
    public async storeCsrfTokenInCookie(): Promise<void> {
        const response = await fetch(appConfig.csrfTokenUrl, {
            credentials: 'include' // Ensures cookies are included in the request
        });
        const data = await response.json();
        document.cookie = `XSRF-TOKEN=${data.csrfToken}; path=/`; // Store the CSRF token in a cookie
    }

    // Retrieve the CSRF token from the cookie
    public retrieveCsrfTokenFromCookie(): string {
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        return csrfToken || ''; // Return the token or an empty string if not found
    }
}

export const csrfTokenService = new CsrfTokenService();