<template>
  <div>
    <div
      v-if="
        !access &&
        (!user.id ||
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
          !user.companyLegalAddressStreet ||
          !user.companyMailAddressCity ||
          !user.companyMailAddressCode ||
          !user.companyMailAddressHouse ||
          !user.companyMailAddressStreet ||
          !user.companyOwnershipType ||
          !user.companyPayment ||
          !user.companyPhone ||
          !user.companyShortName)
      "
    >
      <p class="text-center">
        Регистрационная карточка предприятия не заполнена!
      </p>
      <div class="text-center">
        <q-btn label="Заполнить" type="button" color="primary" to="/profile" />
      </div>
    </div>
    <div v-else-if="!rows.length">
      <p class="text-center">Заявок на повышение квалификации НК нет</p>
      <div class="text-center">
        <q-btn
          label="Добавить"
          type="button"
          color="primary"
          to="/add-order-training-nk"
        />
      </div>
    </div>
    <div v-else>
      <div class="">
        <q-input
          bottom-slots
          v-model="search"
          label="Для фильтрации введите ФИО"
        >
          <template v-slot:append>
            <q-icon
              v-if="search !== ''"
              name="close"
              @click="search = ''"
              class="cursor-pointer"
            />
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-table
        :rows="filteredRows"
        :columns="access ? columnsAdmin : columnsUser"
        row-key="_id"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :pagination="initialPagination"
        :hide-selected-banner="true"
        v-model:selected="selected"
      >
        <template v-slot:header-selection="scope">
          <q-checkbox v-model="scope.selected" />
        </template>

        <template v-slot:body-selection="scope">
          <q-checkbox v-model="scope.selected" />
          <!-- <q-checkbox
            :disable="scope.row.status !== 'Черновик'"
            v-model="scope.selected"
          /> -->
        </template>
        <template v-slot:body-cell-date="props">
          <q-td :props="props">
            {{
              props.row.status == "Идёт обучение"
                ? dateFormat(props.row.date)
                : "Не задана"
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-companyShortName="props">
          <q-td :props="props">
            <div class="text-responsive">
              {{ props.row.user.companyShortName }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-contract="props">
          <q-td :props="props">
            {{
              props.row.contractNumber && props.row.contractDate
                ? props.row.contractNumber +
                  " от " +
                  dateFormat(props.row.contractDate)
                : "Не указано"
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-program="props">
          <q-td :props="props">
            <div class="text-responsive">
              {{
                props.row.program == "vik"
                  ? "ВИК"
                  : props.row.program == "vd"
                  ? "ВД"
                  : props.row.program == "tk"
                  ? "ТК"
                  : props.row.program == "pvk"
                  ? "ПВК"
                  : props.row.program == "pvt"
                  ? "ПВТ"
                  : props.row.program == "mk"
                  ? "МК"
                  : props.row.program == "uk"
                  ? "УК"
                  : props.row.program == "rk"
                  ? "РК"
                  : props.row.program == "mi"
                  ? "МИ"
                  : props.row.program == "1s"
                  ? "1С"
                  : ""
              }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="
                props.row.status == 'Принята в работу'
                  ? 'primary'
                  : props.row.status == 'Возвращена на корректировку'
                  ? 'orange'
                  : props.row.status == 'Отправлена на экспертизу'
                  ? 'purple'
                  : props.row.status == 'Выполнена'
                  ? 'green'
                  : props.row.status == 'Отменена'
                  ? 'red'
                  : props.row.status == 'Идёт обучение'
                  ? 'teal'
                  : props.row.status == 'Черновик'
                  ? 'grey'
                  : ''
              "
              >{{ props.row.status }}</q-badge
            >
          </q-td>
        </template>

        <template v-slot:body-cell-control="props">
          <q-td :props="props">
            <div>
              <q-btn
                class="bg-primary text-white q-mr-sm"
                icon="open_in_new"
                :to="{
                  name: 'orderTrainingNK',
                  params: {
                    id: props.row._id,
                  },
                }"
              />
            </div>
          </q-td>
        </template>
      </q-table>

      <div class="table-nav">
        <q-fab color="secondary" icon="more_vert" direction="up">
          <q-fab-action
            color="amber"
            text-color="black"
            icon="delete"
            :disable="
              !selected.length ||
              (selected
                .map((item) => item.status)
                .includes('Принята в работу') &&
                !access) ||
              (selected
                .map((item) => item.status)
                .includes('Отправлена на экспертизу') &&
                !access) ||
              (selected.map((item) => item.status).includes('Идёт обучение') &&
                !access) ||
              (selected.map((item) => item.status).includes('Выполнена') &&
                !access) ||
              (selected.map((item) => item.status).includes('Отменена') &&
                !access)
            "
            @click="showModal('delete')"
          />
          <q-fab-action
            v-if="!access"
            color="amber"
            text-color="black"
            :disable="
              !selected.length ||
              selected
                .map((item) => item.status)
                .includes('Принята в работу') ||
              selected
                .map((item) => item.status)
                .includes('Отправлена на экспертизу') ||
              selected.map((item) => item.status).includes('Идёт обучение') ||
              selected.map((item) => item.status).includes('Выполнена') ||
              selected.map((item) => item.status).includes('Отменена')
            "
            @click="showModal('send')"
            icon="send_and_archive"
          />
          <q-fab-action
            color="amber"
            text-color="black"
            icon="note_add"
            to="/add-order-training-nk"
          />
        </q-fab>
      </div>
    </div>

    <teleport to="body">
      <app-modal :title="modalTitle" :show="modal" @close="closeModal">
        <div
          v-if="modalType == 'delete'"
          class="q-card__section q-card__section--vert"
        >
          Выбранные заявки будут удалены. Вы подтверждаете удаление?
        </div>
        <div
          v-if="modalType == 'send'"
          class="q-card__section q-card__section--vert"
        >
          Отправить выбранные заявки на экспертизу?
        </div>

        <div class="q-card__actions justify-end q-card__actions--horiz row">
          <button
            v-if="modalType == 'delete'"
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-negative q-btn--actionable q-focusable q-hoverable"
            tabindex="0"
            type="button"
            @click="remove(selected)"
          >
            <span class="q-focus-helper"></span>
            <span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><span class="block">Удалить</span></span
            >
          </button>
          <button
            v-if="modalType == 'send'"
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-primary q-btn--actionable q-focusable q-hoverable"
            tabindex="0"
            type="button"
            @click="sendForVerification(selected)"
          >
            <span class="q-focus-helper"></span>
            <span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><span class="block">Да</span></span
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
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { dateFormat } from "../../utils/dateFormat.js";
import AppModal from "../ui/AppModal.vue";

const columnsAdmin = [
  {
    name: "name",
    required: true,
    label: "ФИО",
    align: "left",
    field: (row) =>
      row.listener.firstName +
      " " +
      row.listener.secondName[0] +
      ". " +
      row.listener.lastName[0] +
      ".",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "left",
    label: "Дата регистрации",
    field: "date",
    sortable: true,
  },
  {
    name: "companyShortName",
    align: "left",
    label: "Предприятие",
    field: "companyShortName",
    sortable: true,
  },
  {
    name: "contract",
    align: "left",
    label: "Договор",
    field: "contractNumber",
    sortable: false,
  },
  {
    name: "program",
    align: "left",
    label: "Программа",
    field: "program",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Статус",
    field: "status",
    sortable: true,
  },
  {
    name: "control",
    align: "center",
    label: "Управление",
    field: "",
  },
];
const columnsUser = [
  {
    name: "name",
    required: true,
    label: "ФИО",
    align: "left",
    field: (row) =>
      row.listener.firstName +
      " " +
      row.listener.secondName +
      " " +
      row.listener.lastName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "left",
    label: "Дата регистрации",
    field: "date",
    sortable: true,
  },
  {
    name: "program",
    align: "left",
    label: "Программа",
    field: "program",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Статус",
    field: "status",
    sortable: true,
  },
  {
    name: "control",
    align: "center",
    label: "Управление",
    field: "",
  },
];

export default {
  components: { AppModal },
  setup() {
    //store
    const store = useStore();

    const access = ref(false);
    const user = store.getters["auth/user"];

    const search = ref("");
    const rows = computed(() => store.getters["orderTraining/orders"]);
    const selected = ref([]);

    const filteredRows = computed(() =>
      store.getters["orderTraining/orders"].filter((order) => {
        if (search.value) {
          return (
            order.listener.firstName +
            " " +
            order.listener.secondName +
            " " +
            order.listener.lastName
          )
            .toLowerCase()
            .includes(search.value.toLowerCase());
        }

        return true;
      })
    );

    const modal = ref(false);
    const modalType = ref("");
    const modalTitle = ref("");

    onMounted(() => {
      if (user.roles) {
        user.roles.includes("admin") || user.roles.includes("god")
          ? (access.value = true)
          : (access.value = false);
      }
    });

    async function loadOrders() {
      if (user.roles) {
        if (user.roles.includes("admin") || user.roles.includes("god")) {
          await store.dispatch("orderTraining/load");
        } else {
          await store.dispatch("orderTraining/loadByCompany", user.id);
        }
      }

      console.log("обновление");
    }

    function showModal(action, order) {
      modal.value = true;

      if (action == "delete") {
        modalType.value = "delete";
        modalTitle.value = "Удалить заявки";
      } else if (action == "send") {
        modalType.value = "send";
        modalTitle.value = "Отправить на экспертизу";
      }
    }

    function closeModal() {
      modal.value = false;
      modalType.value = "";
      modalTitle.value = "";
    }

    async function sendForVerification(items) {
      try {
        await items.forEach((item) => {
          const id = item._id;

          const value = {
            type: item.orderType,
            program: item.program,
            status: "Отправлена на экспертизу",
            date: new Date(),
            listener: item.listener,
            company: item.company,
            ownerCompany: item.ownerCompany,
            ownerListener: item.ownerListener,
          };

          store.dispatch("orderTraining/update", { value, id });
        });
      } catch (e) {}

      closeModal();
      loadOrders();
      selected.value = [];
    }

    async function remove(items) {
      console.log(items);

      await items.forEach(async (item) => {
        await store.dispatch("orderTraining/remove", item._id);

        console.log("удаление");
      });

      closeModal();

      await loadOrders();

      selected.value = [];
    }

    return {
      initialPagination: {
        sortBy: "status",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },

      user,
      access,
      columnsAdmin,
      columnsUser,
      rows,
      filteredRows,
      selected,
      search,
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${filteredRows.value.length}`;
      },
      modal,
      modalType,
      modalTitle,
      showModal,
      closeModal,
      sendForVerification,
      remove,
      dateFormat,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-table {
  .text-responsive {
    min-width: 150px;
    white-space: normal;
  }
}
</style>
