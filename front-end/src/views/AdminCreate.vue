<template>
  <div>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h3>Novo Administrador (Para fins de Teste)</h3>
        </div>
        <div class="card-body">
          <div v-if="hasError" class="alert alert-danger" role="alert">
            {{ hasError }}
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail">Email</label>
              <input
                v-model="email"
                class="form-control"
                type="email"
                name="email"
                id="inputEmail"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword">Senha</label>
              <input
                v-model="password"
                class="form-control"
                type="password"
                name="password"
                id="inputPassword"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <button @click="createAdmin()" class="btn btn-success btn-block">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      hasError: "",
    };
  },
  methods: {
    async createAdmin() {
      try {
        this.hasError = "";
        if (this.email == "" || this.email == " ") {
          this.hasError = "Preecha o campo de Email!";
          return;
        }
        if (this.password == "" || this.password == " ") {
          this.hasError = "Preencha o campo de Senha!";
          return;
        }

        let response = await axios.post("http://localhost:3030/admins", {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "AdminLogin" });
        console.log(response);
      } catch (err) {
        this.hasError = err.response.data.error;
      }
    },
  },
};
</script>

<style>
</style>