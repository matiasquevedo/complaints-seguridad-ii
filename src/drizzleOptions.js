
import Complaints from "@/contracts/Complaints.json";


const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545"
    }
  },

  contracts: [Complaints],
  events: {
  },
  polls: {
    accounts: 15000
  }
};
export default options;


