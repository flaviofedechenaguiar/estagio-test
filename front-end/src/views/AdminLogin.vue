<template>
  <div class="body">
    <div class="container mt-3">
      <div class="text-center">
        <h1 class="h3 mb-3 font-weight-normal">Login de Administrador</h1>
      </div>
      <div v-if="hasError" class="alert alert-danger" role="alert">
        {{ hasError }}
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
      <div class="form-row">
        <button
          @click="loginAdmin()"
          class="btn btn-lg btn-primary btn-block entrar"
        >
          Entrar
        </button>
      </div>
      <div class="form-row mt-5">
        <a @click="redirectToAdminCreate()" class="link-center"
          >Novo Administrador (Somente para fins de testes)</a
        >
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
    loginAdmin: async function () {
      try {
        if (this.email == "" || this.email == " ") {
          this.hasError = "Preencha o campo de email!";
          return;
        }
        if (this.password == "" || this.password == " ") {
          this.hasError = "Preecha o campo de senha!";
          return;
        }

        let response = await axios.post("http://localhost:3030/admins/login", {
          email: this.email,
          password: this.password,
        });
        let token = response.data.token;
        localStorage.setItem("token", token);
        this.$router.push({ name: "AdminPanel" });
      } catch (err) {
        console.log(err.response);
        this.hasError = err.response.data.message;
      }
    },
    redirectToAdminCreate: function () {
      this.$router.push({ name: "AdminCreate" });
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

.link-center {
  margin-right: auto;
  margin-left: auto;
}

.entrar {
  margin-top: 1.5em;
  background-color: green;
  border-color: greenyellow;
}
</style>

