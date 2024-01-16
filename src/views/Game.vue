<script>
import api from "@/api/index.js";

export default {
  data(){
    return{
      partie : {},
      partietrouve : false
    }
  },
  methods: {
    waitForOpponentMove(){
      api.get("api/games/"+this.$route.params.id+"?since="+this.partie.last_time_updated).then(res => {
        this.partie = res.data
        if (res.data.state !== 2){
          this.waitForOpponentMove()
        }
      })
    }
  },
  beforeRouteEnter(to, from, next){
    api.get("api/games/"+to.params.id).then(res => {
      next(vm => {
        vm.partie = res.data
        vm.partietrouve = true
        vm.waitForOpponentMove()
      })
    })
  }
}
</script>

<template>
  {{partie}}
  <div v-if="partietrouve">
    <label>Code la partie :</label> <p>{{partie.code}}</p>
    <label>Nom :</label> <p>{{partie.owner.name}}</p>
    <label>Adversaire :</label> <p v-if="partie.opponent !== null">{{partie.opponent}}</p> <p v-else>En attente</p>
  </div>

</template>