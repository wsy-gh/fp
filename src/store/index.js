import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageData: [],
    uuidLookup: {},
  },
  getters: {
    getPageData: (state) => {
      return state.pageData;
    },
    getUuidLookup: (state) => {
      return state.uuidLookup;
    },
  },
  mutations: {
    setPageData(state, pageData) {
      state.pageData = pageData;
    },
    setUuidLookup(state, uuidLookup) {
      state.uuidLookup = uuidLookup;
    },
  },
  actions: {
    setPageData({ commit }, pageData) {
      commit("setPageData", pageData);
    },
    setUuidLookup({ commit }, uuidLookup) {
      commit("setUuidLookup", uuidLookup);
    },
  },
});
