# Social Media Authentication using Passport.js

**Table of Contents**

1. [Introduction](#introduction)
2. [Libraries Used](#libraries-used)
3. [OAuth Strategies](#oauth-strategies)
4. [Files](#files)
5. [Initialization](#initialization)
6. [Express App Settings](#express-app-settings)
7. [Routes](#routes)
8. [Usage](#usage)
9. [Contact Information](#contact-information)

## 1. Introduction

This file sets up an Express server for social media authentication using Passport.js. It integrates Google and Facebook authentication strategies, allowing users to log in with their Google or Facebook accounts.

The server includes routes for handling authentication, callbacks, and user sessions. Additionally, it serves static assets and renders EJS views for different routes.

## 2. Libraries Used

- **Express**: A fast and minimal web framework for Node.js.
- **Passport**: An authentication middleware for Node.js.
- **cookie-parser**: Middleware for parsing cookies in requests.
- **express-session**: Middleware for managing user sessions.
- **body-parser**: Middleware for parsing request bodies.
- **passport-google-oauth20**: Passport strategy for Google OAuth.
- **passport-facebook**: Passport strategy for Facebook OAuth.

## 3. OAuth Strategies

- **GoogleStrategy**: Used to configure passport with Google authentication strategy.
- **FacebookStrategy**: Used to configure passport with Facebook authentication strategy.

## 4. Files

- **configFacebook.js**: Configuration for Facebook OAuth.
- **configGoogle.js**: Configuration for Google OAuth.

## 5. Initialization

- Initialize the Express app.
- Configure passport with Facebook and Google authentication strategies.
- Serialize and deserialize user sessions.

## 6. Express App Settings

- Set the views directory and view engine to EJS.
- Use `cookieParser`, `bodyParser`, and `express-session` middleware.
- Serve static files from the `public` directory.

## 7. Routes

- **GET /**: Render the index page with user information.
- **GET /auth/google**: Route for initiating Google authentication.
- **GET /auth/facebook**: Route for initiating Facebook authentication.
- **GET /auth/google/callback**: Callback route for Google authentication.
- **GET /auth/facebook/callback**: Callback route for Facebook authentication.
- **GET /logout**: Route for logging out the user and destroying the session.

## 8. Usage

1. Install project dependencies by running `npm install`.
2. Configure `configFacebook.js` and `configGoogle.js` with your API keys.
3. Run the server with `npm start`.
4. Access the application in your browser at `http://localhost:3000`.

## 9. Contact Information

For questions or inquiries, please contact the project maintainer:

- Maintainer: Alexandre Fonseca
- Email: alexandrefonsecach@gmail.com
