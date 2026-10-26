User Management REST API

A RESTful API built with Node.js, Express.js, MongoDB, and Mongoose to perform CRUD (Create, Read, Update, and Delete) operations on user records.

🚀 Features
Create User — Add a new user to the database.
Get All Users — Retrieve all registered users.
Update User — Update an existing user using their MongoDB ID.
Delete User — Remove a user from the database using their ID.
MongoDB Integration — Store and manage user data using Mongoose.
Error Handling — Handle database errors, invalid requests, and missing users.
RESTful Endpoints — Follow standard HTTP methods and status codes.
🛠️ Tech Stack
Node.js — JavaScript runtime environment.
Express.js — Web framework for building REST APIs.
MongoDB — NoSQL database for storing user records.
Mongoose — ODM library for MongoDB.
JavaScript (ES Modules) — Modern JavaScript module syntax.
📁 Project Structure
text
project-root/
├── config/
│   └── db.js              # MongoDB connection configuration
├── routes/
│   └── users.js           # Express API routes (example)
├── .env                   # Environment variables (optional)
├── .gitignore
├── package.json
└── README.md

Adjust the folder structure to match your actual project. The API code should be placed in the appropriate file.
⚙️ Installation and Setup
1. Clone the Repository
bash
git clone <your-repository-url>
cd <your-project-folder>

2. Install Dependencies
bash
npm install express mongoose


If your project uses environment variables with dotenv, install it as well:

bash
npm install dotenv

3. Configure MongoDB

Ensure MongoDB is running locally or that you have access to a MongoDB Atlas cluster.

Configure your database connection in config/db.js. If you use environment variables, add a .env file:

env
MONGODB_URI=mongodb://127.0.0.1:27017/userdb
PORT=4003


Update db.js to read MONGODB_URI if your connection function does not already do so.

Important: Never commit your .env file or expose database credentials in a public repository.

4. Configure ES Modules

Ensure your package.json contains:

json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}


Replace server.js with the actual filename containing your Express application.

5. Start the Server

For production-style execution:

bash
npm start


For development:

bash
npm run dev


If the server starts successfully, the terminal should display:

text
DB connected
App started on port 4003


The API base URL is:

text
http://localhost:4003

📡 API Endpoints
Method	Endpoint	Description
GET	/users	Retrieve all users
POST	/users	Create a new user
PUT	/users/:userid	Update a user by ID
DELETE	/users/:userid	Delete a user by ID
📝 API Usage
1. Get All Users

Retrieve all user records stored in the database.

Request

http
GET /users


Example using cURL

bash
curl http://localhost:4003/users


Example Response — 200 OK

json
[
  {
    "_id": "671a12345678901234567890",
    "name": "John Doe",
    "age": 25,
    "place": "Mumbai",
    "__v": 0
  }
]

2. Create a User

Add a new user to the database.

Request

http
POST /users
Content-Type: application/json


Request Body

json
{
  "name": "John Doe",
  "age": 25,
  "place": "Mumbai"
}


Example using cURL

bash
curl -X POST http://localhost:4003/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":25,"place":"Mumbai"}'


Example Response — 201 Created

json
{
  "msg": "User Added In Database",
  "user": {
    "_id": "671a12345678901234567890",
    "name": "John Doe",
    "age": 25,
    "place": "Mumbai",
    "__v": 0
  }
}

3. Update a User

Update an existing user by providing their MongoDB document ID.

Request

http
PUT /users/:userid
Content-Type: application/json


Request Body

json
{
  "name": "John Smith",
  "age": 26,
  "place": "Pune"
}


Example using cURL

bash
curl -X PUT http://localhost:4003/users/671a12345678901234567890 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","age":26,"place":"Pune"}'


Example Response — 200 OK

json
{
  "msg": "User Updated Successfully",
  "user": {
    "_id": "671a12345678901234567890",
    "name": "John Smith",
    "age": 26,
    "place": "Pune",
    "__v": 0
  }
}


If the user does not exist, the API returns 404 Not Found.

4. Delete a User

Delete a user by their MongoDB document ID.

Request

http
DELETE /users/:userid


Example using cURL

bash
curl -X DELETE http://localhost:4003/users/671a12345678901234567890


Example Response — 200 OK

json
{
  "msg": "User Deleted Successfully",
  "user": {
    "_id": "671a12345678901234567890",
    "name": "John Smith",
    "age": 26,
    "place": "Pune",
    "__v": 0
  }
}


If the user does not exist, the API returns 404 Not Found.

📋 User Data Model

The API uses a Mongoose schema to define the structure of user documents.

Field	Data Type	Description
_id	ObjectId	Automatically generated MongoDB document ID
name	String	User's name
age	Number	User's age
place	String	User's location
__v	Number	Mongoose version key

Example document:

json
{
  "name": "John Doe",
  "age": 25,
  "place": "Mumbai"
}

⚠️ HTTP Status Codes
Status Code	Meaning
200 OK	Request completed successfully
201 Created	User created successfully
400 Bad Request	Invalid request or database validation error
404 Not Found	Requested user does not exist
500 Internal Server Error	An error occurred while retrieving users

Note: The current implementation returns 400 for errors in the update and delete handlers, including malformed MongoDB IDs. A future improvement would distinguish invalid IDs from other database errors.

🧪 Testing

You can test the API using any of the following tools:

Postman — Send HTTP requests and inspect JSON responses.
cURL — Test endpoints directly from your terminal.
Thunder Client — Test REST APIs inside Visual Studio Code.

For update and delete operations, replace :userid with a valid _id returned by the GET or POST endpoint.

🔒 Security and Best Practices

For production use, consider implementing:

Input validation for required fields and data types.
Authentication and authorization where appropriate.
Environment variables for sensitive configuration.
More specific error handling for invalid MongoDB IDs.
Rate limiting to reduce abuse.
CORS configuration if the API is accessed from a browser frontend.
Request logging and automated tests.
A graceful server shutdown and database connection handling.
🚧 Future Enhancements
Add pagination and filtering to the GET endpoint.
Add user search functionality.
Implement schema validation and required fields.
Add authentication using JWT.
Add automated tests using Jest or Vitest and Supertest.
Add API documentation using Swagger.
👨‍💻 Author

Your Name

GitHub: Your GitHub Profile
LinkedIn: Your LinkedIn Profile

Replace the example profile links with your actual details.

📄 License

This project is available under the MIT License. Add a LICENSE file to the repository if you intend to distribute it under that license.
