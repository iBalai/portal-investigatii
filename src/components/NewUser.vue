<template>
    <div id="utilizator-nou">
        <h3>Inregistrare utilizator nou</h3>
        <div class="row">
            <form  class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="firstName" required>
                        <label>Prenume</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="lastName" required>
                        <label>Nume</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="email" required>
                        <label>Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="password" v-model="password" required>
                        <label>Parola</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="cnp" required>
                        <label>CNP</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="address" required>
                        <label>Adresa</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="antecedente" required>
                        <label>Antecedente</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="istoric" required>
                        <label>Istoric</label>
                    </div>
                </div>
                <button v-on:click="saveUtilizator" type="Adauga" class="btn green">Adauga</button>
                <router-link to="/" class="btn red">Renunta</router-link>
            </form>
        </div>    
    </div>    
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig'
export default {
    name: 'utilizator-nou',
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            cnp:'',
            password: '',
            address: '',
            antecedente: '',
            istoric: '',
        }
    },
    methods: {
        validate : function(field)
        {
          if (field == '')
            return false;
          return true;
        },
        saveUtilizator: function(e){
            if( !this.validate(this.cnp)) return alert("Cnp is empty");
            if(this.cnp.length < 12) return alert("Cnp invalid");
            if( !this.validate(this.address)) return alert("address is empty");
            if( !this.validate(this.antecedente)) return alert("antecedente is empty");
            if( !this.validate(this.istoric)) return alert("istoric is empty");

            console.log(firebase.apps.length);
            if (firebase.apps.length < 2) {
                const firebaseAppSecondary = firebase.initializeApp(firebaseConfig, "Secondary")
            }
            let app = firebase.apps[1];
            app.auth().createUserWithEmailAndPassword(this.email, this.password)
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
                app.auth.signOut();
            },
              err => {
                alert(err.message);
            }
            );

        }
    }
}
</script>
