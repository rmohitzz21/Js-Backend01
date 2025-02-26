// Defining a higher-order function named asyncHandler
// It takes a function `requestHandler` as an argument (which is expected to be an async function)
const asyncHandler = (requestHandler) => {
    // Returning a new function that Express will use as middleware or a route handler
    return (req, res, next) => {

      // Wrapping the `requestHandler` inside a resolved Promise

      Promise.resolve(requestHandler(req, res, next))
        // If the promise rejects (i.e., an error occurs), catch it and pass it to Express's error-handling middleware
        .catch((err) => next(err));

    };
  };
  
  // Exporting the asyncHandler function for use in other modules
  export { asyncHandler };
  






//-------------Using Async Await

// Defining a higher-order function named asyncHandler that takes an asynchronous function (fn) as a parameter
// const asyncHandler = (fn) => 
    // Returning a new function that Express can use as middleware or a route handler
    // async (req, res, next) => {
        // try {
            // Executing the passed-in function (fn) and waiting for its completion
            // await fn(req, res, next);
        // } catch (error) {
            // Handling any errors that occur inside the async function
            
    //         res.status(error.code || 500).json({
    //             success: false, // Setting success to false since an error occurred
    //             message: error.message, // Sending the error message to the client
    //         });
    //     }
    // };

