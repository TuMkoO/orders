<template>
  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
    <q-card-section class="q-pt-none">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-4 col-md-4">
          <q-input
            v-model.trim="passportSeries"
            label="Серия"
            :error="!!pSeriesError"
            :error-message="pSeriesError"
            dense
          />
        </div>
        <div class="col-12 col-sm-4 col-md-4">
          <q-input
            v-model.trim="passportNumber"
            label="Номер"
            type="number"
            :error="!!pNumberError"
            :error-message="pNumberError"
            dense
          />
        </div>
        <div class="col-12 col-sm-4 col-md-4">
          <q-input
            label="Дата выдачи"
            v-model="passportDate"
            mask="date"
            :error="!!pDateError"
            :error-message="pDateError"
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="passportDate">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Закрыть"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-sm-4 col-md-4">
          <q-input
            v-model.trim="passportCode"
            label="Код подразделения"
            type="number"
            :error="!!pCodeError"
            :error-message="pCodeError"
            dense
          />
        </div>
        <div class="col-12 col-sm-8 col-md-8">
          <q-input
            v-model.trim="passportIssued"
            label="Кем выдан (полностью)"
            :error="!!pIssuedError"
            :error-message="pIssuedError"
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
    passport: { type: Object, required: false },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const { handleSubmit, resetForm } = useForm();

    onMounted(() => {
      // console.log(props.passport);
      if (
        props.passport?.passportSeries &&
        props.passport?.passportNumber &&
        props.passport?.passportIssued &&
        props.passport?.passportDate
      ) {
        passportSeries.value = props.passport.passportSeries;
        passportNumber.value = props.passport.passportNumber;
        passportIssued.value = props.passport.passportIssued;
        passportDate.value = props.passport.passportDate;
        passportCode.value = props.passport.passportCode;
      }
    });

    const { value: passportSeries, errorMessage: pSeriesError } = useField(
      "passportSeries",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите серию паспорта слушателя")
    );
    const { value: passportNumber, errorMessage: pNumberError } = useField(
      "passportNumber",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите номер паспорта слушателя")
    );
    const { value: passportIssued, errorMessage: pIssuedError } = useField(
      "passportIssued",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите кем выдан паспорта слушателя")
    );
    const { value: passportDate, errorMessage: pDateError } = useField(
      "passportDate",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите дату выдачи паспорта слушателя")
    );
    const { value: passportCode, errorMessage: pCodeError } = useField(
      "passportCode",
      yup.string().trim()
    );

    const onSubmit = handleSubmit(async (values) => {
      // console.log(values);

      // const requisites = await store.dispatch("auth/updateRequisites", {
      //   ...values,
      //   id: props.requisites.id,
      // });

      // resetForm();

      emit("success", values);
    });

    return {
      passportSeries,
      passportNumber,
      passportIssued,
      passportDate,
      passportCode,
      pSeriesError,
      pNumberError,
      pIssuedError,
      pDateError,
      pCodeError,

      onSubmit,
    };
  },
};
</script>

<style></style>
