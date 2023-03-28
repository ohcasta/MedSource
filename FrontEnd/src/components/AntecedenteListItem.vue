<template>
  <div
    class="border border-2 border-primary m-3 p-3"
    style="border-radius: 25px"
  >
    <div class="row row-cols-auto justify-content-evenly">
      <div class="col">
        <h4>Antecedente</h4>
        <p>{{ antecedente.record_name }}</p>
        <h4>Calse de antecedente</h4>
        <p>{{ antecedente.record_kind }}</p>
        <h4>Tipo de antecedente</h4>
        <p>{{ antecedente.record_sort }}</p>
      </div>
      <div class="col">
        <h4>Paciente</h4>
        <p>{{ antecedente.patient_name }}</p>
        <h4>Identificación del paciente</h4>
        <p>{{ antecedente.patient_identification }}</p>
        <a
          type="button"
          class="btn-floating btn-sm purple-gradient"
          v-on:click="editar(antecedente.id)"
        >
          <i class="fas fa-edit fa-2x"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AntecedenteListItem",

  props: {
    antecedente: Object,
  },

  methods: {
    editar: function(id) {
      this.$router.push({
        name: "editarVinculacionAntecedente",
        params: { id: id },
      });
    },
  },
};
</script>

<style></style>
