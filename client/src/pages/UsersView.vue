<template>
  <app-page title="Предприятия и контактные лица">
    <div class="q-gutter-y-md">
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
          <q-tab
            name="users"
            label="Пользователи"
            @click="changeTab('users')"
          />
          <q-tab
            name="admins"
            label="Администраторы"
            @click="changeTab('admins')"
          />
          <q-tab
            name="register"
            label="Добавить"
            @click="changeTab('register')"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="users">
            <!-- <div class="text-h6 text-center">Пользователи</div> -->
            <div v-if="!loading" class="row justify-center">
              <UsersTable :users="clientUsers" @update-table="updateUsers" />
            </div>
            <div v-else>
              <AppLoader />
            </div>
          </q-tab-panel>

          <q-tab-panel name="admins">
            <!-- <div class="text-h6 text-center">Администраторы</div> -->
            <div v-if="!loading" class="row justify-center">
              <UsersTable :users="adminUsers" @update-table="updateUsers" />
            </div>
            <div v-else>
              <AppLoader />
            </div>
          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="row justify-center">
              <UsersForm
                :buttonTitle="'Сохранить'"
                :submitType="'register'"
                @success="updateUsers"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </app-page>
</template>

<script>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import UsersForm from "../components/users/UsersForm.vue";
import UsersTable from "../components/users/UsersTable.vue";

const metaData = {
  title: "Управление пользователями",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //store
    const store = useStore();
    //loader
    const loading = ref(false);
    //Активная вкладка
    const tab = ref("");
    const tabVal = computed(() => store.getters["usersTabsActive"]);
    //Список пользователей
    const users = ref([]);
    const adminUsers = ref([]);
    const clientUsers = ref([]);

    onBeforeMount(async () => {
      loading.value = true;

      tab.value = tabVal.value;

      await store.dispatch("auth/loadUsers");
      // await store.dispatch("company/load");

      users.value = store.getters["auth/users"];

      adminUsers.value = store.getters["auth/users"].filter((item) =>
        item.roles.includes("admin")
      );
      clientUsers.value = store.getters["auth/users"].filter((item) =>
        item.roles.includes("user")
      );

      loading.value = false;
    });

    const changeTab = (tab) => {
      store.dispatch("setUsersTab", tab);
    };

    watch(
      () => tabVal.value,
      (newVal, oldVal) => {
        tab.value = newVal;
      }
    );

    async function updateUsers(value) {
      // console.log(value);

      await store.dispatch("auth/loadUsers");
      users.value = store.getters["auth/users"];
      adminUsers.value = store.getters["auth/users"].filter((item) =>
        item.roles.includes("admin")
      );
      clientUsers.value = store.getters["auth/users"].filter((item) =>
        item.roles.includes("user")
      );

      if (value?.role == "user") {
        changeTab("users");
      } else if (value?.role == "admin") {
        changeTab("admins");
      }
    }

    return {
      tab,
      loading,
      adminUsers,
      clientUsers,
      updateUsers,
      changeTab,
    };
  },

  components: { AppPage, AppLoader, UsersForm, UsersTable },
};
</script>

<style></style>
