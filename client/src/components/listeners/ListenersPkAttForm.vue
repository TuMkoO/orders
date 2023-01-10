<template>
  <q-card class="" style="max-width: 1200px">
    <q-card-section>
      <div class="text-h6 flex justify-between">
        {{
          listenerInfo && typeInfo == "pk"
            ? "Редактировать сведения о повышении квалификации"
            : listenerInfo && typeInfo == "nk"
            ? "Редактировать сведения об аттестации НК"
            : listenerInfo && typeInfo == "ri"
            ? "Редактировать сведения об аттестации РИ"
            : "Добавить сведения о повышении квалификации или аттестации"
        }}

        <q-btn flat round dense icon="close" v-close-popup />
      </div>
    </q-card-section>
    <form @submit.prevent.stop="onSubmit">
      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-sm">
          <div v-if="!listenerInfo" class="col-12 text-center q-mb-sm">
            <q-btn-toggle
              v-model="typeInfo"
              toggle-color="primary"
              @update:model-value="changeInfoType"
              :options="[
                { label: 'ПК', value: 'pk' },
                { label: 'Атт. НК', value: 'nk' },
                { label: 'Атт. РИ', value: 'ri' },
              ]"
            />
          </div>
          <div v-if="typeInfo == 'pk'" class="col-12">
            <q-input
              v-model.trim="pkUniversity"
              label="Образовательное учреждение (полностью)"
              :error="!!pkUniversityError"
              :error-message="pkUniversityError"
              dense
            />
            <q-input
              v-model.trim="pkProgram"
              label="Наименование программы повышения квалификации (полностью, согласно удостоверения о повышении квалификации)"
              :error="!!pkProgramError"
              :error-message="pkProgramError"
              dense
            />
            <q-input
              v-model.trim="pkNumber"
              label="Серия и номер удостоверения"
              :error="!!pkNumberError"
              :error-message="pkNumberError"
              dense
            />
            <q-input
              label="Дата выдачи удостоверения"
              v-model="pkDate"
              mask="date"
              :error="!!pkDateError"
              :error-message="pkDateError"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="pkDate">
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
            <q-input
              label="Срок действия удостоверения"
              v-model="pkExpirationDate"
              mask="date"
              :error="!!pkExpirationDateError"
              :error-message="pkExpirationDateError"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="pkExpirationDate">
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
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-input
              v-model.trim="nkOrganization"
              label="Независимый орган по аттестации персонала (сокращенно)"
              :error="!!nkOrganizationError"
              :error-message="nkOrganizationError"
              dense
            />
          </div>
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-input
              v-model.trim="nkNumber"
              label="Серия и номер удостоверения"
              :error="!!nkNumberError"
              :error-message="nkNumberError"
              dense
            />
          </div>
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="certificationSystemNk"
              :options="certificationSystemOptions"
              label="Система аттестации"
              :error="!!certSystemNkError"
              :error-message="certSystemNkError"
              dense
              options-dense
              emit-value
              map-options
            />
          </div>

          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="certificationTypeNk"
              :options="certificationTypeOptions"
              label="Вид аттестации"
              :error="!!certTypeNkError"
              :error-message="certTypeNkError"
              dense
              options-dense
            />
          </div>
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="methodNk"
              :options="methodNkOptions"
              label="Метод НК"
              :error="!!methodNkError"
              :error-message="methodNkError"
              dense
              options-dense
              emit-value
              map-options
            />
          </div>
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="qualificationLevelNk"
              :options="qualificationLevelOptions"
              label="Уровень квалификации"
              :error="!!qLevelNkError"
              :error-message="qLevelNkError"
              dense
              options-dense
            />
          </div>
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-input
              label="Дата выдачи удостоверения"
              v-model="nkDate"
              mask="date"
              :error="!!nkDateError"
              :error-message="nkDateError"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="nkDate">
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
          <div v-if="typeInfo == 'nk'" class="col-12 col-sm-6 col-md-3">
            <q-input
              label="Срок действия удостоверения"
              v-model="nkExpirationDate"
              mask="date"
              :error="!!nkExpirationDateError"
              :error-message="nkExpirationDateError"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="nkExpirationDate">
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
          <div v-if="typeInfo == 'nk'" class="col-12">
            Объекты контроля:
            <q-tree
              class="col-12"
              :nodes="controlObject"
              v-model:ticked="ticked"
              node-key="value"
              tick-strategy="strict"
            />

            <div v-if="tickedError" class="q-field--error">
              <div class="q-field__bottom row items-start">
                <div class="q-field__messages col">
                  <div class="" role="alert">
                    {{ tickedError }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6">
            <q-input
              v-model.trim="riOrganization"
              label="Независимый орган по аттестации персонала (сокращенно)"
              :error="!!riOrganizationError"
              :error-message="riOrganizationError"
              dense
            />
          </div>
          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6">
            <q-input
              v-model.trim="riNumber"
              label="Серия и номер удостоверения"
              :error="!!riNumberError"
              :error-message="riNumberError"
              dense
            />
          </div>
          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="certificationSystemRi"
              :options="certificationSystemOptions"
              label="Система аттестации"
              :error="!!certSystemRiError"
              :error-message="certSystemRiError"
              dense
              options-dense
              emit-value
              map-options
            />
          </div>
          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="certificationTypeRi"
              :options="certificationTypeOptions"
              label="Вид аттестации"
              :error="!!certTypeRiError"
              :error-message="certTypeRiError"
              dense
              options-dense
            />
          </div>
          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="qualificationLevelRi"
              :options="qualificationLevelOptions"
              label="Уровень квалификации"
              :error="!!qLevelRiError"
              :error-message="qLevelRiError"
              dense
              options-dense
            />
          </div>
          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6 col-md-3">
            <q-select
              square
              v-model="typeRi"
              :options="typeRiOptions"
              label="Вид РИ"
              :error="!!typeRiError"
              :error-message="typeRiError"
              dense
              options-dense
              emit-value
              map-options
            />
          </div>

          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6">
            <q-input
              label="Дата выдачи удостоверения"
              v-model="riDate"
              mask="date"
              :error="!!riDateError"
              :error-message="riDateError"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="riDate">
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
          <div v-if="typeInfo == 'ri'" class="col-12 col-sm-6">
            <q-input
              label="Срок действия удостоверения"
              v-model="riExpirationDate"
              mask="date"
              :error="!!riExpirationDateError"
              :error-message="riExpirationDateError"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="riExpirationDate">
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
        <q-btn flat class="text-primary" type="submit" :label="buttonTitle" />
        <q-btn flat class="text-red" label="Отмена" v-close-popup />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  props: {
    buttonTitle: { type: String, required: true },
    // submitType: { type: String, required: true },
    listenerInfo: { type: Object, required: false },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const store = useStore();

    // const access = ref(false);
    // const user = computed(() => store.getters["auth/user"]);

    const certificationSystemOptions = computed(() =>
      store.getters["settingsConfigurable/certificationSystems"].map((item) => {
        return { label: item.value, value: item.value };
      })
    );

    const expandedMethodNkDate = ref(false);
    const expandedTypeRiDate = ref(false);
    const expandedWeldingMethodDate = ref(false);
    const methodNkDateGroup = ref([]);
    const typeRiDateGroup = ref([]);
    const weldingMethodDateGroup = ref([]);

    const typeInfo = ref("pk");

    const { handleSubmit, resetForm } = useForm();

    onMounted(async () => {
      // console.log(user);
      // console.log(companyOptionsData);

      ticked.value = [];

      // if (user.value.roles?.length) {
      //   user.value.roles.includes("admin") || user.value.roles.includes("god")
      //     ? (access.value = true)
      //     : (access.value = false);
      // }

      if (props.listenerInfo) {
        // console.log(props.listenerInfo);

        if (
          props.listenerInfo.pkDate &&
          props.listenerInfo.pkExpirationDate &&
          props.listenerInfo.pkNumber &&
          props.listenerInfo.pkProgram &&
          props.listenerInfo.pkUniversity
        ) {
          typeInfo.value = "pk";

          pkDate.value = props.listenerInfo.pkDate;
          pkExpirationDate.value = props.listenerInfo.pkExpirationDate;
          pkNumber.value = props.listenerInfo.pkNumber;
          pkProgram.value = props.listenerInfo.pkProgram;
          pkUniversity.value = props.listenerInfo.pkUniversity;
        } else if (
          props.listenerInfo.certificationSystemNk &&
          props.listenerInfo.certificationTypeNk &&
          props.listenerInfo.methodNk &&
          props.listenerInfo.nkDate &&
          props.listenerInfo.nkExpirationDate &&
          props.listenerInfo.nkNumber &&
          props.listenerInfo.nkOrganization &&
          props.listenerInfo.qualificationLevelNk &&
          props.listenerInfo.ticked.length
        ) {
          typeInfo.value = "nk";

          certificationSystemNk.value =
            props.listenerInfo.certificationSystemNk;
          certificationTypeNk.value = props.listenerInfo.certificationTypeNk;
          methodNk.value = props.listenerInfo.methodNk;
          nkDate.value = props.listenerInfo.nkDate;
          nkExpirationDate.value = props.listenerInfo.nkExpirationDate;
          nkNumber.value = props.listenerInfo.nkNumber;
          nkOrganization.value = props.listenerInfo.nkOrganization;
          qualificationLevelNk.value = props.listenerInfo.qualificationLevelNk;
          ticked.value = props.listenerInfo.ticked;
        } else if (
          props.listenerInfo.certificationSystemRi &&
          props.listenerInfo.certificationTypeRi &&
          props.listenerInfo.qualificationLevelRi &&
          props.listenerInfo.riDate &&
          props.listenerInfo.riExpirationDate &&
          props.listenerInfo.riNumber &&
          props.listenerInfo.riOrganization &&
          props.listenerInfo.typeRi
        ) {
          typeInfo.value = "ri";

          certificationSystemRi.value =
            props.listenerInfo.certificationSystemRi;
          certificationTypeRi.value = props.listenerInfo.certificationTypeRi;
          qualificationLevelRi.value = props.listenerInfo.qualificationLevelRi;
          riDate.value = props.listenerInfo.riDate;
          riExpirationDate.value = props.listenerInfo.riExpirationDate;
          riNumber.value = props.listenerInfo.riNumber;
          riOrganization.value = props.listenerInfo.riOrganization;
          typeRi.value = props.listenerInfo.typeRi;
        }
      }
    });

    const { value: pkUniversity, errorMessage: pkUniversityError } = useField(
      "pkUniversity",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите образовательное учреждение (полностью)")
    );
    const { value: pkProgram, errorMessage: pkProgramError } = useField(
      "pkProgram",
      yup
        .string()
        .trim()
        .required(
          "Пожалуйста, укажите программу повышения квалификации (полностью, согласно удостоверения о повышении квалификации)"
        )
    );
    const { value: pkNumber, errorMessage: pkNumberError } = useField(
      "pkNumber",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите серию и номер удостоверения")
    );
    const { value: pkDate, errorMessage: pkDateError } = useField(
      "pkDate",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите дату выдачи удостоверения")
    );
    const { value: pkExpirationDate, errorMessage: pkExpirationDateError } =
      useField(
        "pkExpirationDate",
        yup
          .string()
          .trim()
          .required("Пожалуйста, укажите срок действия удостоверения")
      );

    const { value: nkOrganization, errorMessage: nkOrganizationError } =
      useField(
        "nkOrganization",
        yup
          .string()
          .trim()
          .required(
            "Пожалуйста, укажите независимый орган по аттестации персонала (сокращенно)"
          )
      );
    const { value: nkNumber, errorMessage: nkNumberError } = useField(
      "nkNumber",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите серию и номер удостоверения")
    );
    const { value: certificationSystemNk, errorMessage: certSystemNkError } =
      useField(
        "certificationSystemNk",
        yup.string().trim().required("Пожалуйста, укажите систему аттестации")
      );
    const { value: methodNk, errorMessage: methodNkError } = useField(
      "methodNk",
      yup.string().trim().required("Пожалуйста, укажите метод НК")
    );
    const { value: certificationTypeNk, errorMessage: certTypeNkError } =
      useField(
        "certificationTypeNk",
        yup.string().trim().required("Пожалуйста, укажите вид аттестации")
      );
    const { value: qualificationLevelNk, errorMessage: qLevelNkError } =
      useField(
        "qualificationLevelNk",
        yup.string().trim().required("Пожалуйста, укажите уровень квалификации")
      );
    const { value: ticked, errorMessage: tickedError } = useField(
      "ticked",
      yup.array().min(1, "Пожалуйста, укажите объекты контроля")
    );
    const { value: nkDate, errorMessage: nkDateError } = useField(
      "nkDate",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите дату выдачи удостоверения")
    );
    const { value: nkExpirationDate, errorMessage: nkExpirationDateError } =
      useField(
        "nkExpirationDate",
        yup
          .string()
          .trim()
          .required("Пожалуйста, укажите срок действия удостоверения")
      );

    const { value: riOrganization, errorMessage: riOrganizationError } =
      useField(
        "riOrganization",
        yup
          .string()
          .trim()
          .required(
            "Пожалуйста, укажите независимый орган по аттестации персонала (сокращенно)"
          )
      );
    const { value: riNumber, errorMessage: riNumberError } = useField(
      "riNumber",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите серию и номер удостоверения")
    );
    const { value: certificationSystemRi, errorMessage: certSystemRiError } =
      useField(
        "certificationSystemRi",
        yup.string().trim().required("Пожалуйста, укажите систему аттестации")
      );

    const { value: certificationTypeRi, errorMessage: certTypeRiError } =
      useField(
        "certificationTypeRi",
        yup.string().trim().required("Пожалуйста, укажите вид аттестации")
      );
    const { value: qualificationLevelRi, errorMessage: qLevelRiError } =
      useField(
        "qualificationLevelRi",
        yup.string().trim().required("Пожалуйста, укажите уровень квалификации")
      );

    const { value: riDate, errorMessage: riDateError } = useField(
      "riDate",
      yup
        .string()
        .trim()
        .required("Пожалуйста, укажите дату выдачи удостоверения")
    );
    const { value: riExpirationDate, errorMessage: riExpirationDateError } =
      useField(
        "riExpirationDate",
        yup
          .string()
          .trim()
          .required("Пожалуйста, укажите срок действия удостоверения")
      );
    const { value: typeRi, errorMessage: typeRiError } = useField(
      "typeRi",
      yup.string().trim().required("Пожалуйста, укажите Вид РИ")
    );

    function changeInfoType() {
      resetForm();
      ticked.value = [];
    }

    function onInvalidSubmit({ values, errors, results }) {
      // console.log(values); // current form values
      // console.log(errors); // a map of field names and their first error message
      //console.log(results); // a detailed map of field names and their validation results

      if (
        typeInfo.value == "pk" &&
        values.pkUniversity &&
        values.pkProgram &&
        values.pkNumber &&
        values.pkDate &&
        values.pkExpirationDate
      ) {
        if (props.listenerInfo) {
          emit("success", {
            values: {
              pkUniversity: pkUniversity.value,
              pkProgram: pkProgram.value,
              pkNumber: pkNumber.value,
              pkDate: pkDate.value,
              pkExpirationDate: pkExpirationDate.value,
            },
            oldValues: {
              pkUniversity: props.listenerInfo.pkUniversity,
              pkProgram: props.listenerInfo.pkProgram,
              pkNumber: props.listenerInfo.pkNumber,
              pkDate: props.listenerInfo.pkDate,
              pkExpirationDate: props.listenerInfo.pkExpirationDate,
            },
            type: "pk",
          });
        } else {
          emit("success", {
            values: {
              pkUniversity: pkUniversity.value,
              pkProgram: pkProgram.value,
              pkNumber: pkNumber.value,
              pkDate: pkDate.value,
              pkExpirationDate: pkExpirationDate.value,
            },
            type: "pk",
          });
        }
      } else if (
        typeInfo.value == "nk" &&
        values.nkOrganization &&
        values.nkNumber &&
        values.certificationSystemNk &&
        values.methodNk &&
        values.certificationTypeNk &&
        values.qualificationLevelNk &&
        values.nkDate &&
        values.nkExpirationDate &&
        values.ticked.length
      ) {
        if (props.listenerInfo) {
          emit("success", {
            values: {
              nkOrganization: nkOrganization.value,
              nkNumber: nkNumber.value,
              certificationSystemNk: certificationSystemNk.value,
              methodNk: methodNk.value,
              certificationTypeNk: certificationTypeNk.value,
              qualificationLevelNk: qualificationLevelNk.value,
              nkDate: nkDate.value,
              nkExpirationDate: nkExpirationDate.value,
              ticked: ticked.value,
            },
            oldValues: {
              nkOrganization: props.listenerInfonkOrganization,
              nkNumber: props.listenerInfonkNumber,
              certificationSystemNk: props.listenerInfocertificationSystemNk,
              methodNk: props.listenerInfomethodNk,
              certificationTypeNk: props.listenerInfocertificationTypeNk,
              qualificationLevelNk: props.listenerInfoqualificationLevelNk,
              nkDate: props.listenerInfonkDate,
              nkExpirationDate: props.listenerInfonkExpirationDate,
              ticked: props.listenerInfoticked,
            },
            type: "nk",
          });
        } else {
          emit("success", {
            values: {
              nkOrganization: nkOrganization.value,
              nkNumber: nkNumber.value,
              certificationSystemNk: certificationSystemNk.value,
              methodNk: methodNk.value,
              certificationTypeNk: certificationTypeNk.value,
              qualificationLevelNk: qualificationLevelNk.value,
              nkDate: nkDate.value,
              nkExpirationDate: nkExpirationDate.value,
              ticked: ticked.value,
            },
            type: "nk",
          });
        }
      } else if (
        typeInfo.value == "ri" &&
        values.riOrganization &&
        values.riNumber &&
        values.certificationSystemRi &&
        values.certificationTypeRi &&
        values.qualificationLevelRi &&
        values.riDate &&
        values.riExpirationDate &&
        values.typeRi
      ) {
        if (props.listenerInfo) {
          emit("success", {
            values: {
              riOrganization: riOrganization.value,
              riNumber: riNumber.value,
              certificationSystemRi: certificationSystemRi.value,
              certificationTypeRi: certificationTypeRi.value,
              qualificationLevelRi: qualificationLevelRi.value,
              riDate: riDate.value,
              riExpirationDate: riExpirationDate.value,
              typeRi: typeRi.value,
            },
            oldValues: {
              riOrganization: props.listenerInfo.riOrganization.valu,
              riNumber: props.listenerInfo.riNumber.valu,
              certificationSystemRi:
                props.listenerInfo.certificationSystemRi.valu,
              certificationTypeRi: props.listenerInfo.certificationTypeRi.valu,
              qualificationLevelRi:
                props.listenerInfo.qualificationLevelRi.valu,
              riDate: props.listenerInfo.riDate.valu,
              riExpirationDate: props.listenerInfo.riExpirationDate.valu,
              typeRi: props.listenerInfo.typeRi.valu,
            },
            type: "ri",
          });
        } else {
          emit("success", {
            values: {
              riOrganization: riOrganization.value,
              riNumber: riNumber.value,
              certificationSystemRi: certificationSystemRi.value,
              certificationTypeRi: certificationTypeRi.value,
              qualificationLevelRi: qualificationLevelRi.value,
              riDate: riDate.value,
              riExpirationDate: riExpirationDate.value,
              typeRi: typeRi.value,
            },
            type: "ri",
          });
        }
      }
    }

    const onSubmit = handleSubmit((values) => {}, onInvalidSubmit);

    return {
      // access,
      onSubmit,
      changeInfoType,
      // resetForm,

      expandedMethodNkDate,
      expandedTypeRiDate,
      expandedWeldingMethodDate,
      methodNkDateGroup,
      typeRiDateGroup,
      weldingMethodDateGroup,
      typeInfo,

      certificationSystemOptions,

      methodNkOptions: [
        {
          label: "ВИК",
          value: "vik",
        },
        {
          label: "ВД",
          value: "vd",
        },
        {
          label: "ТК",
          value: "tk",
        },
        {
          label: "ПВК",
          value: "pvk",
        },
        {
          label: "ПВТ",
          value: "pvt",
        },
        {
          label: "МК",
          value: "mk",
        },
        {
          label: "УК",
          value: "uk",
        },
        {
          label: "РК",
          value: "rk",
        },
        {
          label: "МИ",
          value: "mi",
        },
        {
          label: "1С",
          value: "1s",
        },
      ],
      typeRiOptions: [
        {
          label: "МСИ",
          value: "msi",
        },
        {
          label: "МДИ",
          value: "mdi",
        },
        {
          label: "ИТ",
          value: "it",
        },
        {
          label: "ИКС",
          value: "iks",
        },
        {
          label: "ТИ",
          value: "ti",
        },
        {
          label: "ИСМ",
          value: "ism",
        },
        {
          label: "СЭ",
          value: "se",
        },
        {
          label: "СВИ",
          value: "svi",
        },
      ],

      certificationTypeOptions: [
        "первичная",
        "продление",
        "повторная",
        "расширение",
      ],
      qualificationLevelOptions: ["1", "2", "3"],

      controlObject: [
        {
          label: "1. Оборудование, работающее под избыточным давлением",
          value: "1",
          children: [
            {
              label:
                "1.1. Паровые котлы, в том числе котлы-бойлеры, а также автономные пароперегреватели и экономайзеры",
              value: "1.1",
            },
            {
              label: "1.2. Водогрейные и пароводогрейные котлы",
              value: "1.2",
            },
            {
              label:
                "1.3. Энерготехнологические котлы: паровые и водогрейные, в том числе содорегенерационные котлы",
              value: "1.3",
            },
            {
              label: "1.4. Котлы-утилизаторы",
              value: "1.4",
            },
            {
              label: "1.5. Котлы передвижных и транспортабельных установок",
              value: "1.5",
            },
            {
              label:
                "1.6. Котлы паровые и жидкостные, работающие с высокотемпературными органическими и неорганическими теплоносителями (кроме воды и водяного пара), и транспортирующие их системы трубопроводов",
              value: "1.6",
            },
            {
              label: "1.7. Электрокотлы",
              value: "1.7",
            },
            {
              label: "1.8. Трубопроводы пара и горячей воды",
              value: "1.8",
            },
            {
              label:
                "1.9. Сосуды, работающие под избыточным давлением пара, газов, жидкостей",
              value: "1.9",
            },
            {
              label:
                "1.10. Баллоны, предназначенные для сжатых, сжиженных и растворенных под давлением газов",
              value: "1.10",
            },
            {
              label: "1.11. Цистерны и бочки для сжатых и сжиженных газов",
              value: "1.11",
            },
            {
              label:
                "1.12. Цистерны и сосуды для сжатых, сжиженных газов, жидкостей и сыпучих тел, в которых избыточное давление создается периодически для их опорожнения",
              value: "1.12",
            },
            {
              label: "1.13. Барокамеры",
              value: "1.13",
            },
          ],
        },
        {
          label: "2. Системы газоснабжения (газораспределения)",
          value: "2",
          children: [
            {
              label: "2.1. Наружные газопроводы",
              value: "2.1",
              children: [
                {
                  label: "2.1.1. Наружные газопроводы стальные",
                  value: "2.1.1",
                },
                {
                  label:
                    "2.1.2. Наружные газопроводы из полиэтиленовых и композиционных материалов",
                  value: "2.1.2",
                },
              ],
            },
            {
              label: "2.2. Внутренние газопроводы стальные",
              value: "2.2",
            },
            {
              label: "2.3. Детали и узлы, газовое оборудование",
              value: "2.3",
            },
          ],
        },
        {
          label: "3. Подъемные сооружения",
          value: "3",
          children: [
            {
              label: "3.1. Грузоподъемные краны",
              value: "3.1",
            },
            {
              label: "3.2. Подъемники (вышки)",
              value: "3.2",
            },
            {
              label: "3.3. Канатные дороги",
              value: "3.3",
            },
            {
              label: "3.4. Фуникулеры",
              value: "3.4",
            },
            {
              label: "3.5. Эскалаторы",
              value: "3.5",
            },
            {
              label: "3.6. Лифты",
              value: "3.6",
            },
            {
              label: "3.7. Краны-трубоукладчики",
              value: "3.7",
            },
            {
              label: "3.8. Краны-манипуляторы",
              value: "3.8",
            },
            {
              label: "3.9. Платформы подъемные для инвалидов",
              value: "3.9",
            },
            {
              label: "3.10. Крановые пути",
              value: "3.10",
            },
          ],
        },
        {
          label: "4. Объекты горнорудной промышленности",
          value: "4",
          children: [
            {
              label:
                "4.1. Здания и сооружения поверхностных комплексов рудников, обогатительных фабрик, фабрик окомкования и аглофабрик",
              value: "4.1",
            },
            {
              label: "4.2. Шахтные подъемные машины",
              value: "4.2",
            },
            {
              label:
                "4.3. Горно-транспортное и горно-обогатительное оборудование",
              value: "4.3",
            },
          ],
        },
        {
          label: "5. Объекты угольной промышленности",
          value: "5",
          children: [
            {
              label: "5.1. Шахтные подъемные машины",
              value: "5.1",
            },
            {
              label: "5.2. Вентиляторы главного проветривания",
              value: "5.2",
            },
            {
              label:
                "5.3. Горно-транспортное и углеобогатительное оборудование",
              value: "5.3",
            },
          ],
        },
        {
          label: "6. Оборудование нефтяной и газовой промышленности",
          value: "6",
          children: [
            {
              label: "6.1. Оборудование для бурения скважин",
              value: "6.1",
            },
            {
              label: "6.2. Оборудование для эксплуатации скважин",
              value: "6.2",
            },
            {
              label: "6.3. Оборудование для освоения и ремонта скважин",
              value: "6.3",
            },
            {
              label: "6.4. Оборудование газонефтеперекачивающих станций",
              value: "6.4",
            },
            {
              label: "6.5. Газонефтепродуктопроводы",
              value: "6.5",
            },
            {
              label: "6.6. Резервуары для нефти и нефтепродуктов",
              value: "6.6",
            },
          ],
        },
        {
          label: "7. Оборудование металлургической промышленности",
          value: "7",
          children: [
            {
              label:
                "7.1. Металлоконструкции технических устройств, зданий и сооружений",
              value: "7.1",
            },
            {
              label: "7.2. Газопроводы технологических газов",
              value: "7.2",
            },
            {
              label:
                "7.3. Цапфы чугуновозов, стальковшей, металлоразливочных ковшей",
              value: "7.3",
            },
          ],
        },
        {
          label:
            "8. Оборудование взрывопожароопасных и химически опасных производств",
          value: "8",
          children: [
            {
              label:
                "8.1. Оборудование химических, нефтехимических и нефтеперерабатывающих производств, работающее под давлением до 16 МПа",
              value: "8.1",
            },
            {
              label:
                "8.2. Оборудование химических, нефтехимических и нефтеперерабатывающих производств, работающее под давлением свыше 16 МПа",
              value: "8.2",
            },
            {
              label:
                "8.3. Оборудование химических, нефтехимических и нефтеперерабатывающих производств, работающее под вакуумом",
              value: "8.3",
            },
            {
              label:
                "8.4. Резервуары для хранения взрывопожароопасных и токсичных веществ",
              value: "8.4",
            },
            {
              label: "8.5. Изотермические хранилища",
              value: "8.5",
            },
            {
              label: "8.6. Криогенное оборудование",
              value: "8.6",
            },
            {
              label: "8.7. Оборудование аммиачных холодильных установок",
              value: "8.7",
            },
            {
              label:
                "8.8. Печи, котлы ВОТ, энерготехнологические котлы и котлы утилизаторы",
              value: "8.8",
            },
            {
              label: "8.9. Компрессорное и насосное оборудование",
              value: "8.9",
            },
            {
              label: "8.10. Центрифуги, сепараторы",
              value: "8.10",
            },
            {
              label:
                "8.11. Цистерны, контейнеры (бочки), баллоны для взрывопожароопасных и токсичных веществ",
              value: "8.11",
            },
            {
              label:
                "8.12. Технологические трубопроводы, трубопроводы пара и горячей воды",
              value: "8.12",
            },
          ],
        },
        {
          label: "9. Объекты железнодорожного транспорта",
          value: "9",
          children: [
            {
              label:
                "9.1. Транспортные средства (цистерны, контейнеры), тара, упаковка, предназначенных для транспортирования опасных веществ (кроме перевозки сжиженных токсичных газов)",
              value: "9.1",
            },
            {
              label: "9.2. Подъездные пути необщего пользования",
              value: "9.2",
            },
          ],
        },
        {
          label:
            "10. Оборудование для хранения и переработки растительного сырья",
          value: "10",
          children: [
            {
              label:
                "10.1. Воздуходувные машины (турбокомпрессоры воздушные, турбовоздуходувки)",
              value: "10.1",
            },
            {
              label: "10.2. Вентиляторы (центробежные, радиальные, ВВД)",
              value: "10.2",
            },
            {
              label: "10.3. Дробилки молотковые, вальцовые станки, энтолейторы",
              value: "10.3",
            },
          ],
        },
        {
          label: "11. Здания и сооружения (строительные объекты)",
          value: "11",
          children: [
            {
              label: "11.1. Металлические конструкции",
              value: "11.1",
            },
            {
              label: "11.2. Бетонные и железобетонные конструкции",
              value: "11.2",
            },
            {
              label: "11.3. Каменные и армокаменные конструкции",
              value: "11.3",
            },
          ],
        },
        {
          label: "12. Оборудование электроэнергетики",
          value: "12",
        },
      ],

      pkUniversity,
      pkProgram,
      pkNumber,
      pkDate,
      pkExpirationDate,

      pkUniversityError,
      pkProgramError,
      pkNumberError,
      pkDateError,
      pkExpirationDateError,

      nkOrganization,
      nkNumber,
      certificationSystemNk,
      methodNk,
      certificationTypeNk,
      qualificationLevelNk,
      ticked,
      nkDate,
      nkExpirationDate,

      riOrganization,
      riNumber,
      certificationSystemRi,
      certificationTypeRi,
      qualificationLevelRi,
      riDate,
      riExpirationDate,
      typeRi,

      nkOrganizationError,
      nkNumberError,
      certSystemNkError,
      methodNkError,
      certTypeNkError,
      qLevelNkError,
      tickedError,
      nkDateError,
      nkExpirationDateError,
      riOrganizationError,
      riNumberError,
      certSystemRiError,
      certTypeRiError,
      qLevelRiError,
      riDateError,
      riExpirationDateError,
      typeRiError,
    };
  },
};
</script>

<style></style>
