<template>
  <div>
    <q-card class="">
      <q-card-section>
        <div class="q-pa-md">
          <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <q-input
              v-model="brand"
              label="Текст логотипа"
              :error="!!bError"
              :error-message="bError"
            />

            <q-input
              v-model="link"
              label="Ссылка логотипа"
              :error="!!lError"
              :error-message="lError"
            />

            <q-input
              v-model="footerText1"
              label="Основной текст в футере"
              :error="!!ft1Error"
              :error-message="ft1Error"
            />

            <q-input
              v-model="footerText2"
              label="Вторая строка текста в футере"
            />

            <q-input v-model="footerLink" label="Ссылка в футере" type="url" />

            <q-input
              v-model="footerLinkTitle"
              label="Заголовок ссылки в футере"
            />

            <q-toggle
              v-model="lockedProfile"
              label="Запретить пользователям редактировать личные данные"
            />

            <div>
              <q-btn
                class="q-mr-md"
                label="Сохранить"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  setup() {
    //подключаем store
    const store = useStore();

    const systemData = computed(() => store.getters["system/systems"]);

    const footerText2 = ref("");
    const footerLink = ref("");
    const footerLinkTitle = ref("");
    const lockedProfile = ref(null);

    //Vee-validate
    const { handleSubmit } = useForm();

    const {
      value: link,
      errorMessage: lError,
      handleBlur: lBlur,
    } = useField(
      "link",
      yup.string().trim().required("Пожалуйста, введите ссылку для логотипа")
    );
    const {
      value: brand,
      errorMessage: bError,
      handleBlur: bBlur,
    } = useField(
      "brand",
      yup.string().trim().required("Пожалуйста, введите название Организации")
    );
    const {
      value: footerText1,
      errorMessage: ft1Error,
      handleBlur: ft1Blur,
    } = useField(
      "footerText1",
      yup.string().trim().required("Пожалуйста, введите текст для футера")
    );

    onMounted(() => {
      brand.value = systemData.value.brand;
      link.value = systemData.value.link;
      footerText1.value = systemData.value.footer.mainText;
      systemData.value.footer.secondaryText
        ? (footerText2.value = systemData.value.footer.secondaryText)
        : (footerText2.value = "");
      systemData.value.footer.link
        ? (footerLink.value = systemData.value.footer.link)
        : (footerLink.value = "");
      systemData.value.footer.linkTitle
        ? (footerLinkTitle.value = systemData.value.footer.linkTitle)
        : (footerLinkTitle.value = "");
      lockedProfile.value = systemData.value.lockedProfile;
    });

    // функция изменения
    const onSubmit = handleSubmit(async () => {
      const id = systemData.value._id;
      const values = {
        brand: brand.value,
        link: link.value,
        footer: {
          mainText: footerText1.value,
          secondaryText: footerText2.value,
          link: footerLink.value,
          linkTitle: footerLinkTitle.value,
        },
        lockedProfile: lockedProfile.value,
      };

      try {
        await store.dispatch("system/update", { values, id });
        // await store.dispatch("system/create", { ...values });
      } catch (e) {}
    });

    return {
      link,
      lError,
      lBlur,
      brand,
      bError,
      bBlur,
      footerText1,
      ft1Error,
      ft1Blur,
      footerText2,
      footerLink,
      footerLinkTitle,
      lockedProfile,

      onSubmit,
    };
  },
};
</script>

<style lang="sass" scoped>
.container
  font-size: 10px
</style>
