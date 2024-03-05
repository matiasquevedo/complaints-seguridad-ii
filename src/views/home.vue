<template>
  <div>
    <ComplaintsForm/>
    
    <Balance/>

    
  </div>
</template>

<script>

  import ComplaintsForm from '../components/ComplaintsForm'
  import Balance from '../components/balance'

  export default {
    name: 'Home',

    components: {
      ComplaintsForm,
      Balance
    },


    mounted() {



    },


    created() {



    }
  }
</script>
