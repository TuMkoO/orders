<template>
  <app-page title="Личный кабинет">
    <div class="q-gutter-y-md">
      <q-card>
        <div class="q-pa-sm">
          Уровень доступа:
          <q-badge
            v-for="(role, roleIdx) in currentUser.roles"
            :key="roleIdx"
            :color="
              role == 'admin'
                ? 'red'
                : role == 'user'
                ? 'blue'
                : role == 'god'
                ? 'orange'
                : ''
            "
            :label="
              role == 'admin'
                ? 'Администратор'
                : role == 'user'
                ? 'Пользователь'
                : role == 'god'
                ? 'God'
                : ''
            "
          />
        </div>
        <q-separator />
        <q-card-section v-if="!loading">
          <UsersForm
            :buttonTitle="'Сохранить'"
            :submitType="'update'"
            :user="currentUser"
            resetPassword
          >
          </UsersForm>
        </q-card-section>
        <q-card-section v-else> <AppLoader /></q-card-section>
      </q-card>
    </div>
  </app-page>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import UsersForm from "../components/users/UsersForm.vue";

const metaData = {
  title: "Личный кабинет",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //loader
    const loading = ref(false);

    const store = useStore();

    const currentUser = computed(() => store.getters["auth/user"]);

    const access = ref(false);
    const userRole = store.getters["auth/user"].roles;

    onMounted(async () => {
      loading.value = true;

      if (userRole) {
        if (userRole.includes("admin") || userRole.includes("god")) {
          access.value = true;
        } else {
          access.value = false;
        }
      }

      await store.dispatch("settingsConfigurable/load", "ownership-type");

      loading.value = false;
    });

    return {
      access,
      loading,
      currentUser,
    };
  },

  components: {
    AppPage,
    AppLoader,
    UsersForm,
  },
};
</script>

<style></style>
