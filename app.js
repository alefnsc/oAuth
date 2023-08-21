/**
 * This file sets up an Express server for social media authentication using Passport.js.
 * It integrates Google and Facebook authentication strategies, allowing users to log in
 * with their Google or Facebook accounts.
 *
 * It includes routes for handling authentication, callbacks, and user sessions.
 * Additionally, the server serves static assets and renders EJS views for different routes.
 *
 * Libraries used: Express, Passport, cookie-parser, express-session, body-parser.
 * OAuth strategies: GoogleStrategy, FacebookStrategy.
 *
 * @file Express server for social media authentication using Passport.js
 * @version 1.0
 * @requires express
 * @requires passport
 * @requires cookie-parser
 * @requires express-session
 * @requires body-parser
 * @requires configFacebook (configuration for Facebook OAuth)
 * @requires configGoogle (configuration for Google OAuth)
 * @requires passport-google-oauth20
 * @requires passport-facebook
 * @requires path
 * @requires url
 */

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import configFacebook from "./config/configFacebook.js";
import configGoogle from "./config/configGoogle.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize the Express app
const app = express();

// Configure passport with Facebook authentication strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: configFacebook.api_key,
      clientSecret: configFacebook.api_secret,
      callbackURL: configFacebook.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Configure passport with Google authentication strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: configGoogle.api_key,
      clientSecret: configGoogle.api_secret,
      callbackURL: configGoogle.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user sessions
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Configure Express app settings
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/public`));

// Define route to render index page with user information
app.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

// Google authentication route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Facebook authentication route
app.get("/auth/facebook", passport.authenticate("facebook"));

// Google authentication callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

// Facebook authentication callback route
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

// Logout route
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
      return res.redirect("/");
    }
    req.session.destroy(function (err) {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.redirect("/");
    });
  });
});

// Start the server
app.listen(3000, () => console.log("Server up"));
