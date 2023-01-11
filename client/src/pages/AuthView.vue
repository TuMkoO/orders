<template>
  <div class="mh-100vh auth-wrapper">
    <div class="row q-my-md">
      <div class="col-12">
        <div class="auth-logo row justify-center items-end h-100">
          <img src="../assets/img/logo-200.png" class="q-mb-md" alt="" />
        </div>
      </div>
      <div class="col-12">
        <div class="auth-card-wrapper">
          <q-card class="auth-card" style="width: 400px">
            <q-card-section>
              <div class="auth-form-wrapper q-pa-md">
                <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
                  <q-input
                    v-model="email"
                    label="Email"
                    type="email"
                    :error="!!eError"
                    :error-message="eError"
                  />

                  <q-input
                    v-model="password"
                    label="Пароль"
                    :type="isPwd ? 'password' : 'text'"
                    :error="!!pError"
                    :error-message="pError"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>

                  <div>
                    <q-btn label="Войти" type="submit" color="primary" />
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { error } from "../utils/error";
import * as yup from "yup";
import { useMeta } from "quasar";

const metaData = {
  title: "Авторизация",
  titleTemplate: (title) => `${title} | Новые технологии`,
};

export default {
  setup() {
    useMeta(metaData);

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      const localStorageToken = localStorage.getItem("token");

      if (localStorageToken) {
        router.push("/");
      }
    });

    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message),
        type: "warning",
      });
    }

    const { handleSubmit } = useForm();

    const PASSWORD_MIN_LENGTH = 7;

    const isPwd = ref(true);

    const { value: email, errorMessage: eError } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите email")
        .email("Необходимо ввести корректный email")
    );

    const { value: password, errorMessage: pError } = useField(
      "password",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите пароль")
        .min(
          PASSWORD_MIN_LENGTH,
          `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`
        )
    );

    // функция входа
    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch("auth/login", values);

        router.push("/");
      } catch (e) {}
    });

    return {
      email,
      password,
      isPwd,
      eError,
      pError,
      onSubmit,
    };
  },
};
</script>

<style></style>
