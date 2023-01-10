<template>
  <q-footer class="bg-grey-2 text-white">
    <q-toolbar>
      <div class="q-py-sm">
        <div class="text-grey-8">
          {{ systemData.footer.mainText }}
        </div>
        <div class="text-grey-8">{{ systemData.footer.secondaryText }}</div>
        <a
          v-if="systemData.footer.linkTitle && systemData.footer.link"
          class="text-primary text-decoration-none"
          target="_blank"
          :href="systemData.footer.link"
          >{{ systemData.footer.linkTitle }}</a
        >
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    //store
    const store = useStore();

    const systemData = computed(() => store.getters["system/systems"]);

    return {
      systemData,
    };
  },
};
</script>

<style></style>
