<template>
  <div>
    <div class="container mt-3">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Login de Cliente</h1>
      </div>
      <div
        v-if="responseError.length > 0"
        class="alert alert-danger text-center"
        role="alert"
      >
        {{ responseError }}
      </div>
      <div class="form-label-group email">
        <label for="inputEmail">Email</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email"
          required
          autofocus
          v-model="email"
        />
      </div>

      <div class="form-label-group senha">
        <label for="inputPassword">Senha</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Senha"
          required
          v-model="password"
        />
      </div>

      <button
        @click="loginClient()"
        class="btn btn-lg btn-primary btn-block entrar"
      >
        Entrar
      </button>
      <button
        @click="createClient()"
        class="btn btn-lg btn-success btn-block entrar"
      >
        Novo Cliente
      </button>
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
      responseError: "",
    };
  },
  methods: {
    loginClient: async function () {
      if (this.email == "" || this.email == " ") {
        this.responseError = "Preencha o campo email!";
        return;
      } else {
        this.responseError = "";
      }
      try {
        let isSuccess = await axios.post(
          "http://localhost:3030/clients/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        let token = isSuccess.data.token;
        localStorage.setItem("token", token);
        this.$router.push({ name: "EditClient" });
      } catch (err) {
        console.log(err.response);
        this.responseError = err.response.data.error;
      }
    },
    createClient() {
      this.$router.push({ name: "CreateClient" });
    },
  },
};
</script>

<style>
@media only screen and (min-width: 600px) {
  .email,
  .senha,
  .entrar {
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

.entrar {
  margin-top: 1.5em;
}
</style>
