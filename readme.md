# Create Express server

- Create a repository(create folder)
- Initialize the repository(npm init)
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 8080
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde ( ^ vs ~ )

# Routing & Request Handlers

- initialize git
- gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, + , (), \* in the routes
- Use of regex in routes /a/ , /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

# Middleware & Error Handlers

- Multiple Route Handlers
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rh5);
- What is a Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use("/", (err, req, res, next) = {});

# DB, Schema, Models & Mongoose

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on port
- Create a userSchema & user Model
- Create POST /sigup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try catch

# Diving into APIs

- JS object vs JSON (difference)
- Add the express.json middleware to our app
- Make signup API dynamic to recive data from the end user
- User.findOne with duplucate email ids, which object returned
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

# Data Sanitization & Schema Validations

- Explore schematype options from the documention
- Add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator library funcation and Use vlidator funcs for password, email, photoURL

# Encrypting Passwords

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is excrupted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

# AUTHENTICATION, JWT & COOKIES

- Install cookie-parser
- Just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- Install jsonwebtoken
- In login API, after email and password validation, create e JWT token and send it to user in cookies
- Read the cookies inside your profile API and find the logged in user
- UserAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

# Exploring APIs & Express Router

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under repective routers
- Read documentation for express.Router
- Create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Validate all data in every POST, PATCH apis

# Logical DB Query & Compound Indexes

- Create Connnection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantage of creating index?
- Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES

# ref, Populate

- Write code with proper validations for POST /request/review/:status/:requestId
- ref & populate : https://mongoosejs.com/docs/populate.html
- Create GET /user/request/received with proper checks
- Create GET /user/connections

# CORS

- https://www.npmjs.com/package/cors
