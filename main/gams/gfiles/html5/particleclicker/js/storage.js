// Save an object to local storage
ObjectStorage.save('myObject', { a: 1, b: 2 });

// Retrieve the object from local storage
var myObject = ObjectStorage.load('myObject');
console.log(myObject); // Output: { a: 1, b: 2 }

// Clear the local storage
ObjectStorage.clear();
