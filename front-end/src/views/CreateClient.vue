<template>
  <div>
    <div class="container mt-3">
      <div class="card">
        <div class="card-header">
          <h3>Novo Cliente</h3>
        </div>
        <div class="card-body">
          <div v-if="hasError" class="alert alert-danger" role="alert">
            {{ hasError }}
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputName">Nome</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Nome"
                v-model="name"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="inputCpf">CPF</label>
              <input
                type="text"
                class="form-control"
                id="inputCpf"
                placeholder="999.999.999-99"
                v-model="cpf"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="inputRg">RG</label>
              <input
                type="text"
                class="form-control"
                id="inputRg"
                placeholder="999.999.999-99"
                v-model="rg"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="inputNascimento">Nascimento</label>
              <input
                type="date"
                class="form-control"
                id="inputNascimento"
                v-model="birth"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="sexo">Sexo</label>
              <select id="sexo" class="form-control" v-model="sex">
                <option value="" selected>Escolher...</option>
                <option value="0">Feminino</option>
                <option value="1">Masculino</option>
              </select>
            </div>

            <div class="form-group col-md-2">
              <label for="ddCellPhone">DD Celular</label>
              <input
                type="text"
                class="form-control"
                id="ddCellPhone"
                placeholder="99"
                v-model="ddCellPhone"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="numberCellPhone">Celular</label>
              <input
                type="text"
                class="form-control"
                id="numberCellPhone"
                placeholder="98888-9999"
                v-model="numberCellPhone"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="ddPhone">DD Tel.</label>
              <input
                type="text"
                class="form-control"
                id="ddPhone"
                placeholder="99"
                v-model="ddPhone"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="numberPhone">Telefone</label>
              <input
                type="text"
                class="form-control"
                id="numberPhone"
                placeholder="98888-9999"
                v-model="numberPhone"
              />
            </div>

            <div class="form-group col-md-2">
              <label for="status">Status</label>
              <select id="status" class="form-control" v-model="status">
                <option value="1" selected>Ativo</option>
                <option value="0">Inativo</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="password">Senha</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Senha"
                v-model="password"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="zipCode">CEP</label>
              <input
                @change="findZipCode()"
                type="text"
                class="form-control"
                id="zipCode"
                v-model="zipCode"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="address">Endereço</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Rua dos Bobos, nº 0"
                v-model="address"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="district">Bairro</label>
              <input
                type="text"
                class="form-control"
                id="district"
                v-model="district"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="number">Numero</label>
              <input
                type="number"
                class="form-control"
                id="number"
                v-model="number"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Cidade</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                v-model="city"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputEstado">Estado</label>
              <select id="inputEstado" class="form-control" v-model="state">
                <template v-for="localState in states">
                  <option
                    v-if="localState.uf == state"
                    :value="localState.uf"
                    :key="localState.uf"
                    selected
                  >
                    {{ localState.state }}
                  </option>
                  <option v-else :value="localState.uf" :key="localState.uf">
                    {{ localState.state }}
                  </option>
                </template>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="complement">Complemento</label>
              <input
                type="text"
                class="form-control"
                id="complement"
                v-model="complement"
              />
            </div>
          </div>
          <button
            @click="createClient()"
            type="submit"
            class="btn btn-success w-100"
          >
            Criar
          </button>
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
      name: "",
      cpf: "",
      rg: "",
      birth: "",
      sex: "",
      ddCellPhone: "",
      numberCellPhone: "",
      ddPhone: "",
      numberPhone: "",
      status: "1",
      email: "",
      password: "",
      complement: "",
      city: "",
      state: "",
      address: "",
      district: "",
      number: "",
      zipCode: "",
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
      hasError: "",
    };
  },
  methods: {
    async findZipCode() {
      try {
        if (this.zipCode.length < 8 || this.zipCode.length > 9) {
          return;
        }
        let findedAddress = await axios.get(
          `https://viacep.com.br/ws/${this.zipCode}/json/`
        );
        if (!findedAddress.data.erro) {
          let response = findedAddress.data;
          this.address = response.logradouro;
          this.district = response.bairro;
          this.city = response.localidade;
          this.state = response.uf;
        } else {
          this.address = "";
          this.district = "";
          this.city = "";
          this.state = "";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async createClient() {
      try {
        if (this.name == "" || this.name == " ") {
          return (this.hasError = "Preecha o campo de nome!");
        }
        if (this.cpf == "" || this.cpf == " ") {
          return (this.hasError = "Preecha o campo de CPF!");
        }
        if (this.rg == "" || this.rg == " ") {
          return (this.hasError = "Preencha o campo de RG!");
        }
        if (this.birth == "" || this.birth == " ") {
          return (this.hasError = "Preencha o campo Data de Nascimento!");
        }
        if (this.sex == "" || this.sex == " ") {
          return (this.hasError = "Preencha o campo de Sexo!");
        }
        if (this.ddCellPhone == "" || this.ddCellPhone == " ") {
          return (this.hasError = "Preecha o campo de DD Celular");
        }
        if (this.numberCellPhone == "" || this.numberCellPhone == " ") {
          return (this.hasError = "Prencha o campo de Celular");
        }

        await axios.post("http://localhost:3030/clients", {
          name: this.name,
          birth: this.birth,
          cpf: this.cpf,
          rg: this.rg,
          sex: this.sex,
          zipCode: this.zipCode,
          address: this.address,
          number: this.number,
          district: this.district,
          complement: this.complement,
          state: this.state,
          city: this.city,
          email: this.email,
          password: this.password,
          status: this.status,
          ddPhone: this.ddPhone,
          numberPhone: this.numberPhone,
          ddCellPhone: this.ddCellPhone,
          numberCellPhone: this.numberCellPhone,
        });
        //this.$router.push({ name: "LoginClient" });
      } catch (err) {
        let response = err.response.data;
        this.hasError = response.error;
        console.log(err.response.data);
      }
    },
  },
};
</script>

<style>
</style>