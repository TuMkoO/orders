<template>
  <app-page title="Создание заявки на повышение квалификации НК">
    <div class="q-gutter-y-md">
      <q-card>
        <div class="q-pa-lg">
          <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6 col-md-6">
                <q-input
                  v-model="name"
                  label="Фамилия, имя, отчество (полностью)"
                  class="q-col-gutter-sm"
                  :error="!!nError"
                  :error-message="nError"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-6">
                <q-input
                  v-model="post"
                  label="Должность (полностью)"
                  class="q-col-gutter-sm"
                  :error="!!postError"
                  :error-message="postError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-input
                  class="q-col-gutter-sm"
                  label="Дата рождения"
                  v-model="birthday"
                  mask="date"
                  :error="!!bError"
                  :error-message="bError"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="birthday">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
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
              <div class="col-6 col-sm-4 col-md-4">
                <q-input
                  v-model="passportSeries"
                  label="Серия паспорта"
                  class="q-col-gutter-sm"
                  :error="!!pSeriesError"
                  :error-message="pSeriesError"
                />
              </div>
              <div class="col-6 col-sm-4 col-md-4">
                <q-input
                  v-model="passportNumber"
                  label="Номер паспорта"
                  class="q-col-gutter-sm"
                  :error="!!pNumberError"
                  :error-message="pNumberError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-input
                  v-model="passportIssued"
                  label="Кем выдан"
                  class="q-col-gutter-sm"
                  :error="!!pIssuedError"
                  :error-message="pIssuedError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-input
                  v-model="passportCode"
                  label="Код подразделения"
                  class="q-col-gutter-sm"
                  :error="!!pCodeError"
                  :error-message="pCodeError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-input
                  class="q-col-gutter-sm"
                  label="Дата выдачи"
                  v-model="passportDate"
                  mask="date"
                  :error="!!pDateError"
                  :error-message="pDateError"
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
                              label="Close"
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
                  v-model="addressCode"
                  label="Почтовый индекс"
                  type="number"
                  :error="!!aCodeError"
                  :error-message="aCodeError"
                />
              </div>
              <div class="col-12 col-sm-8 col-md-8">
                <q-input
                  v-model="address"
                  label="Адрес проживания"
                  class="q-col-gutter-sm"
                  :error="!!aError"
                  :error-message="aError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-input
                  v-model="phone"
                  label="Телефон"
                  :error="!!pError"
                  :error-message="pError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-input
                  v-model="email"
                  label="E-Mail:"
                  type="email"
                  :error="!!eError"
                  :error-message="eError"
                />
              </div>
              <div class="col-12 col-sm-4 col-md-4">
                <q-select
                  v-model="education"
                  :options="educationOptions"
                  label="Образование"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-6">
                <q-input
                  v-model="institution"
                  label="Учебное заведение"
                  :error="!!iError"
                  :error-message="iError"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-6">
                <q-input
                  v-model="specialization"
                  label="Специальность"
                  :error="!!sError"
                  :error-message="sError"
                />
              </div>
            </div>

            <q-option-group :options="options" type="radio" v-model="program" />

            <div>
              <q-btn label="Создать" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-card>
    </div>
  </app-page>
</template>

<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";

const metaData = {
  title: "Создание заявки",
  titleTemplate: (title) => `${title} | Университетские технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    return {
      program: ref(null),

      educationOptions: ["Высшее", "Среднее специальное", "Среднее"],

      options: [
        {
          label:
            "неразрушающий метод контроля качества «Визуальный и измерительный контроль» (ВИК)",
          value: "vik",
        },
        {
          label:
            "неразрушающий метод контроля состояния «Вибродиагностический контроль» (ВД)",
          value: "vd",
        },
        {
          label:
            "неразрушающий метод контроля состояния «Тепловой контроль» (ТК)",
          value: "tk",
        },
        {
          label:
            "неразрушающий метод контроля качества «Капиллярный контроль» (ПВК)",
          value: "pvk",
        },
        {
          label: "неразрушающий метод контроля качества «Течеискание» (ПВТ)",
          value: "pvt",
        },
        {
          label:
            "неразрушающий метод контроля качества «Магнитный контроль» (МК)",
          value: "mk",
        },
        {
          label:
            "неразрушающий метод контроля качества «Ультразвуковой контроль» (УК)",
          value: "uk",
        },
        {
          label:
            "неразрушающий метод контроля качества «Радиографический контроль» (РК)",
          value: "rk",
        },
        { label: "«Механические испытания материалов» (МИ)", value: "mi" },
        {
          label:
            "«Информационные технологии в бухгалтерском и налоговом учете» (1С)",
          value: "1s",
        },
      ],
    };
  },
  components: { AppPage },
};
</script>

<style></style>
