<template>
  <div>
    <q-header
      elevated
      class="bg-primary text-white row no-wrap"
      height-hint="98"
    >
      <q-toolbar>
        <q-btn
          v-if="auth"
          dense
          flat
          round
          icon="menu_open"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <router-link :to="systemData.link" class="logo">{{
            user.companyShortName || systemData.brand
          }}</router-link>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs v-if="auth" align="right" class="gt-sm">
        <q-route-tab
          to="/profile"
          :label="
            user.firstName && user.secondName && user.lastName
              ? user.firstName + ' ' + user.secondName + ' ' + user.lastName
              : 'Личный кабинет'
          "
        />

        <q-route-tab @click="logout" label="Выход" />
      </q-tabs>
      <q-toolbar v-if="auth" class="lt-md w-auto">
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="auth"
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
    >
      <!-- drawer content -->
      <q-list>
        <q-item-label header>Меню</q-item-label>

        <q-item to="/profile">
          <q-item-section>
            <q-item-label
              >{{
                user.firstName && user.secondName && user.lastName
                  ? user.firstName + " " + user.secondName + " " + user.lastName
                  : "Личный кабинет"
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="logout">
          <q-item-section>
            <q-item-label>Выход</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-if="auth"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <!-- drawer content -->

      <q-scroll-area style="height: 100%">
        <q-list>
          <q-expansion-item
            expand-separator
            icon="list"
            label="Управление заявками"
          >
            <q-item to="/orders-training-nk">
              <q-item-section avatar>
                <q-icon name="trending_up" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Повышение квалификации НК</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/orders-training-ri" disable>
              <q-item-section avatar>
                <q-icon name="trending_up" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Повышение квалификации РИ</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/orders-attestation-nk" disable>
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Аттестация специалистов НК</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/orders-attestation-ri" disable>
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Аттестация специалистов РИ</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/orders-attestation-sp" disable>
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Аттестация специалистов СП</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            icon="assignment"
            label="Управление группами"
            disable
          >
            <q-item to="/">
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Повышение квалификации НК</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/">
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Повышение квалификации РИ</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/">
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Аттестация специалистов НК</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/">
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Аттестация специалистов РИ</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Аттестация специалистов СП</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/2">
              <q-item-section avatar>
                <q-icon name="calendar_month" />
              </q-item-section>
              <q-item-section>
                <q-item-label>График подготовки и аттестации</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            icon="content_copy"
            label="Реестры и справочники"
          >
            <q-item v-if="access" clickable @click="changeTab('users')">
              <q-item-section avatar>
                <q-icon name="maps_home_work" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Предприятия и контактные лица </q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="access" clickable @click="changeTab('admins')">
              <q-item-section avatar>
                <q-icon name="engineering" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Администраторы</q-item-label>
              </q-item-section>
            </q-item>

            <q-item to="/listeners">
              <q-item-section avatar>
                <q-icon name="supervisor_account" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Слушатели</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item v-if="access" to="/settings">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Настройки</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-scroll-observer />
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    //store
    const store = useStore();
    //router
    const router = useRouter();

    const access = ref(false);
    const userRole = computed(() => store.getters["auth/user"].roles);
    const user = computed(() => store.getters["auth/user"]);
    const auth = computed(() => store.getters["auth/isAuthenticated"]);
    const systemData = computed(() => store.getters["system/systems"]);

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    onMounted(() => {
      if (userRole.value) {
        userRole.value.includes("admin") || userRole.value.includes("god")
          ? (access.value = true)
          : (access.value = false);
      }
    });

    const changeTab = (tab) => {
      router.push("/users");

      store.dispatch("setUsersTab", tab);
    };

    return {
      logout: async () => {
        await store.dispatch("auth/logout");
        router.push("/auth");
      },

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      systemData,
      user,
      access,
      auth,
      changeTab,
    };
  },
};
</script>

<style></style>
