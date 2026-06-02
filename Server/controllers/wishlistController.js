import Wishlist from "../models/Wishlist.js";

// Get wishlist for a user
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId }).populate("products.productId");
    res.json({ products: wishlist ? wishlist.products : [] });
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [{ productId }] });
    } else {
      const exists = wishlist.products.find((p) => p.productId.toString() === productId);
      if (exists) return res.json({ message: "Already in wishlist", products: wishlist.products });
      wishlist.products.push({ productId });
    }

    await wishlist.save();
    const updated = await Wishlist.findOne({ userId }).populate("products.productId");
    res.json({ products: updated.products });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter((p) => p.productId.toString() !== productId);
    await wishlist.save();
    const updated = await Wishlist.findOne({ userId }).populate("products.productId");
    res.json({ products: updated.products });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
