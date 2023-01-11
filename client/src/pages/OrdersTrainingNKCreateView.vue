<template>
  <app-page title="Создание заявки на повышение квалификации НК">
    <div class="q-gutter-y-md">
      <q-card>
        <div class="q-pa-lg">
          <div v-if="loading"><AppLoader /></div>
          <OrdersTrainingForm v-else orderType="nk" />
        </div>
      </q-card>
    </div>
  </app-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import OrdersTrainingForm from "../components/orders/OrdersTrainingForm.vue";

const metaData = {
  title: "Создание заявки",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //store
    const store = useStore();
    //loader
    const loading = ref(false);

    const user = store.getters["auth/user"];
    const access = ref(false);

    onMounted(async () => {
      loading.value = true;

      if (user.roles) {
        if (user.roles.includes("admin") || user.roles.includes("god")) {
          access.value = true;
          // await store.dispatch("listener/load");
        } else {
          access.value = false;
          // await store.dispatch("listener/loadByCompany", user.company);
        }
      }

      loading.value = false;
    });

    return {
      loading,
      access,
      user,
    };
  },
  components: { AppPage, AppLoader, OrdersTrainingForm },
};
</script>

<style></style>
