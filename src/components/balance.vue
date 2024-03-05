
<template>
  <div class="text-left p-3 m-3">
    <h2>Lista de quejas</h2>
    <div v-for="(complaint, index) in complaints" :key="index" class="border p-2 rounded mb-3">
      <div>
        <b>Bloque: </b>{{complaint.block}} - {{formatTimestamp(complaint.date)}}
      </div>

      <div class="my-3">
        {{ complaint.text }} 
      </div>
        
      <div>
        <b>Creado por:</b> {{ complaint.creator }}
      </div>

       
      
    </div>

  </div>
</template>

<script>
import Web3 from 'web3';
import Complaints from "@/contracts/Complaints.json";

export default {
  data() {
    return {
      complaints: []
    };
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1000); // Multiplica por 1000 para convertir de segundos a milisegundos
      return date.toLocaleString(); // Utiliza la función toLocaleString() para obtener una representación legible de la fecha
    }
  },
  async created() {
    // Inicializa Web3 con el proveedor Ethereum adecuado
    const web3 = new Web3('http://localhost:7545');

    // Obtén la instancia del contrato con la ABI y la dirección
    const contract = new web3.eth.Contract(Complaints.abi, "0x30E567E16B0B232c1833C6248f00C3473216A86d");

    // Llama a la función getAllComplaints del contrato
    const allComplaints = await contract.methods.getAllComplaints().call();

    // Actualiza la lista de quejas en el estado del componente
    this.complaints = allComplaints.map(complaint => ({
      text: complaint.text,
      creator: complaint.creator,
      date: complaint.creationTimestamp,
      block: complaint.blockNumber
    }));
  }
};
</script>





