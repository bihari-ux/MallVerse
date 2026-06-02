import Review from "../models/Review.js";
import Product from "../models/Product.js";

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);

    if (product) {
      const alreadyReviewed = await Review.findOne({
        product: productId,
        user: req.user._id,
      });

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Product already reviewed" });
      }

      const review = await Review.create({
        rating: Number(rating),
        comment,
        product: productId,
        user: req.user._id,
      });

      // Update product rating
      const allReviews = await Review.find({ product: productId });
      product.numReviews = allReviews.length;
      product.rating =
        allReviews.reduce((acc, item) => item.rating + acc, 0) /
        allReviews.length;

      await product.save();

      res.status(201).json({ message: "Review added", review });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get product reviews
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
