export const state = () => ({
  title: "Hela2",

  tasteList: [
    {
      id: 1,
      name: "Chocolate",
      img: "/images/chocolate.png"
    },
    {
      id: 2,
      name: "Dulce de leche",
      img: "/images/dulce_de_leche.png"
    },
    {
      id: 3,
      name: "Frutilla",
      img: "/images/frutilla.png"
    }
  ]
});

export const getters = {};

export const mutations = {
  SET_TITLE(state, payload) {
    state.title = payload;
  }
};

export const actions = {};
