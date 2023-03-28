<template>
  <div class="card my-4" v-if="!paidFor">
    <h4 class="default-title" v-if="!paidFor">
      Si Deseas colaborar con este proyecto, puedes donar aquí:
      <div class="form-group text-left ">
        <currency-input
          class="form-control"
          v-model="value"
          :options="{ currency: 'USD', locale: 'en-US' }"
        />
      </div>
    </h4>
    <div v-if="paidFor">
      <h1>Muchas gracias por apoyarnos.</h1>
      <button class="btn btn-primary" v-on:click="reset()">
        Donar Nuevamente
      </button>
    </div>
    <div v-if="!paidFor" ref="paypal"></div>
  </div>
</template>

<script>
import CurrencyInput from "./CurrencyInput.vue";

export default {
  components: { CurrencyInput },
  name: "Donations",
  data: function() {
    return {
      loaded: false,
      paidFor: false,
      value: 1,
    };
  },
  mounted: function() {
    this.makePaypal();
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Tus Donaciones nos ayudan a crecer",
                  amount: {
                    currency_code: "USD",
                    value: this.value,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
    makePaypal: function() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AcSpa0IKKRm2X6Nr_az7rsuxPIkEJ-bMGE0Rxk55uz4GCj_JCNETFZLeCYj9iovf_4-ivc-Kz4bsJu0x";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    reset: function() {
      this.loaded = false;
      this.paidFor = false;
      this.value = 1;
      this.makePaypal();
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
