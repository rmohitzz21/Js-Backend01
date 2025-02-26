// Defining a custom error class `ApiError` that extends the built-in JavaScript `Error` class
class ApiError extends Error {
    constructor(
        statusCode,                    // HTTP status code (e.g., 404, 500)
        message = "Something Went Wrong", // Default error message
        errors = [],                    // Additional error details (if any)
        stack = ""                       // Custom stack trace (optional)
    ) {
        // Calling the parent `Error` class constructor with the error message
        super(message);
        
        // Assigning properties to the error object
        this.statusCode = statusCode;  // Stores HTTP status code
        this.data = null;              // Placeholder for additional data (if needed)
        this.message = message;        // Stores the error message
        this.success = false;          // Indicates failure
        this.errors = errors;          // Stores additional error details (e.g., validation errors)

        // Handling the stack trace (useful for debugging)
        if (stack) {
            this.stack = stack;  // If a custom stack trace is provided, use it
        } else {
            // Otherwise, generate a standard stack trace
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Exporting the class so it can be used in other files
export { ApiError };
