import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"
import ns from "../Services/NotificationService"

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
    closeBug(state, bug) {
      state.bugs = bug
    },
    setActiveBug(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    createNote(state, note) {
      state.notes = note
    },
    removeNote(state, note) {
      state.notes = state.notes.filter(n => n.id != note)
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
        router.push({ path: "bugs/" + res.data.id })
        this.dispatch("getActiveBug", res.data.id);
        this.dispatch("getNotes", bugData);

      } catch (error) {

      }
    },

    async closeBug({ commit }, bugId) {
      try {
        if (await ns.confirmAction("Do you want to close this bug?", "It'll be squashed forever ...")) {
          await api.delete('bugs/' + bugId)
        } commit("closeBug", bugId)
        commit("setActiveBug", bugId)
      } catch (error) {

      }
    },
    async getActiveBug({ commit }, bugId) {
      try {
        let res = await api.get('bugs/' + bugId)
        commit('setActiveBug', res.data)
        // @ts-ignore
        this.dispatch("getNotes", bugId);
      } catch (error) {
        console.error(error);
      }
    },
    async getNotes({ commit }, bug) {
      try {
        console.log(bug);
        debugger
        let res = await api.get(bug + '/notes')
        console.log(res);
        // let res = await api.get('bugs/' + bugId + '/notes')
        // let res = await api.get('notes/')
        commit('setNotes', res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({ commit, state }, noteData) {
      try {
        let res = await api.post('notes', noteData)
        commit("createNote", [...state.notes, res.data])
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ commit }, noteId) {
      try {
        if (await ns.confirmAction("Do you want to delete this Note?", "You'll never get it back ...")) {
          await api.delete('notes/' + noteId)
          commit("removeNote", noteId)
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ commit }, bugData) {
      try {
        let res = await api.put('bugs/' + bugData.id, bugData)
        commit('setActiveBug', res.data)
      } catch (error) {
        console.error(error);
      }
    },
  }
});
