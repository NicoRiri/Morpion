<script>
import api from "@/api/index.js";

export default {
  methods: {
    createGame() {
      api.post("api/games").then(r => {
        this.$router.push({name: "game", params: {id:r.data.id}})
      })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <router-link to="/profile">
        <h2>Mon Profil</h2>
      </router-link>
      <div @click="createGame">
        <h2>Nouvelle Partie</h2>
      </div>


      <router-link to="/join">
        <h2>Rejoindre une partie</h2>
      </router-link>
    </div>
  </main>
</template>

<style scoped>

main{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

div{
  height: 25% ;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  justify-items: center;
}

a{
  text-decoration: none;
}

h2{
  cursor: pointer;
  text-align: center;
  padding: 10px 15px 10px 15px;
  color: white;
  background-color: mediumpurple;
  border-radius: 35px;
}

</style>