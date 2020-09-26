import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    createBug(state, bug) {
      state.bugs.push(bug)
    },
    removeBug(state, id) {
      state.bugs = state.bugs.filter(b => b.id != id)
    },
    setActiveBug(state, bug) {
      state.activeBug = bug
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit }) {
      try {
        let res = await api.get('bugs')
        commit('setBugs', res.data)
      } catch (error) {

      }
    },
    async addBug({ commit }, bugData) {
      try {
        let res = await api.post('bugs', bugData)
        commit("createBug", res.data)
        console.log(res);
      } catch (error) {

      }
    },
    async deleteBug({ commit }, bugId) {
      try {
        await api.delete('bugs/' + bugId)
        commit("removeBug", bugId)
      } catch (error) {

      }
    },
    async getActiveBug({ commit }, bugId) {
      try {
        let res = await api.get('bugs/' + bugId)
        commit('setActiveBug', res.data)
        // @ts-ignore
        // this.dispatch("getLists", bugId);
      } catch (error) {
        console.error(error);
      }
    },
  }
});
