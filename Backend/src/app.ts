import helmet from "helmet";
import cors from "cors";
import express from "express";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { loggerMiddleware } from "./4-middleware/logger-middleware";
import { dataRouter } from "./6-controllers/data-controller";
import { appConfig } from "./2-utils/app-config";
import { urlValidationMiddleware } from "./4-middleware/urls-validation-middleware";
import { csrfProtectionMiddleware } from "./4-middleware/csrf-protection-middleware";
import cookieParser from "cookie-parser";
import { csrfTokenRouter } from "./6-controllers/csrf-token-controller";

/**
 * Main application class that configures and starts the Express server.
 */
class App {
    
    /**
     * Express server instance.
     */
    public server = express();

    /**
     * Initializes and starts the Express application.
     */
    public start(): void {

        // Enable CORS with predefined options and set rate limiting.
        this.server.use(cors(appConfig.corsOptions));
        this.server.use(appConfig.limiter);

        // Set security headers, parse cookies, and enable CSRF protection.
        this.server.use(helmet());
        this.server.use(cookieParser());
        this.server.use(csrfProtectionMiddleware.protect);

        // Parse incoming JSON payloads.
        this.server.use(express.json());

        // Register middlewares for logging and URL validation.
        this.server.use(loggerMiddleware.logToConsole);
        this.server.use("/api/urls", urlValidationMiddleware.validateUrls);

        // Register routes for data and CSRF token handling.
        this.server.use("/api/csrf-token", csrfTokenRouter);
        this.server.use("/api/urls", dataRouter);

        // Handle 404 errors and catch-all errors.
        this.server.use(errorsMiddleware.routeNotFound);
        this.server.use(errorsMiddleware.catchAll);

        // Start listening on the configured port.
        this.server.listen(appConfig.port, () => 
            console.log(`Listening on http://localhost:${appConfig.port}`)
        );
    }
}

// Instantiate and start the application.
export const app = new App();
app.start();