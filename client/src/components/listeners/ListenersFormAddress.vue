<template>
  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
    <q-card-section class="q-pt-none">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model="mailCode"
            label="Почтовый индекс"
            type="text"
            mask="######"
            :error="!!mCodeError"
            :error-message="mCodeError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="city"
            label="Город"
            :error="!!cityError"
            :error-message="cityError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model="township"
            label="Поселок городского типа"
            :error="!!townshipError"
            :error-message="townshipError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="street"
            label="Улица, проспект, бульвар и т.п."
            :error="!!streetError"
            :error-message="streetError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="homeNumber"
            label="Дом"
            :error="!!hNumberError"
            :error-message="hNumberError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="apartment"
            label="Квартира, комната, офис, строение и т.п."
            :error="!!apartmentError"
            :error-message="apartmentError"
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
    address: { type: Object, required: false },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const { handleSubmit, resetForm } = useForm();

    onMounted(() => {
      if (
        props.address?.mailCode &&
        props.address?.city &&
        props.address?.street &&
        props.address?.homeNumber
      ) {
        mailCode.value = props.address.mailCode;
        city.value = props.address.city;
        township.value = props.address.township;
        street.value = props.address.street;
        homeNumber.value = props.address.homeNumber;
        apartment.value = props.address.apartment;
      }
    });

    const { value: mailCode, errorMessage: mCodeError } = useField(
      "mailCode",
      yup
        .string()
        .trim()
        .min(6, "Длина почтового индекса не может быть меньше 6 символов")
        .required("Пожалуйста, введите почтовый индекс слушателя")
    );
    const { value: city, errorMessage: cityError } = useField(
      "city",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите город проживания слушателя")
    );
    const { value: township, errorMessage: townshipError } = useField(
      "township",
      yup.string().trim()
    );
    const { value: street, errorMessage: streetError } = useField(
      "street",
      yup
        .string()
        .trim()
        .required(
          "Пожалуйста, введите улицу, проспект, бульвар и т.п. проживания слушателя"
        )
    );
    const { value: homeNumber, errorMessage: hNumberError } = useField(
      "homeNumber",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите номер дома проживания слушателя")
    );
    const { value: apartment, errorMessage: apartmentError } = useField(
      "apartment",
      yup.string().trim()
    );

    const onSubmit = handleSubmit(async (values) => {
      emit("success", values);
    });

    return {
      mailCode,
      city,
      township,
      street,
      homeNumber,
      apartment,
      mCodeError,
      cityError,
      townshipError,
      streetError,
      hNumberError,
      apartmentError,

      onSubmit,
    };
  },
};
</script>

<style></style>
