// Load environment variables
require("dotenv").config();
    
// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const path = require("path");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/User.js");
const Donation = require("./models/donation.js");

// Connect to DB
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(() => console.log("Connected to DB"));

// Session config
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: { secret: process.env.MONGO_SECRET },
  touchAfter: 24 * 3600,
});
store.on("error", err => console.log("Session store error", err));

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// Set up views and middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(session(sessionOptions));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + current user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;

  // Make currUser available to ejs-mate layouts and includes
  app.locals.currUser = req.user || null;

  next();
});

// Routes
const donationRoutes = require("./routes/donations");
app.use("/donations", donationRoutes);

// Handle /donate route to show donation form
app.get("/donate", (req, res) => {
  res.redirect("/donations/new");
});

// Auth + home routes
app.get("/", (req, res) => res.render("home"));
app.get("/home", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));

// ✅ POST /signup route to handle user registration
app.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome to NourishNet!");
      res.redirect("/donations");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

// Login route
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/donations");
  }
);

// Logout
app.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/home");
  });
});

// Server start
app.listen(8080, () => console.log("Server running on port 8080"));
