<template>
  <app-page title="Предприятия">
    <div class="q-gutter-y-md">
      <Companies />
    </div>
  </app-page>
</template>

<script>
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import Companies from "../components/companies/Companies.vue";

const metaData = {
  title: "Предприятия",
  titleTemplate: (title) => `${title} | Университетские технологии`,
};

export default {
  setup() {
    useMeta(metaData);
  },

  components: { AppPage, AppLoader, Companies },
};
</script>

<style></style>
