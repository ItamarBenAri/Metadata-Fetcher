import rateLimit from 'express-rate-limit';

/**
 * Configuration class for application settings.
 * 
 * @property {boolean} isDevelopment - Indicates if the environment is development.
 * @property {boolean} isProduction - Indicates if the environment is production.
 * @property {number} port - The port on which the application runs (default: 4000).
 * @property {object} corsOptions - CORS configuration options for handling cross-origin requests.
 * @property {object} limiter - Rate limiting configuration to prevent abuse, limiting each IP to 5 requests per second.
 */
class AppConfig {
    public readonly isDevelopment = process.env.NODE_ENV === "development";
    public readonly isProduction = process.env.NODE_ENV === "production";
    public readonly port = 4000;
    public readonly corsOptions = { credentials: true, origin: 'http://localhost:3000' };
    public readonly limiter = rateLimit({
        windowMs: 1000, // 1 second time window
        max: 5, // Maximum 5 requests per IP per windowMs
        message: "Too many requests, please try again later."
    });
}

export const appConfig = new AppConfig();
