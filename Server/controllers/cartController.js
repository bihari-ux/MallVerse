import Cart from "../models/Cart.js";

const fixCartUrls = (cartDoc, req) => {
  if (!cartDoc) return [];
  const currentHost = `${req.protocol}://${req.get("host")}`;
  const obj = cartDoc.toObject();
  obj.items.forEach(i => {
    if (i.productId && i.productId.imageUrl) {
      if (i.productId.imageUrl.match(/^http:\/\/(localhost|127\.0\.0\.1):\d+/)) {
        i.productId.imageUrl = i.productId.imageUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1):\d+/, currentHost);
      } else if (i.productId.imageUrl.startsWith("/uploads")) {
        i.productId.imageUrl = `${currentHost}${i.productId.imageUrl}`;
      }
    }
  });
  return obj.items;
};

// Get cart for a user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json({ items: fixCartUrls(cart, req) });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const existing = cart.items.find((i) => i.productId.toString() === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    const updated = await Cart.findOne({ userId }).populate("items.productId");
    res.json({ items: fixCartUrls(updated, req) });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update item quantity
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const updated = await Cart.findOne({ userId }).populate("items.productId");
    res.json({ items: fixCartUrls(updated, req) });
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    await cart.save();
    const updated = await Cart.findOne({ userId }).populate("items.productId");
    res.json({ items: fixCartUrls(updated, req) });
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndDelete({ userId });
    res.json({ items: [] });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
