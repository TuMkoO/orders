<template>
  <app-page title="Настройки">
    <div class="q-gutter-y-md">
      <div v-if="loading"><AppLoader /></div>
      <q-card v-else>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="system" label="Системные" />
          <q-tab name="orderNumbering" label="Заявки" />
          <q-tab name="configurable" label="Конфигурируемые" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="system">
            <div class="q-mt-none">
              <SettingsSystem />
            </div>
          </q-tab-panel>

          <q-tab-panel name="orderNumbering">
            <div>
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6 col-md-4">
                  <SettingsOrderNumbering />
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="configurable">
            <div class="q-mt-none">
              <q-card class="">
                <q-card-section>
                  <div class="q-pa-sm">
                    <q-list bordered>
                      <q-expansion-item
                        group="somegroup"
                        label="Форма собственности предприятия"
                        default-opened
                        header-class="text-grey-8 bg-cyan-1"
                      >
                        <q-card>
                          <q-card-section>
                            <SettingsConfigurable
                              storeLink="ownership-type"
                              storeName="ownershipTypes"
                            />
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>

                      <q-separator />

                      <q-expansion-item
                        group="somegroup"
                        label="Система аттестации "
                        header-class="text-grey-8 bg-cyan-1"
                      >
                        <q-card>
                          <q-card-section>
                            <SettingsConfigurable
                              storeLink="certification-system"
                              storeName="certificationSystems"
                            />
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </app-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import SettingsSystem from "../components/settings/SettingsSystem.vue";
import SettingsOrderNumbering from "../components/settings/SettingsOrderNumbering.vue";
import SettingsConfigurable from "../components/settings/SettingsConfigurable.vue";

const metaData = {
  title: "Настройки",
  titleTemplate: (title) => `${title} | Университетские технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    //loader
    const loading = ref(false);
    //store
    const store = useStore();

    onMounted(async () => {
      loading.value = true;

      await store.dispatch("orderTrainingNumbering/load");
      await store.dispatch("settingsConfigurable/load", "ownership-type");
      await store.dispatch("settingsConfigurable/load", "certification-system");

      loading.value = false;
    });

    return {
      tab: ref("system"),

      loading,
    };
  },

  components: {
    AppPage,
    AppLoader,
    SettingsSystem,
    SettingsOrderNumbering,
    SettingsConfigurable,
  },
};
</script>

<style></style>
