import axios from "axios";
import store from "../index";
import $api from "../../axios/request";
import router from "../../router";

export default {
  namespaced: true,
  state() {
    return {
      listeners: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setListeners(state, listeners) {
      state.listeners = listeners;
    },
    //добавление новых значений в хранилище []
    addListener(state, listener) {
      state.listeners.push(listener);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        // console.log("payload: ", payload);
        const { data } = await $api.post("api/listeners/create", payload);

        dispatch(
          "setMessage",
          {
            value: "Новый слушатель успешно добавлен",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.response.data.message || e.message,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },
    async load({ commit, dispatch }) {
      try {
        const { data } = await $api.get("/api/listeners");

        //вызываем mutation
        commit("setListeners", data);
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

    async loadById({ commit, dispatch }, id) {
      try {
        const { data } = await $api.get(`/api/listeners/${id}`);

        return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: `Слушатель с ID ${id} не найден`,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadByCompany({ commit, dispatch }, id) {
      try {
        const { data } = await $api.get(`/api/listeners/owner/${id}`);

        // return data;
        commit("setListeners", data);
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: `Слушатели предприятия с ID ${id} не найдены`,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async update({ dispatch }, payload) {
      try {
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = payload.values;

        // console.log(payload.values);

        if (id) {
          // console.log("certificate id", id);
          const data = await $api.put(`api/listeners/${id}`, dataload);

          dispatch(
            "setMessage",
            {
              value: "Данные слушателя успешно изменены",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет слушателя с таким id или другая ошибка",
              type: "danger",
            },
            { root: true }
          );
        }
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.response.data.message || e.message,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async remove({ commit, dispatch }, id) {
      try {
        const { data } = await $api.delete(`api/listeners/${id}`);

        dispatch(
          "setMessage",
          {
            value: "Слушатель успешно удалён",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.response?.data?.message || e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },
  },
  getters: {
    listeners(state) {
      return state.listeners;
    },
  },
};
