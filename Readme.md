User Management REST API

A RESTful API built with Node.js, Express.js, MongoDB, and Mongoose to perform CRUD (Create, Read, Update, and Delete) operations on user records. This project demonstrates how to build and manage user data through HTTP endpoints with MongoDB as the database.

📌 Project Overview

The User Management REST API provides endpoints to create, retrieve, update, and delete user records stored in MongoDB.

Each user record contains the following fields:

name — User's name (String)
age — User's age (Number)
place — User's location (String)
✨ Features
Create new user records.
Retrieve all users from the database.
Update existing users using their MongoDB ID.
Delete users using their MongoDB ID.
Connect to MongoDB using Mongoose.
Handle errors and return appropriate HTTP status codes.
Return API responses in JSON format.
🛠️ Tech Stack
Technology	Purpose
Node.js	JavaScript runtime environment
Express.js	Web framework for building REST APIs
MongoDB Atlas	Cloud-hosted NoSQL database
Mongoose	MongoDB object modeling and database operations
JavaScript ES Modules	Modular JavaScript using import and export
📂 Project Structure

The following is a suggested structure based on the code provided. Adjust filenames to match your actual repository.

text
Node-JS-With-MongoDB/
├── config/
│   └── db.js              # MongoDB connection configuration
├── server.js              # Express application and CRUD routes
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lockfile (if present)
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation


Note: The supplied code imports the database connection from ../config/db.js. If your API file is inside a subdirectory, keep the import path consistent with your actual project structure.

⚙️ Installation and Setup
Prerequisites

Make sure you have the following installed or configured:

Node.js and npm
A MongoDB Atlas account
Git
Postman or another API testing tool (optional)
1. Clone the Repository
bash
git clone https://github.com/Prathamesh-Jadhav04/Node-JS-With-MongoDB.git


Navigate to the project directory:

bash
cd Node-JS-With-MongoDB

2. Install Dependencies

Install the required packages:

bash
npm install express mongoose


If the repository already contains a package.json with the required dependencies, you can simply run:

bash
npm install

3. Configure MongoDB Atlas
Sign in to MongoDB Atlas.
Create or select a cluster.
Create a database user with appropriate permissions.
Configure your network access settings.
Copy your MongoDB connection string.

Your connection string will resemble:

text
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>


Replace the placeholders with your actual database credentials and cluster details.

Security: Never publish your MongoDB username, password, or connection string in a public repository.

The supplied Express code calls dbConnect() from config/db.js. Configure the Atlas connection string inside that module, or use environment variables if your connection module supports them.

4. Configure ES Modules

The supplied code uses import statements. Ensure that your package.json contains:

json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}


Important: The server.js filename is an example. Update the start script to match the actual filename containing your Express application.

If your project already has a package.json, preserve its existing dependencies and scripts when making changes.

5. Start the Server

Run the application:

bash
npm start


When the database connection succeeds and the server starts, the expected terminal output is:

text
DB connected
App started on port 4003


The API base URL is:

text
http://localhost:4003


The application listens on port 4003, as specified in the provided code.

📡 API Endpoints

All endpoints use JSON where a request body is required.

HTTP Method	Endpoint	Description
GET	/users	Retrieve all users
POST	/users	Create a new user
PUT	/users/:userid	Update a user by ID
DELETE	/users/:userid	Delete a user by ID

Base URL: http://localhost:4003

📝 API Usage and Examples
1. Get All Users

Retrieves all user records from the MongoDB collection.

Request

http
GET http://localhost:4003/users


cURL

bash
curl http://localhost:4003/users


Success Response — 200 OK

json
[
  {
    "_id": "671a12345678901234567890",
    "name": "Prathamesh",
    "age": 22,
    "place": "Mumbai",
    "__v": 0
  }
]


The example response illustrates a typical Mongoose document. The actual records depend on your database.

2. Create a User

Creates a new user in the database.

Request

http
POST http://localhost:4003/users
Content-Type: application/json


Request Body

json
{
  "name": "Prathamesh",
  "age": 22,
  "place": "Mumbai"
}


cURL

bash
curl -X POST http://localhost:4003/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Prathamesh","age":22,"place":"Mumbai"}'


