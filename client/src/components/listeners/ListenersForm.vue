<template>
  <q-card class="company-card">
    <q-card-section>
      <div class="form-wrapper">
        <q-form @submit.prevent.stop="onSubmit" class="q-col-gutter-sm">
          <div class="row q-col-gutter-sm">
            <div v-if="access" class="col-12 col-sm-6 col-md-2">
              <q-select
                square
                v-model="status"
                :options="statusOptions"
                label="Статус"
                :error="!!statusError"
                :error-message="statusError"
                options-dense
                dense
              />
            </div>
            <div v-if="access" class="col-12 col-sm-6 col-md-3">
              <q-select
                v-model="companies"
                use-input
                input-debounce="0"
                label="Предприятие"
                :options="companyOptions"
                @filter="filterFn"
                behavior="menu"
                :error="!!oUserError"
                :error-message="oUserError"
                options-dense
                dense
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label caption>{{
                        scope.opt.description
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >По вашему запросу нет совпадений</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-12 col-md-3">
              <q-input
                v-model.trim="post"
                label="Должность (полностью)"
                :error="!!postError"
                :error-message="postError"
                dense
              />
            </div>
            <div v-if="access" class="col-12 col-sm-6 col-md-2">
              <q-input
                v-model.trim="numberNk"
                label="Номер НК"
                type="text"
                :error="!!numNkError"
                :error-message="numNkError"
                dense
              />
            </div>
            <div v-if="access" class="col-12 col-sm-6 col-md-2">
              <q-input
                v-model.trim="numberRi"
                label="Номер РИ"
                type="text"
                :error="!!numRiError"
                :error-message="numRiError"
                dense
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-4 col-md-4">
              <q-input
                v-model.trim="firstName"
                label="Фамилия"
                :error="!!fNameError"
                :error-message="fNameError"
                dense
              />
            </div>
            <div class="col-12 col-sm-4 col-md-4">
              <q-input
                v-model.trim="secondName"
                label="Имя"
                :error="!!sNameError"
                :error-message="sNameError"
                dense
              />
            </div>
            <div class="col-12 col-sm-4 col-md-4">
              <q-input
                v-model.trim="lastName"
                label="Отчество"
                :error="!!lNameError"
                :error-message="lNameError"
                dense
              />
            </div>

            <div class="col-12 col-sm-6 col-md-2">
              <q-select
                square
                v-model="gender"
                :options="genderOptions"
                label="Пол"
                :error="!!gError"
                :error-message="gError"
                options-dense
                dense
              />
            </div>

            <div class="col-12 col-sm-6 col-md-2">
              <q-input
                label="Дата рождения"
                v-model="birthday"
                mask="date"
                :error="!!bError"
                :error-message="bError"
                dense
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date default-view="Years" v-model="birthday">
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
            <div class="col-12 col-sm-12 col-md-3">
              <q-input
                v-model.trim="snils"
                label="СНИЛС"
                :error="!!snilsError"
                :error-message="snilsError"
                dense
              />
            </div>
            <div class="col-12 col-sm-4 col-md-2">
              <q-input
                v-model="phoneInput"
                label="Телефон"
                mask="+7 (###) ###-##-##"
                fill-mask
                :error="!!phoneError"
                :error-message="phoneError"
                dense
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <q-input
                v-model.trim="email"
                label="Эл. почта"
                type="email"
                :error="!!eError"
                :error-message="eError"
                dense
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="q-card q-pa-md">
                <div class="border-bottom text-subtitle2">Паспорт:</div>
                <div class="q-mt-sm">
                  <div>
                    <span class="text-weight-medium">Серия и номер:</span>
                    {{
                      passportSeries && passportNumber
                        ? passportSeries + " " + passportNumber
                        : "не указано"
                    }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Дата выдачи:</span>
                    {{ dateFormatTypeInput(passportDate) || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Кем выдан:</span>
                    {{ passportIssued || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Код подразделения:</span>
                    {{ passportCode || "не указано" }}
                  </div>
                </div>
                <div class="q-mt-sm">
                  <q-btn
                    label="Изменить данные паспорта"
                    size="sm"
                    color="orange"
                    @click="openFirstDialog('Изменить данные паспорта')"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="q-card q-pa-md">
                <div class="border-bottom text-subtitle2">Адрес:</div>
                <div class="q-mt-sm">
                  <div>
                    <span class="text-weight-medium">Почтовый индекс:</span>
                    {{ mailCode ? mailCode : "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Город:</span>
                    {{ city ? city : "не указано" }}
                  </div>
                  <div v-if="township">
                    <span class="text-weight-medium">Пгт.:</span>
                    {{ township || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Улица:</span>
                    {{ street || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Дом:</span>
                    {{ homeNumber || "не указано" }}
                  </div>
                  <div v-if="apartment">
                    <span class="text-weight-medium">Квартира:</span>
                    {{ apartment || "не указано" }}
                  </div>
                </div>
                <div class="q-mt-sm">
                  <q-btn
                    label="Изменить данные адреса"
                    size="sm"
                    color="orange"
                    @click="openFirstDialog('Изменить данные адреса')"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="q-card q-pa-md">
                <div class="border-bottom text-subtitle2">Образование:</div>
                <div class="q-mt-sm">
                  <div>
                    <span class="text-weight-medium">Уровень образования:</span>
                    {{ education || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium"
                      >Образовательное учреждение:</span
                    >
                    {{ institution || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium">Специальность:</span>
                    {{ specialization || "не указано" }}
                  </div>
                  <div>
                    <span class="text-weight-medium"
                      >Серия и номер документа:</span
                    >
                    {{
                      diplomSeries && diplomNumber
                        ? diplomSeries + " " + diplomNumber
                        : "не указано"
                    }}
                  </div>
                  <div>
                    <span class="text-weight-medium"
                      >Дата выдачи документа:</span
                    >
                    {{ dateFormatTypeInput(diplomDate) || "не указано" }}
                  </div>
                </div>
                <div class="q-mt-sm">
                  <q-btn
                    label="Изменить данные паспорта"
                    size="sm"
                    color="orange"
                    @click="openFirstDialog('Изменить данные об образовании')"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <q-expansion-item
              v-model="expandedMethodNkDate"
              header-class="text-grey-8 bg-cyan-1"
              dense
            >
              <template v-slot:header>
                <q-item-section
                  >Дата начала трудовой деятельности по заявленному методу
                  неразрушающего контроля
                  <div>
                    <q-option-group
                      v-model="methodNkDateGroup"
                      :options="methodNkOptions"
                      type="checkbox"
                      inline
                      dense
                    />
                  </div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <div class="row q-col-gutter-sm">
                    <div
                      v-if="
                        !methodNkDateGroup.includes('vik') &&
                        !methodNkDateGroup.includes('vd') &&
                        !methodNkDateGroup.includes('tk') &&
                        !methodNkDateGroup.includes('pvk') &&
                        !methodNkDateGroup.includes('pvt') &&
                        !methodNkDateGroup.includes('mk') &&
                        !methodNkDateGroup.includes('uk') &&
                        !methodNkDateGroup.includes('rk') &&
                        !methodNkDateGroup.includes('mi') &&
                        !methodNkDateGroup.includes('1s')
                      "
                      class="col-12"
                    >
                      Не выбрано ни одно значение
                    </div>
                    <div
                      v-if="methodNkDateGroup.includes('vik')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ВИК"
                        v-model="methodNkDateVik"
                        mask="date"
                        :error="!!nkDateVikError"
                        :error-message="nkDateVikError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateVik">
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
                    <div
                      v-if="methodNkDateGroup.includes('vd')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ВД"
                        v-model="methodNkDateVd"
                        mask="date"
                        :error="!!nkDateVdError"
                        :error-message="nkDateVdError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateVd">
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
                    <div
                      v-if="methodNkDateGroup.includes('tk')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ТК"
                        v-model="methodNkDateTk"
                        mask="date"
                        :error="!!nkDateTkError"
                        :error-message="nkDateTkError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateTk">
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
                    <div
                      v-if="methodNkDateGroup.includes('pvk')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ПВК"
                        v-model="methodNkDatePvk"
                        mask="date"
                        :error="!!nkDatePvkError"
                        :error-message="nkDatePvkError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDatePvk">
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
                    <div
                      v-if="methodNkDateGroup.includes('pvt')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ПВТ"
                        v-model="methodNkDatePvt"
                        mask="date"
                        :error="!!nkDatePvtError"
                        :error-message="nkDatePvtError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDatePvt">
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
                    <div
                      v-if="methodNkDateGroup.includes('mk')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="МК"
                        v-model="methodNkDateMk"
                        mask="date"
                        :error="!!nkDateMkError"
                        :error-message="nkDateMkError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateMk">
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
                    <div
                      v-if="methodNkDateGroup.includes('uk')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="УК"
                        v-model="methodNkDateUk"
                        mask="date"
                        :error="!!nkDateUkError"
                        :error-message="nkDateUkError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateUk">
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
                    <div
                      v-if="methodNkDateGroup.includes('rk')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="РК"
                        v-model="methodNkDateRk"
                        mask="date"
                        :error="!!nkDateRkError"
                        :error-message="nkDateRkError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateRk">
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
                    <div
                      v-if="methodNkDateGroup.includes('mi')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="МИ"
                        v-model="methodNkDateMi"
                        mask="date"
                        :error="!!nkDateMiError"
                        :error-message="nkDateMiError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDateMi">
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
                    <div
                      v-if="methodNkDateGroup.includes('1s')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="1С"
                        v-model="methodNkDate1s"
                        mask="date"
                        :error="!!nkDate1sError"
                        :error-message="nkDate1sError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="methodNkDate1s">
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
              </q-card>
            </q-expansion-item>
          </div>

          <div>
            <q-expansion-item
              v-model="expandedTypeRiDate"
              header-class="text-grey-8 bg-cyan-1"
              dense
            >
              <template v-slot:header>
                <q-item-section
                  >Дата начала трудовой деятельности по заявленному виду
                  разрушающих испытаний
                  <div>
                    <q-option-group
                      v-model="typeRiDateGroup"
                      :options="typeRiDateOptions"
                      type="checkbox"
                      inline
                      dense
                    />
                  </div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <div class="row q-col-gutter-sm">
                    <div
                      v-if="
                        !typeRiDateGroup.includes('msi') &&
                        !typeRiDateGroup.includes('mdi') &&
                        !typeRiDateGroup.includes('it') &&
                        !typeRiDateGroup.includes('iks') &&
                        !typeRiDateGroup.includes('ti') &&
                        !typeRiDateGroup.includes('ism') &&
                        !typeRiDateGroup.includes('se') &&
                        !typeRiDateGroup.includes('svi')
                      "
                      class="col-12"
                    >
                      Не выбрано ни одно значение
                    </div>
                    <div
                      v-if="typeRiDateGroup.includes('msi')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="МСИ"
                        v-model="typeRiDateMsi"
                        mask="date"
                        :error="!!riDateMsiError"
                        :error-message="riDateMsiError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateMsi">
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
                    <div
                      v-if="typeRiDateGroup.includes('mdi')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="МДИ"
                        v-model="typeRiDateMdi"
                        mask="date"
                        :error="!!riDateMdiError"
                        :error-message="riDateMdiError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateMdi">
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
                    <div
                      v-if="typeRiDateGroup.includes('it')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ИТ"
                        v-model="typeRiDateIt"
                        mask="date"
                        :error="!!riDateItError"
                        :error-message="riDateItError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateIt">
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
                    <div
                      v-if="typeRiDateGroup.includes('iks')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ИКС"
                        v-model="typeRiDateIks"
                        mask="date"
                        :error="!!riDateIksError"
                        :error-message="riDateIksError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateIks">
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
                    <div
                      v-if="typeRiDateGroup.includes('ti')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ТИ"
                        v-model="typeRiDateTi"
                        mask="date"
                        :error="!!riDateTiError"
                        :error-message="riDateTiError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateTi">
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
                    <div
                      v-if="typeRiDateGroup.includes('ism')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ИСМ"
                        v-model="typeRiDateIsm"
                        mask="date"
                        :error="!!riDateIsmError"
                        :error-message="riDateIsmError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateIsm">
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
                    <div
                      v-if="typeRiDateGroup.includes('se')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="СЭ"
                        v-model="typeRiDateSe"
                        mask="date"
                        :error="!!riDateSeError"
                        :error-message="riDateSeError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateSe">
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
                    <div
                      v-if="typeRiDateGroup.includes('svi')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="СВИ"
                        v-model="typeRiDateSvi"
                        mask="date"
                        :error="!!riDateSviError"
                        :error-message="riDateSviError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="typeRiDateSvi">
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
              </q-card>
            </q-expansion-item>
          </div>

          <div>
            <q-expansion-item
              v-model="expandedWeldingMethodDate"
              header-class="text-grey-8 bg-cyan-1"
              dense
            >
              <template v-slot:header>
                <q-item-section
                  >Дата начала трудовой деятельности по заявленному способу
                  сварки
                  <div>
                    <q-option-group
                      v-model="weldingMethodDateGroup"
                      :options="weldingMethodDateOptions"
                      type="checkbox"
                      inline
                      dense
                    />
                  </div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <div class="row q-col-gutter-sm">
                    <div
                      v-if="
                        !weldingMethodDateGroup.includes('rde') &&
                        !weldingMethodDateGroup.includes('sp') &&
                        !weldingMethodDateGroup.includes('sf') &&
                        !weldingMethodDateGroup.includes('mig') &&
                        !weldingMethodDateGroup.includes('mag') &&
                        !weldingMethodDateGroup.includes('pag') &&
                        !weldingMethodDateGroup.includes('pig') &&
                        !weldingMethodDateGroup.includes('vig') &&
                        !weldingMethodDateGroup.includes('ps') &&
                        !weldingMethodDateGroup.includes('gs') &&
                        !weldingMethodDateGroup.includes('ni') &&
                        !weldingMethodDateGroup.includes('zn') &&
                        !weldingMethodDateGroup.includes('ng') &&
                        !weldingMethodDateGroup.includes('e')
                      "
                      class="col-12"
                    >
                      Не выбрано ни одно значение
                    </div>
                    <div
                      v-if="weldingMethodDateGroup.includes('rde')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="РДЭ"
                        v-model="weldingMethodDateRde"
                        mask="date"
                        :error="!!wMethodDateRdeError"
                        :error-message="wMethodDateRdeError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateRde">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('sp')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="СП"
                        v-model="weldingMethodDateSp"
                        mask="date"
                        :error="!!wMethodDateSpError"
                        :error-message="wMethodDateSpError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateSp">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('sf')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="СФ"
                        v-model="weldingMethodDateSf"
                        mask="date"
                        :error="!!wMethodDateSfError"
                        :error-message="wMethodDateSfError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateSf">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('mig')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="МИГ"
                        v-model="weldingMethodDateMig"
                        mask="date"
                        :error="!!wMethodDateMigError"
                        :error-message="wMethodDateMigError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateMig">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('mag')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="МАГ"
                        v-model="weldingMethodDateMag"
                        mask="date"
                        :error="!!wMethodDateMagError"
                        :error-message="wMethodDateMagError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateMag">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('pag')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ПАГ"
                        v-model="weldingMethodDatePag"
                        mask="date"
                        :error="!!wMethodDatePagError"
                        :error-message="wMethodDatePagError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDatePag">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('pig')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ПИГ"
                        v-model="weldingMethodDatePig"
                        mask="date"
                        :error="!!wMethodDatePigError"
                        :error-message="wMethodDatePigError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDatePig">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('vig')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ВИГ"
                        v-model="weldingMethodDateVig"
                        mask="date"
                        :error="!!wMethodDateVigError"
                        :error-message="wMethodDateVigError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateVig">
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

                    <div
                      v-if="weldingMethodDateGroup.includes('ps')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ПС"
                        v-model="weldingMethodDatePs"
                        mask="date"
                        :error="!!wMethodDatePsError"
                        :error-message="wMethodDatePsError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDatePs">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('gs')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ГС"
                        v-model="weldingMethodDateGs"
                        mask="date"
                        :error="!!wMethodDateGsError"
                        :error-message="wMethodDateGsError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateGs">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('ni')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="НИ"
                        v-model="weldingMethodDateNi"
                        mask="date"
                        :error="!!wMethodDateNiError"
                        :error-message="wMethodDateNiError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateNi">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('zn')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="ЗН"
                        v-model="weldingMethodDateZn"
                        mask="date"
                        :error="!!wMethodDateZnError"
                        :error-message="wMethodDateZnError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateZn">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('ng')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="НГ"
                        v-model="weldingMethodDateNg"
                        mask="date"
                        :error="!!wMethodDateNgError"
                        :error-message="wMethodDateNgError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateNg">
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
                    <div
                      v-if="weldingMethodDateGroup.includes('e')"
                      class="col-12 col-sm-4 col-md-2"
                    >
                      <q-input
                        label="Э"
                        v-model="weldingMethodDateE"
                        mask="date"
                        :error="!!wMethodDateEError"
                        :error-message="wMethodDateEError"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="weldingMethodDateE">
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
              </q-card>
            </q-expansion-item>
          </div>

          <div class="text-grey-8 bg-cyan-1 q-px-md q-ml-sm q-mt-sm">
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  label="Дата начала трудовой деятельности в области сварочного производства"
                  v-model="weldingProductionDate"
                  mask="date"
                  :error="!!wProductionDateError"
                  :error-message="wProductionDateError"
                  dense
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="weldingProductionDate">
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
          </div>

          <div>
            <div class="row justify-between q-mb-sm">
              <div>
                Сведения о сертификации:
                <q-btn-toggle
                  v-model="certTypeInfo"
                  size="sm"
                  toggle-color="primary"
                  :options="[
                    { label: 'ПК', value: 'pk' },
                    { label: 'Атт. НК', value: 'nk' },
                    { label: 'Атт. РИ', value: 'ri' },
                  ]"
                />
              </div>
              <div>
                <q-btn
                  label="+ сведения о сертификации"
                  @click="openSecondDialog"
                  color="orange"
                  class="q-mr-md"
                  size="sm"
                />
              </div>
            </div>
            <div v-if="certTypeInfo == 'pk'">
              <q-table
                :rows="pkInfo"
                :columns="columnsPk"
                row-key="name"
                :pagination="initialPaginationPk"
                dense
              >
                <template v-slot:body-cell-control="props">
                  <q-td :props="props">
                    <div>
                      <q-btn
                        class="bg-orange q-mr-sm"
                        icon="edit_note"
                        size="sm"
                        @click="showModalListenerInfo('edit', props.row)"
                      />
                      <q-btn
                        class="bg-red"
                        icon="delete"
                        size="sm"
                        @click="showModalListenerInfo('delete', props.row)"
                      />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </div>
            <div v-if="certTypeInfo == 'nk'">
              <q-table
                :rows="attNkInfo"
                :columns="columnsNk"
                row-key="name"
                :pagination="initialPaginationNk"
                dense
              >
                <template v-slot:body-cell-methodNk="props">
                  <q-td :props="props">
                    {{
                      props.row.methodNk == "vik"
                        ? "ВИК"
                        : props.row.methodNk == "vd"
                        ? "ВД"
                        : props.row.methodNk == "tk"
                        ? "ТК"
                        : props.row.methodNk == "pvk"
                        ? "ПВК"
                        : props.row.methodNk == "pvt"
                        ? "ПВТ"
                        : props.row.methodNk == "mk"
                        ? "МК"
                        : props.row.methodNk == "uk"
                        ? "УК"
                        : props.row.methodNk == "rk"
                        ? "РК"
                        : props.row.methodNk == "mi"
                        ? "МИ"
                        : props.row.methodNk == "1s"
                        ? "1С"
                        : ""
                    }}
                  </q-td>
                </template>
                <template v-slot:body-cell-ticked="props">
                  <q-td :props="props">
                    {{ props.row.ticked + "" }}
                  </q-td>
                </template>
                <template v-slot:body-cell-control="props">
                  <q-td :props="props">
                    <div>
                      <q-btn
                        class="bg-orange q-mr-sm"
                        icon="edit_note"
                        size="sm"
                        @click="showModalListenerInfo('edit', props.row)"
                      />
                      <q-btn
                        class="bg-red"
                        icon="delete"
                        size="sm"
                        @click="showModalListenerInfo('delete', props.row)"
                      />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </div>
            <div v-if="certTypeInfo == 'ri'">
              <q-table
                :rows="attRiInfo"
                :columns="columnsRi"
                row-key="name"
                :pagination="initialPaginationRi"
                dense
              >
                <template v-slot:body-cell-typeRi="props">
                  <q-td :props="props">
                    {{
                      props.row.typeRi == "msi"
                        ? "МСИ"
                        : props.row.typeRi == "mdi"
                        ? "МДИ"
                        : props.row.typeRi == "it"
                        ? "ИТ"
                        : props.row.typeRi == "iks"
                        ? "ИКС"
                        : props.row.typeRi == "ti"
                        ? "ТИ"
                        : props.row.typeRi == "ism"
                        ? "ИСМ"
                        : props.row.typeRi == "se"
                        ? "СЭ"
                        : props.row.typeRi == "svi"
                        ? "СВИ"
                        : ""
                    }}
                  </q-td>
                </template>
                <template v-slot:body-cell-control="props">
                  <q-td :props="props">
                    <div>
                      <q-btn
                        class="bg-orange q-mr-sm"
                        icon="edit_note"
                        size="sm"
                        @click="showModalListenerInfo('edit', props.row)"
                      />
                      <q-btn
                        class="bg-red"
                        icon="delete"
                        size="sm"
                        @click="showModalListenerInfo('delete', props.row)"
                      />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </div>
          </div>

          <div>
            <q-btn
              v-if="listener"
              label="Сохранить"
              @click="onSubmit"
              color="primary"
              class="q-mr-md"
            />

            <q-btn
              v-if="!listener"
              label="Создать"
              type="submit"
              color="primary"
              class="q-mr-md"
            />

            <q-btn label="Отмена" @click="$emit('hide')" color="primary" />
          </div>
        </q-form>

        <q-dialog
          v-model="firstDialog"
          ref="firstDialogRef"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="">
            <q-toolbar>
              <q-toolbar-title>{{ firstDialogTitle }}</q-toolbar-title>
              <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>

            <div v-if="firstDialogTitle == 'Изменить данные паспорта'">
              <ListenersFormPassport
                :passport="currentListenerPassport"
                @success="updateListenerPassport"
              />
            </div>
            <div v-if="firstDialogTitle == 'Изменить данные адреса'">
              <ListenersFormAddress
                :address="currentListenerAddress"
                @success="updateListenerAddress"
              />
            </div>
            <div v-if="firstDialogTitle == 'Изменить данные об образовании'">
              <ListenersFormEducation
                :education="currentListenerEducation"
                @success="updateListenerEducation"
              />
            </div>
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="secondDialog"
          ref="secondDialogRef"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card
            v-if="secondDialogType == 'delete'"
            class=""
            style="max-width: 1200px"
          >
            <q-card-section>
              <div class="text-h6 flex justify-between">
                Удалить сведения о повышении квалификации или аттестации
                <q-btn flat round dense icon="close" v-close-popup />
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div>
                Вы действительного хотите удалить данную запись о сертификации?
              </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-white">
              <q-btn
                flat
                class="text-red"
                label="Удалить"
                @click="deleteListenerInfo(currentListenerInfo)"
              />
              <q-btn flat class="text-positive" label="Отмена" v-close-popup />
            </q-card-actions>
          </q-card>
          <ListenersPkAttForm
            v-else-if="secondDialogType == 'edit'"
            buttonTitle="Сохранить"
            :listenerInfo="currentListenerInfo"
            @success="updateListenerInfo"
          />
          <ListenersPkAttForm
            v-else
            buttonTitle="Добавить"
            @success="addListenerInfo"
          />
        </q-dialog>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import ListenersPkAttForm from "./ListenersPkAttForm.vue";
import ListenersFormPassport from "./ListenersFormPassport.vue";
import ListenersFormAddress from "./ListenersFormAddress.vue";
import ListenersFormEducation from "./ListenersFormEducation.vue";
import dateFormatTypeInput from "../../utils/dateFormatTypeInput.js";

export default {
  components: {
    ListenersFormPassport,
    ListenersFormAddress,
    ListenersFormEducation,
    ListenersPkAttForm,
  },
  props: {
    buttonTitle: { type: String, required: true },
    submitType: { type: String, required: true },
    listener: { type: Object, required: false },
    company: { type: Object, required: false },
  },
  emits: ["success", "hide"],
  setup(props, { emit }) {
    const store = useStore();

    const firstDialog = ref(false);
    const firstDialogRef = ref(null);
    const firstDialogTitle = ref("");
    const secondDialog = ref(false);
    const secondDialogRef = ref(null);
    const secondDialogType = ref("add");
    const currentListenerInfo = ref();

    const access = ref(false);
    const user = computed(() => store.getters["auth/user"]);

    const currentListenerPassport = ref(null);
    const currentListenerAddress = ref(null);
    const currentListenerEducation = ref(null);

    const phoneInput = ref(null);

    // const educationOptions = [
    //   "Высшее",
    //   "Среднее профессиональное",
    //   "Среднее общее",
    // ];
    const genderOptions = ["Мужской", "Женский"];
    const statusOptions = [
      "Работает на предприятии",
      "Не работает на предприятии",
    ];

    // const ownerUserOptions = computed(() => []);

    const companies = ref(null);

    const companyOptionsData = computed(() =>
      store.getters["auth/users"].map((user) => {
        return {
          value: user._id,
          description: user.companyFullName,
          label: user.companyShortName,
        };
      })
    );

    const companyOptions = ref(companyOptionsData.value);
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

    const pkInfo = ref([]);
    const attNkInfo = ref([]);
    const attRiInfo = ref([]);

    // const typeInfo = ref("pk");
    const certTypeInfo = ref("pk");

    const columnsPk = [
      {
        name: "pkProgram",
        required: true,
        label: "Программа ПК",
        align: "left",
        field: (row) => row.pkProgram,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "pkUniversity",
        align: "left",
        label: "Учреждение",
        field: "pkUniversity",
        sortable: true,
      },
      {
        name: "pkNumber",
        align: "left",
        label: "Серия и номер удостоверения",
        field: "pkNumber",
        sortable: true,
      },
      {
        name: "pkDate",
        align: "left",
        label: "Дата выдачи",
        field: "pkDate",
        sortable: true,
      },
      {
        name: "pkExpirationDate",
        align: "left",
        label: "Срок действия",
        field: "pkExpirationDate",
        sortable: true,
      },
      {
        name: "control",
        align: "center",
        label: "Управление",
        field: "",
      },
    ];
    const columnsNk = [
      {
        name: "certificationSystemNk",
        required: true,
        label: "Система аттестации",
        align: "left",
        field: (row) => row.certificationSystemNk,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "methodNk",
        align: "left",
        label: "Метод НК",
        field: "methodNk",
        sortable: true,
      },
      {
        name: "ticked",
        align: "left",
        label: "Объекты контроля",
        field: "ticked",
        sortable: true,
      },
      {
        name: "qualificationLevelNk",
        align: "left",
        label: "Ур. квалификации",
        field: "qualificationLevelNk",
        sortable: true,
      },
      {
        name: "nkOrganization",
        align: "left",
        label: "Орган по аттестации",
        field: "nkOrganization",
        sortable: true,
      },
      {
        name: "certificationTypeNk",
        align: "left",
        label: "Вид аттестации",
        field: "certificationTypeNk",
        sortable: true,
      },
      {
        name: "nkNumber",
        align: "left",
        label: "Серия и номер удостоверения",
        field: "nkNumber",
        sortable: true,
      },
      {
        name: "nkDate",
        align: "left",
        label: "Дата выдачи",
        field: "nkDate",
        sortable: true,
      },
      {
        name: "nkExpirationDate",
        align: "left",
        label: "Срок действия",
        field: "nkExpirationDate",
        sortable: true,
      },
      {
        name: "control",
        align: "center",
        label: "Управление",
        field: "",
      },
    ];
    const columnsRi = [
      {
        name: "certificationSystemRi",
        required: true,
        label: "Система аттестации",
        align: "left",
        field: (row) => row.certificationSystemRi,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "typeRi",
        align: "left",
        label: "Вид РИ",
        field: "typeRi",
        sortable: true,
      },
      {
        name: "qualificationLevelRi",
        align: "left",
        label: "Ур. квалификации",
        field: "qualificationLevelRi",
        sortable: true,
      },
      {
        name: "riOrganization",
        align: "left",
        label: "Орган по аттестации",
        field: "riOrganization",
        sortable: true,
      },
      {
        name: "certificationTypeRi",
        align: "left",
        label: "Вид аттестации",
        field: "certificationTypeRi",
        sortable: true,
      },
      {
        name: "riNumber",
        align: "left",
        label: "Серия и номер удостоверения",
        field: "riNumber",
        sortable: true,
      },
      {
        name: "riDate",
        align: "left",
        label: "Дата выдачи",
        field: "riDate",
        sortable: true,
      },
      {
        name: "riExpirationDate",
        align: "left",
        label: "Срок действия",
        field: "riExpirationDate",
        sortable: true,
      },
      {
        name: "control",
        align: "center",
        label: "Управление",
        field: "",
      },
    ];

    const { handleSubmit } = useForm();

    onMounted(async () => {
      // console.log(props.listener);
      // console.log(user);
      // console.log(companyOptionsData);

      if (user.value.roles?.length) {
        user.value.roles.includes("admin") || user.value.roles.includes("god")
          ? (access.value = true)
          : (access.value = false);
      }

      if (props.listener) {
        if (access.value) {
          const currentCompany = store.getters["auth/users"].filter(
            (item) => item._id == props.listener.ownerUser
          )[0];

          companies.value = {
            value: currentCompany._id,
            description: currentCompany.companyFullName,
            label: currentCompany.companyShortName,
          };
        } else {
          companies.value = {
            value: user.value.id,
            description: user.value.companyFullName,
            label: user.value.companyShortName,
          };
        }

        ownerUser.value = props.listener.ownerUser;
        status.value = props.listener.status;
        numberNk.value = props.listener.numberNk;
        numberRi.value = props.listener.numberRi;
        firstName.value = props.listener.firstName;
        secondName.value = props.listener.secondName;
        lastName.value = props.listener.lastName;
        birthday.value = props.listener.birthday;
        gender.value = props.listener.gender;
        snils.value = props.listener.snils;
        post.value = props.listener.post;

        if (props.listener.passportDate) {
          passportDate.value = props.listener.passportDate;
        }
        if (props.listener.passportIssued) {
          passportIssued.value = props.listener.passportIssued;
        }
        if (props.listener.passportNumber) {
          passportNumber.value = props.listener.passportNumber;
        }
        if (props.listener.passportSeries) {
          passportSeries.value = props.listener.passportSeries;
        }
        if (props.listener.passportCode) {
          passportCode.value = props.listener.passportCode;
        }

        mailCode.value = props.listener.mailCode;
        city.value = props.listener.city;
        township.value = props.listener.township;
        street.value = props.listener.street;
        homeNumber.value = props.listener.homeNumber;
        apartment.value = props.listener.apartment;
        // phone.value = props.listener.phone;
        phoneInput.value = props.listener.phone;
        email.value = props.listener.email;
        education.value = props.listener.education;
        institution.value = props.listener.institution;
        specialization.value = props.listener.specialization;
        diplomSeries.value = props.listener.diplomSeries;
        diplomNumber.value = props.listener.diplomNumber;
        diplomDate.value = props.listener.diplomDate;
        weldingMethodDateRde.value =
          props.listener.weldingMethodDateRde || undefined;
        weldingMethodDateSp.value =
          props.listener.weldingMethodDateSp || undefined;
        weldingMethodDateSf.value =
          props.listener.weldingMethodDateSf || undefined;
        weldingMethodDateMig.value =
          props.listener.weldingMethodDateMig || undefined;
        weldingMethodDateMag.value =
          props.listener.weldingMethodDateMag || undefined;
        weldingMethodDatePag.value =
          props.listener.weldingMethodDatePag || undefined;
        weldingMethodDatePig.value =
          props.listener.weldingMethodDatePig || undefined;
        weldingMethodDateVig.value =
          props.listener.weldingMethodDateVig || undefined;
        weldingMethodDatePs.value =
          props.listener.weldingMethodDatePs || undefined;
        weldingMethodDateGs.value =
          props.listener.weldingMethodDateGs || undefined;
        weldingMethodDateNi.value =
          props.listener.weldingMethodDateNi || undefined;
        weldingMethodDateZn.value =
          props.listener.weldingMethodDateZn || undefined;
        weldingMethodDateNg.value =
          props.listener.weldingMethodDateNg || undefined;
        weldingMethodDateE.value =
          props.listener.weldingMethodDateE || undefined;
        methodNkDateVik.value = props.listener.methodNkDateVik || undefined;
        methodNkDateVd.value = props.listener.methodNkDateVd || undefined;
        methodNkDateTk.value = props.listener.methodNkDateTk || undefined;
        methodNkDatePvk.value = props.listener.methodNkDatePvk || undefined;
        methodNkDatePvt.value = props.listener.methodNkDatePvt || undefined;
        methodNkDateMk.value = props.listener.methodNkDateMk || undefined;
        methodNkDateUk.value = props.listener.methodNkDateUk || undefined;
        methodNkDateRk.value = props.listener.methodNkDateRk || undefined;
        methodNkDateMi.value = props.listener.methodNkDateMi || undefined;
        methodNkDate1s.value = props.listener.methodNkDate1s || undefined;
        typeRiDateMsi.value = props.listener.typeRiDateMsi || undefined;
        typeRiDateMdi.value = props.listener.typeRiDateMdi || undefined;
        typeRiDateIt.value = props.listener.typeRiDateIt || undefined;
        typeRiDateIks.value = props.listener.typeRiDateIks || undefined;
        typeRiDateTi.value = props.listener.typeRiDateTi || undefined;
        typeRiDateIsm.value = props.listener.typeRiDateIsm || undefined;
        typeRiDateSe.value = props.listener.typeRiDateSe || undefined;
        typeRiDateSvi.value = props.listener.typeRiDateSvi || undefined;
        weldingProductionDate.value =
          props.listener.weldingProductionDate || undefined;
        pkInfo.value = props.listener.pkInfo || [];
        attNkInfo.value = props.listener.attNkInfo || [];
        attRiInfo.value = props.listener.attRiInfo || [];

        if (props.listener.methodNkDateVik) {
          methodNkDateGroup.value.push("vik");
        }
        if (props.listener.methodNkDateVd) {
          methodNkDateGroup.value.push("vd");
        }
        if (props.listener.methodNkDateTk) {
          methodNkDateGroup.value.push("tk");
        }
        if (props.listener.methodNkDatePvk) {
          methodNkDateGroup.value.push("pvk");
        }
        if (props.listener.methodNkDatePvt) {
          methodNkDateGroup.value.push("pvt");
        }
        if (props.listener.methodNkDateMk) {
          methodNkDateGroup.value.push("mk");
        }
        if (props.listener.methodNkDateUk) {
          methodNkDateGroup.value.push("uk");
        }
        if (props.listener.methodNkDateRk) {
          methodNkDateGroup.value.push("rk");
        }
        if (props.listener.methodNkDateMi) {
          methodNkDateGroup.value.push("mi");
        }
        if (props.listener.methodNkDate1s) {
          methodNkDateGroup.value.push("1s");
        }
        if (props.listener.typeRiDateMsi) {
          typeRiDateGroup.value.push("msi");
        }
        if (props.listener.typeRiDateMdi) {
          typeRiDateGroup.value.push("mdi");
        }
        if (props.listener.typeRiDateIt) {
          typeRiDateGroup.value.push("it");
        }
        if (props.listener.typeRiDateIks) {
          typeRiDateGroup.value.push("iks");
        }
        if (props.listener.typeRiDateTi) {
          typeRiDateGroup.value.push("ti");
        }
        if (props.listener.typeRiDateIsm) {
          typeRiDateGroup.value.push("ism");
        }
        if (props.listener.typeRiDateSe) {
          typeRiDateGroup.value.push("se");
        }
        if (props.listener.typeRiDateSvi) {
          typeRiDateGroup.value.push("svi");
        }
        if (props.listener.weldingMethodDateRde) {
          weldingMethodDateGroup.value.push("rde");
        }
        if (props.listener.weldingMethodDateSp) {
          weldingMethodDateGroup.value.push("sp");
        }
        if (props.listener.weldingMethodDateSf) {
          weldingMethodDateGroup.value.push("sf");
        }
        if (props.listener.weldingMethodDateMig) {
          weldingMethodDateGroup.value.push("mig");
        }
        if (props.listener.weldingMethodDateMag) {
          weldingMethodDateGroup.value.push("mag");
        }
        if (props.listener.weldingMethodDatePag) {
          weldingMethodDateGroup.value.push("pag");
        }
        if (props.listener.weldingMethodDatePig) {
          weldingMethodDateGroup.value.push("pig");
        }
        if (props.listener.weldingMethodDateVig) {
          weldingMethodDateGroup.value.push("vig");
        }
        if (props.listener.weldingMethodDatePs) {
          weldingMethodDateGroup.value.push("ps");
        }
        if (props.listener.weldingMethodDateGs) {
          weldingMethodDateGroup.value.push("gs");
        }
        if (props.listener.weldingMethodDateNi) {
          weldingMethodDateGroup.value.push("ni");
        }
        if (props.listener.weldingMethodDateZn) {
          weldingMethodDateGroup.value.push("zn");
        }
        if (props.listener.weldingMethodDateNg) {
          weldingMethodDateGroup.value.push("ng");
        }
        if (props.listener.weldingMethodDateE) {
          weldingMethodDateGroup.value.push("e");
        }

        currentListenerPassport.value = {
          passportSeries: props.listener.passportSeries,
          passportNumber: props.listener.passportNumber,
          passportIssued: props.listener.passportIssued,
          passportDate: props.listener.passportDate,
          passportCode: props.listener.passportCode,
        };
        currentListenerAddress.value = {
          mailCode: props.listener.mailCode,
          city: props.listener.city,
          township: props.listener.township,
          street: props.listener.street,
          homeNumber: props.listener.homeNumber,
          apartment: props.listener.apartment,
        };
        currentListenerEducation.value = {
          education: props.listener.education,
          institution: props.listener.institution,
          specialization: props.listener.specialization,
          diplomSeries: props.listener.diplomSeries,
          diplomNumber: props.listener.diplomNumber,
          diplomDate: props.listener.diplomDate,
        };
      } else {
        status.value = "Работает на предприятии";

        companies.value = {
          value: user.value.id,
          description: user.value.companyFullName,
          label: user.value.companyShortName,
        };
      }

      if (props.company) {
        companies.value = {
          value: props.company.value,
          description: props.company.description,
          label: props.company.label,
        };
      }
    });

    const { value: status, errorMessage: statusError } = useField(
      "status",
      yup.string().trim().required("Пожалуйста, укажите статус слушателя")
    );
    const { value: ownerUser, errorMessage: oUserError } = useField(
      "ownerUser",
      yup.string().required("Пожалуйста, укажите предприятие")
    );
    const { value: numberNk, errorMessage: numNkError } = useField(
      "numberNk",
      yup.string().trim()
    );
    const { value: numberRi, errorMessage: numRiError } = useField(
      "numberRi",
      yup.string().trim()
    );

    const { value: firstName, errorMessage: fNameError } = useField(
      "firstName",
      yup.string().trim().required("Пожалуйста, введите фамилию слушателя")
    );
    const { value: secondName, errorMessage: sNameError } = useField(
      "secondName",
      yup.string().trim().required("Пожалуйста, введите имя слушателя")
    );
    const { value: lastName, errorMessage: lNameError } = useField(
      "lastName",
      yup.string().trim().required("Пожалуйста, введите отчество слушателя")
    );
    const { value: snils, errorMessage: snilsError } = useField(
      "snils",
      yup.string().trim()
    );
    const { value: post, errorMessage: postError } = useField(
      "post",
      yup.string().trim().required("Пожалуйста, введите должность слушателя")
    );
    const { value: birthday, errorMessage: bError } = useField(
      "birthday",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите дату рождения слушателя")
    );
    const { value: mailCode, errorMessage: mCodeError } = useField(
      "mailCode",
      yup.string().trim()
    );
    const { value: city, errorMessage: cityError } = useField(
      "city",
      yup.string().trim()
    );
    const { value: township, errorMessage: townshipError } = useField(
      "township",
      yup.string().trim()
    );
    const { value: street, errorMessage: streetError } = useField(
      "street",
      yup.string().trim()
    );
    const { value: homeNumber, errorMessage: hNumberError } = useField(
      "homeNumber",
      yup.string().trim()
    );
    const { value: apartment, errorMessage: apartmentError } = useField(
      "apartment",
      yup.string().trim()
    );

    const { value: passportSeries, errorMessage: pSeriesError } = useField(
      "passportSeries",
      yup.string().trim()
    );
    const { value: passportNumber, errorMessage: pNumberError } = useField(
      "passportNumber",
      yup.string().trim()
    );
    const { value: passportIssued, errorMessage: pIssuedError } = useField(
      "passportIssued",
      yup.string().trim()
    );
    const { value: passportDate, errorMessage: pDateError } = useField(
      "passportDate",
      yup.string().trim()
    );
    const { value: passportCode, errorMessage: pCodeError } = useField(
      "passportCode",
      yup.string().trim()
    );
    const { value: gender, errorMessage: gError } = useField(
      "gender",
      yup.string().trim().required("Пожалуйста, укажите пол слушателя")
    );
    const { value: phone, errorMessage: phoneError } = useField(
      "phone",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите телефон")
        .min(18, "Номер телефона не может быть меньше 11 цифр (с кодом)")
    );
    const { value: email, errorMessage: eError } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите эл. почту")
        .email("Необходимо ввести корректный email")
    );

    const { value: education, errorMessage: educationError } = useField(
      "education",
      yup.string().trim()
    );
    const { value: institution, errorMessage: iError } = useField(
      "institution",
      yup.string().trim()
    );
    const { value: specialization, errorMessage: sError } = useField(
      "specialization",
      yup.string().trim()
    );
    const { value: diplomSeries, errorMessage: dSeriesError } = useField(
      "diplomSeries",
      yup.string().trim()
    );
    const { value: diplomNumber, errorMessage: dNumberError } = useField(
      "diplomNumber",
      yup.string().trim()
    );
    const { value: diplomDate, errorMessage: dDateError } = useField(
      "diplomDate",
      yup.string().trim().nullable()
    );

    const { value: weldingMethodDateRde, errorMessage: wMethodDateRdeError } =
      useField("weldingMethodDateRde", yup.string().trim());
    const { value: weldingMethodDateSp, errorMessage: wMethodDateSpError } =
      useField("weldingMethodDateSp", yup.string().trim());
    const { value: weldingMethodDateSf, errorMessage: wMethodDateSfError } =
      useField("weldingMethodDateSf", yup.string().trim());
    const { value: weldingMethodDateMig, errorMessage: wMethodDateMigError } =
      useField("weldingMethodDateMig", yup.string().trim());
    const { value: weldingMethodDateMag, errorMessage: wMethodDateMagError } =
      useField("weldingMethodDateMag", yup.string().trim());
    const { value: weldingMethodDatePag, errorMessage: wMethodDatePagError } =
      useField("weldingMethodDatePag", yup.string().trim());
    const { value: weldingMethodDatePig, errorMessage: wMethodDatePigError } =
      useField("weldingMethodDatePig", yup.string().trim());
    const { value: weldingMethodDateVig, errorMessage: wMethodDateVigError } =
      useField("weldingMethodDateVig", yup.string().trim());
    const { value: weldingMethodDatePs, errorMessage: wMethodDatePsError } =
      useField("weldingMethodDatePs", yup.string().trim());
    const { value: weldingMethodDateGs, errorMessage: wMethodDateGsError } =
      useField("weldingMethodDateGs", yup.string().trim());
    const { value: weldingMethodDateNi, errorMessage: wMethodDateNiError } =
      useField("weldingMethodDateNi", yup.string().trim());
    const { value: weldingMethodDateZn, errorMessage: wMethodDateZnError } =
      useField("weldingMethodDateZn", yup.string().trim());
    const { value: weldingMethodDateNg, errorMessage: wMethodDateNgError } =
      useField("weldingMethodDateNg", yup.string().trim());
    const { value: weldingMethodDateE, errorMessage: wMethodDateEError } =
      useField("weldingMethodDateE", yup.string().trim());
    const { value: methodNkDateVik, errorMessage: nkDateVikError } = useField(
      "methodNkDateVik",
      yup.string().trim()
    );
    const { value: methodNkDateVd, errorMessage: nkDateVdError } = useField(
      "methodNkDateVd",
      yup.string().trim()
    );
    const { value: methodNkDateTk, errorMessage: nkDateTkError } = useField(
      "methodNkDateTk",
      yup.string().trim()
    );
    const { value: methodNkDatePvk, errorMessage: nkDatePvkError } = useField(
      "methodNkDatePvk",
      yup.string().trim()
    );
    const { value: methodNkDatePvt, errorMessage: nkDatePvtError } = useField(
      "methodNkDatePvt",
      yup.string().trim()
    );
    const { value: methodNkDateMk, errorMessage: nkDateMkError } = useField(
      "methodNkDateMk",
      yup.string().trim()
    );
    const { value: methodNkDateUk, errorMessage: nkDateUkError } = useField(
      "methodNkDateUk",
      yup.string().trim()
    );
    const { value: methodNkDateRk, errorMessage: nkDateRkError } = useField(
      "methodNkDateRk",
      yup.string().trim()
    );
    const { value: methodNkDateMi, errorMessage: nkDateMiError } = useField(
      "methodNkDateMi",
      yup.string().trim()
    );
    const { value: methodNkDate1s, errorMessage: nkDate1sError } = useField(
      "methodNkDate1s",
      yup.string().trim()
    );
    const { value: typeRiDateMsi, errorMessage: riDateMsiError } = useField(
      "typeRiDateMsi",
      yup.string().trim()
    );
    const { value: typeRiDateMdi, errorMessage: riDateMdiError } = useField(
      "typeRiDateMdi",
      yup.string().trim()
    );
    const { value: typeRiDateIt, errorMessage: riDateItError } = useField(
      "typeRiDateIt",
      yup.string().trim()
    );
    const { value: typeRiDateIks, errorMessage: riDateIksError } = useField(
      "typeRiDateIks",
      yup.string().trim()
    );
    const { value: typeRiDateTi, errorMessage: riDateTiError } = useField(
      "typeRiDateTi",
      yup.string().trim()
    );
    const { value: typeRiDateIsm, errorMessage: riDateIsmError } = useField(
      "typeRiDateIsm",
      yup.string().trim()
    );
    const { value: typeRiDateSe, errorMessage: riDateSeError } = useField(
      "typeRiDateSe",
      yup.string().trim()
    );
    const { value: typeRiDateSvi, errorMessage: riDateSviError } = useField(
      "typeRiDateSvi",
      yup.string().trim()
    );
    const { value: weldingProductionDate, errorMessage: wProductionDateError } =
      useField("weldingProductionDate", yup.string().trim());

    watch(phoneInput, (newVal, oldVal) => {
      phone.value = newVal;

      if (newVal.includes("_")) {
        phone.value = newVal.replace(/_/g, "");
      }
    });

    watch(companies, (newVal, oldVal) => {
      if (newVal !== "" && newVal !== null) {
        ownerUser.value = newVal.value;
      } else {
        ownerUser.value = "";
      }
    });
    watch(firstName, (newVal, oldVal) => {
      if (newVal !== "") {
        firstName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });
    watch(secondName, (newVal, oldVal) => {
      if (newVal !== "") {
        secondName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });
    watch(lastName, (newVal, oldVal) => {
      if (newVal !== "") {
        lastName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });

    watch(methodNkDateGroup, (newVal, oldVal) => {
      if (methodNkDateGroup.value.length) {
        expandedMethodNkDate.value = true;
      } else {
        expandedMethodNkDate.value = false;
      }
    });
    watch(typeRiDateGroup, (newVal, oldVal) => {
      if (typeRiDateGroup.value.length) {
        expandedTypeRiDate.value = true;
      } else {
        expandedTypeRiDate.value = false;
      }
    });
    watch(weldingMethodDateGroup, (newVal, oldVal) => {
      if (weldingMethodDateGroup.value.length) {
        expandedWeldingMethodDate.value = true;
      } else {
        expandedWeldingMethodDate.value = false;
      }
    });

    function updateListenerPassport(value) {
      passportSeries.value = value.passportSeries;
      passportNumber.value = value.passportNumber;
      passportIssued.value = value.passportIssued;
      passportDate.value = value.passportDate;
      passportCode.value = value.passportCode;

      currentListenerPassport.value = {
        passportSeries: value.passportSeries,
        passportNumber: value.passportNumber,
        passportIssued: value.passportIssued,
        passportDate: value.passportDate,
        passportCode: value.passportCode,
      };

      firstDialog.value = false;
    }

    function updateListenerAddress(value) {
      mailCode.value = value.mailCode;
      city.value = value.city;
      township.value = value.township;
      street.value = value.street;
      homeNumber.value = value.homeNumber;
      apartment.value = value.apartment;

      currentListenerAddress.value = {
        mailCode: value.mailCode,
        city: value.city,
        township: value.township,
        street: value.street,
        homeNumber: value.homeNumber,
        apartment: value.apartment,
      };

      firstDialog.value = false;
    }

    function updateListenerEducation(value) {
      education.value = value.education;
      institution.value = value.institution;
      specialization.value = value.specialization;
      diplomSeries.value = value.diplomSeries;
      diplomNumber.value = value.diplomNumber;
      diplomDate.value = value.diplomDate;

      currentListenerEducation.value = {
        education: value.education,
        institution: value.institution,
        specialization: value.specialization,
        diplomSeries: value.diplomSeries,
        diplomNumber: value.diplomNumber,
        diplomDate: value.diplomDate,
      };

      firstDialog.value = false;
    }

    function filterFn(val, update) {
      update(() => {
        if (val === "") {
          update(() => {
            companyOptions.value = companyOptionsData.value;
          });
          return;
        } else {
          const needle = val.toLowerCase();
          companyOptions.value = companyOptionsData.value.filter(
            (v) =>
              v.label.toLowerCase().indexOf(needle) > -1 ||
              v.description.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    }

    function addListenerInfo(values) {
      if (values.type == "pk") {
        pkInfo.value.push(values.values);
      } else if (values.type == "nk") {
        attNkInfo.value.push(values.values);
      } else if (values.type == "ri") {
        attRiInfo.value.push(values.values);
      }

      secondDialog.value = false;
    }
    function updateListenerInfo(values) {
      if (values.type == "pk") {
        //Поиск номера элемента
        const pkInfoItemIndex = pkInfo.value.findIndex(
          (item) =>
            item.pkDate == values.oldValues.pkDate &&
            item.pkExpirationDate == values.oldValues.pkExpirationDate &&
            item.pkNumber == values.oldValues.pkNumber &&
            item.pkProgram == values.oldValues.pkProgram &&
            item.pkUniversity == values.oldValues.pkUniversity
        );
        //обновление элемента по номеру
        if (pkInfoItemIndex !== -1) {
          pkInfo.value[pkInfoItemIndex] = values.values;
        }
      } else if (values.type == "nk") {
        //Поиск номера элемента
        const nkInfoItemIndex = attNkInfo.value.findIndex(
          (item) =>
            item.certificationSystemNk ==
              values.oldValues.certificationSystemNk &&
            item.certificationTypeNk == values.oldValues.certificationTypeNk &&
            item.methodNk == values.oldValues.methodNk &&
            item.nkDate == values.oldValues.nkDate &&
            item.nkExpirationDate == values.oldValues.nkExpirationDate &&
            item.nkNumber == values.oldValues.nkNumber &&
            item.nkOrganization == values.oldValues.nkOrganization &&
            item.qualificationLevelNk ==
              values.oldValues.qualificationLevelNk &&
            item.ticked.length == values.oldValues.ticked.length
        );
        //обновление элемента по номеру
        if (nkInfoItemIndex !== -1) {
          attNkInfo.value[nkInfoItemIndex] = values.values;
        }
      } else if (values.type == "ri") {
        //Поиск номера элемента
        const riInfoItemIndex = attRiInfo.value.findIndex(
          (item) =>
            item.certificationSystemRi ==
              values.oldValues.certificationSystemRi &&
            item.certificationTypeRi == values.oldValues.certificationTypeRi &&
            item.qualificationLevelRi ==
              values.oldValues.qualificationLevelRi &&
            item.riDate == values.oldValues.riDate &&
            item.riExpirationDate == values.oldValues.riExpirationDate &&
            item.riNumber == values.oldValues.riNumber &&
            item.riOrganization == values.oldValues.riOrganization &&
            item.typeRi == values.oldValues.typeRi
        );
        //обновление элемента по номеру
        if (riInfoItemIndex !== -1) {
          attRiInfo.value[riInfoItemIndex] = values.values;
        }
      }

      secondDialog.value = false;
    }

    //показ модального окна с формами редактирования/удаления сведений о сертификации
    async function showModalListenerInfo(action, listenerInfo) {
      // console.log(action);
      // console.log(listenerInfo);

      if (action == "delete") {
        currentListenerInfo.value = listenerInfo;

        //показать форму удаления
        secondDialogType.value = "delete";
        secondDialog.value = true;
      } else if (action == "edit") {
        await store.dispatch(
          "settingsConfigurable/load",
          "certification-system"
        );

        currentListenerInfo.value = listenerInfo;

        //показать форму редактирования
        secondDialogType.value = "edit";
        secondDialog.value = true;
      }
    }

    //удаление сведений о серификации
    function deleteListenerInfo(listenerInfo) {
      if (
        listenerInfo.pkDate &&
        listenerInfo.pkExpirationDate &&
        listenerInfo.pkNumber &&
        listenerInfo.pkProgram &&
        listenerInfo.pkUniversity
      ) {
        //Поиск номера элемента
        const pkInfoItemIndex = pkInfo.value.findIndex(
          (item) =>
            item.pkDate == listenerInfo.pkDate &&
            item.pkExpirationDate == listenerInfo.pkExpirationDate &&
            item.pkNumber == listenerInfo.pkNumber &&
            item.pkProgram == listenerInfo.pkProgram &&
            item.pkUniversity == listenerInfo.pkUniversity
        );
        //удаление элемента по номеру
        pkInfo.value.splice(pkInfoItemIndex, 1);
      } else if (
        listenerInfo.certificationSystemNk &&
        listenerInfo.certificationTypeNk &&
        listenerInfo.methodNk &&
        listenerInfo.nkDate &&
        listenerInfo.nkExpirationDate &&
        listenerInfo.nkNumber &&
        listenerInfo.nkOrganization &&
        listenerInfo.qualificationLevelNk &&
        listenerInfo.ticked.length
      ) {
        //Поиск номера элемента
        const nkInfoItemIndex = attNkInfo.value.findIndex(
          (item) =>
            item.certificationSystemNk == listenerInfo.certificationSystemNk &&
            item.certificationTypeNk == listenerInfo.certificationTypeNk &&
            item.methodNk == listenerInfo.methodNk &&
            item.nkDate == listenerInfo.nkDate &&
            item.nkExpirationDate == listenerInfo.nkExpirationDate &&
            item.nkNumber == listenerInfo.nkNumber &&
            item.nkOrganization == listenerInfo.nkOrganization &&
            item.qualificationLevelNk == listenerInfo.qualificationLevelNk &&
            item.ticked.length == listenerInfo.ticked.length
        );

        //удаление элемента по номеру
        attNkInfo.value.splice(nkInfoItemIndex, 1);
      } else if (
        listenerInfo.certificationSystemRi &&
        listenerInfo.certificationTypeRi &&
        listenerInfo.qualificationLevelRi &&
        listenerInfo.riDate &&
        listenerInfo.riExpirationDate &&
        listenerInfo.riNumber &&
        listenerInfo.riOrganization &&
        listenerInfo.typeRi
      ) {
        //Поиск номера элемента
        const riInfoItemIndex = attRiInfo.value.findIndex(
          (item) =>
            item.certificationSystemRi == listenerInfo.certificationSystemRi &&
            item.certificationTypeRi == listenerInfo.certificationTypeRi &&
            item.qualificationLevelRi == listenerInfo.qualificationLevelRi &&
            item.riDate == listenerInfo.riDate &&
            item.riExpirationDate == listenerInfo.riExpirationDate &&
            item.riNumber == listenerInfo.riNumber &&
            item.riOrganization == listenerInfo.riOrganization &&
            item.typeRi == listenerInfo.typeRi
        );

        //удаление элемента по номеру
        attRiInfo.value.splice(riInfoItemIndex, 1);
      }

      secondDialog.value = false;
    }

    function openFirstDialog(dialogTitle) {
      firstDialogTitle.value = dialogTitle;
      firstDialog.value = true;
    }

    async function openSecondDialog() {
      await store.dispatch("settingsConfigurable/load", "certification-system");

      secondDialogType.value = "add";
      secondDialog.value = true;
    }

    const onSubmit = handleSubmit(async (values) => {
      // console.log(values);

      //Подсчет количества дней в году
      let year = new Date().getFullYear();
      let yearDays = 0;
      let d;
      for (let i = 1; i < 13; i++) {
        d = new Date(year, i, 0);
        yearDays += d.getDate();
      }

      const date = new Date();
      const listenerDate = new Date(values.birthday);

      //Проверка на совершеннолетие слушателя
      if ((date - listenerDate) / (1000 * 3600 * 24) / yearDays < 18) {
        return store.dispatch("setMessage", {
          value: "Слушателю не может быть меньше 18 лет",
          type: "danger",
        });
      }

      try {
        if (props.submitType == "add") {
          await store.dispatch("listener/create", {
            ...values,
            pkInfo: pkInfo.value,
            attNkInfo: attNkInfo.value,
            attRiInfo: attRiInfo.value,
            userId: store.getters["auth/user"].id,
          });

          emit("success", {
            firstName: firstName.value,
            secondName: secondName.value,
            lastName: lastName.value,
            birthday: birthday.value,
          });
        } else if (props.submitType == "update") {
          await store.dispatch("listener/update", {
            values: {
              ...values,
              pkInfo: pkInfo.value,
              attNkInfo: attNkInfo.value,
              attRiInfo: attRiInfo.value,
            },
            id: props.listener._id,
          });

          emit("success", {
            id: props.listener._id,
          });
        }
      } catch (e) {
        // console.log(e);
      }
    });

    // async function onInvalidSubmit({ values, errors, results }) {
    //   console.log(errors);
    // }

    return {
      dateFormatTypeInput,

      firstDialog,
      firstDialogRef,
      firstDialogTitle,
      secondDialog,
      secondDialogRef,
      secondDialogType,
      currentListenerInfo,
      currentListenerPassport,
      currentListenerAddress,
      currentListenerEducation,
      showModalListenerInfo,
      deleteListenerInfo,
      access,
      // educationOptions,
      genderOptions,
      statusOptions,
      companyOptions,
      companies,
      filterFn,
      addListenerInfo,
      updateListenerInfo,
      updateListenerPassport,
      updateListenerAddress,
      updateListenerEducation,
      onSubmit,
      openFirstDialog,
      openSecondDialog,

      phoneInput,

      status,
      ownerUser,
      numberNk,
      numberRi,
      firstName,
      secondName,
      lastName,
      snils,
      post,
      birthday,
      passportSeries,
      passportNumber,
      passportIssued,
      passportDate,
      passportCode,
      mailCode,
      city,
      township,
      street,
      homeNumber,
      apartment,
      phone,
      email,
      education,
      institution,
      specialization,
      gender,
      diplomSeries,
      diplomNumber,
      diplomDate,
      // companyError,
      statusError,
      oUserError,
      numNkError,
      numRiError,
      fNameError,
      sNameError,
      lNameError,
      snilsError,
      postError,
      bError,
      pSeriesError,
      pNumberError,
      pIssuedError,
      pDateError,
      pCodeError,
      gError,
      mCodeError,
      cityError,
      townshipError,
      streetError,
      hNumberError,
      apartmentError,
      phoneError,
      eError,
      educationError,
      iError,
      sError,
      dSeriesError,
      dNumberError,
      dDateError,

      weldingMethodDateRde,
      weldingMethodDateSp,
      weldingMethodDateSf,
      weldingMethodDateMig,
      weldingMethodDateMag,
      weldingMethodDatePag,
      weldingMethodDatePig,
      weldingMethodDateVig,
      weldingMethodDatePs,
      weldingMethodDateGs,
      weldingMethodDateNi,
      weldingMethodDateZn,
      weldingMethodDateNg,
      weldingMethodDateE,
      methodNkDateVik,
      methodNkDateVd,
      methodNkDateTk,
      methodNkDatePvk,
      methodNkDatePvt,
      methodNkDateMk,
      methodNkDateUk,
      methodNkDateRk,
      methodNkDateMi,
      methodNkDate1s,
      typeRiDateMsi,
      typeRiDateMdi,
      typeRiDateIt,
      typeRiDateIks,
      typeRiDateTi,
      typeRiDateIsm,
      typeRiDateSe,
      typeRiDateSvi,
      weldingProductionDate,

      wMethodDateRdeError,
      wMethodDateSpError,
      wMethodDateSfError,
      wMethodDateMigError,
      wMethodDateMagError,
      wMethodDatePagError,
      wMethodDatePigError,
      wMethodDateVigError,
      wMethodDatePsError,
      wMethodDateGsError,
      wMethodDateNiError,
      wMethodDateZnError,
      wMethodDateNgError,
      wMethodDateEError,
      nkDateVikError,
      nkDateVdError,
      nkDateTkError,
      nkDatePvkError,
      nkDatePvtError,
      nkDateMkError,
      nkDateUkError,
      nkDateRkError,
      nkDateMiError,
      nkDate1sError,
      riDateMsiError,
      riDateMdiError,
      riDateItError,
      riDateIksError,
      riDateTiError,
      riDateIsmError,
      riDateSeError,
      riDateSviError,
      wProductionDateError,

      pkInfo,
      attNkInfo,
      attRiInfo,

      expandedMethodNkDate,
      expandedTypeRiDate,
      expandedWeldingMethodDate,
      methodNkDateGroup,
      typeRiDateGroup,
      weldingMethodDateGroup,
      // typeInfo,
      certTypeInfo,

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
      typeRiDateOptions: [
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
      weldingMethodDateOptions: [
        {
          label: "РДЭ",
          value: "rde",
        },
        {
          label: "СП",
          value: "sp",
        },
        {
          label: "СФ",
          value: "sf",
        },
        {
          label: "МИГ",
          value: "mig",
        },
        {
          label: "МАГ",
          value: "mag",
        },
        {
          label: "ПАГ",
          value: "pag",
        },
        {
          label: "ПИГ",
          value: "pig",
        },
        {
          label: "ВИГ",
          value: "vig",
        },
        {
          label: "ПС",
          value: "ps",
        },
        {
          label: "ГС",
          value: "gs",
        },
        {
          label: "НИ",
          value: "ni",
        },
        {
          label: "ЗН",
          value: "zn",
        },
        {
          label: "НГ",
          value: "ng",
        },
        {
          label: "Э",
          value: "e",
        },
      ],

      columnsPk,
      columnsNk,
      columnsRi,

      initialPaginationPk: {
        sortBy: "pkDate",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      initialPaginationNk: {
        sortBy: "nkDate",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      initialPaginationRi: {
        sortBy: "riDate",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
};
</script>

<style></style>
