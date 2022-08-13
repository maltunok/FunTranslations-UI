<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRecordsStore } from "@/stores";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

const schema = Yup.object().shape({
  text: Yup.string().required("Text is required"),
  apitype: Yup.string().required("ApiType is required"),
});

const recordsStore = useRecordsStore();
const { record } = storeToRefs(recordsStore);
const usersalute = JSON.parse(localStorage.getItem("username"));

const apitypes = ref([
  { text: "Leetspeak", value: "leetspeak" },
  { text: "Irish", value: "irish" },
  { text: "Dothraki", value: "dothraki" },
]);

async function onSubmit(values) {
  const recordsStore = useRecordsStore();
  const { text, apitype } = values;
  await recordsStore.get(text, apitype);
}
</script>

<template>
  <div>
    <h1>Hi {{ usersalute }}!</h1>
  </div>
  <div class="card m-3">
    <h5 v-if="!record.data" class="card-header">
      please enter a text to translate, enter a translater and hit the submit
      button
    </h5>
    <h5 v-else class="card-header">
      The translated text is: {{ record.data.contents.translated }}
    </h5>
    <div class="card-body">
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-group">
          <label>Text</label>
          <Field
            name="text"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.text }"
          />
          <div class="invalid-feedback">{{ errors.text }}</div>
        </div>
        <div class="form-group">
          <label>Translater</label>
          <Field
            name="apitype"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.apitype }"
            placeholder="leetspeak, dothraki, irish...."
          />
          <div class="invalid-feedback">{{ errors.apitype }}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Submit
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
