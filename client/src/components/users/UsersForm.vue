<template>
  <q-card class="auth-card">
    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent.stop="onSubmit" class="q-gutter-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <q-input
                v-model="email"
                label="Эл. почта (логин для входа)"
                type="email"
                :error="!!eError"
                :error-message="eError"
                :disable="lockedProfile && !access"
                :readonly="lockedProfile && !access"
                dense
              />
            </div>
            <div class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <q-input
                v-if="submitType == 'register'"
                v-model="password"
                label="Пароль"
                :type="isPwd ? 'password' : 'text'"
                :error="!!pError"
                :error-message="pError"
                dense
              >
                <template v-slot:prepend>
                  <q-icon
                    name="cached"
                    class="cursor-pointer"
                    @click="generatePassword('register')"
                  />
                </template>

                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <q-select
                v-if="access"
                v-model="role"
                :options="roleOptions"
                label="Права"
                emit-value
                map-options
                options-dense
                dense
              />
            </div>
            <div class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <q-input
                v-model="firstName"
                label="Фамилия контактного лица"
                :error="!!fNameError"
                :error-message="fNameError"
                :disable="lockedProfile && !access"
                :readonly="lockedProfile && !access"
                dense
              />
            </div>
            <div class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <q-input
                v-model="secondName"
                label="Имя контактного лица"
                :error="!!sNameError"
                :error-message="sNameError"
                :disable="lockedProfile && !access"
                :readonly="lockedProfile && !access"
                dense
              />
            </div>
            <div class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <q-input
                v-model="lastName"
                label="Отчество контактного лица"
                :error="!!lNameError"
                :error-message="lNameError"
                :disable="lockedProfile && !access"
                :readonly="lockedProfile && !access"
                dense
              />
            </div>
            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <q-input
                v-model="post"
                label="Должность контактного лица"
                :error="!!postError"
                :error-message="postError"
                :disable="lockedProfile && !access"
                :readonly="lockedProfile && !access"
                dense
              />
            </div>
            <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <q-input
                v-model="phoneInput"
                label="Телефон контактного лица"
                mask="+7 (###) ###-##-##"
                fill-mask
                :error="!!phoneError"
                :error-message="phoneError"
                :disable="lockedProfile && !access"
                :readonly="lockedProfile && !access"
                dense
              />
            </div>
          </div>

          <div
            v-if="submitType !== 'register'"
            class="row q-my-md q-col-gutter-sm"
          >
            <div class="col-12">
              <q-expansion-item
                v-model="expanded"
                header-class="bg-cyan-1"
                label="Регистрационная карточка предприятия"
              >
                <div class="row q-col-gutter-sm">
                  <div class="col-12">
                    <q-select
                      v-model="companyOwnershipType"
                      :options="companyOwnershipTypeOptions"
                      label="Форма собственности"
                      :error="!!cOTypeError"
                      :error-message="cOTypeError"
                      options-dense
                      dense
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="companyFullName"
                      label="Полное название предприятия"
                      :error="!!cFNameError"
                      :error-message="cFNameError"
                      @blur="checkCompanyName"
                      dense
                    />
                  </div>
                  <div v-if="!matches" class="col-12">
                    <q-input
                      v-model="companyShortName"
                      label="Сокращенное название предприятия"
                      :error="!!cSNameError"
                      :error-message="cSNameError"
                      dense
                    />
                  </div>
                  <div class="col-12">
                    <q-checkbox
                      v-model="matches"
                      label="Сокращенное название совпадает с полным"
                    />
                  </div>

                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyLegalAddressCode"
                      label="Почтовый индекс юридического адреса"
                      type="text"
                      mask="######"
                      :error="!!сLACodeError"
                      :error-message="сLACodeError"
                      @blur="checkCompanyAddress"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyLegalAddressCity"
                      label="Город"
                      :error="!!cLACityError"
                      :error-message="cLACityError"
                      @blur="checkCompanyAddress"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyLegalAddressTownship"
                      label="Поселок городского типа"
                      :error="!!cLATownshipError"
                      :error-message="cLATownshipError"
                      @blur="checkCompanyAddress"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyLegalAddressStreet"
                      label="Улица, проспект, бульвар и т.п."
                      :error="!!cLAStreetError"
                      :error-message="cLAStreetError"
                      @blur="checkCompanyAddress"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyLegalAddressHouse"
                      label="Дом"
                      :error="!!cLAHouseError"
                      :error-message="cLAHouseError"
                      @blur="checkCompanyAddress"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyLegalAddressRoom"
                      label="Квартира, комната, офис, строение и т.п."
                      :error="!!cLARoomError"
                      :error-message="cLARoomError"
                      @blur="checkCompanyAddress"
                      dense
                    />
                  </div>
                  <div
                    v-if="!matchesAddress"
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyMailAddressCode"
                      label="Почтовый индекс почтового адреса"
                      type="text"
                      mask="######"
                      :error="!!сMACodeError"
                      :error-message="сMACodeError"
                      dense
                    />
                  </div>
                  <div
                    v-if="!matchesAddress"
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyMailAddressCity"
                      label="Город"
                      :error="!!cMACityError"
                      :error-message="cMACityError"
                      dense
                    />
                  </div>
                  <div
                    v-if="!matchesAddress"
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyMailAddressTownship"
                      label="Поселок городского типа"
                      :error="!!cLATownshipError"
                      :error-message="cMATownshipError"
                      dense
                    />
                  </div>
                  <div
                    v-if="!matchesAddress"
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyMailAddressStreet"
                      label="Улица, проспект, бульвар и т.п."
                      :error="!!cMAStreetError"
                      :error-message="cMAStreetError"
                      dense
                    />
                  </div>
                  <div
                    v-if="!matchesAddress"
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyMailAddressHouse"
                      label="Дом"
                      :error="!!cMAHouseError"
                      :error-message="cMAHouseError"
                      dense
                    />
                  </div>
                  <div
                    v-if="!matchesAddress"
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyMailAddressRoom"
                      label="Квартира, комната, офис, строение и т.п."
                      :error="!!cMARoomError"
                      :error-message="cMARoomError"
                      dense
                    />
                  </div>
                  <div class="col-12">
                    <q-checkbox
                      v-model="matchesAddress"
                      label="Почтовый адрес совпадает с юридическим"
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyPhoneInput"
                      label="Телефон"
                      mask="+7 (###) ###-##-##"
                      fill-mask
                      :error="!!cPhoneError"
                      :error-message="cPhoneError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyEmail"
                      label="Эл. почта:"
                      type="email"
                      :error="!!cEmailError"
                      :error-message="cEmailError"
                      dense
                    />
                  </div>

                  <!-- <div class="col-12">
                    <q-input
                      v-model="companyBank"
                      label="Банк"
                      :error="!!cBankError"
                      :error-message="cBankError"
                      dense
                    />
                  </div> -->
                  <!-- <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyPayment"
                      label="Расчетый счёт"
                      type="text"
                      mask="####################"
                      :error="!!cPayError"
                      :error-message="cPayError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyInn"
                      label="ИНН"
                      type="text"
                      mask="########"
                      :error="!!cInnError"
                      :error-message="cInnError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyOkpo"
                      label="ОКПО"
                      type="text"
                      mask="########"
                      :error="!!cOkpoError"
                      :error-message="cOkpoError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyBik"
                      label="БИК"
                      type="text"
                      mask="#########"
                      :error="!!cBikError"
                      :error-message="cBikError"
                      dense
                    />
                  </div> -->
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyDirFirstName"
                      label="Фамилия руководителя, подписывающего договоры"
                      :error="!!cDirFNameError"
                      :error-message="cDirFNameError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyDirSecondName"
                      label="Имя руководителя, подписывающего договоры"
                      :error="!!cDirSNameError"
                      :error-message="cDirSNameError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                  >
                    <q-input
                      v-model="companyDirLastName"
                      label="Отчество руководителя, подписывающего договоры"
                      :error="!!cDirLNameError"
                      :error-message="cDirLNameError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyDirPost"
                      label="Должность руководителя, подписывающего договоры"
                      :error="!!cDirPostError"
                      :error-message="cDirPostError"
                      dense
                    />
                  </div>
                  <div
                    class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                  >
                    <q-input
                      v-model="companyGrounds"
                      label="Основание для подписания договоров (Устав, доверенность и т.п.)"
                      :error="!!cGroundsError"
                      :error-message="cGroundsError"
                      dense
                    />
                  </div>
                  <div class="col-12">
                    <div class="q-card q-pa-md">
                      <div class="border-bottom text-subtitle2">Реквизиты:</div>

                      <div class="q-mt-sm">
                        <div>
                          <span class="text-weight-medium">Банк:</span>
                          {{ companyBank || "не указано" }}
                        </div>
                        <div>
                          <span class="text-weight-medium">Расчетый счёт:</span>
                          {{ companyPayment || "не указано" }}
                        </div>
                        <div>
                          <span class="text-weight-medium">ИНН:</span>
                          {{ companyInn || "не указано" }}
                        </div>
                        <div>
                          <span class="text-weight-medium">ОКПО:</span>
                          {{ companyOkpo || "не указано" }}
                        </div>
                        <div>
                          <span class="text-weight-medium">БИК:</span>
                          {{ companyBik || "не указано" }}
                        </div>
                      </div>
                      <div class="q-mt-sm" v-if="submitType == 'update'">
                        <q-btn
                          label="Изменить реквизиты"
                          size="sm"
                          color="orange"
                          @click="thirdDialog = true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-expansion-item>
            </div>
          </div>

          <div v-if="submitType !== 'register' && resetPassword">
            <q-btn
              label="Сменить пароль"
              size="sm"
              color="orange"
              @click="secondDialog = true"
            />
          </div>

          <div>
            <q-btn :label="buttonTitle" type="submit" color="primary" />
          </div>

          <q-dialog
            v-if="resetPassword"
            v-model="secondDialog"
            ref="secondDialogRef"
            persistent
            transition-show="scale"
            transition-hide="scale"
          >
            <q-card class="" style="width: 300px">
              <q-toolbar>
                <q-toolbar-title>Сменить пароль</q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>

              <div
                v-if="
                  resetPassword &&
                  (currentUser.id == user?.id || currentUser.id == user?._id)
                "
              >
                <UsersFormResetPassword @success="secondDialogRef.hide" />
              </div>
              <div v-else>
                <form @submit.prevent.stop="onSubmitPassword">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model="newPassword"
                      ref="newPasswordInput"
                      label="Новый пароль"
                      :type="isNewPwd ? 'password' : 'text'"
                      :rules="[
                        (val) => !!val || 'Пароль не может быть пустым',
                        (val) =>
                          val.length >= 7 ||
                          'Пароль не может быть короче 7 символов',
                      ]"
                    >
                      <template v-slot:prepend>
                        <q-icon
                          name="cached"
                          class="cursor-pointer"
                          @click="generatePassword('reset')"
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
                    <q-btn
                      flat
                      class="text-primary"
                      type="submit"
                      label="Сохранить"
                    />
                    <q-btn flat class="text-red" label="Отмена" v-close-popup />
                  </q-card-actions>
                </form>
              </div>
            </q-card>
          </q-dialog>
          <q-dialog
            v-model="thirdDialog"
            ref="thirdDialogRef"
            persistent
            transition-show="scale"
            transition-hide="scale"
          >
            <q-card class="">
              <q-toolbar>
                <q-toolbar-title>Изменить реквизиты</q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>

              <!-- <q-card-section>
                <div class="text-h6">Изменить реквизиты</div>
              </q-card-section> -->
              <div>
                <UsersFormRequisites
                  :requisites="currentUserRequisites"
                  @success="closeThirdDialog"
                />
              </div>
            </q-card>
          </q-dialog>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import UsersFormResetPassword from "./UsersFormResetPassword.vue";
