import Product from "../models/productModels.js";

// @desc Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = async (req, res) => {
    const product = new Product({
      name: "Sample Product",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  };
  
  // @desc    Update product (Admin only)
  export const updateProduct = async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };
  
  // @desc    Delete a product (Admin only)
  export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };
