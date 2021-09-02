<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel lighthen-4  black-text center">
            <h3>Register</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" id="email" v-model="email">
                <label for="email">Email</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">account_circle</i>
                <input type="text" id="firstName" v-model="firstName">
                <label for="email">Prenume</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">assignment_ind</i>
                <input type="text" id="lastName" v-model="lastName">
                <label for="email">Nume</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">filter_1</i>
                <input type="text" id="cnp" v-model="cnp">
                <label for="email">Cnp</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">home</i>
                <input type="text" id="address" v-model="address">
                <label for="email">Address</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">cached</i>
                <input type="text" id="antecedente" v-model="antecedente">
                <label for="email">Antecedente</label>
              </div>

               <div class="input-field">
                <i class="material-icons prefix">event</i>
                <input type="text" id="istoric" v-model="istoric">
                <label for="email">Istoric</label>
              </div>
              
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password">
                <label for="password">Password</label>
              </div>
              <button v-on:click="register" class="btn btn-large grey lighten-4 black-text">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import firebase from 'firebase';
import db from './firebaseInit'

export default {
    name: 'register',
    data: function(){
        return{
            email: '',
            firstName: '',
            lastName: '',
            cnp:'',
            password: '',
            address: '',
            antecedente: '',
            istoric: '',

        };
    },
     methods:{
        validate : function(field)
        {
          if (field == '')
            return false;
          return true;
        },
        register: function(e){
            if( !this.validate(this.cnp)) return alert("Cnp is empty");
            if(this.cnp.length < 12) return alert("Cnp invalid");
            if( !this.validate(this.address)) return alert("address is empty");
            if( !this.validate(this.antecedente)) return alert("antecedente is empty");
            if( !this.validate(this.istoric)) return alert("istoric is empty");


            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user=>{

                const data = {
                  email: this.email,
                  firstName : this.firstName,
                  lastName : this.lastName,
                  cnp:this.cnp,
                  password: this.password,
                  address: this.address,
                  antecedente: this.antecedente,
                  istoric: this.istoric,
                };
                const newRef = db.collection('Pacienti').doc();
                const res = newRef.set(data);
                db.collection('Pacienti').get()
                  .then(querySnapshot =>{
                      querySnapshot.forEach(doc => {
                          console.log(doc.data());
                      
                      })
                  })
                alert(`Cont creat pentru ${this.email}`);
                  window.location.href = '\home';
            },
              err => {
                alert(err.message);
            }
            );

            e.preventDefault();
        }
    }
}
</script>