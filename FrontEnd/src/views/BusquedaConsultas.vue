<template>
    <div class="container mt-4 text-center">
        <div class="col">
            <h2 class="default-title">Buscar consultas</h2>
            <form class="mt-3" v-on:submit.prevent="processSignUp">
                <div class="ml-auto mr-auto col-12 col-md-6">
                    <div class="form-group text-left">
                        <input class="form-control"
                               placeholder="Nombre del paciente"
                               type="text"
                               v-model="consultation.patient" />
                    </div>
                    <div class="form-group text-left">
                        <input class="form-control"
                               placeholder="Identificación del médico"
                               type="number"
                               v-model="consultation.doctor" />
                    </div>
                    <div class="form-group text-left">
                        <input class="form-control"
                               placeholder="Nombre del hospital"
                               type="text"
                               v-model="consultation.hospital" />
                    </div>
                </div>
                <div v-if="consultations.length != 0"
                     class="row justify-content-center">
                    <div class="col-auto">
                        <div class="table table-hover card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Paciente</th>
                                                <th>Medico</th>
                                                <th>Hospital</th>
                                                <th>Pulso</th>
                                                <th>Altura</th>
                                                <th>Peso</th>
                                                <th>Pa</th>
                                                <th>Pr</th>
                                                <th>T</th>
                                                <th>Medicacion</th>
                                                <th>Sintomas</th>
                                                <th>Diagnostico</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="consultation in consultations"
                                                      :key="consultation.id">
                                                <tr>
                                                    <td>
                                                        {{ consultation.id }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.patient }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.doctor }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.hospital }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.pulse }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.height }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.weight }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.pa }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.pr }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.t }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.medication }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.symptom }}
                                                    </td>
                                                    <td>
                                                        {{ consultation.diagnosis }}
                                                    </td>
                                                    <td>
                                                        <a
                                                        type="button"
                                                        class="btn-floating btn-sm purple-gradient"
                                                        v-on:click="editar(consultation.id)"
                                                        >
                                                        <i class="fas fa-edit fa-lg"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit"
                        class="btn m-1 btn-primary"
                        v-on:click="searchConsultation">
                    Buscar Consultas
                </button>
                <button type="button"
                        class="btn m-1 btn-primary"
                        v-on:click="goBackHome">
                    Volver
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { useStore } from '@/state';
    import { alert } from "../scripts/utils.js";
    export default {
      name: "BusquedaConsulta",
      data: function () {
        return {
          consultation: {
            patient: "",
            doctor: null,
            hospital: "",
          },
          consultations: [],
        };
      },
      methods: {
        goBackHome: function () {
          this.$router.push({ name: "home" });
        },
        searchConsultation: function () {
          axios
            .get(this.store.state.backURL + "/mostrar_consultas/", {
              params: {
                patient: this.consultation.patient,
                doctor: this.consultation.doctor,
                hospital: this.consultation.hospital,
              },
            })
            .then((response) => {
              this.consultations = response.data;
            })
            .catch((error) => {
              if (error.response.status == 404)
                alert("No se obtuvieron resultados para tu búsqueda", "warning");
              else alert("Ocurrió un error en el servidor", "danger");
            });
        },
        editar: function(id) {
            this.$router.push({ name: "editarConsulta", params: { id: id } });
        },
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>