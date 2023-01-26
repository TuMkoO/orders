<template>
  <div class="h-100vh row justify-center items-center" v-if="loading">
    <AppLoader />
  </div>
  <q-layout v-else view="hHh lpR fff">
    <TheNavbar />

    <q-page-container class="mh-100vh">
      <router-view />
    </q-page-container>

    <TheFooter />
    <AppMessage />
  </q-layout>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import AppMessage from "../components/ui/AppMessage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import TheNavbar from "../components/ui/TheNavbar.vue";
import TheFooter from "../components/ui/TheFooter.vue";

export default {
  setup() {
    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    onBeforeMount(async () => {
      loading.value = true;

      await store.dispatch("system/load");

      loading.value = false;
    });

    return {
      loading,
    };
  },
  components: { TheNavbar, TheFooter, AppLoader, AppMessage },
};
</script>

<style></style>
