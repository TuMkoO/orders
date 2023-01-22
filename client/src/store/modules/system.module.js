import axios from "../../axios/request";
// import $api from "../../axios/request";
import store from "../index";

export default {
  namespaced: true,
  state() {
    return {
      systems: [],
    };
  },

  mutations: {
    //обновление в хранилище []
    setSystems(state, systems) {
      state.systems = systems;
    },
    //добавление новых значений в хранилище []
    addSystem(state, system) {
      state.systems.push(system);
    },
  },

  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        console.log(payload);
        //получаем токен из store
        const token = store.getters["auth/token"];

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const { data } = await axios.post("api/system/create", payload, {
          headers: headers,
        });

        dispatch(
          "setMessage",
          {
            value: "Системные настройки успешно добавлены",
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
        const headers = {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        };

        //загрузка с БД сервера
        const { data } = await axios.get("/api/system/", {
          headers: headers,
        });

        console.log("system/module load data::: ", data);

        //вызываем mutation
        commit("setSystems", data[0]);
      } catch (e) {
        console.log(e);
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
        const headers = {
          "Content-Type": "application/json",
        };

        //загрузка с БД сервера
        const { data } = await axios.get(`api/system/${id}`, {
          headers: headers,
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
        //получаем токен из store
        const token = store.getters["auth/token"];
        // id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = payload.values;

        // console.log(payload);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        if (id) {
          // console.log("certificate id", id);
          const { data } = await axios.put(`api/system/${id}`, dataload, {
            headers: headers,
          });

          // console.log("system/module update data::: ", data.systemData);

          commit("setSystems", data.systemData);

          dispatch(
            "setMessage",
            {
              value: "Системные настройки успешно изменены",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет системных настроек с таким id или другая ошибка",
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

    /*async remove({ commit, dispatch }, id) {
      try {
        //получаем токен из store
        const token = store.getters["auth/token"];

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const { data } = await axios.delete(`api/certificate/${id}`, {
          headers: headers,
        });

        dispatch(
          "setMessage",
          {
            value: "Протокол успешно удален",
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
    },*/
  },
  getters: {
    systems(state) {
      return state.systems;
    },
  },
};
