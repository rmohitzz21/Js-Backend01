// Defining a utility class to standardize API responses
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode; // HTTP status code (e.g., 200 for success, 400 for client errors)
        this.data = data; // The actual response data (e.g., user details, product list)
        this.message = message; // A descriptive message (default: "Success")
        this.success = statusCode < 400; // Boolean indicating if the request was successful (true if status < 400)
    }
}

// Exporting the ApiResponse class for use in other parts of the application
export { ApiResponse };
