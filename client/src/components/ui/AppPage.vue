<template>
  <q-page padding>
    <h1>{{ title }}</h1>
    <div class="q-pt-md">
      <slot />
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
