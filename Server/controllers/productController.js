import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    let priceFilter = {};
    if (req.query.minPrice || req.query.maxPrice) {
      priceFilter.price = {};
      if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
    }

    let ratingFilter = {};
    if (req.query.rating) {
      ratingFilter.rating = { $gte: Number(req.query.rating) };
    }

    let sort = {};
    if (req.query.sort) {
      if (req.query.sort === "lowest") sort = { price: 1 };
      else if (req.query.sort === "highest") sort = { price: -1 };
      else if (req.query.sort === "toprated") sort = { rating: -1 };
    }

    const products = await Product.find({ ...keyword, ...category, ...priceFilter, ...ratingFilter }).sort(sort).populate("category", "name");
    
    const currentHost = `${req.protocol}://${req.get("host")}`;
    const fixedProducts = products.map(p => {
      const productObj = p.toObject();
      if (productObj.imageUrl) {
        // Replace any localhost or 127.0.0.1 with any port
        if (productObj.imageUrl.match(/^http:\/\/(localhost|127\.0\.0\.1):\d+/)) {
          productObj.imageUrl = productObj.imageUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1):\d+/, currentHost);
        } else if (productObj.imageUrl.startsWith("/uploads")) {
          productObj.imageUrl = `${currentHost}${productObj.imageUrl}`;
        }
      }
      return productObj;
    });

    res.json({ products: fixedProducts });
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand, countInStock } = req.body;

    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    const imageUrl = req.file ? req.file.path : null;

    const newProduct = new Product({ 
      name, 
      price, 
      description, 
      imageUrl,
      category: category || undefined,
      brand,
      countInStock: countInStock ? Number(countInStock) : 0
    });
    await newProduct.save();

    const productObj = newProduct.toObject();
    const currentHost = `${req.protocol}://${req.get("host")}`;
    if (productObj.imageUrl && productObj.imageUrl.startsWith("/uploads")) {
      productObj.imageUrl = `${currentHost}${productObj.imageUrl}`;
    }

    res.status(201).json({ product: productObj });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, brand, countInStock } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name) product.name = name;
    if (price) product.price = price;
    if (description !== undefined) product.description = description;
    if (category) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (countInStock !== undefined) product.countInStock = Number(countInStock);

    if (req.file) {
      product.imageUrl = req.file.path;
    }

    await product.save();

    const productObj = product.toObject();
    const currentHost = `${req.protocol}://${req.get("host")}`;
    if (productObj.imageUrl && productObj.imageUrl.includes("localhost:5000")) {
      productObj.imageUrl = productObj.imageUrl.replace("http://localhost:5000", currentHost);
    } else if (productObj.imageUrl && productObj.imageUrl.includes("127.0.0.1:5000")) {
      productObj.imageUrl = productObj.imageUrl.replace("http://127.0.0.1:5000", currentHost);
    } else if (productObj.imageUrl && productObj.imageUrl.startsWith("/uploads")) {
      productObj.imageUrl = `${currentHost}${productObj.imageUrl}`;
    }

    res.json({ product: productObj });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
