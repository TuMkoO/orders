// import { store } from "quasar/wrappers";
import { createStore, createLogger } from "vuex";
import auth from "./modules/auth.module";
import system from "./modules/system.module";
import orderTraining from "./modules/order-training.module";
import orderTrainingNumbering from "./modules/order-training-numbering.module";
import settingsConfigurable from "./modules/settings-configurable.module";
import listener from "./modules/listener.module";

const plugins = [];

if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      usersTabsActive: "users",
    };
  },
  getters: {
    usersTabsActive(state) {
      return state.usersTabsActive;
    },
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    },

    setUsersTab(state, usersTab) {
      state.usersTabsActive = usersTab;
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit("setMessage", message);

      setTimeout(() => {
        commit("clearMessage");
      }, 5000);
    },
    setUsersTab({ commit }, usersTab) {
      commit("setUsersTab", usersTab);
    },
  },
  modules: {
    auth,
    system,
    orderTraining,
    orderTrainingNumbering,
    listener,
    settingsConfigurable,
  },
});
