<template>
  <app-page title="Слушатели">
    <div class="q-gutter-y-md">
      <div v-if="loading"><AppLoader /></div>
      <ListenersTable v-else />
    </div>
  </app-page>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import ListenersTable from "../components/listeners/ListenersTable.vue";

const metaData = {
  title: "Слушатели",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    const user = computed(() => store.getters["auth/user"]);

    onMounted(async () => {
      loading.value = true;

      if (user.value.roles.length) {
        if (
          user.value.roles.includes("admin") ||
          user.value.roles.includes("god")
        ) {
          await store.dispatch("listener/load");
          await store.dispatch("auth/loadUsers");
        } else {
          await store.dispatch("listener/loadByCompany", user.value.id);
        }
      }

      loading.value = false;
    });

    return {
      loading,
    };
  },

  components: { AppPage, AppLoader, ListenersTable },
};
</script>

<style></style>
