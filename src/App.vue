<template>
  <v-app v-if="isDrizzleInitialized" >
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-toolbar-title>
        <router-link to="/">Home</router-link>


      </v-toolbar-title>

      <router-link to="/balance">Balance</router-link>





      <v-spacer></v-spacer>

      <v-btn
        href="#"
        text
        @click="copyUrl(addresUser)"
      >
        <span class="mr-2"><drizzle-account units="ether"/></span>
        <v-icon>fa-copy</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      
      <notifications group="foo" />
  

      <router-view/>
    </v-main>
  </v-app>
  <v-app v-else class="loading-screen">
    <div class="loading-title">
      <div class="spinner-grow" role="status">
        <span class="sr-only"></span>
      </div>
      <h3>Esperando Billetera... {{isDrizzleInitialized}} </h3>
    </div>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.loading-screen{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.router-link-active{
  color: white !important;
  text-decoration: none !important;
}


v-main{
  text-align: left !important;
}

</style>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'App',

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
      accountArray:[
        '0x454b9EE4D89B825FFAaf1Af6759151a2b17485c7'
      ]
    }
      
  },
  methods:{
    copyUrl(addresUser){
      navigator.clipboard.writeText(addresUser);
      console.log('copied');
    }

     
  },

  mounted() {

  },


  created() {

  }
};
</script>
