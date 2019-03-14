# Mern-login
Authentication.
Add auth features to React Material Template.
- /Signup: User can sign up with username, email and password.
- /SignIn: User can sign in with email and password. And then will receive bearer token from backend and user can call other REST api with this tokne. Backend will realize the user with this token. When user try to call API with invalid or expired token, backend will reponse with Error msg...
- /Logout: User token will be expired.
# To run app
Install MongoDB and create MERN-stack database and create new collection users
In /server npm run dev to run Node server and then npm start in front end.
