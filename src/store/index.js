import { createStore } from "vuex";

export default createStore({
  state: {
    notes: [],
  },

  getters: {},

  mutations: {
    setNotes(state, data) {
      state.notes = data;
    },
  },

  actions: {
    addNote({ commit }, data) {
      commit("setNotes", data);
    },
  },
});
