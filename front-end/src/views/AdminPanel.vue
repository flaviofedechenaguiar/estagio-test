<template>
  <div>
    <div class="container mt-3">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <h4>Filtros</h4>
          </div>
          <div class="row">
            <div class="col col-md-3">
              <label for="inputName">Nome</label>
              <div class="d-flex flex-row">
                <input
                  v-model="inputName"
                  @input="changeInputName()"
                  class="form-control"
                  type="text"
                  id="inputName"
                />
                <button
                  @click="findByName()"
                  class="btn btn-primary btn-sm ml-1"
                >
                  <b-icon-search />
                </button>
              </div>
            </div>
            <div class="col col-md-3">
              <label for="selectSex">Sexo</label>
              <div class="d-flex flex-row">
                <select
                  @change="findBySex()"
                  v-model="inputSex"
                  class="form-control"
                  name="sex"
                  id="selectSex"
                >
                  <option value="" selected>Todos</option>
                  <option value="1">Masculino</option>
                  <option value="0">Feminino</option>
                </select>
              </div>
            </div>
            <div class="col col-md-3">
              <label for="selectState">Estado</label>
              <div class="d-flex flex-row">
                <select
                  @change="findByState()"
                  v-model="inputState"
                  class="form-control"
                  name="state"
                  id="selectState"
                >
                  <option value="">Todos</option>
                  <option
                    v-for="state in states"
                    :key="state.uf"
                    :value="state.uf"
                  >
                    {{ state.state }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col col-md-3">
              <label for="inputCreated">Cadastro</label>
              <div class="form-group d-flex flex-row">
                <input
                  v-model="inputDate"
                  class="form-control"
                  type="date"
                  id="inputCreated"
                />
                <button
                  @click="findByDate()"
                  class="btn btn-primary btn-sm ml-1"
                >
                  <b-icon-search />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Criado em</th>
                  <th scope="col">Opções</th>
                </tr>
              </thead>
              <tbody>
                <Client
                  v-for="client in clients"
                  :key="client.id"
                  :client="client"
                  @editClient="editClient($event)"
                  @deleteClient="deleteClient($event)"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Client from "./Client.vue";
import axios from "axios";
export default {
  data() {
    return {
      axiosConfig: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      states: [
        { uf: "AC", state: "Acre" },
        { uf: "AL", state: "Alagoas" },
        { uf: "AP", state: "Amapá" },
        { uf: "AM", state: "Amazonas" },
        { uf: "BA", state: "Bahia" },
        { uf: "CE", state: "Ceará" },
        { uf: "DF", state: "Distrito Federal" },
        { uf: "ES", state: "Espírito Santo" },
        { uf: "GO", state: "Goías" },
        { uf: "MA", state: "Maranhão" },
        { uf: "MT", state: "Mato Grosso" },
        { uf: "MS", state: "Mato Grosso do Sul" },
        { uf: "MG", state: "Minas Gerais" },
        { uf: "PA", state: "Pará" },
        { uf: "PB", state: "Paraíba" },
        { uf: "PR", state: "Paraná" },
        { uf: "PE", state: "Pernambuco" },
        { uf: "PI", state: "Piauí" },
        { uf: "RJ", state: "Rio de Janeiro" },
        { uf: "RN", state: "Rio Grande do Norte" },
        { uf: "RS", state: "Rio Grande do Sul" },
        { uf: "RO", state: "Rondônia" },
        { uf: "RR", state: "Roraíma" },
        { uf: "SC", state: "Santa Catarina" },
        { uf: "SP", state: "São Paulo" },
        { uf: "SE", state: "Sergipe" },
        { uf: "TO", state: "Tocantins" },
      ],
      clients: Object,
      inputName: "",
      inputSex: "",
      inputState: "",
      inputDate: "",
    };
  },
  methods: {
    editClient(event) {
      try {
        this.$router.push({
          name: "AdminClientEdit",
          params: { id: event.id },
        });
        console.log(event.id);
      } catch (err) {
        console.log(err.response);
      }
    },
    async deleteClient(event) {
      try {
        let isConfirmed = window.confirm("Deseja deletar este usuário?");
        if (isConfirmed) {
          await axios.delete(
            `http://localhost:3030/admins/clients/${event.id}`,
            this.axiosConfig
          );
          let returnedIndex = this.clients.findIndex((c) => c.id == event.id);
          this.clients.splice(returnedIndex, 1);
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    async findByName() {
      try {
        if (this.inputName != "") {
          let response = await axios.get(
            `http://localhost:3030/admins/clients?name=${this.inputName}`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        }
      } catch (err) {
        this.$router.push({ name: "AdminLogin" });
      }
    },
    async findBySex() {
      try {
        if (this.inputSex != "") {
          let response = await axios.get(
            `http://localhost:3030/admins/clients?sex=${this.inputSex}`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        } else {
          let response = await axios.get(
            `http://localhost:3030/admins/clients`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        }
      } catch (err) {
        this.$router.push({ name: "AdminLogin" });
      }
    },
    async findByState() {
      try {
        if (this.inputState != "") {
          let response = await axios.get(
            `http://localhost:3030/admins/clients?state=${this.inputState}`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        } else {
          let response = await axios.get(
            `http://localhost:3030/admins/clients`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        }
      } catch (err) {
        this.$router.push({ name: "AdminLogin" });
      }
    },
    async findByDate() {
      try {
        if (this.inputDate != "") {
          console.log(this.inputDate);
          let response = await axios.get(
            `http://localhost:3030/admins/clients?createdDate=${this.inputDate}`,
            this.axiosConfig
          );
          this.inputDate = "";
          this.clients = response.data.clients;
          console.log(response.data);
        } else {
          let response = await axios.get(
            `http://localhost:3030/admins/clients`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        }
      } catch (err) {
        this.$router.push({ name: "AdminLogin" });
      }
    },
    async changeInputName() {
      try {
        if (this.inputName == "") {
          let response = await axios.get(
            `http://localhost:3030/admins/clients?name=${this.inputName}`,
            this.axiosConfig
          );
          this.clients = response.data.clients;
        }
      } catch (err) {
        this.$router.push({ name: "AdminLogin" });
      }
    },
  },
  async created() {
    try {
      let response = await axios.get(
        "http://localhost:3030/admins/clients",
        this.axiosConfig
      );
      this.clients = response.data.clients;
      console.log(response);
    } catch (err) {
      this.$router.push({ name: "AdminLogin" });
    }
  },
  components: {
    Client,
  },
};
</script>

<style>
</style>