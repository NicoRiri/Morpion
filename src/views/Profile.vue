<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      surnom: "",
      email: "",
      erreur: []
    }
  },
  methods: {
    enregistrer() {
      api.put("api/profile", {
        "email": this.email,
        "name": this.surnom
      }).catch(err => {
        this.erreur = err.response.data.errors
        setTimeout(() => {
          this.erreur = []
        }, "3000")
      })

    }
  },
  beforeRouteEnter(to, from, next) {
    api.get("api/profile")
        .then(res => {
          next(vm => {
            vm.surnom = res.data.name
            vm.email = res.data.email
          })

        })

  }
}
</script>

<template>
  <main>
    <div class="fond">
        <router-link to="/home">
          <p class="croix">X</p>
        </router-link>
        <h1>Mon profil</h1>
        <div class="interieur">
          <div class="flex">
            <label>Surnom</label>
            <input type="text" v-model="surnom">
          </div>
          <div class="flex">
            <label>Email</label>
            <input type="text" v-model="email">
          </div>
        </div>
      <div class="buttondiv">
        <button @click="enregistrer">Enregistrer</button>
      </div>
    </div>
    <div v-if="erreur.length !== 0">
      <div class="erreur">
        <p v-for="err in erreur">
          {{err}}
        </p>
      </div>
    </div>

  </main>
</template>

<style scoped>

main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

h1{
  text-align: center;
  margin-top: 0;
}

input{
  border-radius: 5px;
}

.flex{
  padding: 0 25px 0 25px;

  display: flex;
  justify-content: space-between;

}

a{
  text-decoration: none;
  text-align: end;
  padding-right: 10px;
}

.croix{
  font-weight: 700;
}

.flex+.flex{
  margin-top: 10px;
}

.fond {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-items: center;
  width: 25%;
  padding: 10px 15px 10px 15px;
  background-color: #e4bbfa;
  border: 2px solid black;
  border-radius: 35px;
}


.erreur{
  display: block;
  border-radius: 20px;
  margin-top: 50px;
  color: white;
  background-color: red;
  padding: 10px;
}

button {
  display: block;
  width: 30%;
  text-align: center;
}

.buttondiv{
  display: flex;
  justify-content: center;
}

</style>