<template>
  <div>
    <q-card class="">
      <q-card-section>
        <div class="q-pa-md">
          <div class="text-subtitle1 text-center">
            Повышение квалификации НК и РИ
          </div>
          <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <q-input
              v-model="prefix"
              label="Префикс нумерации"
              :error="!!pError"
              :error-message="pError"
            />

            <q-input
              v-model="num"
              label="Продолжать нумерацию с"
              type="number"
              :error="!!nError"
              :error-message="nError"
            />

            <div>
              <q-btn
                class="q-mr-md"
                label="Сохранить"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  setup() {
    const store = useStore();
    const { handleSubmit } = useForm();

    const { value: prefix, errorMessage: pError } = useField(
      "prefix",
      yup.string().trim().required("Пожалуйста, введите префикс нумерации")
    );
    const { value: num, errorMessage: nError } = useField(
      "num",
      yup
        .number("Введите число")
        .required(
          "Пожалуйста, введите номер заявки, с коротого необходимо будет продолжить нумерацию"
        )
        .min(0, "Число должно быть больше 0")
        .integer("Число должно быть целым")
    );

    const numbering = computed(
      () => store.getters["orderTrainingNumbering/ordersNumbering"]
    );

    onMounted(() => {
      prefix.value = numbering.value[0].prefix;
      num.value = numbering.value[0].num;
    });

    const onSubmit = handleSubmit(async (values) => {
      try {
        // await store.dispatch("orderTrainingNumbering/create", values);
        await store.dispatch("orderTrainingNumbering/update", {
          ...values,
          id: numbering.value[0]._id,
        });
      } catch (e) {}
    });

    return {
      prefix,
      num,
      pError,
      nError,
      numbering,
      onSubmit,
    };
  },
};
</script>

<style></style>
