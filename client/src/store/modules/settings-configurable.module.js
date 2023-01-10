import axios from "../../axios/request";
import $api from "../../axios/request";
import store from "../index";

export default {
  namespaced: true,
  state() {
    return {
      ownershipTypes: [],
      certificationSystems: [],
    };
  },
  mutations: {
    //обновление в хранилище
    setOwnershipTypes(state, ownershipTypes) {
      state.ownershipTypes = ownershipTypes;
    },
    //добавление новых значений в хранилище
    addOwnershipType(state, certificationSystem) {
      state.ownershipTypes.push(certificationSystem);
    },
    //обновление в хранилище
    setCertificationSystems(state, certificationSystems) {
      state.certificationSystems = certificationSystems;
    },
    //добавление новых значений в хранилище
    addCertificationSystem(state, certificationSystem) {
      state.certificationSystems.push(certificationSystem);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const dataload = {
          value: payload.values.newVal,
        };
        // link для запроса
        const link = payload.link;

        const data = await $api.post(`api/${link}/create`, dataload);

        dispatch(
          "setMessage",
          {
            value: "Новое значение успешно добавлено ",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        if (e.message === "Request failed with status code 400") {
          dispatch(
            "setMessage",
            {
              value: "Вероятно такое значение уже добавлено",
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

    async load({ commit, dispatch }, link) {
      try {
        //загрузка с БД сервера
        const { data } = await $api.get(`/api/${link}`);

        const configurableItem = Object.keys(data).map((id) => ({
          ...data[id],
          id,
        }));

        //вызываем mutation setCert***s
        switch (link) {
          case "ownership-type":
            commit("setOwnershipTypes", configurableItem);
            break;
          case "certification-system":
            commit("setCertificationSystems", configurableItem);
            break;
        }
      } catch (e) {
        if (e.message === "Request failed with status code 403") {
          dispatch(
            "setMessage",
            {
              value: "У вас недостаточно прав доступа",
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

    async remove({ commit, dispatch }, payload) {
      try {
        // link запроса
        const link = payload.link;

        // id для удаления
        const id = payload.id;
        // console.log("id === ", id);

        if (id) {
          const data = await $api.delete(`/api/${link}/${id}`);

          dispatch(
            "setMessage",
            {
              value: "Значение успешно удалено",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Не выбрано значение для удаления",
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

    async update({ dispatch }, payload) {
      try {
        // link запроса
        const link = payload.link;
        // id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = {
          value: payload.newValues.value,
        };

        if (id) {
          const data = await $api.patch(`/api/${link}/${id}`, dataload);

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
              value: "Нет значения с таким id",
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
    ownershipTypes(state) {
      return state.ownershipTypes;
    },
    certificationSystems(state) {
      return state.certificationSystems;
    },
  },
};
