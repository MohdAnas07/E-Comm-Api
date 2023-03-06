const express = require('express');
const app = express();
const cors = require('cors');
const appData = require('./appData.json');
const axios = require('axios');

const port = process.env.PORT || 3000;

// Middleware passed 
app.use(cors());

// Base Route ======================
app.get("/", (req, res) => {
    res.send("I am Live...")
})

// Get All products 
app.get("/products", async (req, res) => {
    const products = await axios('https://fakestoreapi.com/products');
    const prodData = products.data
    // Sort results ==================>>
    if (req.query.sort) {
        prodData.sort((a, b) => {
            return b.id - a.id
        })
    }
    res.send(prodData)
})


// Get a single product
app.get("/products/:id", async (req, res) => {
    const ID = req.params.id
    const product = await axios(`https://fakestoreapi.com/products/${ID}`);
    res.send(product.data)
})


// Get all categories
app.get("/products/categories", async (req, res) => {
    const product = await axios(`https://fakestoreapi.com/products/categories`);
    res.send(product.data)
})


// Get products in a specific category
app.get("/products/categories/jewelery", async (req, res) => {
    const product = await axios(`https://fakestoreapi.com/products/category/jewelery`);
    res.send(product.data)
})


// Get products in a specific category
app.post("/products", async (req, res) => {
    const header = {
        method: "POST",
        body: JSON.stringify({
            "title": "test product",
            "price": 13.5,
            "description": "lorem ipsum set",
            "image": "https://i.pravatar.cc",
            "category": "electronic"
        })
    }
    const product = await axios(`https://fakestoreapi.com/products`, header);
    res.send(product.data)
})


// Update a product
app.put("/products/:id", async (req, res) => {

    const Id = req.params.id;
    const header = {
        method: "PUT",
        body: JSON.stringify(
            {
                "title": "test product",
                "price": 13.5,
                "description": "lorem ipsum set",
                "image": "https://i.pravatar.cc",
                "category": "electronic"
            }
        )
    }
    const product = await axios(`https://fakestoreapi.com/products/${Id}`, header);
    res.send(product.data)
})


// Delete a product
app.delete("/products/:id", async (req, res) => {

    const Id = req.params.id;
    const header = {
        method: "DELETE"
    }
    const product = await axios(`https://fakestoreapi.com/products/${Id}`, header);
    res.send(product.data)
})

// Get all Cart
app.get("/carts", async (req, res) => {
    const data = await axios(`https://fakestoreapi.com/carts`);
    res.send(data.data)
})

// Get a single cart
app.get("/carts/:id", async (req, res) => {
    const Id = req.params.id
    const data = await axios(`https://fakestoreapi.com/carts/${Id}`);
    res.send(data.data)
})



// Get service
app.get('/service', (req, res) => {
    res.send(appData);
})

// listening Server 
app.listen(port, () => {
    console.log(`server is running at PORT ${port}`)
})