<template>
  <app-page title="Заявки на повышение квалификации НК">
    <div>
      <div v-if="loading"><AppLoader /></div>

      <OrdersTrainingTable v-else />
    </div>
  </app-page>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import OrdersTrainingTable from "../components/orders/OrdersTrainingTable.vue";

const metaData = {
  title: "Повышение квалификации НК",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    const orders = store.getters["orderTraining/orders"];

    const user = store.getters["auth/user"];

    onMounted(async () => {
      loading.value = true;

      if (user.roles.length) {
        if (user.roles.includes("admin") || user.roles.includes("god")) {
          await store.dispatch("orderTraining/load");
        } else {
          await store.dispatch("orderTraining/loadByCompany", user.id);
        }
      }

      loading.value = false;
    });

    return {
      loading,
    };
  },
  components: { AppLoader, AppPage, OrdersTrainingTable },
};
</script>

<style></style>
