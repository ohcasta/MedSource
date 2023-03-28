<template>
  <div class="container text-center" ref="page">
    <button type="submit" class="btn btn-primary" v-on:click="Download">
      Descargar
    </button>
    <a id="downloadFile" style="display: none;"></a>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "@/state";
import { saveAs } from "file-saver";

export default {
  name: "Descarga",
  methods: {
    Download: function() {
      axios
        .get(this.store.state.backURL + "/descarga/labor")
        .then((response) => {
          console.log(response);
          var a = document.getElementById("downloadFile");
          a.setAttribute(
            "href",
            `data:${response.data.mimeType};base64,${response.data.file}`
          );
          a.setAttribute("download", unescape("LaborMedica.xlsx"));
          a.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
