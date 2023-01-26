<template>
  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
    <q-card-section class="q-pt-none">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6 col-md-6">
          <q-select
            square
            v-model.trim="education"
            :options="educationOptions"
            label="Уровень образования"
            :error="!!educationError"
            :error-message="educationError"
            options-dense
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="institution"
            label="Образовательное учреждение (полностью)"
            type="text"
            :error="!!iError"
            :error-message="iError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="specialization"
            label="Наименование специальности (полностью, согласно документа об образовании)"
            type="text"
            :error="!!sError"
            :error-message="sError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="diplomSeries"
            label="Серия документа об образовании"
            type="text"
            :error="!!dSeriesError"
            :error-message="dSeriesError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            v-model.trim="diplomNumber"
            label="Номер документа об образовании"
            type="text"
            :error="!!dNumberError"
            :error-message="dNumberError"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6">
          <q-input
            label="Дата выдачи документа об образовании"
            v-model="diplomDate"
            mask="date"
            :error="!!dDateError"
            :error-message="dDateError"
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="diplomDate">
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
    education: { type: Object, required: false },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const { handleSubmit, resetForm } = useForm();

    onMounted(() => {
      if (
        props.education?.education &&
        props.education?.institution &&
        props.education?.specialization &&
        props.education?.diplomSeries &&
        props.education?.diplomNumber &&
        props.education?.diplomDate
      ) {
        education.value = props.education.education;
        institution.value = props.education.institution;
        specialization.value = props.education.specialization;
        diplomSeries.value = props.education.diplomSeries;
        diplomNumber.value = props.education.diplomNumber;
        diplomDate.value = props.education.diplomDate;
      }
    });

    const { value: education, errorMessage: educationError } = useField(
      "education",
      yup.string().trim().required("Пожалуйста, укажите уровень образования")
    );
    const { value: institution, errorMessage: iError } = useField(
      "institution",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите образовательное учреждение")
    );
    const { value: specialization, errorMessage: sError } = useField(
      "specialization",
      yup.string().trim().required("Пожалуйста, укажите специальность")
    );
    const { value: diplomSeries, errorMessage: dSeriesError } = useField(
      "diplomSeries",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите серию документа об образовании")
    );
    const { value: diplomNumber, errorMessage: dNumberError } = useField(
      "diplomNumber",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите номер документа об образовании")
    );
    const { value: diplomDate, errorMessage: dDateError } = useField(
      "diplomDate",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите дату выдачи документа об образовании")
    );

    const onSubmit = handleSubmit(async (values) => {
      emit("success", values);
    });

    return {
      education,
      institution,
      specialization,
      diplomSeries,
      diplomNumber,
      diplomDate,
      educationError,
      iError,
      sError,
      dSeriesError,
      dNumberError,
      dDateError,

      educationOptions: ["Высшее", "Среднее профессиональное", "Среднее общее"],

      onSubmit,
    };
  },
};
</script>

<style></style>
