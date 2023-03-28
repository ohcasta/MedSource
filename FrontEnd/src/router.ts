import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuth } from "@/services/login";
import Home from "./views/Home.vue";
import RegistroMedico from "./views/RegistroMedico.vue";
import RegistroEnfermero from "./views/RegistroEnfermero.vue";
import RegistroDesarrolloProcedimiento from "./views/RegistroDesarrolloProcedimiento.vue";
import RegistroPaciente from "./views/RegistroPaciente.vue";
import RegistroConsulta from "./views/RegistroConsulta.vue";
import Login from "./views/Login.vue";
import RecuperarContrasena from "./views/RecuperarContrasena.vue";
import RegistroProcedimiento from "./views/RegistroProcedimiento.vue";
import RegistroAntecedente from "./views/RegistroAntecedente.vue";
import VinculacionAntecedente from "./views/RegistroPacienteAntecedente.vue";
import BusquedaPaciente from "./views/BusquedaPacientes.vue";
import BusquedaDesarrollo from "./views/BusquedaDesarrollos.vue";
import BusquedaProcedimiento from "./views/BusquedaProcedimientos.vue";
import VistaAsignacionAntecedentes from "@/views/VistaAsignacionAntecedente.vue";
import BusquedaAntecedente from "./views/BusquedaAntecedentes.vue";
import BusquedaMedico from "./views/BusquedaMedicos.vue";
import BusquedaEnfermero from "./views/BusquedaEnfermeros.vue";
import BusquedaConsulta from "./views/BusquedaConsultas.vue";
import EditarDesarrollo from "./views/EditarDesarrollo.vue";
import EdicionConsulta from "./views/EdicionConsulta.vue";

import EdicionAntecedente from "./views/EdicionAntecedente.vue";
import EdicionVinculacionAntecedente from "./views/EdicionVinculacionAntecedente.vue";
import EditarPaciente from "./views/EditarPaciente.vue";
import EditarProcedimiento from "./views/EditarProcedimiento.vue";
import Descarga from "./views/DescargaLabor.vue";

import { MutationTypes, useStore } from "./state";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: "home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isFree: true,
    },
  },
  {
    path: "/recuperarcontrasena/:token",
    name: "cambioContrasena",
    component: RecuperarContrasena,
    meta: {
      isFree: true,
    },
  },
  {
    path: "/recuperarcontrasena",
    name: "cambioContrasenaEmail",
    component: RecuperarContrasena,
    meta: {
      isFree: true,
    },
  },
  {
    path: "/medico",
    name: "medico",
    redirect: "home",
  },
  {
    path: "/registro/medico",
    name: "medicoregistro",
    component: RegistroMedico,
    meta: {
      isFree: true,
    },
  },
  {
    path: "/enfermero",
    name: "enfermero",
    redirect: "home",
  },
  {
    path: "/registro/enfermero",
    name: "enfermeroregistro",
    component: RegistroEnfermero,
    meta: {
      isFree: true,
    },
  },
  {
    path: "/registro/desarrollo",
    name: "desarrolloregistro",
    component: RegistroDesarrolloProcedimiento,
  },
  {
    path: "/registro/paciente",
    name: "pacienteregistro",
    component: RegistroPaciente,
  },
  {
    path: "/pacientes",
    name: "pacientebusqueda",
    component: BusquedaPaciente,
  },
  {
    path: "/registro/procedimiento",
    name: "procedimientoregistro",
    component: RegistroProcedimiento,
  },
  {
    path: "/registro/antecedente",
    name: "antecedenteregistro",
    component: RegistroAntecedente,
  },
  {
    path: "/vinculacion/antecedente",
    name: "antecedentevinculacion",
    component: VinculacionAntecedente,
  },
  {
    path: "/registro/consulta",
    name: "consultaregistro",
    component: RegistroConsulta,
  },
  {
    path: "/desarrollos",
    name: "desarrollobusqueda",
    component: BusquedaDesarrollo,
  },
  {
    path: "/procedimientos",
    name: "procedimientobusqueda",
    component: BusquedaProcedimiento,
  },
  {
    path: "/antecedentesPaciente",
    name: "antecedentesPaciente",
    component: VistaAsignacionAntecedentes,
  },
  {
    path: "/antecedentes",
    name: "antecedentebusqueda",
    component: BusquedaAntecedente,
  },
  {
    path: "/medicos",
    name: "medicobusqueda",
    component: BusquedaMedico,
  },
  {
    path: "/enfermeros",
    name: "enfermerobusqueda",
    component: BusquedaEnfermero,
  },
  {
    path: "/consultas",
    name: "consultabusqueda",
    component: BusquedaConsulta,
  },
  {
    path: "/editarDesarrollo/:id",
    component: EditarDesarrollo,
    name: "editarDesarrollo",
    props: true,
  },
  {
    path: "/editarAntecedente/:id",
    component: EdicionAntecedente,
    name: "editarAntecedente",
    props: true,
  },
  {
    path: "/editarConsulta/:id",
    component: EdicionConsulta,
    name: "editarConsulta",
    props: true,
  },
  {
    path: "/editarVinculacionAntecedente/:id",
    component: EdicionVinculacionAntecedente,
    name: "editarVinculacionAntecedente",
    props: true,
  },
  {
    path: "/editarPaciente/:identification",
    component: EditarPaciente,
    name: "editarPaciente",
    props: true,
  },
  {
    path: "/editarProcedimiento/:id",
    component: EditarProcedimiento,
    name: "editarProcedimiento",
    props: true,
  },
  {
    path: "/descargaLabor",
    component: Descarga,
    name: "DescargaLabor",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!(to.meta.isFree || false)) {
    if (isAuth()) {
      next();
    } else {
      useStore().commit(MutationTypes.LOGOUT);
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
