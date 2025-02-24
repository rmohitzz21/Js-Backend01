const myPromise = new Promise((resolve, reject) => {
  let success = true; // Simulating a condition
  setTimeout(() => {
    if (success) {
      resolve("Operation Successful!"); // Moves to the "fulfilled" state
    } else {
      reject("Operation Failed!"); // Moves to the "rejected" state
    }
  }, 2000);
});

myPromise
  .then((message) => console.log(message)) // Runs if resolved
  .catch((error) => console.log(error)); // Runs if rejected
