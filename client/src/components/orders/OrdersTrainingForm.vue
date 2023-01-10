<template>
  <div>
    <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <div class="row q-col-gutter-sm">
        <div v-if="access" class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <q-select
            square
            v-model="status"
            :options="statusOptions"
            label="Статус"
            dense
          />
        </div>
        <div v-if="access" class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <q-input v-model.trim="contractNumber" label="Номер договора" dense />
        </div>
        <div v-if="access" class="col-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <q-input
            label="Дата договора"
            v-model="contractDate"
            mask="date"
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="contractDate">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Закрыть"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div v-if="access" class="col-12">
          <q-select
            v-model="usersSelect"
            ref="usersSelectRef"
            use-input
            input-debounce="0"
            label="Предприятие"
            :options="usersSelectOptions"
            @filter="usersSelectFilterFn"
            behavior="menu"
            :error="!!usersSelectError"
            :error-message="usersSelectError"
            options-dense
            dense
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{
                    scope.opt.description
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"
                  >По вашему запросу нет совпадений</q-item-section
                >
                <div>
                  <q-btn
                    icon="add_home_work"
                    type="button"
                    color="primary"
                    @click="showModal('addCompany')"
                  />
                </div>
              </q-item>
            </template>
            <template v-slot:append>
              <q-btn
                v-if="usersSelect"
                round
                dense
                flat
                icon="mode_edit"
                @click.stop.prevent="showModal('editCompany')"
              />
              <q-btn
                v-else
                round
                dense
                flat
                icon="add_home_work"
                @click.stop.prevent="showModal('addCompany')"
              />
            </template>
          </q-select>
        </div>

        <!-- <div class="col-12">
          <div class="text-secondary">
            Предприятие:
            {{ usersSelect?.description }}
          </div>
        </div> -->

        <div class="col-12">
          <q-input
            v-if="
              access ||
              (!access &&
                orderData &&
                orderData.status == 'Возвращена на корректировку' &&
                commentUser)
            "
            square
            filled
            autogrow
            :readonly="access ? false : true"
            type="textarea"
            v-model="commentUser"
            label="Комментарий к заполнению данных о предприятии"
            dense
          />
        </div>

        <div class="col-12">
          <q-select
            label="Слушатель"
            square
            use-input
            input-debounce="0"
            v-model="listenersSelect"
            ref="listenerSelectRef"
            :options="listenerOptions"
            :error="!!listenersSelectError"
            :error-message="listenersSelectError"
            @filter="filterFn"
            @filter-abort="abortFilterFn"
            options-dense
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"
                  >По вашему запросу нет совпадений</q-item-section
                >
                <div>
                  <q-btn
                    icon="person_add"
                    type="button"
                    color="primary"
                    @click="showModal('addListener')"
                  />
                </div>
              </q-item>
            </template>
            <template v-slot:append>
              <q-btn
                v-if="listenersSelect"
                round
                dense
                flat
                icon="mode_edit"
                @click.stop.prevent="showModal('editListener')"
              />
              <q-btn
                v-else
                round
                dense
                flat
                icon="person_add"
                @click.stop.prevent="showModal('addListener')"
              />
            </template>
          </q-select>
        </div>
        <!-- <div v-if="listenersSelect" class="col-12">
          <div class="text-secondary">
            {{
              "Пол: " +
              "gender" +
              ", Дата рождения: " +
              //dateFormat(birthday) +
              ", Телефон: " +
              "phone"
            }}
          </div>
        </div> -->

        <div class="col-12">
          <q-input
            v-if="
              access ||
              (!access &&
                orderData &&
                orderData.status == 'Возвращена на корректировку' &&
                commentListener)
            "
            square
            filled
            autogrow
            :readonly="access ? false : true"
            type="textarea"
            v-model="commentListener"
            label="Комментарий к заполнению данных о слушателе"
            dense
          />
        </div>

        <div class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <q-select
            square
            v-model="program"
            :options="orderType == 'nk' ? programOptionsNK : programOptionsRI"
            label="Программа повышения квалификации"
            emit-value
            map-options
            :error="!!programError"
            :error-message="programError"
            options-dense
            dense
          />
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <q-input
            v-if="
              access ||
              (!access &&
                orderData &&
                orderData.status == 'Возвращена на корректировку' &&
                commentOrder)
            "
            square
            filled
            autogrow
            :readonly="access ? false : true"
            type="textarea"
            v-model="commentOrder"
            label="Комментарий к заполнению заявки"
            dense
          />
        </div>
      </div>

      <div>
        <q-btn
          v-if="
            (orderData && access) ||
            (orderData && !access && orderData.status == 'Черновик') ||
            (orderData &&
              !access &&
              (orderData.status == 'Возвращена на корректировку' ||
                orderData.status == 'Принята в работу'))
          "
          :label="
            !access && orderData.status == 'Принята в работу'
              ? 'В черновики'
              : 'Сохранить'
          "
          @click="update"
          color="primary"
          class="q-mr-md"
        />

        <q-btn
          v-if="!orderData"
          label="Создать"
          type="submit"
          color="primary"
          class="q-mr-md"
        />

        <q-btn
          v-if="
            (orderData &&
              access &&
              orderData.status !== 'Черновик' &&
              orderData.status !== 'Отправлена на экспертизу' &&
              orderData.status !== 'Возвращена на корректировку') ||
            (!access && orderData?.status == 'Принята в работу')
          "
          label="Отмена"
          @click="$emit('hide')"
          color="primary"
        />
        <q-btn
          v-else-if="
            !orderData ||
            orderData.status == 'Черновик' ||
            (orderData && !access && orderData.status !== 'Черновик') ||
            (orderData &&
              access &&
              (orderData.status == 'Отправлена на экспертизу' ||
                orderData.status == 'Возвращена на корректировку'))
          "
          label="Отмена"
          color="primary"
          to="/orders-training-nk"
        />
      </div>
    </q-form>
    <teleport to="body">
      <app-modal
        :title="modalTitle"
        :show="modal && !loading"
        fullSize
        @close="closeModal"
      >
        <ListenersForm
          v-if="modalType == 'addListener'"
          :buttonTitle="'Добавить'"
          :submitType="'add'"
          :company="usersSelect"
          @success="updateListeners"
          @hide="closeModal"
        ></ListenersForm>
        <ListenersForm
          v-else-if="modalType == 'editListener'"
          :buttonTitle="'Сохранить'"
          :submitType="'update'"
          :listener="currentListener"
          @success="updateListeners"
          @hide="closeModal"
        ></ListenersForm>

        <UsersForm
          v-if="modalType == 'addCompany'"
          :buttonTitle="'Сохранить'"
          :submitType="'register'"
          @success="updateUsers"
        >
        </UsersForm>
        <UsersForm
          v-else-if="modalType == 'editCompany'"
          :buttonTitle="'Сохранить'"
          :submitType="'update'"
          :user="currentCompany"
          @success="updateUsers"
        >
        </UsersForm>
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import { dateFormat } from "../../utils/dateFormat.js";
import * as yup from "yup";
import AppModal from "../ui/AppModal.vue";
import ListenersForm from "../listeners/ListenersForm.vue";
import UsersForm from "../users/UsersForm.vue";
import { dtoUser } from "../../utils/dtoUser.js";
import { dtoListener } from "../../utils/dtoListener.js";

export default {
  components: { AppModal, ListenersForm, UsersForm },
  props: {
    orderType: {
      type: String,
      required: true,
    },
    orderData: {
      type: Object,
      required: false,
    },
  },
  emits: ["updateSuccess", "hide"],
  setup(props, { emit }) {
    //loader
    const loading = ref(false);
    //store
    const store = useStore();
    //router
    const router = useRouter();

    const { handleSubmit } = useForm();

    const user = store.getters["auth/user"];
    const access = ref(false);

    const usersVal = computed(() => {
      if (usersSelect.value?.value) {
        if (access.value) {
          return dtoUser(
            store.getters["auth/users"].filter(
              (item) => item._id == usersSelect.value.value
            )[0]
          );
        } else {
          return dtoUser({ ...user, _id: user.id });
        }
      } else {
        return null;
      }
    });
    const listenerVal = computed(() => {
      if (listenersSelect.value?.value) {
        return dtoListener(
          store.getters["listener/listeners"].filter(
            (item) => item._id == listenersSelect.value.value
          )[0]
        );
      } else {
        return null;
      }
    });

    const modal = ref(false);
    const modalType = ref("");
    const modalTitle = ref("");

    const usersSelectOptionsData = computed(() =>
      store.getters["auth/users"].map((user) => {
        return {
          value: user._id,
          description: user.companyShortName,
          label: user.companyFullName,
        };
      })
    );
    const usersSelectOptions = ref(usersSelectOptionsData.value);

    const listenerSelectRef = ref();
    const usersSelectRef = ref();

    const currentListener = ref();
    const currentCompany = ref();

    const commentUser = ref("");
    const commentListener = ref("");
    const commentOrder = ref("");

    const status = ref("Черновик");

    const listenerOptionsData = computed(() =>
      store.getters["listener/listeners"].map((listener) => {
        return {
          value: listener._id,
          label:
            listener.firstName +
            " " +
            listener.secondName +
            " " +
            listener.lastName +
            " (" +
            dateFormat(listener.birthday) +
            ")",
        };
      })
    );
    const listenerOptions = ref(listenerOptionsData.value);

    const listenerChangeCount = ref(0);

    onMounted(async () => {
      // console.log(usersSelectOptionsData);
      loading.value = true;

      if (user.roles.length) {
        if (user.roles.includes("admin") || user.roles.includes("god")) {
          access.value = true;

          await store.dispatch("auth/loadUsers");
        } else {
          access.value = false;
        }
      }

      if (props.orderData) {
        // console.log(props.orderData);

        if (access.value) {
          usersSelect.value = usersSelectOptionsData.value
            .map((item) => item)
            .filter((item) => item.value == props.orderData.ownerUser)[0];
        } else {
          usersSelect.value = {
            value: user.id,
            description: user.companyShortName,
            label: user.companyFullName,
          };
          listenersSelect.value = listenerOptionsData.value
            .map((item) => item)
            .filter((item) => item.value == props.orderData.ownerListener)[0];
        }

        program.value = props.orderData.program;
        status.value = props.orderData.status;
        commentUser.value = props.orderData.commentUser;
        commentListener.value = props.orderData.commentListener;
        commentOrder.value = props.orderData.commentOrder;
        contractNumber.value = props.orderData.contractNumber;
        contractDate.value = props.orderData.contractDate;
      } else {
        usersSelect.value = {
          value: user.id,
          description: user.companyShortName,
          label: user.companyFullName,
        };
      }

      loading.value = false;
    });

    const { value: usersSelect, errorMessage: usersSelectError } = useField(
      "usersSelect",
      yup.object().required("Пожалуйста, укажите предприятие").nullable()
    );
    const { value: listenersSelect, errorMessage: listenersSelectError } =
      useField(
        "listenersSelect",
        yup.object().required("Пожалуйста, выберите слушателя").nullable()
      );
    const { value: program, errorMessage: programError } = useField(
      "program",
      yup
        .string()
        .required(
          "Пожалуйста, выберите наименование профессиональной программы повышения квалификации"
        )
    );
    const { value: contractNumber, errorMessage: cNumberError } = useField(
      "contractNumber",
      yup.string().trim()
    );
    const { value: contractDate, errorMessage: cDateError } = useField(
      "contractDate",
      yup.string().trim()
    );

    watch(usersSelect, async (newVal, oldVal) => {
      if (newVal !== "" && newVal !== null) {
        // console.log(newVal);
        // console.log("usersVal", usersVal.value);

        await store.dispatch("listener/loadByCompany", newVal.value);
      } else {
        // console.log("usersVal", usersVal.value);
        store.commit("listener/setListeners", []);
      }

      // console.log("props.orderData::", props.orderData);

      if (props.orderData) listenerChangeCount.value += 1;

      if (newVal !== oldVal) {
        // listener.value = null;

        if (listenerChangeCount.value == 1 && props.orderData) {
          listenersSelect.value = listenerOptionsData.value
            .map((item) => item)
            .filter((item) => item.value == props.orderData.ownerListener)[0];
        } else {
          listenersSelect.value = undefined;
        }
      }
    });

    function usersSelectFilterFn(val, update) {
      update(() => {
        if (val === "") {
          update(() => {
            usersSelectOptions.value = usersSelectOptionsData.value;
          });
          return;
        } else {
          const needle = val.toLowerCase();
          usersSelectOptions.value = usersSelectOptionsData.value.filter(
            (v) =>
              v.label.toLowerCase().indexOf(needle) > -1 ||
              v.description.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    }

    function filterFn(val, update, abort) {
      update(() => {
        if (val === "") {
          update(() => {
            listenerOptions.value = listenerOptionsData.value;
          });
          return;
        } else {
          const needle = val.toLowerCase();
          listenerOptions.value = listenerOptionsData.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    }

    function abortFilterFn() {
      // console.log('delayed filter aborted')
    }

    const showModal = async (action) => {
      listenerSelectRef.value.hidePopup();
      listenerSelectRef.value.updateInputValue("", true);

      if (access.value) {
        usersSelectRef.value.hidePopup();
        usersSelectRef.value.updateInputValue("", true);
      }

      modal.value = true;

      if (action == "addListener") {
        modalType.value = "addListener";
        modalTitle.value = "Добавить нового слушателя";
      } else if (action == "editListener") {
        modalType.value = "editListener";
        modalTitle.value = "Изменить данные слушателя";

        try {
          loading.value = true;
          currentListener.value = await store.dispatch(
            "listener/loadById",
            listenersSelect.value.value
          );
          loading.value = false;
        } catch (e) {
          loading.value = false;
        }
      } else if (action == "addCompany") {
        modalType.value = "addCompany";
        modalTitle.value = "Добавить новое предприятие";
      } else if (action == "editCompany") {
        modalType.value = "editCompany";
        modalTitle.value = "Изменить данные предприятия";

        try {
          loading.value = true;

          await store.dispatch("settingsConfigurable/load", "ownership-type");

          currentCompany.value = await store.dispatch(
            "auth/loadUserById",
            usersSelect.value.value
          );

          loading.value = false;
        } catch (e) {
          loading.value = false;
        }
      }
    };

    const closeModal = () => {
      modal.value = false;
      modalType.value = "";
      modalTitle.value = "";
    };

    const updateListeners = async (values) => {
      if (user.roles) {
        if (user.roles.includes("admin") || user.roles.includes("god")) {
          // await store.dispatch("listener/load");
          if (usersSelect.value) {
            await store.dispatch(
              "listener/loadByCompany",
              usersSelect.value.value
            );
          } else {
            store.commit("listener/setListeners", []);
          }
        } else {
          await store.dispatch("listener/loadByCompany", user.id);
        }
      }

      closeModal();

      const newListener = listenerOptionsData.value
        .map((item) => item)
        .filter((item) =>
          values.id
            ? item.value == values.id
            : item.label ==
              values.firstName +
                " " +
                values.secondName +
                " " +
                values.lastName +
                " (" +
                dateFormat(values.birthday) +
                ")"
        )[0];

      // console.log(newListener);

      listenersSelect.value = newListener;
    };

    const updateUsers = async (values) => {
      // console.log("values:", values);
      await store.dispatch("auth/loadUsers");

      closeModal();

      const newUser = usersSelectOptionsData.value
        .map((item) => item)
        .filter((item) =>
          values.id ? item.value == values.id : item.label == values.fullName
        )[0];

      usersSelect.value = newUser;
    };

    //Создание заявки
    const onSubmit = handleSubmit(async (values) => {
      // console.log("onSubmit:", values);
      try {
        await store.dispatch("orderTraining/create", {
          type: props.orderType,
          program: values.program,
          status: status.value,
          commentUser: commentUser.value,
          commentListener: commentListener.value,
          commentOrder: commentOrder.value,
          contractNumber: values.contractNumber,
          contractDate: values.contractDate,
          listener: listenerVal.value,
          user: usersVal.value,
          ownerListener: values.listenersSelect.value,
          ownerUser: values.usersSelect.value,
        });

        router.push("/orders-training-nk");
      } catch (e) {}
    });

    //сохранение заявки
    const update = handleSubmit(async (values) => {
      const id = props.orderData._id;

      const value = {
        type: props.orderType,
        program: values.program,
        status: status.value,
        number: "",
        commentUser: commentUser.value,
        commentListener: commentListener.value,
        commentOrder: commentOrder.value,
        contractNumber: values.contractNumber,
        contractDate: values.contractDate,
        date: new Date(),
        listener: listenerVal.value,
        user: usersVal.value,
        ownerListener: values.listenersSelect.value,
        ownerUser: values.usersSelect.value,
      };

      try {
        if (
          access.value &&
          status.value == "Возвращена на корректировку" &&
          !commentUser.value &&
          !commentListener.value &&
          !commentOrder.value
        ) {
          store.dispatch("setMessage", {
            value: "Необходимо добавить хотя бы один комментарий",
            type: "danger",
          });
        } else if (
          access.value &&
          status.value == "Возвращена на корректировку" &&
          (commentUser.value || commentListener.value || commentOrder.value)
        ) {
          await store.dispatch("orderTraining/update", { value, id });

          router.push("/orders-training-nk");
        } else if (
          access.value &&
          status.value == "Идёт обучение" &&
          (commentUser.value || commentListener.value || commentOrder.value)
        ) {
          store.dispatch("setMessage", {
            value: "Невозможно начать обучение, не устранены все замечания",
            type: "danger",
          });
        } else if (access.value && status.value == "Принята в работу") {
          value.commentUser = "";
          value.commentListener = "";
          value.commentOrder = "";

          await store.dispatch("orderTraining/update", { value, id });

          emit("updateSuccess");
        } else if (access.value && status.value == "Идёт обучение") {
          if (props.orderData.status == "Принята в работу") {
            await store.dispatch("orderTrainingNumbering/load");

            const numbering =
              store.getters["orderTrainingNumbering/ordersNumbering"][0];

            value.number = numbering.prefix + numbering.num;
            value.date = new Date();

            await store.dispatch("orderTraining/update", { value, id });

            await store.dispatch("orderTrainingNumbering/update", {
              prefix: numbering.prefix,
              num: +numbering.num + 1,
              id: numbering._id,
            });

            emit("updateSuccess");
          } else {
            store.dispatch("setMessage", {
              value: "Невозможно начать обучение, заявка еще не была принята",
              type: "danger",
            });
          }
        } else if (
          !access.value &&
          status.value == "Возвращена на корректировку"
        ) {
          // value.status = "Отправлена на экспертизу";

          await store.dispatch("orderTraining/update", { value, id });

          router.push("/orders-training-nk");
        } else if (!access.value && status.value == "Принята в работу") {
          value.status = "Черновик";

          await store.dispatch("orderTraining/update", { value, id });

          router.push("/orders-training-nk");
        } else if (access.value && status.value == "Черновик") {
          value.commentUser = "";
          value.commentListener = "";
          value.commentOrder = "";

          await store.dispatch("orderTraining/update", { value, id });

          router.push("/orders-training-nk");
        } else if (
          (!access.value && status.value == "Черновик") ||
          (access.value &&
            (status.value == "Отправлена на экспертизу" ||
              status.value == "Возвращена на корректировку" ||
              status.value == "Отменена"))
        ) {
          await store.dispatch("orderTraining/update", { value, id });

          router.push("/orders-training-nk");
        } else {
          await store.dispatch("orderTraining/update", { value, id });

          emit("updateSuccess");
        }
      } catch (e) {}
    });

    const sendForVerification = handleSubmit(async (values) => {
      try {
        const id = props.orderData._id;

        const value = {
          type: props.orderType,
          program: values.program,
          status: status.value,
          number: "",
          commentUser: commentUser.value,
          commentListener: commentListener.value,
          commentOrder: commentOrder.value,
          contractNumber: values.contractNumber,
          contractDate: values.contractDate,
          date: new Date(),
          listener: listenerVal.value,
          user: usersVal.value,
          ownerListener: values.listenersSelect.value,
          ownerUser: values.usersSelect.value,
        };

        await store.dispatch("orderTraining/update", { value, id });

        emit("updateSuccess");
      } catch (e) {}
    });

    return {
      access,
      loading,
      modal,
      modalType,
      modalTitle,
      currentListener,
      currentCompany,
      showModal,
      closeModal,
      onSubmit,
      update,
      updateListeners,
      updateUsers,
      sendForVerification,
      dateFormat,

      usersSelectOptions,
      usersSelectFilterFn,
      usersSelect,
      usersSelectError,
      listenersSelect,
      listenersSelectError,
      contractNumber,
      contractDate,
      cNumberError,
      cDateError,

      commentUser,
      commentListener,
      commentOrder,

      filterFn,
      abortFilterFn,
      program,
      programError,
      status,
      listenerOptions,

      listenerSelectRef,
      usersSelectRef,

      programOptionsNK: [
        {
          label:
            "Неразрушающий метод контроля качества «Визуальный и измерительный контроль» (ВИК)",
          value: "vik",
        },
        {
          label:
            "Неразрушающий метод контроля состояния «Вибродиагностический контроль» (ВД)",
          value: "vd",
        },
        {
          label:
            "Неразрушающий метод контроля состояния «Тепловой контроль» (ТК)",
          value: "tk",
        },
        {
          label:
            "Неразрушающий метод контроля качества «Капиллярный контроль» (ПВК)",
          value: "pvk",
        },
        {
          label: "Неразрушающий метод контроля качества «Течеискание» (ПВТ)",
          value: "pvt",
        },
        {
          label:
            "Неразрушающий метод контроля качества «Магнитный контроль» (МК)",
          value: "mk",
        },
        {
          label:
            "Неразрушающий метод контроля качества «Ультразвуковой контроль» (УК)",
          value: "uk",
        },
        {
          label:
            "Неразрушающий метод контроля качества «Радиографический контроль» (РК)",
          value: "rk",
        },
      ],
      programOptionsRI: [
        { label: "«Механические испытания материалов» (МИ)", value: "mi" },
      ],

      statusOptions: [
        "Отправлена на экспертизу",
        "Возвращена на корректировку",
        "Принята в работу",
        "Идёт обучение",
        "Выполнена",
        "Черновик",
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
