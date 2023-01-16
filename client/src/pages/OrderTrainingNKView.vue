<template>
  <app-page :title="title">
    <div>
      <div v-if="loading"><AppLoader /></div>
      <div v-else-if="!access && order?.status == 'Отправлена на экспертизу'">
        <p class="text-center">
          Заявка отправлена на экспертизу. Ожидайте проверку
        </p>
        <div class="row justify-center q-mb-md">
          <q-btn
            label="Отменить"
            type="button"
            color="red"
            @click="cancelOrder"
          />
        </div>
        <div class="row justify-center">
          <q-btn
            label="К списку заявок"
            type="button"
            to="/orders-training-nk"
            color="primary"
          />
        </div>
      </div>
      <div v-else-if="order">
        <div>
          <div v-if="showEditFields" class="q-card">
            <div class="q-pa-md">
              <OrdersTrainingForm
                orderType="nk"
                :orderData="order"
                @updateSuccess="updateOrder"
                @hide="showEditFields = false"
              />
            </div>
          </div>
          <div v-else class="">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="main" label="Основные свойства" />
                <q-tab name="doc" label="Текст заявки" />
                <q-tab name="agreement" label="Согласие" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="main">
                  <div class="q-mt-md">
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <div class="text-subtitle2 text-bold text-grey-9">
                          Профессиональная программа повышения квалификации:
                        </div>
                        <div class="q-mb-md">
                          {{
                            order.program == "vik"
                              ? "Неразрушающий метод контроля качества «Визуальный и измерительный контроль» (ВИК)"
                              : order.program == "vd"
                              ? "Неразрушающий метод контроля состояния «Вибродиагностический контроль» (ВД)"
                              : order.program == "tk"
                              ? "Неразрушающий метод контроля состояния «Тепловой контроль» (ТК)"
                              : order.program == "pvk"
                              ? "Неразрушающий метод контроля качества «Капиллярный контроль» (ПВК)"
                              : order.program == "pvt"
                              ? "Неразрушающий метод контроля качества «Течеискание» (ПВТ)"
                              : order.program == "mk"
                              ? "Неразрушающий метод контроля качества «Магнитный контроль» (МК)"
                              : order.program == "uk"
                              ? "Неразрушающий метод контроля качества «Ультразвуковой контроль» (УК)"
                              : order.program == "rk"
                              ? "Неразрушающий метод контроля качества «Радиографический контроль» (РК)"
                              : order.program == "mi"
                              ? "«Механические испытания материалов» (МИ)"
                              : order.program == "1s"
                              ? "«Информационные технологии в бухгалтерском и налоговом учете» (1С)"
                              : ""
                          }}
                        </div>

                        <div class="text-subtitle2 text-bold text-grey-9">
                          ФИО специалиста:
                        </div>
                        <div class="q-mb-md">
                          {{
                            order.listener.firstName +
                            " " +
                            order.listener.secondName +
                            " " +
                            order.listener.lastName
                          }}
                        </div>

                        <!-- <div class="text-subtitle2 text-bold text-grey-9">
                          Адрес:
                        </div>
                        <div class="q-mb-md">
                          {{
                            order.mailCode +
                            ", " +
                            order.city +
                            ", " +
                            order.street +
                            ", " +
                            order.homeNumber +
                            ", " +
                            order.apartment
                          }}
                        </div> -->

                        <div class="text-subtitle2 text-bold text-grey-9">
                          Телефон:
                        </div>
                        <div class="q-mb-md">{{ order.listener.phone }}</div>

                        <div class="text-subtitle2 text-bold text-grey-9">
                          Email:
                        </div>
                        <div class="q-mb-md">{{ order.listener.email }}</div>

                        <div class="text-subtitle2 text-bold text-grey-9">
                          Контрагент:
                        </div>
                        <div class="q-mb-md">
                          {{ order.user.companyShortName }}
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="row">
                          <div class="col-12 col-md-6">
                            <div class="text-subtitle2 text-bold text-grey-9">
                              Номер заявки:
                            </div>
                            <div>
                              {{
                                order.status == "Идёт обучение" ||
                                order.status == "Выполнена"
                                  ? order.number
                                  : "не задан"
                              }}
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="text-subtitle2 text-bold text-grey-9">
                              Дата регистрации заявки:
                            </div>
                            <div class="q-mb-md">
                              {{
                                order.status == "Идёт обучение" ||
                                order.status == "Выполнена"
                                  ? dateFormat(order.date)
                                  : "не задана"
                              }}
                            </div>
                            <div class="text-subtitle2 text-bold text-grey-9">
                              Статус заявки:
                            </div>
                            <div class="q-mb-md">
                              <q-badge
                                :color="
                                  order.status == 'Принята в работу'
                                    ? 'primary'
                                    : order.status ==
                                      'Возвращена на корректировку'
                                    ? 'orange'
                                    : order.status == 'Отправлена на экспертизу'
                                    ? 'purple'
                                    : order.status == 'Выполнена'
                                    ? 'green'
                                    : order.status == 'Отменена'
                                    ? 'red'
                                    : order.status == 'Идёт обучение'
                                    ? 'teal'
                                    : order.status == 'Черновик'
                                    ? 'grey'
                                    : ''
                                "
                                >{{ order.status }}</q-badge
                              >
                            </div>
                          </div>
                          <div class="col-12">
                            <p>ВАЖНО:</p>
                            <ul>
                              <li>
                                Документы приняты в работу, следовательно нужно
                                распечатать комплект документов, подписать у
                                руководителя предприятия, скрепить подпись
                                печатью и передать в Технопарк
                              </li>
                              <li>
                                В случае необходимости внесения изменений в
                                заявку, необходимо будет повторно отправлять ее
                                на экспертизу
                              </li>
                              <li>
                                Номер и дата регистрации заявки будут присвоены
                                после изменения статуса заявки на «Идет
                                обучение»
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="doc">
                  <div class="q-mt-md print-mt-0">
                    <div class="document-wrapper">
                      <div class="document">
                        <div class="document-header text-center q-mb-md">
                          <h3 class="document-header__title fs-print-14pt">
                            ЗАЯВКА <br />
                            НА ПОВЫШЕНИЕ КВАЛИФИКАЦИИ
                          </h3>
                          <div
                            class="document-header__suptitle q-mt-xs fs-print-10pt"
                          >
                            Заявка № ___________ Дата __________ г.
                          </div>
                        </div>
                        <div class="document-body fs-print-12pt">
                          <div class="q-mb-xs">
                            Полное наименование организации:
                            <span class="text-underline">{{
                              order.user.companyFullName
                            }}</span>
                          </div>
                          <div class="row q-mb-xs">
                            Юридический адрес:
                            <div class="row q-mx-sm">
                              <span
                                class="symbol-bordered"
                                v-for="(item, idx) in order.user
                                  .companyLegalAddressCode"
                                :key="idx"
                                >{{ item }}</span
                              >
                            </div>
                            <span class="text-underline">{{
                              order.user.companyLegalAddressCity +
                              ", " +
                              (order.user.companyLegalAddressTownship
                                ? order.user.companyLegalAddressTownship + ", "
                                : "") +
                              order.user.companyLegalAddressStreet +
                              ", " +
                              order.user.companyLegalAddressHouse +
                              ", " +
                              (order.user.companyLegalAddressRoom
                                ? order.user.companyLegalAddressRoom
                                : "")
                            }}</span>
                          </div>
                          <div class="row q-mb-xs">
                            ИНН организации:
                            <div class="row q-ml-sm">
                              <span
                                class="symbol-bordered"
                                v-for="(item, idx) in order.user.companyInn"
                                :key="idx"
                                >{{ item }}</span
                              >
                            </div>
                          </div>
                          <div class="q-mb-xs">
                            Код банка:
                            <span class="bordered">{{
                              order.user.companyBik
                            }}</span>
                          </div>
                          <div class="row justify-between q-mb-xs">
                            <div>
                              Т/с
                              <span class="text-underline">{{
                                order.user.companyPayment
                              }}</span>
                            </div>
                            <div>
                              Банк
                              <span class="text-underline">{{
                                order.user.companyBank
                              }}</span>
                            </div>
                          </div>
                          <div class="row q-mb-xs">
                            Почтовый адрес:
                            <div class="row q-mx-sm">
                              <span
                                class="symbol-bordered"
                                v-for="(item, idx) in order.user
                                  .companyMailAddressCode"
                                :key="idx"
                                >{{ item }}</span
                              >
                            </div>

                            <span class="text-underline">{{
                              order.user.companyMailAddressCity +
                              ", " +
                              (order.user.companyMailAddressTownship
                                ? order.user.companyMailAddressTownship + ", "
                                : "") +
                              order.user.companyMailAddressStreet +
                              ", " +
                              order.user.companyMailAddressHouse +
                              ", " +
                              (order.user.companyMailAddressRoom
                                ? order.user.companyMailAddressRoom
                                : "")
                            }}</span>
                          </div>
                          <div class="row q-mb-lg">
                            <div class="q-mr-xl">
                              Телефон (с кодом):
                              <span class="text-underline">{{
                                order.user.companyPhone
                              }}</span>
                            </div>
                            <div>
                              e-mail:
                              <span class="text-underline">{{
                                order.user.companyEmail
                              }}</span>
                            </div>
                          </div>
                          <p>
                            просит Общество с ограниченной ответственностью
                            «Технопарк «Новые технологии» провести повышение
                            квалификации
                          </p>
                          <p class="text-center bordered-bottom">
                            {{ order.listener.post }}
                          </p>
                          <p class="text-center">
                            <sup>(должность - полностью)</sup>
                          </p>
                          <p class="text-center bordered-bottom">
                            {{
                              order.listener.firstName +
                              " " +
                              order.listener.secondName +
                              " " +
                              order.listener.lastName
                            }}
                          </p>
                          <p class="text-center">
                            <sup>(Фамилия, имя, отчество - полностью)</sup>
                          </p>
                          <p>
                            по дополнительной профессиональной программе
                            (отметить символом Х):
                          </p>
                          <table>
                            <thead class="fs-print-12pt">
                              <tr>
                                <td>
                                  Наименование профессиональной программы
                                  повышения квалификации
                                </td>
                                <td class="text-center q-px-md">*</td>
                              </tr>
                            </thead>
                            <tbody class="fs-print-11pt">
                              <tr>
                                <td>
                                  неразрушающий метод контроля качества
                                  «Визуальный и измерительный контроль» (ВИК)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "vik" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля состояния
                                  «Вибродиагностический контроль» (ВД)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "vd" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля состояния
                                  «Тепловой контроль» (ТК)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "tk" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля качества
                                  «Капиллярный контроль» (ПВК)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "pvk" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля качества
                                  «Течеискание» (ПВТ)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "pvt" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля качества
                                  «Магнитный контроль» (МК)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "mk" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля качества
                                  «Ультразвуковой контроль» (УК)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "uk" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  неразрушающий метод контроля качества
                                  «Радиографический контроль» (РК)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "rk" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  «Механические испытания материалов» (МИ)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "mi" ? "X" : "" }}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  «Информационные технологии в бухгалтерском и
                                  налоговом учете» (1С)
                                </td>
                                <td class="text-center">
                                  {{ order.program == "1s" ? "X" : "" }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p class="text-indent">
                            *Заявитель обязуется оплатить расходы, связанные с
                            подготовкой, повышением квалификации специалиста и с
                            выдачей Удостоверения о повышении квалификации.
                          </p>
                          <div class="text-bold q-mt-md text-indent">
                            Специалист представляет в ООО «Новые технологии:
                          </div>

                          <p class="text-indent">
                            1. Заявку, подписанную руководителем предприятия –
                            <span class="text-underline">оригинал</span>!
                          </p>
                          <p class="text-indent">
                            2. Документы о базовом профессиональном образовании
                            (<span class="text-italic"
                              >диплом, аттестат и т.п.</span
                            >) – копии заверенные, уполномоченным лицом на
                            предприятии.
                          </p>
                          <p class="text-indent">
                            3. Сертификаты, полученные ранее и/или документы,
                            подтверждающие наличие специальной подготовки по
                            заявленной программе повышения квалификации (если
                            имеется) – копии заверенные, уполномоченным лицом на
                            предприятии.
                          </p>
                          <p class="text-indent">
                            4. Справку о стаже практической деятельности по
                            заявленному методу контроля качества или испытания
                            материалов (если имеется) - оригинал
                          </p>
                          <p class="text-indent">
                            5. Медицинскую справку окулиста о состоянии зрения
                            (действительна в течение 1 года) – копия заверенная,
                            уполномоченным лицом на предприятии.
                          </p>
                          <p class="text-indent">
                            6. Согласие на обработку персональных данных
                            <span
                              >(<span class="text-italic"
                                >форма прилагается</span
                              >)</span
                            >
                            – оригинал.
                          </p>

                          <p class="text-bold text-indent">
                            Контактное лицо Заявителя:
                          </p>
                          <div class="row q-mb-xl">
                            <div>
                              ФИО:
                              <span class="text-underline q-mr-md"
                                >{{
                                  order.user.firstName +
                                  " " +
                                  order.user.secondName +
                                  " " +
                                  order.user.lastName
                                }},</span
                              >
                            </div>
                            <div>
                              эл. почта
                              <span class="text-underline q-mr-md"
                                >{{ order.user.email }};</span
                              >
                            </div>
                            <div>
                              телефон
                              <span class="text-underline">{{
                                order.user.phone
                              }}</span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="q-mr-xl">{{ order.user.post }}</div>
                            <div class="column">
                              <div class="row">
                                <div
                                  class="bordered-bottom q-mr-sm"
                                  style="width: 200px"
                                ></div>
                                <div
                                  class="bordered-bottom"
                                  style="width: 200px"
                                >
                                  /
                                  {{
                                    order.user.companyDirFirstName +
                                    " " +
                                    order.user.companyDirSecondName[0] +
                                    ". " +
                                    order.user.companyDirLastName[0] +
                                    "."
                                  }}
                                </div>
                              </div>
                              <div class="row justify-around">
                                <sup>(подпись)</sup><sup>(ФИО)</sup>
                              </div>
                            </div>
                          </div>
                          <p>
                            <span class="q-mr-xl">М.П.</span> «____» __________
                            20___ г.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="agreement">
                  <div class="q-mt-md print-mt-0">
                    <div class="document-wrapper">
                      <div class="document">
                        <div class="document-header text-center">
                          <h3 class="document-header__title fs-print-11pt">
                            СОГЛАСИЕ <br />
                            на сбор, обработку и хранение персональных данных
                          </h3>
                        </div>
                        <div class="document-body fs-print-11pt">
                          <div class="row">
                            Я
                            <div class="q-ml-xs bordered-bottom flex-1">
                              {{
                                order.listener.firstName +
                                " " +
                                order.listener.secondName +
                                " " +
                                order.listener.lastName
                              }}
                            </div>
                            (Ф.И.О.)
                          </div>
                          <div class="row q-mb-xs justify-between">
                            (дата рождения
                            <span class="q-mx-sm bordered-bottom">
                              {{ dateFormat(order.listener.birthday) + " г." }}
                            </span>

                            паспорт:
                            <span class="q-ml-xs">серия</span>
                            <span class="q-ml-xs bordered-bottom"
                              >{{ order.listener.passportSeries }},</span
                            >
                            №
                            <span class="q-ml-xs bordered-bottom"
                              >{{ order.listener.passportNumber }},</span
                            >
                          </div>
                          <div class="row q-mb-xs">
                            выдан
                            <div class="q-ml-xs bordered-bottom flex-1">
                              {{ order.listener.passportIssued }}
                            </div>
                            ,
                          </div>
                          <div class="row q-mb-xs">
                            проживающий
                            <div class="q-ml-xs bordered-bottom flex-1">
                              {{
                                order.listener.city +
                                ", " +
                                order.listener.street +
                                ", " +
                                order.listener.homeNumber +
                                (order.listener.apartment
                                  ? ", " + order.listener.apartment
                                  : "")
                              }}
                            </div>
                          </div>
                          <div class="text-justify">
                            путем подписания настоящего согласия, на основании
                            Закона о персональных данных ДНР даю согласие
                            <b
                              >ОБЩЕСТВУ С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ
                              «ТЕХНОПАРК «НОВЫЕ ТЕХНОЛОГИИ» (ООО «НОВЫЕ
                              ТЕХНОЛОГИИ»),</b
                            >
                            на сбор, запись, систематизацию, накопление,
                            хранение, уточнение (обновление, изменение),
                            извлечение, использование, передачу
                            (распространение, предоставление, доступ), моих
                            персональных данных, на (бумажных, электронных)
                            носителях базы персональных данных, а именно:
                          </div>
                          <div class="text-indent text-justify">
                            - паспортные данные (фамилия, имя, отчество, дата,
                            месяц, год и место рождения, серия, номер паспорта,
                            кем и когда выдан, место регистрации),
                            идентификационный номер, др. данные предоставленные
                            владельцем персональных данных, с целью
                            предоставления услуг по повышению квалификации и
                            оформления удостоверения по повышению квалификации
                            согласно действующему законодательству ДНР.
                          </div>
                          <div class="text-indent text-justify">
                            Согласие является действительным с момента его
                            подписания Заказчиком. Срок или условия окончания
                            обработки персональных данных Заказчика в течение
                            одного года с момента выдачи удостоверения по
                            повышению квалификации.
                          </div>
                          <div class="row justify-between q-mt-md">
                            <div>
                              «____»_____________
                              {{ new Date().getFullYear() }} г.
                            </div>
                            <div>_____________</div>
                            <div class="bordered-bottom">
                              ({{
                                order.listener.firstName +
                                " " +
                                order.listener.secondName[0] +
                                ". " +
                                order.listener.lastName[0] +
                                ". "
                              }})
                            </div>
                          </div>
                          <div class="row q-my-md">
                            Отрывной корешок
                            <div class="flex-1 line-dashed"></div>
                          </div>
                          <div class="row">
                            Я
                            <div class="q-ml-xs bordered-bottom flex-1">
                              {{
                                order.listener.firstName +
                                " " +
                                order.listener.secondName +
                                " " +
                                order.listener.lastName
                              }}
                            </div>
                            (Ф.И.О.)
                          </div>
                          <div class="text-justify">
                            подтверждаю, что получил уведомление об обработке
                            персональных данных Заказчика и включении информации
                            обо мне в базу персональных данных
                            <b>ООО «НОВЫЕ ТЕХНОЛОГИИ»</b>
                          </div>
                          <div class="row justify-between q-mt-md">
                            <div>
                              «____»_____________
                              {{ new Date().getFullYear() }} г.
                            </div>
                            <div>_____________</div>
                            <div class="bordered-bottom">
                              ({{
                                order.listener.firstName +
                                " " +
                                order.listener.secondName[0] +
                                ". " +
                                order.listener.lastName[0] +
                                ". "
                              }})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
          <div v-if="!showEditFields" class="table-nav">
            <q-fab color="secondary" icon="more_vert" direction="up">
              <q-fab-action
                v-if="access"
                color="amber"
                text-color="black"
                @click="showModal"
                icon="delete"
              />
              <q-fab-action
                v-if="
                  tab !== 'main' &&
                  (order.status == 'Принята в работу' ||
                    order.status == 'Идёт обучение' ||
                    order.status == 'Выполнена')
                "
                color="amber"
                text-color="black"
                @click="print"
                icon="print"
              />
              <!-- <q-fab-action
                v-if="
                  order.status == 'Принята в работу' ||
                  order.status == 'Идёт обучение' ||
                  order.status == 'Выполнена'
                "
                color="amber"
                text-color="black"
                icon="picture_as_pdf"
              /> -->
              <!-- <q-fab-action
                v-if="
                  access &&
                  (order.status == 'Принята в работу' ||
                    order.status == 'Идёт обучение' ||
                    order.status == 'Выполнена')
                "
                color="amber"
                text-color="black"
                icon="rtt"
              /> -->
              <!-- <q-fab-action
                v-if="access"
                color="amber"
                text-color="black"
                icon="content_copy"
              /> -->
              <q-fab-action
                v-if="
                  access ||
                  order.status == 'Возвращена на корректировку' ||
                  order.status == 'Принята в работу'
                "
                color="amber"
                text-color="black"
                @click="showEditForm"
                icon="edit_note"
              />
            </q-fab>
          </div>
        </div>
      </div>
      <div v-else-if="order == null && !loading">
        <p class="text-center">Заявка с ID {{ $route.params.id }} не найдена</p>
      </div>
    </div>

    <teleport to="body">
      <app-modal title="Удаление заявки" :show="modal" @close="closeModal">
        <div class="q-card__section q-card__section--vert">
          Заявка на повышение квалификации будет удалена. Вы подтверждаете
          удаление?
        </div>
        <div class="q-card__actions justify-end q-card__actions--horiz row">
          <button
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-negative q-btn--actionable q-focusable q-hoverable"
            tabindex="0"
            type="button"
            @click="remove($route.params.id)"
          >
            <span class="q-focus-helper"></span>
            <span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><span class="block">Удалить</span></span
            >
          </button>
          <button
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-positive q-btn--actionable q-focusable q-hoverable"
            tabindex="0"
            type="button"
            @click="closeModal"
          >
            <span class="q-focus-helper"></span
            ><span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><span class="block">Отмена</span></span
            >
          </button>
        </div>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import { dateFormat } from "../utils/dateFormat.js";
import AppPage from "../components/ui/AppPage.vue";
import AppModal from "../components/ui/AppModal.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import OrdersTrainingForm from "../components/orders/OrdersTrainingForm.vue";

const metaData = {
  title: "Заявка на повышение квалификации НК",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  components: { AppPage, AppModal, AppLoader, OrdersTrainingForm },
  setup() {
    useMeta(metaData);

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const title = ref("Заявка на повышение квалификации НК");
    const modal = ref(false);
    const loading = ref(false);
    const user = store.getters["auth/user"];
    const access = ref(false);
    const showEditFields = ref(false);

    const order = ref();

    onMounted(() => {
      loadingData();
    });

    const loadingData = async () => {
      loading.value = true;
      try {
        if (user.roles) {
          if (user.roles.includes("admin") || user.roles.includes("god")) {
            access.value = true;
            await store.dispatch("listener/load");
          } else {
            access.value = false;
            await store.dispatch("listener/loadByCompany", user.id);
          }
        }

        order.value = await store.dispatch(
          "orderTraining/loadById",
          route.params.id
        );

        console.log(order);

        order.value.status == "Черновик"
          ? (title.value = "Черновик заявки")
          : "Заявка № 00000000";

        if (
          order.value.status == "Черновик" ||
          order.value.status == "Отправлена на экспертизу" ||
          order.value.status == "Возвращена на корректировку"
        ) {
          showEditFields.value = true;
        }
      } catch (error) {
        loading.value = false;
      }
      loading.value = false;
    };

    const showEditForm = () => {
      showEditFields.value = true;
      title.value = order.value.number
        ? `Редактировать заявку № ${order.value.number}`
        : "Редактировать заявку";
    };

    const showModal = () => {
      modal.value = true;
    };

    const closeModal = () => {
      modal.value = false;
    };

    const print = () => {
      window.print();
    };

    const remove = async (id) => {
      try {
        //удалить удостоверение
        await store.dispatch("orderTraining/remove", id);
        // modal.value = false;
        router.push("/orders-training-nk");
      } catch (e) {
        // console.log(e);
      }
    };

    const updateOrder = () => {
      showEditFields.value = false;
      loadingData();
    };

    const cancelOrder = async () => {
      try {
        const id = order.value._id;
        const value = {
          // listenerId: order.value.listenerId,
          firstName: order.value.firstName,
          secondName: order.value.secondName,
          lastName: order.value.lastName,
          post: order.value.post,
          birthday: order.value.birthday,
          mailCode: order.value.mailCode,
          city: order.value.city,
          street: order.value.street,
          homeNumber: order.value.homeNumber,
          apartment: order.value.apartment,
          passportSeries: order.value.passportSeries,
          passportNumber: order.value.passportNumber,
          passportIssued: order.value.passportIssued,
          passportDate: order.value.passportDate,
          type: order.value.type,
          program: order.value.program,
          company: order.value.company,
          status: "Черновик",
          commentUser: "",
          commentListener: "",
          commentOrder: "",
        };

        await store.dispatch("orderTraining/update", { value, id });

        router.push("/orders-training-nk");
      } catch (e) {}
    };

    return {
      title,
      modal,
      showModal,
      closeModal,
      tab: ref("main"),
      access,
      showEditFields,
      showEditForm,
      loading,
      order,
      remove,
      print,
      updateOrder,
      cancelOrder,
      dateFormat,
    };
  },
};
</script>

<style></style>
