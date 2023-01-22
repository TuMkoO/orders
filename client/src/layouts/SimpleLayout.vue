<template>
  <div class="h-100vh row justify-center items-center" v-if="loading">
    <AppLoader />
  </div>
  <q-layout v-else view="hHh lpR fff">
    <q-page-container class="mh-100vh">
      <router-view />
    </q-page-container>

    <TheFooter />
    <AppMessage />
  </q-layout>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import AppMessage from "../components/ui/AppMessage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import TheFooter from "../components/ui/TheFooter.vue";

export default {
  setup() {
    //store
    const store = useStore();
    //loader
    const loading = ref(false);

    const systemSettings = computed(() => store.getters["system/systems"]);

    onBeforeMount(async () => {
      loading.value = true;

      await store.dispatch("system/load");

      console.log("systemSettings::", systemSettings);

      loading.value = false;
    });

    return {
      loading,
      // systemSettings,
    };
  },
  components: { TheFooter, AppLoader, AppMessage },
};
</script>

<style></style>
