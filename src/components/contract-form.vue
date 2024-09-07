<template>

  <form v-if="isDrizzleInitialized">
    <div class="form-group">
      <textarea
        class="form-control" id="formGroupExampleInput"
        v-for="(param, i) in displayInputs"
        v-model="ethData[i]"
        :key="i"
        :type="param.type"
        :placeholder="param.name"
      />
    </div>

    <div class="d-grid gap-2">
      <button class="btn btn-primary btn-block" :disabled="false" @click.prevent="onSubmit">{{buttonTitle}}</button>
    </div>

    

  </form>

</template>

<style>
  .form-control{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .btn .btn-primary{
    text-align: right !important;
  }

  textarea {
     resize: none;
  }
</style>

<script>

import { mapGetters } from 'vuex'
import Vue from "vue"

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return 'number'
    case /^string/.test(type) || /^bytes/.test(type):
      return 'text'
    case /^bool/.test(type):
      return 'checkbox'
    default:
      return 'text'
  }
}

export default {
  name: 'ContractForm',
  props: {
    contractName: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    methodArgs: {
      type: Array,
      default: () => []
    },

    placeholders: {
      type: Array,
      default: () => []
    },

    buttonTitle:{
      type:String,
      required:true
    }
  },

  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),

    abi() {
      const di = this.drizzleInstance
      return di.contracts[this.contractName].abi.find(
        item => item.name === this.method
      )
    },

    abiInputs() {
      return this.abi.inputs
    },

    displayInputs() {
      return this.abi.inputs.map((x, i) => ({
        name: this.placeholders[i] ? this.placeholders[i] : x.name,
        type: translateType(x.type)
      }))
    },

    utils() {
      return this.drizzleInstance.web3.utils
    }
  },

  data() {
    return {
      ethData: {}
    }
  },

  methods: {
    onSubmit() {
      const convertedInputs = this.abiInputs.map((input, i) =>
        input.type === 'bytes32'
          ? (this.ethData[i] = this.utils.toHex(this.ethData[i]))
          : this.ethData[i]
      )
      const sendArgs = this.methodArgs.length
        ? [...convertedInputs, this.methodArgs]
        : convertedInputs

      this.drizzleInstance.contracts[this.contractName].methods[
        this.method
      ].cacheSend(...sendArgs)

      Vue.notify({
        group: 'foo',
        title: 'Queja enviada',
        text: 'Confirme la transacción con su wallet' 
      })

      this.ethData = {}
    }
  }
}
</script>

<style></style>
