import Wishlist from "../models/Wishlist.js";

const fixWishlistUrls = (wishlistDoc, req) => {
  if (!wishlistDoc) return [];
  const currentHost = `${req.protocol}://${req.get("host")}`;
  const obj = wishlistDoc.toObject();
  obj.products.forEach(p => {
    if (p.productId && p.productId.imageUrl) {
      if (p.productId.imageUrl.match(/^http:\/\/(localhost|127\.0\.0\.1):\d+/)) {
        p.productId.imageUrl = p.productId.imageUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1):\d+/, currentHost);
      } else if (p.productId.imageUrl.startsWith("/uploads")) {
        p.productId.imageUrl = `${currentHost}${p.productId.imageUrl}`;
      }
    }
  });
  return obj.products;
};

// Get wishlist for a user
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId }).populate("products.productId");
    res.json({ products: fixWishlistUrls(wishlist, req) });
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
      if (exists) {
        const populated = await Wishlist.findOne({ userId }).populate("products.productId");
        return res.json({ message: "Already in wishlist", products: fixWishlistUrls(populated, req) });
      }
      wishlist.products.push({ productId });
    }

    await wishlist.save();
    const updated = await Wishlist.findOne({ userId }).populate("products.productId");
    res.json({ products: fixWishlistUrls(updated, req) });
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
    res.json({ products: fixWishlistUrls(updated, req) });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
