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
-
