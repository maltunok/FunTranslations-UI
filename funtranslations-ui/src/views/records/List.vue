<script setup>
import { storeToRefs } from "pinia";

import { useRecordsStore } from "@/stores";

const recordsStore = useRecordsStore();
const { records } = storeToRefs(recordsStore);

recordsStore.getAll();
</script>

<template>
  <h1>Request Response Records</h1>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>RequestUrl</th>
        <th>ResponseCode</th>
        <th>RequestedText</th>
        <th>TranslatedText</th>
        <th>ResponseText</th>
        <th>CreatedDate</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="records.data">
        <tr v-for="record in records.data" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.requestUrl }}</td>
          <td>{{ record.responseCode }}</td>
          <td>{{ record.requestedText }}</td>
          <td>{{ record.translatedText }}</td>
          <td>{{ record.responseText }}</td>
          <td>{{ record.createdDate }}</td>
        </tr>
      </template>
      <tr v-if="records.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
      <tr v-if="records.error">
        <td colspan="4">
          <div class="text-danger">
            Error loading records: {{ records.error }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
