export const state = () => ({
  cart: []
});

export const getters = {};

export const mutations = {
  ADD_TO_CART: (state, product) => {
    const index = state.cart.findIndex(({ id }) => id == product.id);
    if (index == -1) state.cart.push(product);
  },

  SET_CART: (state, cart) => {
    state.cart = cart;
  }
};

export const actions = {};
