<template>
  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
    <q-card-section class="q-pt-none">
      <q-input
        v-model="oldPassword"
        label="Текущий пароль"
        :type="isOldPwd ? 'password' : 'text'"
        :error="!!oError"
        :error-message="oError"
      >
        <template v-slot:append>
          <q-icon
            :name="isOldPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isOldPwd = !isOldPwd"
          />
        </template>
      </q-input>
      <q-input
        v-model="newPassword"
        label="Новый пароль"
        :type="isNewPwd ? 'password' : 'text'"
        :error="!!nError"
        :error-message="nError"
      >
        <template v-slot:prepend>
          <q-icon
            name="cached"
            class="cursor-pointer"
            @click="generatePassword"
          />
        </template>

        <template v-slot:append>
          <q-icon
            :name="isNewPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isNewPwd = !isNewPwd"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions align="right" class="bg-white">
      <q-btn flat class="text-primary" type="submit" label="Сохранить" />
      <q-btn flat class="text-red" label="Отмена" v-close-popup />
    </q-card-actions>
  </q-form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  emits: ["success"],
  setup(_, { emit }) {
    const store = useStore();

    const isOldPwd = ref(true);
    const isNewPwd = ref(true);

    const { handleSubmit } = useForm();

    const PASSWORD_MIN_LENGTH = 7;

    const { value: oldPassword, errorMessage: oError } = useField(
      "oldPassword",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите текущий пароль")
        .min(
          PASSWORD_MIN_LENGTH,
          `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`
        )
    );
    const { value: newPassword, errorMessage: nError } = useField(
      "newPassword",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите новый пароль")
        .min(
          PASSWORD_MIN_LENGTH,
          `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`
        )
    );

    //Генерация пароля
    function generatePassword() {
      let pass = "";
      let symbols =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++) {
        pass += symbols.charAt(Math.floor(Math.random() * symbols.length));
      }

      newPassword.value = pass;
      isNewPwd.value = false;
    }

    // функция смены пароля
    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch("auth/updatePassword", values);

        emit("success");
      } catch (e) {}
    });

    return {
      oldPassword,
      newPassword,
      isOldPwd,
      isNewPwd,
      generatePassword,
      oError,
      nError,

      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  max-width: 400px;
  width: 100%;
}
</style>
