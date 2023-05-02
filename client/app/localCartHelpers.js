export const getLocalStorageCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const setLocalStorageCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToLocalStorageCart = (movie) => {
  const cart = getLocalStorageCart();
  const movieInCart = cart.find((cartItem) => cartItem.id === movie.id);

  if (movieInCart) {
    movieInCart.quantity += 1;
  } else {
    const item = { ...movie, quantity: 1 };
    cart.push(item);
  }
  setLocalStorageCart(cart);
};

export const updateLocalStorageCartItemQuantity = (movieId, quantity) => {
  const cart = getLocalStorageCart();
  const index = cart.findIndex((item) => item.id === movieId);

  if (index !== -1) {
    cart[index].quantity = quantity;
  }

  setLocalStorageCart(cart);
};

export const removeLocalStorageCartItem = (movieId) => {
  const cart = getLocalStorageCart();
  const updatedCart = cart.filter((item) => item.id !== movieId);
  setLocalStorageCart(updatedCart);
};
