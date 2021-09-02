<template>
    <div id="pacienti">
        <h4>Pacienti</h4>
        <table class="highlight">
        <thead>
          <tr>
              <th>Prenume</th>
              <th>Nume</th>
              <th>Email</th>
              <th>Adresa</th>
              <th>CNP</th>
              <th>Antecedente</th>
              <th>Istoric</th>
              <th>Modificare</th>
              <th>Analize</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="utilizator in utilizatori">
            <td>{{utilizator.firstName}}</td>
            <td>{{utilizator.lastName}}</td>
            <td>{{utilizator.email}}</td>
            <td>{{utilizator.address}}</td>
            <td>{{utilizator.cnp}}</td>
            <td>{{utilizator.antecedente}}</td>
            <td>{{utilizator.istoric}}</td>
            <td>
                <router-link :to="'/edit/'+utilizator.id">
                    <i class="material-icons prefix">edit</i>
                </router-link>
                <i v-on:click="deletePacient(utilizator)" class="material-icons prefix">delete</i>
            </td>
            <td>
                <router-link :to="'/analize/'+utilizator.id">
                    <i class="material-icons prefix">content_paste</i>
                </router-link>
            </td>
          </tr>
        </tbody>
      </table>
            
        
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
       
    </div>    
        
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase';
export default {
    name: 'pacienti',
    data() {
        return {
            utilizatori:[],
        }
    },
    created (){
        console.log("start");
       
        db.collection('Pacienti').onSnapshot((snapshotChange) => {
            this.utilizatori = [];
            snapshotChange.forEach(doc =>{
               console.log(doc.data());
               console.log(doc.id);
                const data = {
                    'id' : doc.id,
                    'id_utilizator' : doc.data().id_utilizator,
                    'nume_utilizator' : doc.data().nume_utilizator,
                    'adresa' : doc.data().adresa,
                    'CNP' : doc.data().CNP,
                    'antecedente_ereditare' : doc.data().antecedente_ereditare,
                    'istoric' : doc.data().istoric,
                    'rezultate_ct' : doc.data().rezultate_ct,
                    'rezultate_ecg' : doc.data().rezultate_ecg,
                    'rezultate_eco_doppler' : doc.data().rezultate_eco_doppler,
                    'rezultate_eeg' : doc.data().rezultate_eeg,
                    'rezultate_rmn' : doc.data().rezultate_rmn
                }
                let utilizator = doc.data();
                utilizator['id'] = doc.id;
                this.utilizatori.push(utilizator);
            })
        })
    },
    methods :{
        deletePacient(pacient) {
            console.log("pacient"+pacient.id);
            db.collection('Pacienti').doc(pacient.id).delete().then(function() {
                alert("Pacient sters");
            }).catch(function(error) {
                alert("Error removing document: ", error);
            });
        }
    }
}
</script>

