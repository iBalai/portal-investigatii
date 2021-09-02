<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel green white-text center">
            <h3>Login</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" id="email" v-model="email">
                <label for="email" style="color:white">Email</label>
              </div>
              <div class="input-field" style="color:white">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password">
                <label for="password" style="color:white">Password</label>
              </div>
              <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data: function(){
        return{
            email: '',
            password: '',

        };
    },
    methods:{
        login: function(e){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user=>{
                alert(`Sunteti logat/a ca ${this.email}`);
                  //this.$router.push('/home');
                  window.location.href = '\home';
            },
            err=>{
                alert(err.message);
            })
            e.preventDefault();
        }
    }
}
</script>