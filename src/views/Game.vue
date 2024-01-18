<script>
import api from "@/api/index.js";

export default {
  data(){
    return{
      partie : {},
      partietrouve : false,
    }
  },
  computed: {
    tourOwner() {
      if (this.partie.state === 1){
        return this.partie.next_player.name === this.partie.owner.name;
      }
      return false
    },
    tourAdverse() {
      if (this.partie.state === 1) {
        return this.partie.next_player.name === this.partie.opponent.name;
      }
      return false
    },
    case_un(){
      if (this.partie.r1c1 === 1){
        return "X"
      } else if (this.partie.r1c1 === 2){
        return "O"
      }
    },
    case_deux(){
      if (this.partie.r1c2 === 1){
        return "X"
      } else if (this.partie.r1c2 === 2){
        return "O"
      }
    },
    case_trois(){
      if (this.partie.r1c3 === 1){
        return "X"
      } else if (this.partie.r1c3 === 2){
        return "O"
      }
    },
    case_quatre(){
      if (this.partie.r2c1 === 1){
        return "X"
      } else if (this.partie.r2c1 === 2){
        return "O"
      }
    },
    case_cinq(){
      if (this.partie.r2c2 === 1){
        return "X"
      } else if (this.partie.r2c2 === 2){
        return "O"
      }
    },
    case_six(){
      if (this.partie.r2c3 === 1){
        return "X"
      } else if (this.partie.r2c3 === 2){
        return "O"
      }
    },
    case_sept(){
      if (this.partie.r3c1 === 1){
        return "X"
      } else if (this.partie.r3c1 === 2){
        return "O"
      }
    },
    case_huit(){
      if (this.partie.r3c2 === 1){
        return "X"
      } else if (this.partie.r3c2 === 2){
        return "O"
      }
    },
    case_neuf(){
      if (this.partie.r3c3 === 1){
        return "X"
      } else if (this.partie.r3c3 === 2){
        return "O"
      }
    },
  },
  methods: {
    waitForOpponentMove(){
      api.get("api/games/"+this.$route.params.id+"?since="+this.partie.last_time_updated).then(res => {
        this.partie = res.data
        let child = document.querySelector("#grid").childNodes
        child[1].textContent = this.case_un
        child[2].textContent = this.case_deux
        child[3].textContent = this.case_trois
        child[4].textContent = this.case_quatre
        child[5].textContent = this.case_cinq
        child[6].textContent = this.case_six
        child[7].textContent = this.case_sept
        child[8].textContent = this.case_huit
        child[9].textContent = this.case_neuf
        if (res.data.state !== 2){
          this.waitForOpponentMove()
        }
      })
    },
    play(coup){
      console.log(coup)
      let row = Math.trunc((coup-1)/3 +1)
      let column = (coup-1)%3 + 1
      console.log("row = "+  row)
      console.log("column = "+  column)
      api.patch("api/games/"+this.partie.id+"/play/"+row+"/"+column)

    }
  },
  beforeRouteEnter(to, from, next){
    api.get("api/games/"+to.params.id).then(res => {
      next(vm => {
        vm.partie = res.data
        console.log(res.data)
        vm.partietrouve = true
        vm.waitForOpponentMove()
      })
    })
  }
}
</script>

<template>
  <div v-if="partietrouve">
    <header>
      <div id="un" :class="{joue: this.tourOwner}">
        <label> </label> <p>Host : {{partie.owner.name}}</p>
      </div>
      <div id="deux">
        <p>Code la partie : {{partie.code}}</p>
      </div>
      <div id="trois" :class="{joue: this.tourAdverse}">
        <p v-if="partie.opponent !== null">Guest : {{partie.opponent.name}}</p> <p v-else>Guest : En attente</p>
      </div>
    </header>
    <div id="grid" class="hagrid">
      <div :id="index" v-for="index in 9" @click="play(index)" class="case"></div>
    </div>


  </div>

</template>

<style scoped>
.case{
  border: solid 2px black;
  background-color: white;
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
.hagrid{
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 10rem);
  grid-template-rows: repeat(3, 10rem);
}
header{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  justify-items: center;
}

#un{
  grid-column: 1;
}

#deux{
  grid-column: 2;
}

#trois{
  grid-column: 3;
}

.joue{
  background-color: gold;
}
</style>