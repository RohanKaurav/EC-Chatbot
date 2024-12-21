const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const products = require("./data/products.json");

const app = express();
const PORT = 3000;
const JWT_SECRET = "your_secret_key";

const cors = require("cors");
app.use(cors({
  origin: "https://prismatic-starburst-ce8a7f.netlify.app", // Allow only your frontend
}));

app.use(bodyParser.json());

// Authentication Route
app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;
  if (username === "test" && password === "password") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
  
    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach user data to request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };

// Fetch All Products
app.get("/api/products", verifyToken, (req, res) => {
    res.json(products); // Return products only if the token is valid
  });
  

// Chat Simulation Endpoint
app.post("/api/chat", (req, res) => {
  const { query } = req.body;
  const matches = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  res.json({ reply: matches.length ? matches : "No products found." });
});

// Default Route (Root Endpoint)
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});






// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
