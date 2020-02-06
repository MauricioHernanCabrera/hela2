export default function(context) {
  if (process.browser) {
    const { store } = context;

    const cart = store.$cookies.get("cart") || [];
    store.commit("cart/SET_CART", cart);

    store.subscribe(() => {
      const cart = store.state.cart.cart;

      store.$cookies.set("cart", JSON.parse(JSON.stringify(cart)), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
    });
  }
}
