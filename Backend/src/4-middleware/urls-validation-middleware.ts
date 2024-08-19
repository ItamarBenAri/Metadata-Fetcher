import { NextFunction, Request, Response } from "express";
import { DuplicateUrlsError, InvalidUrlError, MissingUrlError } from "../3-models/client-errors";

class UrlValidationMiddleware {

    // Middleware to validate URLs:
    public validateUrls(request: Request, response: Response, next: NextFunction): void {
        const urls = request.body.urls; // Extract URLs string from request params
        
        // Check if there are at least 3 URLs
        if (!Array.isArray(urls) || urls.length < 3) {
            const err = new MissingUrlError();
            next(err);
        }

        // Regex to check that the URL starts with https:// and has at least one character after it
        const urlRegex = /^https:\/\/[^ "]{1,2000}$/;

        // Check for duplicate URLs
        const urlSet = new Set(urls);
        if (urlSet.size !== urls.length) {
            const err = new DuplicateUrlsError();
            next(err);
        }

        // Validate each URL in the array
        for (const url of urls) {
            if (!urlRegex.test(url)) {
                const err = new InvalidUrlError(url);
                next(err);
            }
        }

        // If all validations pass, proceed to the next middleware or route handler
        next();
    }
}

export const urlValidationMiddleware = new UrlValidationMiddleware();