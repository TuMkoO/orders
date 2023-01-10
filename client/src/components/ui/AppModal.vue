<template>
  <!-- <q-btn label="Confirm" color="primary" @click="confirm = true" /> -->
  <q-dialog v-model="confirm" persistent :full-width="fullSize">
    <q-card>
      <q-toolbar>
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup @click="close" />
      </q-toolbar>
      <slot />
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    show: { type: Boolean, required: true },
    fullSize: { type: Boolean, required: false },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const confirm = ref(false);

    const close = () => {
      confirm.value = false;
      emit("close");
    };

    watch(
      () => props.show,
      (newVal, oldVal) => {
        confirm.value = newVal;
      }
    );

    return {
      confirm,
      close,
    };
  },
};
</script>

<style></style>
