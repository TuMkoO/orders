<template>
  <app-page title="Главная">
    <div>
      <div v-if="loading"><AppLoader /></div>
      <div v-else-if="orders.length" class="q-gutter-sm">
        <div class="banners">
          <div class="banners-wrapper">
            <div class="banners-container">
              <q-banner
                v-for="(order, idx) in ordersData"
                :key="idx"
                inline-actions
                rounded
                class="text-grey-8 bg-green-1 q-mb-sm"
              >
                <div class="row justify-between">
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Дата</span>
                      {{ dateFormat(order.date) }}
                    </div>
                  </div>
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Заявка</span>
                      -
                    </div>
                  </div>
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Договор</span>
                      {{
                        order.contractNumber && order.contractDate
                          ? order.contractNumber +
                            " от " +
                            dateFormat(order.contractDate)
                          : "не указан"
                      }}
                    </div>
                  </div>
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Предприятие</span>
                      {{ order.user.companyShortName }}
                    </div>
                  </div>
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Слушатель</span>
                      {{
                        order.listener.firstName +
                        " " +
                        order.listener.secondName[0] +
                        ". " +
                        " " +
                        order.listener.lastName[0] +
                        "."
                      }}
                    </div>
                  </div>
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Повышение кв.</span>
                      {{
                        order.program == "vik"
                          ? "ВИК"
                          : order.program == "vd"
                          ? "ВД"
                          : order.program == "tk"
                          ? "ТК"
                          : order.program == "pvk"
                          ? "ПВК"
                          : order.program == "pvt"
                          ? "ПВТ"
                          : order.program == "mk"
                          ? "МК"
                          : order.program == "uk"
                          ? "УК"
                          : order.program == "rk"
                          ? "РК"
                          : order.program == "mi"
                          ? "МИ"
                          : order.program == "1s"
                          ? "1С"
                          : ""
                      }}
                    </div>
                  </div>
                  <div class="col">
                    <div class="column text-center">
                      <span class="text-bold">Статус заявки</span>
                      <span>
                        <q-badge
                          :color="
                            order.status == 'Принята в работу'
                              ? 'primary'
                              : order.status == 'Возвращена на корректировку'
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
                        ></span
                      >
                    </div>
                  </div>
                </div>

                <template v-slot:action>
                  <q-btn
                    outline
                    color="grey-8"
                    label="Подробнее"
                    :to="{
                      name: 'orderTrainingNK',
                      params: {
                        id: order._id,
                      },
                    }"
                  />
                </template>
              </q-banner>
            </div>
          </div>

          <div
            v-if="Math.ceil(dataLength / totalPages) > 1"
            class="q-pa-lg flex flex-center"
          >
            <q-pagination
              v-model="page"
              :min="currentPage"
              :max="Math.ceil(dataLength / totalPages)"
              input-class="text-orange-10"
            >
            </q-pagination>
          </div>
        </div>
      </div>
      <div v-else class="text-center">Уведомлений нет</div>
      <!-- <div
        v-else-if="
          !user.id ||
          !user.firstName ||
          !user.secondName ||
          !user.lastName ||
          !user.phone ||
          !user.email ||
          !user.post ||
          !user.companyBank ||
          !user.companyBik ||
          !user.companyDirFirstName ||
          !user.companyDirLastName ||
          !user.companyDirPost ||
          !user.companyDirSecondName ||
          !user.companyEmail ||
          !user.companyFullName ||
          !user.companyGrounds ||
          !user.companyInn ||
          !user.companyLegalAddressCity ||
          !user.companyLegalAddressCode ||
          !user.companyLegalAddressHouse ||
          !user.companyLegalAddressRoom ||
          !user.companyLegalAddressStreet ||
          !user.companyOkpo ||
          !user.companyOwnershipType ||
          !user.companyPayment ||
          !user.companyPhone
        "
        class="text-center"
      >
        В профиле не указаны все данные предприятия
      </div> -->
    </div>
  </app-page>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import { dateFormat } from "../utils/dateFormat.js";
import AppLoader from "../components/ui/AppLoader.vue";
import AppPage from "../components/ui/AppPage.vue";

const metaData = {
  title: "Университетские технологии",
  titleTemplate: (title) => `${title}`,
};

export default {
  setup() {
    useMeta(metaData);

    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    const access = ref(false);
    const user = store.getters["auth/user"];

    // const rows = computed(() => store.getters["orderTraining/orders"]);

    const orders = computed(() =>
      store.getters["orderTraining/orders"]
        .slice(0, 9)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    );

    const page = ref(1);
    const currentPage = ref(1);
    const nextPage = ref(null);
    //число записей на странице
    const totalPages = ref(5);

    const dataLength = computed(
      () => store.getters["orderTraining/orders"].length
    );

    const ordersData = computed(() =>
      store.getters["orderTraining/orders"]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(
          (page.value - 1) * totalPages.value,
          (page.value - 1) * totalPages.value + totalPages.value
        )
    );

    onMounted(async () => {
      loading.value = true;

      if (user) {
        if (user.roles.includes("admin") || user.roles.includes("god")) {
          access.value = true;

          await store.dispatch("orderTraining/load");
        } else {
          access.value = false;

          await store.dispatch("orderTraining/loadByCompany", user.id);
        }
      }

      loading.value = false;
    });

    return {
      loading,
      access,
      dateFormat,
      orders,
      user,

      page,
      currentPage,
      nextPage,
      ordersData,
      totalPages,

      dataLength,
    };
  },
  name: "HomeView",
  components: { AppPage, AppLoader },
};
</script>
<style lang="scss" scoped>
.banners-wrapper {
  overflow-x: auto;
}
.banners-container {
  min-width: 930px;
}
</style>
