<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Consulta con Id: {{id}}</h2>
      <form v-on:submit.prevent="processSignUp" class="text-left">
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input
            class="form-control"
            placeholder="Documento del Paciente"
            type="number"
            readonly
            v-model="consulta.identification_patient"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Numero de Documento del Doctor</label>
          <input
            class="form-control"
            placeholder="Documento del Doctor"
            type="number"
            readonly
            v-model="consulta.identification_doctor"
          />
        </div>
        <div class="form-group">
          <label for="">Pulso</label>
          <input
            class="form-control"
            type="number"
            v-model="consulta.pulse"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Altura</label>
          <input
            type="number"
            class="form-control"
            v-model="consulta.height"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Peso</label>
          <input
            type="number"
            class="form-control"
            v-model="consulta.peso"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Pa</label>
          <input
            type="number"
            class="form-control"
            v-model="consulta.pa"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Pr</label>
          <input
            type="number"
            class="form-control"
            v-model="consulta.pr"
          />
        </div>
        <div class="form-group text-left">
          <label for="">T</label>
          <input
            type="number"
            class="form-control"
            v-model="consulta.t"
          />
        </div>
        <div class="form-group text-left">
            <label for="">Medicamentos</label><br />
            <textarea class="form-control" v-model="consulta.medication"></textarea>
        </div>
        <div class="form-group text-left">
            <label for="">Sintoma</label><br />
            <textarea class="form-control" v-model="consulta.symptom"></textarea>
        </div>
        <div class="form-group text-left">
            <label for="">Diagnostico</label><br />
            <textarea class="form-control" v-model="consulta.diagnosis"></textarea>
        </div>
        <div class="col-12 col-md-6 form-group text-left">
            <label for="">Hospital</label>
            <select class="custom-select" required v-model="consulta.hospital.id">
                <option disabled value="">Seleccione un Hospital</option>
                <option v-for="hospital in hospitales" :key="hospital" :value="hospital.id">
                    {{ hospital.name }}
                </option>
            </select>
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
    import { useStore } from "@/state";
    import { alert } from "../scripts/utils.js";

    export default {
    name: "EditarConsulta",
    props: ["id"],
    data: function() {
        return {
            consulta: {
                identification_doctor: null,
                identification_patient:null,
                pulse: null,
                height: null,
                weight: null,
                pa: null,
                pr: null,
                t: null,
                medication: "",
                symptom: "",
                diagnosis: "",
                hospital: { id: null, name: null }, // así llega desde el backend
                idHospital: null // así se envía desde el frontend
            },
            
            hospitales: [],
        };
    },
    methods: {
        goBack: function() {
            this.$router.push({ name: "consultabusqueda" });
        },
        processSignUp: function () {
            this.consulta.id_hospital = this.consulta.hospital.id // para que coincida con lo que solicita el back para actualizar
   
        axios
            .put(
            this.store.state.backURL + "/consultas/RUD/" + this.id,
            this.consulta
            )
            .then((result) => {
            alert("La consulta ha sido actualizada con éxito", "success");
            this.goBack();
            })
            .catch((error) => {
            console.log(error.response);
            alert("Ocurrió un error actualizando la consulta", "danger");
            });
        },
        loadRecord: function() {
        axios
            .get(this.store.state.backURL + "/consultas/RUD/" + this.id )
            .then((result) => {
            
                console.log(result.data)
            this.consulta = result.data;
            this.consulta.identification_doctor = this.consulta.doctor.identification
            this.consulta.identification_patient = this.consulta.patient.identification
            })
            .catch((error) => {
            console.log(error.response);
            alert("Ocurrió un error cargando el consulta", "danger");
            });
        },
        gethospitales: function () {
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
    created() {
        this.gethospitales();
        this.loadRecord();
        
    },
    setup() {
        const store = useStore();
        return { store };
    },
    };
</script>