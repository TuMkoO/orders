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
          <!-- <CompaniesForm
                v-if="companyId"
                :buttonTitle="'Сохранить'"
                :submitType="'update'"
                :company="currentCompany"
                @success="updateCompanies"
              ></CompaniesForm>
              <CompaniesForm
                v-else
                :buttonTitle="'Добавить'"
                :submitType="'add'"
                @success="updateCompanies"
              ></CompaniesForm> -->
        </q-card-section>
        <q-card-section v-else> <AppLoader /></q-card-section>

        <!-- <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="profile" label="Профиль" />
          <q-tab
            v-if="!access"
            name="reg-card"
            label="Регистрационная карточка"
          />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile">
            <div class="text-h6 text-center">Изменить данные профиля</div>
            <q-card-section>
              <ProfileForm />
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel v-if="!access" name="reg-card">
            <div class="text-h6 text-center">
              Изменить регистрационную карточку
            </div>
            <q-card-section v-if="!loading">-->
        <!-- <ProfileRegCard /> -->
        <!-- <CompaniesForm
                v-if="companyId"
                :buttonTitle="'Сохранить'"
                :submitType="'update'"
                :company="currentCompany"
                @success="updateCompanies"
              ></CompaniesForm>
              <CompaniesForm
                v-else
                :buttonTitle="'Добавить'"
                :submitType="'add'"
                @success="updateCompanies"
              ></CompaniesForm>
            </q-card-section>
            <q-card-section v-else> <AppLoader /></q-card-section>
          </q-tab-panel>
        </q-tab-panels>  -->
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
// import ProfileForm from "../components/profile/ProfileForm.vue";
// import ProfileRegCard from "../components/profile/ProfileRegCard.vue";
// import CompaniesForm from "../components/companies/CompaniesForm.vue";

const metaData = {
  title: "Личный кабинет",
  titleTemplate: (title) => `${title} | Университетские технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //loader
    const loading = ref(false);

    const store = useStore();

    // const currentUser = ref();
    const currentUser = computed(() => store.getters["auth/user"]);

    // const tab = ref("");
    const access = ref(false);
    // const currentCompany = ref(null);
    const userRole = store.getters["auth/user"].roles;
    // const companyId = store.getters["auth/user"].company;

    onMounted(async () => {
      loading.value = true;

      // console.log(currentUser);

      if (userRole) {
        if (userRole.includes("admin") || userRole.includes("god")) {
          access.value = true;
          // tab.value = "profile";
        } else {
          access.value = false;
          // tab.value = "reg-card";
        }
      }

      await store.dispatch("settingsConfigurable/load", "ownership-type");

      // if (companyId) {
      //   loading.value = true;

      //   currentCompany.value = await store.dispatch(
      //     "company/loadById",
      //     companyId
      //   );

      //   loading.value = false;
      // }
      loading.value = false;
    });

    // const updateCompanies = () => {
    //   // loadCompanies();
    //   // closeModal();
    // };

    return {
      // tab,
      access,
      loading,
      currentUser,
      // companyId,
      // currentCompany,
      // updateCompanies,
    };
  },

  components: {
    AppPage,
    AppLoader,
    UsersForm,
    // ProfileForm,
    // ProfileRegCard,
    // CompaniesForm,
  },
};
</script>

<style></style>
