import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (e) {
      return [];
    }
  });

  const addToCart = (product, size = null) => {
    let updatedCart = [...cartData];

    // if Cart is empty, add the product to the cart
    if (cartData.length == 0) {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
        product_id: product.id,
        title: product.title,
        image_url: product.image_url,
        price: product.price,
        size: size,
        qty: 1,
      });
    } else {
      // if Size is not empty
      if (size != null && size != undefined) {
        const isProductInCart = updatedCart.find(
          (item) => item && item.product_id == product.id && item.size == size
        );

        // if product is already in cart, increment the quantity
        if (isProductInCart) {
          updatedCart = updatedCart.map((item) =>
            item && item.product_id == product.id && item.size == size
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // if product is not in cart, add a new product to the cart
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
            product_id: product.id,
            title: product.title,
            image_url: product.image_url,
            price: product.price,
            size: size,
            qty: 1,
          });
        }
      } else {
        // if Size is empty, add the product to the cart
        const isProductInCart = updatedCart.find(
          (item) => item && item.product_id == product.id
        );

        // if product is already in cart, increment the quantity
        if (isProductInCart) {
          updatedCart = updatedCart.map((item) =>
            item && item.product_id == product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // if product is not in cart, add a new product to the cart
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
            product_id: product.id,
            title: product.title,
            image_url: product.image_url,
            price: product.price,
            size: null,
            qty: 1,
          });
        }
      }
    }

    // Remove any accidental null/undefined entries before saving
    updatedCart = updatedCart.filter(Boolean);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const shipping = () => {
    return 0;
  };

  const subTotal = () => {
    let subTotal = 0;
    cartData.map((item) => {
      subTotal += item.price * item.qty;
    });
    return subTotal;
  };

  const grandTotal = () => {
    return subTotal() + shipping();
  };

  return (
    <CartContext.Provider
      value={{ addToCart, cartData, shipping, subTotal, grandTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
