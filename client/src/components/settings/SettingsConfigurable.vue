<template>
  <div>
    <div class="option-group-wrapper">
      <div class="option-group">
        <q-list v-if="options.length" dense>
          <q-item v-for="(opt, idx) in options" :key="idx">
            <q-item-section avatar>
              <q-btn
                @click="onRemove(opt._id)"
                color="red"
                icon="delete"
                size="sm"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ opt.value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class="q-pa-md text-grey-6">
          Список значений пуст. Добавьте новое значение
        </div>
      </div>
    </div>

    <div>
      <q-input
        bottom-slots
        v-model="newVal"
        label="Добавить значение"
        :error="!!nError"
        :error-message="nError"
      >
        <template v-slot:append>
          <q-btn @click="onSubmit" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  props: {
    storeLink: { type: String, required: true },
    // errorText: { type: String, required: true },
    storeName: { type: String, required: true },
    // itemsList: { type: Array, required: true },
  },
  setup(props) {
    //подключаем store
    const store = useStore();

    const options = computed(
      () => store.getters[`settingsConfigurable/${props.storeName}`]
    );

    const { handleSubmit, resetForm } = useForm();

    const { value: newVal, errorMessage: nError } = useField(
      "newVal",
      yup.string().trim().required("Пожалуйста, введите значение")
    );

    const onSubmit = handleSubmit(async (values) => {
      const link = props.storeLink;

      // вызываем метод create для создания записи в БД
      await store.dispatch("settingsConfigurable/create", { values, link });

      //обновить список:
      await store.dispatch(`settingsConfigurable/load`, link);

      resetForm();
    });
    const onRemove = async (id) => {
      const link = props.storeLink;

      if (id && link) {
        await store.dispatch(`settingsConfigurable/remove`, { id, link });

        //обновить список:
        await store.dispatch(`settingsConfigurable/load`, link);
      }
    };

    return {
      options,
      newVal,
      nError,
      onSubmit,
      onRemove,
    };
  },
};
</script>

<style lang="scss">
.option-group {
  max-height: 130px;
  overflow-y: auto;
  &-wrapper {
    position: relative;
    // border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12);
    // box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    //   0 3px 1px -2px rgb(0 0 0 / 12%);
  }
}
</style>
