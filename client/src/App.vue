<template>
  <component :is="layout + '-layout'" v-if="layout && !loading" />
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import MainLayout from "./layouts/MainLayout.vue";
import SimpleLayout from "./layouts/SimpleLayout.vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    //store
    const store = useStore();
    //loading
    const loading = ref(false);

    //проверка авторизации пользователя при входе на сайт
    onBeforeMount(async () => {
      // console.log("App.vue || Проверяем авторизацию");
      // console.log("route:: ", route);

      loading.value = true;

      //если есть Токен в localstorage
      if (localStorage.getItem("token")) {
        await store.dispatch("auth/checkAuth");

        //получаем права текущего пользователя
        const userRole = store.getters["auth/user"].roles;

        //проверка прав доступа
        if (userRole && route.meta.access) {
          // console.log("userRole:", userRole);
          // console.log("route:", route);
          // console.log("route.meta.access:", route.meta._value.access);
          userRole.forEach((role) => {
            if (
              !route.meta.access.includes(role) &&
              route.fullPath !== "/privacy-policy"
            ) {
              store.dispatch("setMessage", {
                value: "У вас недостаточно прав доступа",
                type: "danger",
              });

              router.push("/");
            }
          });
        }
      }

      loading.value = false;
    });

    return {
      layout: computed(() => route.meta.layout),
      loading,
    };
  },

  components: { MainLayout, SimpleLayout },
};
</script>
