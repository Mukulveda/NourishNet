# 🌱 NourishNet

**NourishNet** is a full-stack food donation web application that enables users to **share excess food** with others in need. It follows the **MVC architecture**, supports **user authentication**, and provides **CRUD operations** to manage food donations.

---

## 📌 What is NourishNet?

The goal of NourishNet is to **reduce food waste** and **bridge the gap between donors and recipients** by creating a platform where people can share leftover or extra meals.

### Use Cases:
1. A restaurant or household with leftover meals can easily list them for donation.
2. Anyone in need can view and access the available shared meals on the platform.
3. Registered users can securely log in and manage (create, update, delete) their own meal posts through the "MyShares" section.
4. NGOs working to reduce food waste or feed the underprivileged can:
   - Browse available meals nearby.
   - Collect meals efficiently from donors.
   - Use the platform as a centralized system to coordinate food collection and distribution efforts.

---

## 🧩 Key Features

### 🛠 MVC Architecture
- **Model**: Manages the structure of your data using Mongoose (User & Donation).
- **View**: EJS templates render the HTML pages dynamically.
- **Controller (Routes)**: Express routes handle requests, logic, and database interaction.

### 📝 CRUD Operations
- **Create**: Share a new food donation (`/donations/new`)
- **Read**: View all shared meals (`/donations`)
- **Update**: Edit your own donations (`/donations/:id/edit`)
- **Delete**: Remove your donation listing (`/donations/:id?_method=DELETE`)

### 👤 User Authentication
- Login, signup, and logout functionality using **Passport.js** and **express-session**.
- Logged-in users can:
  - Share food
  - Edit/delete **only their own** donations

### 🧑‍🍳 ShareFood and MyShares
- **ShareFood**: Form to share a new meal donation.
- **MyShares**: Page showing meals added by the currently logged-in user.

### 🍽️ Meals
- General **donations** page shows all meals except those by the current user.

### 💬 Flash Messages
- Uses **connect-flash** to show success/error messages during login, logout, and donation actions.

---

## 🛠 Tech Stack

🛠 Tech Stack
Backend:
Node.js – JavaScript runtime environment
Express.js – Web framework to handle routing and server logic

Frontend:
HTML – Markup language for structuring pages
CSS – Styling for frontend components
EJS + ejs-mate – Templating engine for dynamic rendering with layout support

Database:
MongoDB – NoSQL database to store user and donation data
Mongoose – ODM to interact with MongoDB easily

Authentication & Sessions:
Passport.js – User authentication using the local strategy
express-session – Session management
connect-mongo – Store session data in MongoDB

User Feedback:
connect-flash – Displays temporary messages like login success/failure

Architecture & Features:
MVC Pattern – Clean separation between models, views, and controllers
CRUD Operations – Users can Create, Read, Update, and Delete donations
Secure Auth Flow – Signup, login, logout protected with session and flash messages
ShareFood & MyShares Pages – Users can browse donations or view their own.


