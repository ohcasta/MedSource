<template>
  <div class="contenedor">
    <img
      src="../assets/images/home_image.jpg"
      style=" height:90%; width:100%"
    />
    <div class="centrado">
      <h1 class="default-title">Bienvenidos a <br />Medsource</h1>
    </div>
  </div>
  <div class="row row-cols-2 justify-content-evenly" style="">
    <div class="col-11 col-md-5 my-3">
      <div class="card">
        <img
          src="../assets/images/doctor_1.jpg"
          alt="Avatar"
          style="width:100%"
        />
        <div class="card-body">
          <h4 class="default-title"><b>Meta</b></h4>
          <h6>
            <p>
              Desarrollar una plataforma que permita llevar el almacenamiento y
              control de la información relacionada con los pacientes de las
              diferentes entidades prestadoras de salud (EPS) del país
            </p>
          </h6>
        </div>
      </div>
    </div>
    <div class="col-11 col-md-5 my-3">
      <div class="card">
        <img
          src="../assets/images/doctor_1.jpg"
          alt="Avatar"
          style="width:100%"
        />
        <div class="card-body">
          <h4 class="default-title"><b>Acerca de Medsource</b></h4>
          <h6>
            <p>
              Los médicos y enfermeros podrán ingresar todos los datos
              relacionados a los pacientes, con sus respectivos antecedentes, y
              en adición, registrar los diferentes datos que se toman durante
              las consultas médicas, y los procedimientos quirúrgicos
            </p>
          </h6>
        </div>
      </div>
    </div>
    <div class="col-11">
      <donations />
    </div>
  </div>
</template>

<script>
import Donations from "@/components/Donations.vue";

export default {
  components: { Donations },
  name: "Home",

  data: function() {
    return {
      bienvenida: "Bienvenid@ a MedSource",
    };
  },

  created: function() {},
};
</script>

<style>
* {
  box-sizing: border-box;
}
.column {
  float: left;
  width: 33%;
  padding: 0 0px;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}
</style>
