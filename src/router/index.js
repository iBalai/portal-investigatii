import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pacienti from '@/components/Pacienti'
import NewUser from '@/components/NewUser'
import EditUser from '@/components/EditUser'
import ViewUser from '@/components/ViewUser'
import MyAnalize from '@/components/MyAnalize'
import MyProfile from '@/components/MyProfile'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'
import db from '../components/firebaseInit'





Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:  Home,
      alias: '/home',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pacienti',
      name: 'Pacienti',
      component: Pacienti,
      meta: {
        requiresAuth: true,
        requiresDoctor: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-user',
      component: NewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:id_pacient',
      name: 'edit-user',
      component: EditUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/analize/:id_pacient',
      name: 'view-user',
      component: ViewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-analize',
      name: 'my-analize',
      component: MyAnalize,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-profile',
      name: 'my-profile',
      component: MyProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next)=>{
  // check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    // Check if not logged in
    if(!firebase.auth().currentUser){
      // Go to login page
      next({
        path: '/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else {
      // Proceed to route
      console.log(firebase.auth().currentUser);
       if(to.matched.some(record => record.meta.requiresDoctor))
       {
        console.log(firebase.auth().currentUser.email);
        db.collection('Pacienti').where("email", "==", firebase.auth().currentUser.email).get().then(querySnapshot=>{
          console.log(querySnapshot.size);
          //console.log(record.meta);
          if(querySnapshot.empty)
            next();


        });
      }
      else {
        next();
      }
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    // Check logged in
    if(firebase.auth().currentUser){
      // Go to login page
      next({
        path: '/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else {
       // Proceed to route
       next();
    }
  }else{
    // Proceed to route
    next();
  }
});

export default router;
