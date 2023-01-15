import axios from "axios";
import store from "../index";
import $api from "../../axios/request";
import router from "../../router";

export default {
  namespaced: true,
  state() {
    return {
      ordersTrainingNumbering: [],
    };
  },
  mutations: {
    //обновление в хранилище []
    setOrderNumberings(state, numberings) {
      state.ordersTrainingNumbering = numberings;
    },
    //добавление новых значений в хранилище []
    addOrderNumbering(state, numbering) {
      state.ordersTrainingNumbering.push(numbering);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const { data } = await $api.post(
          "api/order-training-numbering/create",
          payload
        );

        dispatch(
          "setMessage",
          {
            value: "Новая значение успешно добавлено",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        if (e.message === "Request failed with status code 400") {
          dispatch(
            "setMessage",
            {
              value: "Значение с таким номером уже добавлено",
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

        throw e;
      }
    },
    async load({ commit, dispatch }) {
      try {
        const { data } = await $api.get("/api/order-training-numbering");

        //вызываем mutation
        commit("setOrderNumberings", data);
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

    async update({ dispatch }, payload) {
      try {
        // console.log(payload);
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = {
          prefix: payload.prefix,
          num: payload.num,
        };

        if (id) {
          // console.log("certificate id", id);
          const data = await $api.put(
            `/api/order-training-numbering/${id}`,
            dataload
          );

          dispatch(
            "setMessage",
            {
              value: "Значение успешно изменено",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет значения с таким id или другая ошибка",
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
  },
  getters: {
    ordersNumbering(state) {
      return state.ordersTrainingNumbering;
    },
  },
};
