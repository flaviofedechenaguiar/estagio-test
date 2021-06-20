<template>
  <tr>
    <th scope="row">{{ client.id }}</th>
    <td>{{ client.name }}</td>
    <td>{{ client.createdAt | date }}</td>
    <td>
      <div class="d-flex justify-content">
        <button @click="editClientEmmit()" class="btn btn-warning btn-sm">
          <b-icon-person-lines-fill />
        </button>
        <button @click="deleteClientEmmit()" class="btn btn-danger btn-sm ml-1">
          <b-icon-person-x-fill />
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    client: Object,
  },
  filters: {
    date: function (value) {
      let date = value.split("T")[0];
      let brokenDate = date.split("-");
      return `${brokenDate[2]}/${brokenDate[1]}/${brokenDate[0]}`;
    },
  },
  methods: {
    editClientEmmit() {
      this.$emit("editClient", { id: this.client.id });
    },
    deleteClientEmmit() {
      this.$emit("deleteClient", { id: this.client.id });
    },
  },
};
</script>

<style>
</style>