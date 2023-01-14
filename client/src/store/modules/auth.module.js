import axios from "axios";
import store from "../index";
import $api from "../../axios/request";
import router from "../../router";
// import { error } from "../../utils/error";

const TOKEN_KEY = "token";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      user: {},
      users: [],
      isAuth: false,
    };
  },
  mutations: {
    // получение токена для login
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    // очистка токена при logout
    logout(state) {
      state.token = null;
      state.isAuth = false;
      state.user = {};
      localStorage.removeItem(TOKEN_KEY);
    },
    setIsAuth(state) {
      state.isAuth = true;
    },
    clearIsAuth(state) {
      state.isAuth = false;
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const { data } = await $api.post(
          "api/auth/login",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        // console.log("auth.module/login() data.user:: ", data.user);

        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          commit("setToken", data.accessToken);
          commit("setIsAuth");
          commit("setUser", data.user);
          commit("clearMessage", null, {
            root: true,
          });
        }
      } catch (e) {
        // console.log(e);
        let error = null;
        // if (e == "Error: Request failed with status code 400") {
        //   error = "Введены неверные логин или пароль";
        // }
        if (e.response.status == 400) {
          error = "Введены неверные логин или пароль";
        }

        dispatch(
          "setMessage",
          {
            value: error || e,
            type: "danger",
          },
          {
            root: true,
          }
        );

        throw e;
      }
    },

    async logout({ commit }) {
      //получаем токен из store
      const token = store.getters["auth/token"];

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const data = await $api.post(
          "/api/auth/logout",
          {
            headers: headers,
          },
          { withCredentials: true }
        );
        commit("logout");
      } catch (error) {}
    },

    async register({ commit, dispatch }, payload) {
      try {
        // console.log(payload);

        const { data } = await $api.post(
          "api/auth/register",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        dispatch(
          "setMessage",
          {
            value: "Новый пользователь успешно зарегистрирован",
            type: "primary",
          },
          { root: true }
        );

        return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.response.data.message || "Ошибка при регистрации",
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadUsers({ commit, dispatch }) {
      try {
        const { data } = await $api.get("/api/auth/users", {
          withCredentials: true,
        });

        //console.log("loadUsers: ", data); // current user id  ==> data.user
        commit(
          "setUsers",
          data.filter((item) => !item.roles.includes("god"))
        );
        // return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadCurrentUserId({ commit, dispatch }) {
      try {
        const { data } = await $api.get("api/auth/user", {
          withCredentials: true,
        });
        // console.log("loadCurrentUserId user: ", data); // current user id  ==> data.user

        if (data) {
          return data.user;
        } else {
          commit("logout");
        }
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadUserById({ commit, dispatch }, id) {
      try {
        const { data } = await $api.get(`/api/auth/users/${id}`, {
          withCredentials: true,
        });

        return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async update({ commit, dispatch }, payload) {
      try {
        // console.log(payload);
        // const id = store.getters["auth/user"].id;

        // const dataload = {
        //   id: userId,
        //   email: payload.email,
        //   name: payload.name,
        //   role: payload.role,
        //   company: payload.company || companyId || "",
        // };

        // console.log(dataload);

        const { data } = await $api.post(
          "api/auth/update",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        if (data) {
          commit("setUser", data);
        }

        dispatch(
          "setMessage",
          {
            value: "Изменения в профиль успешно внесены",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async updateById({ commit, dispatch }, payload) {
      try {
        // console.log("payload: ", payload);
        const { data } = await $api.post(
          "/api/auth/update",
          {
            ...payload,
          },
          { withCredentials: true }
        );

        dispatch(
          "setMessage",
          {
            value: `Изменения в профиль пользователя ${payload.firsName} успешно внесены`,
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async updatePassword({ dispatch }, payload) {
      try {
        const userId = store.getters["auth/user"].id;

        const dataload = {
          id: userId,
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
        };

        const { data } = await $api.post(
          "api/auth/update-password",
          {
            ...dataload,
          },
          { withCredentials: true }
        );

        // console.log("UPDATE PASSWORD ", data);

        dispatch(
          "setMessage",
          {
            value: data.message,
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        // console.log(e);
        dispatch(
          "setMessage",
          {
            value: "Введен неверный текущий пароль или другая ошибка",
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async updateUserPassword({ dispatch }, payload) {
      try {
        // const dataload = {
        //   id: payload.userId,
        //   newPassword: payload.newPassword,
        // };

        const { data } = await $api.post(
          "api/auth/update-user-password",
          payload,
          {
            withCredentials: true,
          }
        );

        // console.log("UPDATE PASSWORD ", data);

        dispatch(
          "setMessage",
          {
            value: data.message,
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        // console.log(e);
        dispatch(
          "setMessage",
          {
            value: e,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async remove({ commit, dispatch }, id) {
      try {
        const { data } = await $api.delete(`api/auth/${id}`);

        dispatch(
          "setMessage",
          {
            value: data.message,
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        // console.log(e.message);
        if (e.message == "Request failed with status code 400") {
          dispatch(
            "setMessage",
            {
              value:
                "Невозможно удалить пользователя, у которого есть слушатели!",
              type: "danger",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: e,
              type: "danger",
            },
            { root: true }
          );
        }
      }
    },

    //для проверки при входе на сайт, вызывается один раз
    async checkAuth({ commit }) {
      // console.log("auth.module/checkAuth()");
      try {
        // axios.defaults.baseURL = process.env.VUE_APP_DB_URL;
        // axios.defaults.baseURL = process.env.VUE_APP_DB_URL_HOSTING;

        process.env.NODE_ENV === "production"
          ? (axios.defaults.baseURL = process.env.VUE_APP_DB_URL_HOSTING)
          : (axios.defaults.baseURL = process.env.VUE_APP_DB_URL);

        const { data } = await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });

        if (data.accessToken) {
          //добавляем в localStorage/token accessToken
          localStorage.setItem("token", data.accessToken);

          // console.log("checkAuth==", data.user);

          commit("setIsAuth");
          commit("setToken", data.accessToken);
          commit("setUser", data.user);
        }
      } catch (e) {
        // console.log("auth.module/checkAuth e", e);

        //необходимо очистить isAuth в store
        commit("clearIsAuth");

        //удалить токен
        localStorage.removeItem("token");

        router.push("/auth?message=auth");
      }
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      return !!getters.token;
    },
    isAuth(state) {
      return state.isAuth;
    },
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
  },
};
