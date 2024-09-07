<template>
  <div class="container">


    <h1>Nueva Denuncias</h1>

    <div class="add-plums">
      <contract-form
        contractName="Complaints"
        method="addComplaint"
        :placeholders="['Ingrese su queja y/o denuncia']"
        buttonTitle="Enviar Queja"
      />
    </div>


  </div>
</template>

<style>

.container{
  text-align: left !important;
}



</style>

<script>

import { mapGetters } from "vuex"
import ContractForm from '../components/contract-form'

export default {
  name: 'HelloWorld',

  components: {
    ContractForm,
  },

  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),

    utils() {
      return this.drizzleInstance.web3.utils
    },

  },

  data () {
    return{
      addresUser:'',
    }
      
  },
  methods:{

     
  },

  mounted() {


    this.addresUser = this.drizzleInstance.web3.eth.accounts;

    console.log(this.drizzleInstance.web3.eth.accounts );
  },


  created() {

  }
};
</script>
