import { StatusCode } from "./enums";

// Base class for any client error:
abstract class ClientError {

    public message: string;
    public status: number;

    public constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}

// Route not found error:
export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(`Route ${route} not found.`, StatusCode.NotFound);
    }
}

// Missing url error:
export class MissingUrlError extends ClientError {
    public constructor() {
        super("You must provide at least 3 URLs." , StatusCode.BadRequest);
    }
}

// Resource not found error:
export class InvalidUrlError extends ClientError {
    public constructor(url: string) {
        super(`Invalid URL format: ${url}. URL must start with https:// and have at least one character after it.` , StatusCode.BadRequest);
    }
}

// Resource not found error:
export class DuplicateUrlsError extends ClientError {
    public constructor() {
        super(`Duplicates URLs found.` , StatusCode.BadRequest);
    }
}