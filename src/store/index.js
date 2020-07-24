import Vue from "vue";
import Vuex from "vuex";
import $axios from "../services/local-api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    getUsers: state => {
      return state.users;
    }
  },
  mutations: {
    set_users(state, users) {
      state.users = users;
    }
  },
  actions: {
    fetchUsers({ commit }) {
      return new Promise(resolve => {
        $axios.get("people").then(response => {
          commit("set_users", response.data);
          resolve();
        });
      });
    },
    async saveUser({ dispatch }, user) {
      const { data: userCreated } = await $axios.post("people", user);
      console.log("saveUser -> userCreated", userCreated);
      dispatch("fetchUsers");
    },
    async deleteUser({ dispatch }, user) {
      console.log("deleteUser -> user", user);
      const { data: userDeleted } = await $axios.delete(`people/${user.id}`);
      console.log("deleteUser -> userDeleted", userDeleted);
      dispatch("fetchUsers");
    }
  },
  modules: {}
});