Success Response — 201 Created

json
{
  "msg": "User Added In Database",
  "user": {
    "_id": "671a12345678901234567890",
    "name": "Prathamesh",
    "age": 22,
    "place": "Mumbai",
    "__v": 0
  }
}

3. Update a User

Updates an existing user using their MongoDB document ID.

Request

http
PUT http://localhost:4003/users/:userid
Content-Type: application/json


Replace :userid with the actual _id of the user you want to update.

Request Body

json
{
  "name": "Prathamesh Jadhav",
  "age": 23,
  "place": "Pune"
}


cURL

bash
curl -X PUT http://localhost:4003/users/671a12345678901234567890 \
  -H "Content-Type: application/json" \
  -d '{"name":"Prathamesh Jadhav","age":23,"place":"Pune"}'


Success Response — 200 OK

json
{
  "msg": "User Updated Successfully",
  "user": {
    "_id": "671a12345678901234567890",
    "name": "Prathamesh Jadhav",
    "age": 23,
    "place": "Pune",
    "__v": 0
  }
}


If the requested user does not exist, the API returns 404 Not Found.

4. Delete a User

Deletes a user from the database using their MongoDB document ID.

Request

http
DELETE http://localhost:4003/users/:userid


cURL

bash
curl -X DELETE http://localhost:4003/users/671a12345678901234567890


Success Response — 200 OK

json
{
  "msg": "User Deleted Successfully",
  "user": {
    "_id": "671a12345678901234567890",
    "name": "Prathamesh Jadhav",
    "age": 23,
    "place": "Pune",
    "__v": 0
  }
}


The response includes the deleted document.

If the requested user does not exist, the API returns 404 Not Found.

🗃️ User Schema

The Mongoose schema defines the structure of each user document.

javascript
const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
  place: String,
});

const kitten = mongoose.model("users", kittySchema);

Schema Fields
Field	Type	Description
_id	ObjectId	Automatically generated unique document identifier
name	String	User's name
age	Number	User's age
place	String	User's location
__v	Number	Mongoose version key

The schema does not explicitly mark the name, age, or place fields as required.

⚠️ Error Handling

The API returns JSON error messages when operations fail.

HTTP Status	Description	Applicable Endpoint
200 OK	Request completed successfully	GET, PUT, DELETE
201 Created	User created successfully	POST
400 Bad Request	Error during creation, update, or deletion	POST, PUT, DELETE
404 Not Found	User does not exist	PUT, DELETE
500 Internal Server Error	Failed to retrieve users	GET
Example: User Not Found

Response — 404 Not Found

json
{
  "msg": "User Not Found"
}

Example: Request Error

Response — 400 Bad Request

json
{
  "msg": "Error message describing the problem"
}


The error message depends on the actual error returned by Mongoose or MongoDB.

Implementation note: Invalid MongoDB IDs can currently produce a 400 response in the update and delete handlers. The code does not distinguish malformed IDs from all other errors in those handlers.

🧪 Testing the API

You can test the endpoints with Postman, cURL, or another HTTP client.

Start the Express server.
Confirm that MongoDB Atlas connects successfully.
Send a POST request to create a user.
Send a GET request to retrieve users.
Copy a user's _id from the response.
Use that ID in a PUT request to update the user.
Use the same ID in a DELETE request to delete the user.

For POST, PUT, and other requests with a JSON body, select Body → raw → JSON in Postman.

🔐 Security Considerations

Before using this API in production, consider implementing:

Input validation for incoming user data.
Required-field validation in the Mongoose schema.
Environment variables for database credentials.
More specific handling of invalid MongoDB IDs.
Rate limiting and appropriate CORS configuration.
Authentication and authorization if user data requires access control.
Automated tests for successful requests and error cases.
Graceful handling of database connection failures.

These are recommendations for future improvement and are not claimed as existing features.

👨‍💻 Author

Prathamesh Jadhav

GitHub: @Prathamesh-Jadhav04
Repository: Node-JS-With-MongoDB
📄 License

No license has been specified for this project.

Unless a license is added to the repository, others should not assume that they have permission to redistribute, modify, or use the project beyond rights granted by applicable law.

⭐ If you find this project useful, consider exploring the repository and following its development.
