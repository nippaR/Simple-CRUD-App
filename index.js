const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.models.js');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send('Hello form node api server..!');
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Create a product

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({product});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/api/products/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product.findByName(name);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Update a product

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
       

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({product});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


// delete a product

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});



// Connect to the database
  
mongoose.connect("mongodb+srv://Thanuja46:KiLo568svjQheWiJ@backenddb.tijrt.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
    
    console.log('Connected to the database');
})
.catch((err) => {
    console.log('Error connecting to the database');
    console.log(err);
});




