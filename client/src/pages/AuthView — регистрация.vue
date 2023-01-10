<template>
  <div class="row justify-center items-center h-100">
    <q-card class="auth-card">
      <q-card-section>
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <q-input
              v-model="email"
              label="Email"
              type="email"
              :error="!!eError"
              :error-message="eError"
            />
            <q-input
              v-model="name"
              label="ФИО"
              :error="!!nError"
              :error-message="nError"
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

            <q-select
              v-model="role"
              :options="roleOptions"
              label="Права"
              emit-value
              map-options
            />

            <div>
              <q-btn label="Регистрация" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  setup() {
    const store = useStore();

    const { handleSubmit, isSubmitting, resetForm } = useForm();

    const PASSWORD_MIN_LENGTH = 7;

    // const email = ref("");
    // const name = ref("");
    // const password = ref("");
    const isPwd = ref(true);

    // const role = ref({
    //   label: "Администратор",
    //   value: "admin",
    // });

    onMounted(() => {
      role.value = "admin";
    });

    const roleOptions = [
      {
        label: "Администратор",
        value: "admin",
      },
      {
        label: "Пользователь",
        value: "user",
      },
      {
        label: "God",
        value: "god",
      },
    ];

    const {
      value: email,
      errorMessage: eError,
      handleBlur: eBlur,
    } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите email")
        .email("Необходимо ввести корректный email")
    );

    const {
      value: password,
      errorMessage: pError,
      handleBlur: pBlur,
    } = useField(
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

    const {
      value: name,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "name",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите ФИО")
        .min(5, "ФИО не может быть меньше 5 символов")
    );

    const {
      value: role,
      errorMessage: rError,
      handleBlur: rBlur,
    } = useField(
      "role",
      yup.string().required("Пожалуйста, укажите права пользователя")
    );

    //Обработка ошибок формы при регистрации
    async function onInvalidSubmit({ values, errors, results }) {
      //console.log(values); // current form values
      //console.log(errors); // a map of field names and their first error message
      //console.log(results); // a detailed map of field names and their validation results
      /*
      if (
        props.submitType == "update" &&
        errors.password &&
        values.email &&
        values.name &&
        values.role
      ) {
        await store.dispatch("auth/updateById", {
          ...values,
          id: props.user._id,
        });

        emit("success");

        store.dispatch("setMessage", {
          value: "Данные пользователя успешно обновлены",
          type: "primary",
        });
        //закрыть модальное окно
        // closeModal();
      } else {
        store.dispatch("setMessage", {
          value: "Не все поля заполнены. Введите значения",
          type: "warning",
        });
      }
      */
    }

    // функция регистрации
    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch("auth/register", values);

        emit("success");

        // очистка полей после успешной регистрации
        resetForm();
        role.value = "user";
        // if (props.submitType == "register") {
        //   await store.dispatch("auth/register", values);

        //   emit("success");

        //   // очистка полей после успешной регистрации
        //   resetForm();
        //   role.value = "user";
        // }
      } catch (e) {}
    }, onInvalidSubmit);

    return {
      email,
      name,
      password,
      isPwd,
      role,
      roleOptions,
      eError,
      nError,
      pError,
      rError,
      eBlur,
      pBlur,
      nBlur,
      rBlur,
      onSubmit,
    };
  },
};
</script>

<style></style>
