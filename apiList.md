# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password - Forgot password

## connectionRequestRouter

- POST /request/send/:status/:userId (interested, ignored)
- POST /request/review/:status/:requestId (accepted, rejected)

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets the profile of other users on platform
