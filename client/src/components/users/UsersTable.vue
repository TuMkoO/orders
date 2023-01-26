<template>
  <div class="w-100">
    <div v-if="loading"><AppLoader /></div>
    <div v-else-if="!loading && !rows.length">
      Учетные записи пользователей данной категории не обнаружены
    </div>
    <div v-else>
      <q-table
        :rows="rows"
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

        <template v-slot:body-cell-companyFullName="props">
          <q-td :props="props">
            <div style="max-width: 250px; white-space: normal">
              {{ props.row.companyFullName }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-firstName="props">
          <q-td :props="props">
            {{
              props.row.firstName +
              " " +
              props.row.secondName +
              " " +
              props.row.lastName
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-control="props">
          <q-td :props="props">
            <div>
              <q-btn
                class="bg-orange q-mr-sm"
                icon="edit_note"
                @click="showModal(props.row)"
              />
              <q-btn
                class="bg-red"
                icon="delete"
                @click="showModal(props.row, 'delete')"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <teleport to="body">
      <app-modal
        :title="modalTitle"
        :show="modal"
        @close="closeModal"
        :fullSize="modalType == 'delete' ? false : true"
      >
        <div
          v-if="modalType == 'delete'"
          class="q-card__section q-card__section--vert"
        >
          Учетная запись пользователя <b>{{ currentUser.name }}</b> будет
          удалена. Вы подтверждаете удаление?
        </div>

        <div
          v-if="modalType == 'delete'"
          class="q-card__actions justify-end q-card__actions--horiz row"
        >
          <button
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-negative q-btn--actionable q-focusable q-hoverable"
            tabindex="0"
            type="button"
            @click="deleteUser(currentUser._id)"
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
        <UsersForm
          v-else
          :buttonTitle="'Сохранить'"
          :submitType="'update'"
          :user="currentUser"
          @success="updateUsers"
          resetPassword
        >
        </UsersForm>
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import AppLoader from "../ui/AppLoader.vue";
import AppModal from "../ui/AppModal.vue";
import UsersForm from "./UsersForm.vue";

const columns = [
  {
    name: "companyShortName",
    align: "left",
    label: "Предприятие",
    field: "companyShortName",
    sortable: true,
  },
  {
    name: "companyLegalAddressCity",
    align: "left",
    label: "Город",
    field: "companyLegalAddressCity",
    sortable: true,
  },
  {
    name: "firstName",
    align: "left",
    label: "Контактное лицо",
    field: "firstName",
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
    name: "phone",
    align: "left",
    label: "Телефон",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.email,
    format: (val) => `${val}`,
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
  components: { AppLoader, AppModal, UsersForm },
  props: {
    users: { type: Array, required: true },
  },
  emits: ["update-table"],
  setup(props, { emit }) {
    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    const rows = ref([]);

    const modal = ref(false);
    const modalType = ref("");
    const modalTitle = ref("");
    const currentUser = ref();

    onMounted(() => {
      loading.value = true;

      props.users.forEach((item) => {
        rows.value.push(item);
      });

      loading.value = false;
    });

    const showModal = async (user, action) => {
      currentUser.value = user;

      if (action == "delete") {
        modalType.value = "delete";
        modalTitle.value = "Удалить учетную запись";
      } else {
        modalTitle.value = "Изменить учетную запись";
        await store.dispatch("settingsConfigurable/load", "ownership-type");
      }

      modal.value = true;
    };

    const closeModal = () => {
      modal.value = false;
      modalType.value = "";
      modalTitle.value = "";
    };

    watch(
      () => props.users,
      (newVal, oldVal) => {
        rows.value = newVal;
      }
    );

    async function updateUsers() {
      modal.value = false;

      emit("update-table");
    }

    async function deleteUser(id) {
      await store.dispatch("auth/remove", id);

      modal.value = false;
      modalType.value = "";
      modalTitle.value = "";

      emit("update-table");
    }

    return {
      initialPagination: {
        sortBy: "companyShortName",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },

      columns,
      rows,
      loading,
      modal,
      modalType,
      modalTitle,
      currentUser,
      showModal,
      closeModal,
      deleteUser,
      updateUsers,
    };
  },
};
</script>

<style></style>
