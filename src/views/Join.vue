<script>
import api from "@/api/index.js";

export default {
  data(){
    return{
      code : "",
      erreur: [],
    }
  },
  methods: {
    rejoindre(code){
      api.patch("api/games/"+code+"/join").then(res => {
        this.$router.push({name: "game", params:{id:res.data.id}})
      }).catch(erreur => {
        this.erreur = erreur.response.data.errors
        setTimeout(() => {
          this.erreur = []
        }, "3000")
      })
    }
  }
}

</script>

<template>
<div class="ecran">
  <div class="form">
    <h1>Entrer le code :</h1>
    <input type="text" v-model="code">
    <button @click="rejoindre(code)">Entrer</button>
  </div>

  <div v-if="erreur !== []">
    <p class="erreur" v-for="err in erreur">{{err}}</p>

  </div>

</div>
</template>

<style scoped>
.erreur{
  display: block;
  border-radius: 20px;
  margin-top: 50px;
  color: white;
  background-color: red;
  padding: 10px;
}

.ecran{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
}

.form{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e4bbfa;
  width: 75vb;
  height: 25vh;
  border-radius: 15px;
  padding: 20px;
}

input{
  display: block;
}

</style>