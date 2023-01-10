<template>
  <div class="row justify-center">
    <div class="q-pt-xl">
      <q-card>
        <q-card-section>
          <div class="column q-pa-md">
            <p class="text-center text-subtitle1">Страница не найдена</p>
            <q-btn color="primary" to="/">Вернуться на главную</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useMeta } from "quasar";

const metaData = {
  title: "Страница не найдена",
  titleTemplate: (title) => `${title} | Университетские технологии`,
};

export default {
  setup() {
    useMeta(metaData);
  },
};
</script>

<style></style>
