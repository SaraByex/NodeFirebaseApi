My API Overview:

This API manages user profiles, income records, and expense records with full CRUD operations. It serves JSON data through RESTful endpoints.

Summary:

- Installed express using npm install express from the terminal
- I created 3 routing files and saved to one folder -- routes and did the following for each of them|:
- imported express from "express"
- created a routing variable///
- used app.get and listening function to confirm that the data is being received.
- Put sample data for each file of 10 records in variables.
- createdd new instances for each variableexported the module for use in other files.
- installed the firebase for backend using documentation form the console.
- downloaded the firebase credentials.json file and saved it in the firebase folder.
- created a gitignore file to protect some files from exposure on git hub like the firebase credentials and node modules.
- created a firebase.js file where i put the code from the console.
- created the index.html file and put the links to the different routes.


   1. Node.js - for building the backend server.
   2. Express.js - to create RESTful API endpoints.
   3. firebase Realtime Database - for storing user, income, and expense data
   4. Firebase Authentication - for management of stored recordes , retrieval and deleteion
   5. HTML, CSS, javascript - Frontend technologies for user interface and client-side logic.
   6. CORS for smooth interaction of back end a nfront end on the came port.
   
Endpoints
1. Users

- GET /users  
  Retrieve all users.
- POST /users 
  Create a new user.
- PUT /users/:id  
  Update a user by ID.
- ELETE /users/:id  
  Delete a user by ID.


2. Income
- GET /income
Retrieve all income records.
- POST /income
Create a new income record.
- PUT /income/:id
Update income by ID.
- DELETE /income/:id
Delete income by ID.


3. Expenses
- GET /expenses
Retrieve all expense records.
- POST /expenses
Create a new expense record.
- PUT /expenses/:id
Update expense by ID.
- DELETE /expenses/:id
Delete expense by ID.


How to Use
Use REST clients like Postman to interact with endpoints.

the API responds with JSON data only.

Run your backend server before making requests.

Support contact: sarabyex@outlook.com