const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//mock products
const products = [
  { id: 1, name: "T-Shirt", price: 500 },
  { id: 2, name: "Jeans", price: 1200 },
  { id: 3, name: "Sneakers", price: 2000 },
  { id: 4, name: "Cap", price: 300 },
];

let cart = [];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET cart
app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});

// Add item to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ ...product, qty });
  }
  res.json(cart);
});

// Remove item
app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.json(cart);
});

// Checkout
app.post("/api/checkout", (req, res) => {
  cart = [];
  res.json({ message: "Order placed successfully!" });
});

// Start server
app.listen(5000, () => console.log("Backend running on port 5000"));
