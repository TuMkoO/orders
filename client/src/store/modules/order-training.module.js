import axios from "axios";
import store from "../index";
import $api from "../../axios/request";
import router from "../../router";

export default {
  namespaced: true,
  state() {
    return {
      ordersTraining: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setOrders(state, orders) {
      state.ordersTraining = orders;
    },
    //добавление новых значений в хранилище []
    addOrder(state, order) {
      state.ordersTraining.push(order);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const { data } = await $api.post("api/order-training/create", payload);

        dispatch(
          "setMessage",
          {
            value: "Новая заявка успешно добавлена",
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
    async load({ commit, dispatch }) {
      try {
        const { data } = await $api.get("api/order-training");

        //вызываем mutation
        commit("setOrders", data);
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
        const { data } = await $api.get(`/api/order-training/${id}`);

        return data;
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: `Заявка с ID ${id} не найдена`,
            type: "danger",
          },
          { root: true }
        );

        throw e;
      }
    },

    async loadByCompany({ commit, dispatch }, id) {
      try {
        const { data } = await $api.get(`/api/order-training/company/${id}`);

        // return data;
        commit("setOrders", data);
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.response.data.message,
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
        const dataload = payload.value;

        if (id) {
          // console.log("certificate id", id);
          const data = await $api.put(`/api/order-training/${id}`, dataload);

          dispatch(
            "setMessage",
            {
              value: "Заявка успешно изменена",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет заявки с таким id или другая ошибка",
              type: "danger",
            },
            { root: true }
          );
        }
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },

    async remove({ commit, dispatch }, id) {
      try {
        const { data } = await $api.delete(`/api/order-training/${id}`);

        dispatch(
          "setMessage",
          {
            value: "Заявка успешно удалена",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },
  },
  getters: {
    orders(state) {
      return state.ordersTraining;
    },
  },
};
