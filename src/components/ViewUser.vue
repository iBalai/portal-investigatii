<template>
    <div id="view-user">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <i class="medium material-icons prefix">account_box</i>
            </div>
            <div class="col s10">
                <h4>{{firstName}} {{lastName}}</h4>
              <span class="black-text">
                Istoric: {{istoric}}<br>
                Antecedente: {{antecedente}}
              </span>
            </div>
          </div>
        </div>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Ekg</th>
                    <th>Observatii</th>
                    <th>Administrare</th>
                </tr>
                </thead>

                <tbody>
                    <tr v-for="analiza in analize">
                        <td>{{analiza.date}}</td>
                        <td><img style="width:100%" :id="analiza.id"></td>
                        <td>{{analiza.observations}}</td>
                        <td>
                            <i v-on:click="deleteAnaliza(analiza)" class="material-icons prefix">delete</i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <form @submit.prevent="addAnaliza" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="date" v-model="date" required>
                        <label>Data</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="observations" required>
                        <label>Observatii</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Ekg</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="file" @change="previewImage" accept="image/*" >
                    </div>
                </div>
                
                <button type="Adauga" class="btn green">Adauga</button>
                <router-link to="/" class="btn red">Renunta</router-link>
            </form>
        </div>  

    </div>        
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
export default {
    name: 'view-user',
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
            imageData: null,
            date : '',
            observations: '',
            analize: [],
        }
    },
    created (){
            console.log(this.$route.params);
            this.fetchData();

    },
    methods: {
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            },
        fetchData(){
            db.collection('Pacienti').doc(this.$route.params.id_pacient).get()
                .then(doc =>{
                    console.log(doc);
                    if (!doc.exists) 
                        alert("Document doesn't exists");
                    console.log(doc.data());
                    this.firstName = doc.data().firstName;
                    this.lastName = doc.data().lastName;
                    this.cnp = doc.data().cnp;
                    this.email = doc.data().email;
                    this.address = doc.data().address;
                    this.antecedente = doc.data().antecedente;
                    this.istoric = doc.data().istoric;
                    this.password = doc.data().password;
                });

            this.loadAnalize();
        },
        deleteAnaliza(analiza) {
            console.log("analiza "+analiza.id);
            db.collection('Analize').doc(analiza.id).delete().then(function() {
                alert("Analiza stearsa");
            });
            for( var i = 0; i < this.analize.length; i++) {
                if ( this.analize[i] === analiza) {
                    this.analize.splice(i, 1);
                }
            }
        },
        loadAnalize() {
            //load Analize
            console.log("loading analize")
            db.collection('Analize').where("pacient", "==", this.$route.params.id_pacient).get().then(snapshotChange=>{
                this.analize = [];
                snapshotChange.forEach(doc =>{
                console.log(doc.data());
                console.log(doc.id);
                    
                    let utilizator = doc.data();
                    utilizator['id'] = doc.id;
                    const storageRef=firebase.storage();
                    var pathReference = storageRef.ref();
                    var gsReference = storageRef.refFromURL(`gs://bucket/${utilizator.id}.png`);
                    console.log(pathReference);
                    pathReference.child(`${utilizator.id}.png`).getDownloadURL().then(function(url) {
                        var test = url;
                        //alert(url);
                        console.log(utilizator);
                        utilizator.imageUrl = url;
                        console.log(utilizator.date);
                        document.getElementById(utilizator.id).src = test;
                        console.log(test);
                        this.imgSrc = url;
                    console.log(this.imgSrc);


                    }).catch(function(error) {

                    });
                    console.log(utilizator);
                    this.analize.push(utilizator);
                })
            })
        },
        addAnaliza(){
            const data = {
                  date: this.date,
                  observations : this.observations,
                  pacient: this.$route.params.id_pacient,
                };
            const newRef = db.collection('Analize').doc();

            //upload image
            this.picture=null;
            console.log(this.imageData.name);
            const storageRef=firebase.storage().ref(`${newRef.id}.png`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture =url;

                //set analiza data
                const res = newRef.set(data);
                console.log(newRef.id);

                this.loadAnalize();
                });
            }
            );

            
        }
    }
}
</script>