import UsersFormRequisites from "./UsersFormRequisites.vue";

export default {
  components: { UsersFormResetPassword, UsersFormRequisites },
  props: {
    buttonTitle: { type: String, required: true },
    submitType: { type: String, required: true },
    user: { type: Object, required: false },
    resetPassword: { type: Boolean, required: false },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const currentUser = computed(() => store.getters["auth/user"]);
    const currentUserRequisites = ref(null);
    const access = ref(false);
    const lockedProfile = computed(
      () => store.getters["system/systems"].lockedProfile
    );

    const phoneInput = ref(null);
    const companyPhoneInput = ref(null);

    //Длина пароля
    const PASSWORD_MIN_LENGTH = 7;
    //Показывать пароль
    const isPwd = ref(true);
    const isNewPwd = ref(true);

    const matches = ref(false);
    //совпадение почтовых адресов
    const matchesAddress = ref(false);

    const newPassword = ref("");
    const newPasswordInput = ref(null);

    const companyBank = ref("");
    const companyPayment = ref("");
    const companyInn = ref("");
    const companyOkpo = ref("");
    const companyBik = ref("");

    const secondDialogRef = ref(null);
    const thirdDialogRef = ref(null);

    const companyOwnershipTypeOptions = computed(() =>
      store.getters["settingsConfigurable/ownershipTypes"].map(
        (item) => item.value
      )
    );

    const { handleSubmit, resetForm } = useForm();

    onMounted(() => {
      // console.log(route);
      role.value = "user";

      if (currentUser.value) {
        currentUser.value.roles.includes("admin") ||
        currentUser.value.roles.includes("god")
          ? (access.value = true)
          : (access.value = false);
      }

      if (props.user) {
        // console.log(props.user);

        email.value = props.user.email;
        role.value = props.user.roles[0];
        firstName.value = props.user.firstName;
        secondName.value = props.user.secondName;
        lastName.value = props.user.lastName;
        post.value = props.user.post;
        // phone.value = props.user.phone;
        phoneInput.value = props.user.phone;
        companyFullName.value = props.user.companyFullName;
        companyShortName.value = props.user.companyShortName;
        companyOwnershipType.value = props.user.companyOwnershipType;
        companyLegalAddressCode.value = props.user.companyLegalAddressCode;
        companyLegalAddressCity.value = props.user.companyLegalAddressCity;
        companyLegalAddressTownship.value =
          props.user.companyLegalAddressTownship;
        companyLegalAddressStreet.value = props.user.companyLegalAddressStreet;
        companyLegalAddressHouse.value = props.user.companyLegalAddressHouse;
        companyLegalAddressRoom.value = props.user.companyLegalAddressRoom;
        companyMailAddressCode.value = props.user.companyMailAddressCode;
        companyMailAddressCity.value = props.user.companyMailAddressCity;
        companyMailAddressTownship.value =
          props.user.companyMailAddressTownship;
        companyMailAddressStreet.value = props.user.companyMailAddressStreet;
        companyMailAddressHouse.value = props.user.companyMailAddressHouse;
        companyMailAddressRoom.value = props.user.companyMailAddressRoom;
        // companyPhone.value = props.user.companyPhone;
        companyPhoneInput.value = props.user.companyPhone;
        companyEmail.value = props.user.companyEmail;
        companyBank.value = props.user.companyBank;
        companyPayment.value = props.user.companyPayment;
        companyInn.value = props.user.companyInn;
        companyOkpo.value = props.user.companyOkpo;
        companyBik.value = props.user.companyBik;
        companyDirFirstName.value = props.user.companyDirFirstName;
        companyDirSecondName.value = props.user.companyDirSecondName;
        companyDirLastName.value = props.user.companyDirLastName;
        companyDirPost.value = props.user.companyDirPost;
        companyGrounds.value = props.user.companyGrounds;

        companyFullName.value == companyShortName.value
          ? (matches.value = true)
          : (matches.value = false);

        companyLegalAddressCode.value == companyMailAddressCode.value &&
        companyLegalAddressCity.value == companyMailAddressCity.value &&
        companyLegalAddressTownship.value == companyMailAddressTownship.value &&
        companyLegalAddressStreet.value == companyMailAddressStreet.value &&
        companyLegalAddressHouse.value == companyMailAddressHouse.value &&
        companyLegalAddressRoom.value == companyMailAddressRoom.value
          ? (matchesAddress.value = true)
          : (matchesAddress.value = false);

        currentUserRequisites.value = {
          id: props.user._id || props.user.id,
          companyBank: props.user.companyBank,
          companyPayment: props.user.companyPayment,
          companyInn: props.user.companyInn,
          companyBik: props.user.companyBik,
          companyOkpo: props.user.companyOkpo || undefined,
        };
      }
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
      // {
      //   label: "God",
      //   value: "god",
      // },
    ];

    // const { value: company, errorMessage: companyError } = useField(
    //   "company",
    //   yup.object().nullable()
    //   // .required("Пожалуйста, укажите название предприятия")
    // );

    const { value: email, errorMessage: eError } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите эл. почту (логин для входа)")
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

    const { value: firstName, errorMessage: fNameError } = useField(
      "firstName",
      yup.string().trim().required("Пожалуйста, введите фамилию")
    );
    const { value: secondName, errorMessage: sNameError } = useField(
      "secondName",
      yup.string().trim().required("Пожалуйста, введите имя")
    );
    const { value: lastName, errorMessage: lNameError } = useField(
      "lastName",
      yup.string().trim().required("Пожалуйста, введите отчество")
    );
    const { value: post, errorMessage: postError } = useField(
      "post",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите должность контактного лица")
    );
    const { value: phone, errorMessage: phoneError } = useField(
      "phone",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите телефон")
        .min(18, "Номер телефона не может быть меньше 11 цифр (с кодом)")
    );

    const { value: role, errorMessage: rError } = useField(
      "role",
      yup.string().required("Пожалуйста, укажите права пользователя")
    );

    const { value: companyFullName, errorMessage: cFNameError } = useField(
      "companyFullName",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите полное название предприятия")
    );
    const { value: companyShortName, errorMessage: cSNameError } = useField(
      "companyShortName",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите сокращенное название предприятия")
    );

    const { value: companyOwnershipType, errorMessage: cOTypeError } = useField(
      "companyOwnershipType",
      yup.string().required("Пожалуйста, укажите права пользователя")
    );

    const { value: companyLegalAddressCode, errorMessage: сLACodeError } =
      useField(
        "companyLegalAddressCode",
        yup
          .string()
          .trim()
          .min(6, "Длина не может быть меньше 6 символов")
          .required("Пожалуйста, введите почтовый индекс юридического адреса")
      );

    const { value: companyLegalAddressCity, errorMessage: cLACityError } =
      useField(
        "companyLegalAddressCity",
        yup.string().trim().required("Пожалуйста, введите город")
      );
    const {
      value: companyLegalAddressTownship,
      errorMessage: cLATownshipError,
    } = useField("companyLegalAddressTownship", yup.string().trim());
    const { value: companyLegalAddressStreet, errorMessage: cLAStreetError } =
      useField(
        "companyLegalAddressStreet",
        yup
          .string()
          .trim()
          .required("Пожалуйста, введите улицу, проспект, бульвар и т.п.")
      );
    const { value: companyLegalAddressHouse, errorMessage: cLAHouseError } =
      useField(
        "companyLegalAddressHouse",
        yup.string().trim().required("Пожалуйста, введите дом")
      );
    const { value: companyLegalAddressRoom, errorMessage: cLARoomError } =
      useField("companyLegalAddressRoom", yup.string().trim());

    const { value: companyMailAddressCode, errorMessage: сMACodeError } =
      useField(
        "companyMailAddressCode",
        yup
          .string()
          .trim()
          .min(6, "Длина не может быть меньше 6 символов")
          .required("Пожалуйста, введите почтовый индекс почтового адреса")
      );
    const { value: companyMailAddressCity, errorMessage: cMACityError } =
      useField(
        "companyMailAddressCity",
        yup.string().trim().required("Пожалуйста, введите город")
      );
    const {
      value: companyMailAddressTownship,
      errorMessage: cMATownshipError,
    } = useField("companyMailAddressTownship", yup.string().trim());
    const { value: companyMailAddressStreet, errorMessage: cMAStreetError } =
      useField(
        "companyMailAddressStreet",
        yup
          .string()
          .trim()
          .required("Пожалуйста, введите улицу, проспект, бульвар и т.п.")
      );
    const { value: companyMailAddressHouse, errorMessage: cMAHouseError } =
      useField(
        "companyMailAddressHouse",
        yup.string().trim().required("Пожалуйста, введите дом")
      );
    const { value: companyMailAddressRoom, errorMessage: cMARoomError } =
      useField("companyMailAddressRoom", yup.string().trim());
    const { value: companyPhone, errorMessage: cPhoneError } = useField(
      "companyPhone",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите телефон")
        .min(18, "Номер телефона не может быть меньше 11 цифр (с кодом)")
    );
    const { value: companyEmail, errorMessage: cEmailError } = useField(
      "companyEmail",
      yup
        .string()
        .trim()
        .required("Пожалуйста, введите эл. почту")
        .email("Необходимо ввести корректный email")
    );

    const { value: companyDirPost, errorMessage: cDirPostError } = useField(
      "companyDirPost",
      yup
        .string()
        .trim()
        .required(
          "Пожалуйста, введите должность руководителя, подписывающего договоры"
        )
    );
    const { value: companyDirFirstName, errorMessage: cDirFNameError } =
      useField(
        "companyDirFirstName",
        yup
          .string()
          .trim()
          .required(
            "Пожалуйста, введите фимилию руководителя, подписывающего договоры"
          )
      );
    const { value: companyDirSecondName, errorMessage: cDirSNameError } =
      useField(
        "companyDirSecondName",
        yup
          .string()
          .trim()
          .required(
            "Пожалуйста, введите имя руководителя, подписывающего договоры"
          )
      );
    const { value: companyDirLastName, errorMessage: cDirLNameError } =
      useField(
        "companyDirLastName",
        yup
          .string()
          .trim()
          .required(
            "Пожалуйста, введите отчество руководителя, подписывающего договоры"
          )
      );
    const { value: companyGrounds, errorMessage: cGroundsError } = useField(
      "companyGrounds",
      yup
        .string()
        .trim()
        .required(
          "Пожалуйста, введите основание для подписания договоров (Устав, доверенность и т.п.)"
        )
    );

    watch(phoneInput, (newVal, oldVal) => {
      phone.value = newVal;

      if (newVal.includes("_")) {
        phone.value = newVal.replace(/_/g, "");
      }
    });
    watch(companyPhoneInput, (newVal, oldVal) => {
      companyPhone.value = newVal;

      if (newVal.includes("_")) {
        companyPhone.value = newVal.replace(/_/g, "");
      }
    });

    watch(firstName, (newVal, oldVal) => {
      if (newVal) {
        firstName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });
    watch(secondName, (newVal, oldVal) => {
      if (newVal) {
        secondName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });
    watch(lastName, (newVal, oldVal) => {
      if (newVal) {
        lastName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });

    watch(companyDirFirstName, (newVal, oldVal) => {
      if (newVal) {
        companyDirFirstName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });
    watch(companyDirSecondName, (newVal, oldVal) => {
      if (newVal) {
        companyDirSecondName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });
    watch(companyDirLastName, (newVal, oldVal) => {
      if (newVal) {
        companyDirLastName.value =
          newVal[0].toUpperCase() + newVal.slice(1).toLowerCase();
      }
    });

    watch(
      () => matches.value,
      (newVal, oldVal) => {
        if (newVal == true) {
          companyShortName.value = companyFullName.value;
        }
        if (oldVal == true) {
          companyShortName.value = "";
        }
      }
    );

    watch(
      () => matchesAddress.value,
      (newVal, oldVal) => {
        if (newVal == true) {
          companyMailAddressCode.value = companyLegalAddressCode.value;
          companyMailAddressCity.value = companyLegalAddressCity.value;
          companyMailAddressTownship.value = companyLegalAddressTownship.value;
          companyMailAddressStreet.value = companyLegalAddressStreet.value;
          companyMailAddressHouse.value = companyLegalAddressHouse.value;
          companyMailAddressRoom.value = companyLegalAddressRoom.value;
        }
        if (oldVal == true) {
          companyMailAddressCode.value = "";
          companyMailAddressCity.value = "";
          companyMailAddressTownship.value = "";
          companyMailAddressHouse.value = "";
          companyMailAddressStreet.value = "";
          companyMailAddressRoom.value = "";
        }
      }
    );

    function checkCompanyName() {
      if (matches.value) {
        companyShortName.value = companyFullName.value;
      }
    }
    function checkCompanyAddress() {
      if (matchesAddress.value) {
        companyMailAddressCode.value = companyLegalAddressCode.value;
        companyMailAddressCity.value = companyLegalAddressCity.value;
        companyMailAddressTownship.value = companyLegalAddressTownship.value;
        companyMailAddressStreet.value = companyLegalAddressStreet.value;
        companyMailAddressHouse.value = companyLegalAddressHouse.value;
        companyMailAddressRoom.value = companyLegalAddressRoom.value;
      }
    }

    function generatePassword(form) {
      let pass = "";
      // let symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
      let symbols =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++) {
        pass += symbols.charAt(Math.floor(Math.random() * symbols.length));
      }
      if (form == "register") {
        password.value = pass;
        isPwd.value = false;
      } else if (form == "reset") {
        newPassword.value = pass;
        isNewPwd.value = false;
      }
    }

    // function filterFn(val, update) {
    //   update(() => {
    //     if (val === "") {
    //       update(() => {
    //         companyOptions.value = companyOptionsData.value;
    //       });
    //       return;
    //     } else {
    //       const needle = val.toLowerCase();
    //       companyOptions.value = companyOptionsData.value.filter(
    //         (v) =>
    //           v.label.toLowerCase().indexOf(needle) > -1 ||
    //           v.description.toLowerCase().indexOf(needle) > -1
    //       );
    //     }
    //   });
    // }

    //Обработка ошибок формы при регистрации
    async function onInvalidSubmit({ values, errors, results }) {
      //console.log(values); // current form values
      //console.log(errors); // a map of field names and their first error message
      //console.log(results); // a detailed map of field names and their validation results

      try {
        if (
          props.submitType == "register" &&
          !errors.password &&
          !errors.email &&
          !errors.firstName &&
          !errors.secondName &&
          !errors.lastName &&
          !errors.post &&
          !errors.phone
        ) {
          const user = await store.dispatch("auth/register", {
            email: values.email,
            password: values.password,
            role: values.role,
            firstName: values.firstName || "",
            secondName: values.secondName || "",
            lastName: values.lastName || "",
            post: values.post || "",
            phone: values.phone || "",
          });

          emit("success", { role: values.role, id: user._id });

          // очистка полей после успешной регистрации
          resetForm();
          role.value = "user";
        }

        if (
          props.submitType == "update" &&
          errors.password &&
          !errors.email &&
          !errors.firstName &&
          !errors.secondName &&
          !errors.lastName &&
          !errors.post &&
          !errors.phone &&
          !errors.companyFullName &&
          !errors.companyShortName &&
          !errors.companyOwnershipType &&
          !errors.companyLegalAddressCode &&
          !errors.companyLegalAddressCity &&
          !errors.companyLegalAddressTownship &&
          !errors.companyLegalAddressStreet &&
          !errors.companyLegalAddressHouse &&
          !errors.companyMailAddressCode &&
          !errors.companyMailAddressCity &&
          !errors.companyMailAddressStreet &&
          !errors.companyMailAddressHouse &&
          !errors.companyPhone &&
          !errors.companyEmail &&
          !errors.companyDirFirstName &&
          !errors.companyDirSecondName &&
          !errors.companyDirLastName &&
          !errors.companyDirPost &&
          !errors.companyGrounds
        ) {
          if (
            currentUser.value.id == props.user.id ||
            currentUser.value.id == props.user._id
          ) {
            // console.log("currentUser.value.id", currentUser.value.id);
            // console.log("props.user.id", props.user.id);
            // console.log("props.user._id", props.user._id);
            await store.dispatch("auth/update", {
              ...values,
              id: props.user.id || props.user._id,
            });
          } else {
            // console.log("2");
            await store.dispatch("auth/updateById", {
              ...values,
              id: props.user._id,
            });
          }

          emit("success", {
            id: props.user._id ? props.user._id : props.user.id,
          });

          store.dispatch("setMessage", {
            value: "Данные пользователя успешно обновлены",
            type: "primary",
          });

          //вернуться на предыдущую страницу
          // if (route.fullPath == "/profile") {
          //   router.go(-1);
          // }
        } else if (
          props.submitType == "update" &&
          (errors.password ||
            errors.email ||
            errors.firstName ||
            errors.secondName ||
            errors.lastName ||
            errors.post ||
            errors.phone ||
            errors.companyFullName ||
            errors.companyShortName ||
            errors.companyOwnershipType ||
            errors.companyLegalAddressCode ||
            errors.companyLegalAddressCity ||
            errors.companyLegalAddressStreet ||
            errors.companyLegalAddressHouse ||
            errors.companyMailAddressCode ||
            errors.companyMailAddressCity ||
            errors.companyMailAddressTownship ||
            errors.companyMailAddressStreet ||
            errors.companyMailAddressHouse ||
            errors.companyPhone ||
            errors.companyEmail ||
            errors.companyDirFirstName ||
            errors.companyDirSecondName ||
            errors.companyDirLastName ||
            errors.companyDirPost ||
            errors.companyGrounds)
        ) {
          store.dispatch("setMessage", {
            value: "Не все поля заполнены. Введите значения",
            type: "warning",
          });
        }
      } catch (e) {}
    }

    // функция регистрации
    const onSubmit = handleSubmit(async (values) => {}, onInvalidSubmit);

    // функция обновления пароля
    const onSubmitPassword = async () => {
      newPasswordInput.value.validate();

      if (newPasswordInput.value.hasError) {
        // form has error
        // console.log("error");
      } else {
        // console.log("success");

        try {
          await store.dispatch("auth/updateUserPassword", {
            id: props.user._id,
            newPassword: newPassword.value,
          });

          secondDialogRef.value.hide();
        } catch (e) {}
      }
    };

    const closeSecondDialog = () => {
      if (route.fullPath !== "/profile") {
        secondDialogRef.value.hide();
      }
    };
    const closeThirdDialog = (values) => {
      // console.log(values);

      companyBank.value = values.companyBank;
      companyPayment.value = values.companyPayment;
      companyInn.value = values.companyInn;
      companyOkpo.value = values.companyOkpo;
      companyBik.value = values.companyBik;

      thirdDialogRef.value.hide();
    };

    return {
      currentUser,
      currentUserRequisites,
      access,
      lockedProfile,
      // currentUserId,

      phoneInput,
      companyPhoneInput,

      secondDialogRef,
      thirdDialogRef,
      closeSecondDialog,
      closeThirdDialog,

      email,
      firstName,
      secondName,
      lastName,
      post,
      phone,
      password,
      newPassword,
      newPasswordInput,
      isPwd,
      isNewPwd,
      role,
      roleOptions,
      matches,
      matchesAddress,

      eError,
      pError,
      fNameError,
      sNameError,
      lNameError,
      postError,
      phoneError,
      rError,

      companyFullName,
      companyShortName,
      companyOwnershipType,
      companyOwnershipTypeOptions,
      companyLegalAddressCode,
      companyLegalAddressCity,
      companyLegalAddressTownship,
      companyLegalAddressStreet,
      companyLegalAddressHouse,
      companyLegalAddressRoom,
      companyMailAddressCode,
      companyMailAddressCity,
      companyMailAddressTownship,
      companyMailAddressStreet,
      companyMailAddressHouse,
      companyMailAddressRoom,
      companyPhone,
      companyEmail,
      companyBank,
      companyPayment,
      companyInn,
      companyOkpo,
      companyBik,
      companyDirFirstName,
      companyDirSecondName,
      companyDirLastName,
      companyDirPost,
      companyGrounds,

      cFNameError,
      cSNameError,
      cOTypeError,
      сLACodeError,
      cLACityError,
      cLATownshipError,
      cLAStreetError,
      cLAHouseError,
      cLARoomError,
      сMACodeError,
      cMACityError,
      cMATownshipError,
      cMAStreetError,
      cMAHouseError,
      cMARoomError,
      cPhoneError,
      cEmailError,
      // cBankError,
      // cPayError,
      // cInnError,
      // cOkpoError,
      // cBikError,
      cDirFNameError,
      cDirSNameError,
      cDirLNameError,
      cDirPostError,
      cGroundsError,

      // newPassError,
      // filterFn,
      onSubmit,
      onSubmitPassword,
      generatePassword,

      checkCompanyName,
      checkCompanyAddress,

      secondDialog: ref(false),
      thirdDialog: ref(false),
      expanded: ref(false),
    };
  },
};
</script>

<style></style>
