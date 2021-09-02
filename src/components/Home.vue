<template>
    <div id="home">
        <div class="row">
            <div v-for="medic in medici" class="col s12 m4">
                <div class="card">
                    <div class="card-image">
                    <img :src="medic.image">
                    <span class="card-title" style="color:red">{{medic.nume}}</span>
                    <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                    <h6>{{medic.specializare}}</h6>
                    <p>{{medic.descriere}}</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>    
        
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
export default {
    name: 'home',
    data() {
        return {
            medici:[],
        }
    },
    methods:{
        
    },
    created (){
        console.log("start");

        db.collection('Medici').onSnapshot(querySnapshot=>{
            this.medici=[];
            querySnapshot.forEach(doc =>{
               console.log(doc.data());
               let data = doc.data();
               data['image'] = require("@/assets/" + data["image"]);
                this.medici.push(data)
            })
        })
    }
}
</script>

