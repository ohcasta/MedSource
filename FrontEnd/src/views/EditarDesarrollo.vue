<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Procedimiento con Id: {{id}}</h2>
      <form v-on:submit.prevent="processSignUp" class="text-left">
        <div class="form-group text-left">
            <label for="">Fecha</label>
            <input readonly class="form-control"
                   placeholder="Número de Documento del Doctor"
                   type="date" v-model="procedimiento.date"/>
        </div>
        <div class="form-group">
          <label for="">Doctor que realizó el procedimiento</label>
          <input
            class="form-control"
            readonly
            type="text"
            v-model="procedimiento.doctor"
          />
        </div>
        <div class="form-group">
          <label for="">Enfermera asistente</label>
          <input
            class="form-control"
            readonly
            type="text"
            v-model="procedimiento.nurse"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Paciente</label>
          <input
            type="text"
            class="form-control"
            readonly
            v-model="procedimiento.patient"
          />
        </div>
        <div class="form-group mb-3">
          <label for="inputGroupSelect01">Hospital</label>
          <select
            class="custom-select"
            v-model="procedimiento.hospital"
          >
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="hospital in hospitales"
              :key="hospital"
              :value="hospital.name"
            >
              {{ hospital.name }}
            </option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="inputGroupSelect00">Procedimiento</label>
          <select
            class="custom-select"
            v-model="procedimiento.procedure"
          >
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="procedimiento in procedimientos"
              :key="procedimiento"
              :value="procedimiento.name"
            >
              {{ procedimiento.name }}
            </option>
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">Numero de la Sala</label>
          <input
            class="form-control"
            placeholder="Sala"
            type="number"
            v-model="procedimiento.room"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Comentario</label><br />
          <textarea class="form-control" v-model="procedimiento.comment">
            Enter text here...
            </textarea
          >
        </div>
        <button
          type="submit"
          class="btn m-1 btn-primary"
          v-on:click="actualizar"
        >
          Actualizar Datos
        </button>
        <button
          type="button"
          class="btn m-1 btn-primary"
          v-on:click="goBack"
        >
          Volver
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useStore } from '@/state';

export default {
  name: "EditarDesarrollo",
  props: ['id'],
  data: function(){
      return{
          procedimiento: {},
          procedimientos: [],
      }
  },

  methods:{
    goBack: function () {
      this.$router.push({ name: "desarrollobusqueda" });
    },
    actualizar: function () {
      console.log(this.procedimiento);
        axios
          .put(
            this.store.state.backURL + "/editar_desarrollo/" + this.id ,
            this.procedimiento
          )
          .then((result) => {
            alert("El procedimiento ha sido actualizado con éxito", "success");
          })
          .catch((error) => {
            console.log(error.response);
            this.result = error.response.data;
            alert("Ocurrió un error registrando el procedimiento", "danger");
          });
    },
    getDevelopment: function () {
      axios
        .get(this.store.state.backURL + "/editar_desarrollo/" + this.id)
        .then((response) => {
          this.procedimiento = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener datos");
        });
    },
    getProcedimientos: function () {
      axios
        .get(this.store.state.backURL + "/procedimientos/")
        .then((response) => {
          this.procedimientos = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No se pudo conectar al servidor", "danger");
        });
    },
    getHospitales: function () {
      axios
        .get(this.store.state.backURL + "/hospital")
        .then((response) => {
          this.hospitales = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No se pudo conectar al servidor", "danger");
        });
    },
  },

  created: function () {
    this.getDevelopment();
    this.getProcedimientos();
    this.getHospitales();
  },
  setup() {
    const store = useStore();
    return { store};
  },
};
</script>
