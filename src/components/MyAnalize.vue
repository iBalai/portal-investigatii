<template>
    <div id="my-analize">
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
                </tr>
                </thead>

                <tbody>
                    <tr v-for="analiza in analize">
                        <td>{{analiza.date}}</td>
                        <td><img style="width:100%" :id="analiza.id"></td>
                        <td>{{analiza.observations}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
            

    </div>        
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
export default {
    name: 'my-analize',
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
            pacientReference: '',
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
                        this.loadAnalize();
                    });
                });
        },
        loadAnalize() {
            //load Analize
            console.log("loading analize");
            console.log(this.pacientReference);
            db.collection('Analize').where("pacient", "==", this.pacientReference).onSnapshot(snapshotChange=>{
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
    }
}
</script>
