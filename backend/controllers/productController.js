import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error: Unable to fetch products' });
    }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
export const getProductId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error: Unable to fetch product' });
    }
};

//@desc Create product
//@route POST /api/products
export const createProduct = async (req, res) => {
    try {
        const {name, description, price, imageURL, category, stock} = req.body;
        const product = new Product({
            name,
            description,
            price,
            imageURL,
            category,
            stock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error: Unable to create product' });
    }
};

//@desc Update product
//@route PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.countInStock = req.body.countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error: Unable to update product' });
    }
};

//@desc Delete product
//@route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {   
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error: Unable to delete product' });
    }
};

