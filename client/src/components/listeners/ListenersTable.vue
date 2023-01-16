<template>
  <div class="w-100">
    <div v-if="loading"><AppLoader /></div>
    <div v-else-if="!loading && !rows.length">
      <p class="text-center">Слушатели не обнаружены</p>
      <div class="text-center">
        <q-btn
          label="Добавить"
          type="button"
          color="primary"
          @click="showModal('add')"
        />
      </div>
    </div>
    <div v-else>
      <div class="row justify-between">
        <div style="flex: 1">
          <q-input
            bottom-slots
            v-model="search"
            label="Для фильтрации введите ФИО слушателя или название предприятия"
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
      </div>
      <div v-if="user && users && user.companyShortName">
        <q-table
          :rows="filteredRows"
          :columns="columns"
          row-key="name"
          :pagination="initialPagination"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-center"
              >
                <span class="text-bold">{{ col.label }}</span>
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-company="props">
            <q-td :props="props">
              {{
                props.row.ownerUser == user.id
                  ? user.companyShortName
                  : users
                      .map((item) => item)
                      .filter((item) => item._id == props.row.ownerUser)[0]
                      .companyShortName
              }}
            </q-td>
          </template>

          <template v-slot:body-cell-control="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="bg-orange q-mr-sm"
                  icon="edit_note"
                  @click="showModal('edit', props.row)"
                />
                <q-btn
                  class="bg-red"
                  icon="delete"
                  @click="showModal('delete', props.row)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="table-nav">
        <q-btn fab icon="add" @click="showModal('add')" color="secondary" />
      </div>
    </div>

    <teleport to="body">
      <app-modal
        :title="modalTitle"
        :show="modal"
        :fullSize="modalType == 'delete' ? false : true"
        @close="closeModal"
      >
        <div
          v-if="modalType == 'delete'"
          class="q-card__section q-card__section--vert"
        >
          Слушатель
          <b>{{
            currentListener.firstName +
            " " +
            currentListener.secondName +
            " " +
            currentListener.lastName
          }}</b>
          будет удалён. Вы подтверждаете удаление?
        </div>

        <div
          v-if="modalType == 'delete'"
          class="q-card__actions justify-end q-card__actions--horiz row"
        >
          <button
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-negative q-btn--actionable q-focusable q-hoverable"
            tabindex="0"
            type="button"
            @click="deleteListener(currentListener._id)"
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

        <ListenersForm
          v-if="modalType == 'add'"
          :buttonTitle="'Добавить'"
          :submitType="'add'"
          @success="updateListener"
          @hide="closeModal"
        ></ListenersForm>
        <ListenersForm
          v-else-if="modalType == 'edit'"
          :buttonTitle="'Сохранить'"
          :submitType="'update'"
          :listener="currentListener"
          @success="updateListener"
          @hide="closeModal"
        ></ListenersForm>
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import AppLoader from "../ui/AppLoader.vue";
import AppModal from "../ui/AppModal.vue";
import ListenersForm from "./ListenersForm.vue";

const columns = [
  {
    name: "fio",
    required: true,
    label: "ФИО",
    align: "left",
    field: (row) => row.firstName + " " + row.secondName + " " + row.lastName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "post",
    align: "left",
    label: "Должность",
    field: "post",
    sortable: true,
  },
  {
    name: "company",
    align: "left",
    label: "Предприятие",
    field: "ownerUser",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Телефон",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
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
  components: { AppLoader, AppModal, ListenersForm },
  setup() {
    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    const user = computed(() => store.getters["auth/user"]);
    const users = computed(() => store.getters["auth/users"]);
    const access = ref(false);

    const search = ref("");
    const rows = computed(() => store.getters["listener/listeners"]);
    const filteredRows = computed(() =>
      store.getters["listener/listeners"].filter((listener) => {
        if (search.value && !access.value) {
          return (
            listener.firstName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            listener.secondName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            listener.lastName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            user.value.companyShortName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            user.value.companyFullName
              .toLowerCase()
              .includes(search.value.toLowerCase())
          );
        } else if (search.value && access.value) {
          return (
            listener.firstName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            listener.secondName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            listener.lastName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            user.value.companyShortName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            user.value.companyFullName
              .toLowerCase()
              .includes(search.value.toLowerCase()) ||
            users.value
              .filter((user) => user._id == listener.ownerUser)[0]
              .companyShortName.toLowerCase()
              .includes(search.value.toLowerCase()) ||
            users.value
              .filter((user) => user._id == listener.ownerUser)[0]
              .companyFullName.toLowerCase()
              .includes(search.value.toLowerCase())
          );
        }

        return true;
      })
    );

    const modal = ref(false);
    const modalType = ref("");
    const modalTitle = ref("");
    const currentListener = ref();

    onMounted(async () => {
      // loadListeners();

      if (user.value.roles.length) {
        if (
          user.value.roles.includes("admin") ||
          user.value.roles.includes("god")
        ) {
          access.value = true;
          // await store.dispatch("listener/load");

          loading.value = true;

          await store.dispatch("auth/loadUsers");

          // console.log("users: ", users.value);

          loading.value = false;
        } else {
          access.value = false;
          // await store.dispatch("listener/loadByCompany", user.company);
        }
      }
    });

    const loadListeners = async () => {
      loading.value = true;

      if (access.value) {
        await store.dispatch("listener/load");
      } else {
        await store.dispatch("listener/loadByCompany", user.value.id);
      }

      loading.value = false;
    };

    const showModal = async (action, listener) => {
      if (listener) {
        currentListener.value = await store.dispatch(
          "listener/loadById",
          listener._id
        );
      }

      if (action == "delete") {
        modalType.value = "delete";
        modalTitle.value = "Удалить слушателя";
      } else if (action == "add") {
        modalType.value = "add";
        modalTitle.value = "Добавить нового слушателя";

        if (access.value) {
          await store.dispatch("auth/loadUsers");
        }
      } else if (action == "edit") {
        modalType.value = "edit";
        modalTitle.value = "Изменить данные слушателя";

        if (access.value) {
          await store.dispatch("auth/loadUsers");
        }
      }

      modal.value = true;
    };

    const closeModal = () => {
      modal.value = false;
      modalType.value = "";
      modalTitle.value = "";
    };

    const updateListener = () => {
      loadListeners();
      closeModal();
    };

    const deleteListener = async (id) => {
      await store.dispatch("listener/remove", id);
      loadListeners();

      closeModal();
    };

    return {
      initialPagination: {
        sortBy: "fio",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },

      user,
      users,
      search,
      columns,
      loading,
      rows,
      filteredRows,
      modal,
      modalTitle,
      modalType,
      currentListener,

      showModal,
      closeModal,
      deleteListener,
      updateListener,
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
