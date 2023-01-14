<template>
  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
    <q-card-section class="q-pt-none">
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <q-input
            v-model="companyBank"
            label="Банк"
            :error="!!cBankError"
            :error-message="cBankError"
            dense
          />
        </div>
        <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <q-input
            v-model="companyPayment"
            label="Расчетый счёт"
            type="text"
            mask="####################"
            :error="!!cPayError"
            :error-message="cPayError"
            dense
          />
        </div>
        <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <q-input
            v-model="companyInn"
            label="ИНН"
            type="text"
            mask="########"
            :error="!!cInnError"
            :error-message="cInnError"
            dense
          />
        </div>
        <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <q-input
            v-model="companyOkpo"
            label="ОКПО"
            type="text"
            mask="########"
            :error="!!cOkpoError"
            :error-message="cOkpoError"
            dense
          />
        </div>
        <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <q-input
            v-model="companyBik"
            label="БИК"
            type="text"
            mask="#########"
            :error="!!cBikError"
            :error-message="cBikError"
            dense
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right" class="bg-white">
      <q-btn flat class="text-primary" type="submit" label="Применить" />
      <q-btn flat class="text-red" label="Отмена" v-close-popup />
    </q-card-actions>
  </q-form>
</template>

<script>
import { onMounted, ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  props: {
    requisites: { type: Object, required: false },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const { handleSubmit, resetForm } = useForm();

    onMounted(() => {
      // console.log("props.requisites: ", props.requisites);

      if (
        props.requisites.companyBank &&
        props.requisites.companyPayment &&
        props.requisites.companyInn &&
        props.requisites.companyBik
      ) {
        companyBank.value = props.requisites.companyBank;
        companyPayment.value = props.requisites.companyPayment;
        companyInn.value = props.requisites.companyInn;
        companyBik.value = props.requisites.companyBik;
      }

      if (props.requisites.companyOkpo) {
        companyOkpo.value = props.requisites.companyOkpo;
      }
    });

    const { value: companyBank, errorMessage: cBankError } = useField(
      "companyBank",
      yup.string().trim().required("Пожалуйста, введите название банка")
    );
    const { value: companyPayment, errorMessage: cPayError } = useField(
      "companyPayment",
      yup
        .string()
        .trim()
        .min(20, "Длина не может быть меньше 20 символов")
        .required("Пожалуйста, введите расчетный счёт")
    );
    const { value: companyInn, errorMessage: cInnError } = useField(
      "companyInn",
      yup
        .string()
        .trim()
        .min(8, "Длина не может быть меньше 8 символов")
        .required("Пожалуйста, введите ИНН")
    );
    const { value: companyOkpo, errorMessage: cOkpoError } = useField(
      "companyOkpo",
      yup.string().trim()
    );
    const { value: companyBik, errorMessage: cBikError } = useField(
      "companyBik",
      yup
        .string()
        .trim()
        .min(9, "Длина не может быть меньше 9 символов")
        .required("Пожалуйста, введите БИК")
    );

    const onSubmit = handleSubmit(async (values) => {
      emit("success", values);
    });

    return {
      companyBank,
      companyPayment,
      companyInn,
      companyOkpo,
      companyBik,
      cBankError,
      cPayError,
      cInnError,
      cOkpoError,
      cBikError,

      onSubmit,
    };
  },
};
</script>

<style></style>
