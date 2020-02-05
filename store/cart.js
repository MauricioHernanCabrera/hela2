export const state = () => ({
  cart: []
});

export const getters = {};

export const mutations = {
  ADD_TO_CART: (state, product) => {
    const index = state.cart.findIndex(({ _id }) => _id == product._id);
    if (index == -1) state.cart.push(product);
  }
};

export const actions = {};
