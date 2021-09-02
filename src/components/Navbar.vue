<template>
    <nav>
      <div class="nav-wrapper green">
        <div class="container">
            <router-link to='/'
            class="brand logo">Portal de Investigatii</router-link> 
            <ul class="right">
              <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
              <li v-if="isLoggedIn"><router-link to="/">Home</router-link></li>
              <li v-if="isDoctor"><router-link to="/pacienti">Lista Pacienti</router-link></li>
              <li v-if="isDoctor"><router-link to="/new">Pacient Nou</router-link></li>
              <li v-if="isLoggedIn && !isDoctor"><router-link to="/my-analize">Analizele Mele</router-link></li>
              <li v-if="isLoggedIn && !isDoctor"><router-link to="/my-profile">Profilul meu</router-link></li>
              <li v-if="!isLoggedIn"><router-link to="/Login">Login</router-link></li>
              <li v-if="!isLoggedIn"><router-link to="/Register">Register</router-link></li>
              <li v-if="isLoggedIn"><button v-on:click="logout" class="btn light-blue">Logout</button></li>
            </ul>
        </div>       
      </div>    
    </nav>
</template>

<script>
import firebase from 'firebase'; 
import db from './firebaseInit'
export default {
  name: 'navbar',
  data(){
    return {
      isLoggedIn: false,
      currentUser: false,
      isDoctor: false,
    }
  },
  created(){
    if(firebase.auth().currentUser){
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
      db.collection('Pacienti').where("email", "==", firebase.auth().currentUser.email).get().then(querySnapshot=>{
        console.log(querySnapshot.size);
        this.isDoctor = querySnapshot.empty;
        console.log(this.isDoctor)
      });
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(()=>{
        this.$router.go({path: this.$router.path});
      })
    }
  }
  
}
</script>

<style scoped>
  .email{padding-right: 12px;
  }
</style>
