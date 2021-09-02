<template>
    <div id="my-profile">
        <h3>Edit User</h3>
        <div class="row">
            <form @submit.prevent="updateUser" class="col s12">
                <div class="row">
                        <label>Prenume</label>
                    <div class="input-field col s12">
                        <input type="text" v-model="firstName" required>
                    </div>
                </div>
                <div class="row">
                    <label>Nume</label>
                    <div class="input-field col s12">
                        <input type="text" v-model="lastName" required>
                    </div>
                </div>
                <div class="row">
                        <label>CNP</label>
                    <div class="input-field col s12">
                        <input type="text" v-model="cnp" required>
                    </div>
                </div>
                <div class="row">
                        <label>Adresa</label>
                    <div class="input-field col s12">
                        <input type="text" v-model="address" required>
                    </div>
                </div>
                <div class="row">
                        <label>Antecedente</label>
                    <div class="input-field col s12">
                        <input type="text" v-model="antecedente" required>
                    </div>
                </div>
                <div class="row">
                        <label>Istoric</label>
                    <div class="input-field col s12">
                        <input type="text" v-model="istoric" required>
                    </div>
                </div>
                <button  type="Adauga" class="btn green">Modifica</button>
                <router-link to="/pacienti" class="btn red">Renunta</router-link>
            </form>
        </div>    
    </div>        
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
export default {
    name: 'my-profile',
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
            pacientReference: '',
        }
    },
    
    created (){
            console.log(this.$route.params);
            this.fetchData();

    },
    methods: {
        fetchData(){
            console.log(firebase.auth().currentUser.email);
            db.collection('Pacienti').where("email", "==", firebase.auth().currentUser.email).get()
                .then(snapshotChange =>{
                    snapshotChange.forEach(doc =>{
                        console.log(doc);
                    
                        if (!doc.exists) 
                            alert("Document doesn't exists");
                        console.log(doc.data());
                        this.pacientReference = doc.id;
                        this.firstName = doc.data().firstName;
                        this.lastName = doc.data().lastName;
                        this.cnp = doc.data().cnp;
                        this.email = doc.data().email;
                        this.address = doc.data().address;
                        this.antecedente = doc.data().antecedente;
                        this.istoric = doc.data().istoric;
                        this.password = doc.data().password;
                        //this.loadAnalize();
                    });
                });
        },
        validate : function(field)
        {
          if (field == '')
            return false;
          return true;
        },
        updateUser(){
            console.log("update");
            if( !this.validate(this.cnp)) return alert("Cnp is empty");
            if( !this.validate(this.address)) return alert("address is empty");
            if( !this.validate(this.antecedente)) return alert("antecedente is empty");
            if( !this.validate(this.istoric)) return alert("istoric is empty");
            if( !this.validate(this.email)) return alert("Email is empty");

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

            db.collection('Pacienti').doc(this.pacientReference).set(data);
            alert("Date modificate!");

        }

    }
}
</script>