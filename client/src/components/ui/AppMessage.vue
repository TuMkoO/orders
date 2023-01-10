<template>
  <div
    v-if="message"
    class="q-pa-md q-gutter-sm fixed-top row justify-end z-max"
  >
    <q-banner
      inline-actions
      rounded
      :class="[
        'text-white',
        'message',
        { 'bg-blue': message.type == 'primary' },
        { 'bg-red': message.type == 'danger' },
        { 'bg-orange': message.type == 'warning' },
      ]"
    >
      {{ message.value }}
      <template v-slot:action>
        <q-btn flat icon="close" @click="close" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const messageTypes = {
      primary: "primary",
      danger: "danger",
      warning: "warning",
    };

    const message = computed(() => store.state.message);
    const messageType = computed(() =>
      message.value ? messageTypes[message.value.type] : null
    );

    return {
      message,
      messageType,
      close: () => store.commit("clearMessage"),
    };
  },
};
</script>

<style></style>
