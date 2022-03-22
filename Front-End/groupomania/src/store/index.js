import { createStore } from 'vuex'

// Appel le backend avec Axios pour créer un compte, se connecter et faire des requêtes authentifiées avec un token.
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});
const instancePost = axios.create({
  baseURL: 'http://localhost:3000/api/'
});
let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

// Creation d'une nouvelle instance du store.
export default createStore({
  // Vuex utilise une arborescence de state unique, c’est-à-dire que cet objet unique contient tous vos états au niveau de l’application et sert de « source unique de vérité »
  state: {
    status: '',
    user: user,
    userInfos: {
      id: '',
      nom: '',
      prenom: '',
      pseudo: '',
      email: '',
      role: '',
      imageUrl: '',
    },
    publicationInfos: {
      id: '',
      titre: '',
      message: '',
      utilisateur_id: '',
      imageUrl: '',
      imagePreview: '',
    },
    commentaireInfos: {
      id: '',
      message: '',
      utilisateur_id: '',
      publication_id: '',
      imageUrl: '',
      imagePreview: '',
    },
    publications: [],
    commentaires: [],
    utilisateurs: [],
  },
  // propriété calculées => propriété d'état du magasin
  getters: {
  },
  // La seule façon de changer d’état dans un magasin Vuex est de commettre une mutation. Les mutations De Vuex sont très similaires aux événements : chaque mutation a un type de chaîne et un gestionnaire. 
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },
    publications(state, publications) {
      state.publications = publications;
    },
    commentaires(state, commentaires) {
      state.commentaires = commentaires;
    },
    utilisateurs(state, utilisateurs) {
      state.utilisateurs = utilisateurs;
    },
    logout(state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  // Les actions sont similaires aux mutations, les différences étant que => Au lieu de muter l’état, les actions commettent des mutations. et/ou Les actions peuvent contenir des opérations asynchrones arbitraires.
  actions: {
    // paramétre compte
    userProfil: ({ commit }) => {
      let user = localStorage.getItem('user')
      let userLocal = JSON.parse(user)
      console.log(userLocal.userId)
      console.log(userLocal.token)
      // axios.get('http://localhost:3000/api/auth/profil/' + localStorage.getItem("user.userId"))
      // axios.get('http://localhost:3000/api/auth/profil/35')
      instance.get('/profil/' + userLocal.userId, { headers: { "Authorization": "Bearer " + userLocal.token } })
        // .then((response) => {
        //   console.log(userLocal.userId)
        //   console.log(localStorage)
        //   console.log(response);
        //   console.log(response.data);
        // })
        // .catch(function (error) {
        //   if (error.response) {
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        //   }
        // });
        .then((response) => {
          commit('userInfos', response.data);
          console.log(userLocal.userId)
          console.log(localStorage)
          console.log(response);
          console.log(response.data);
        })
        .catch(function () {
        });
    },
    login: ({ commit }, userInfos) => {
      commit('setStatus', '');
      return new Promise((resolve, reject) => {
        instance.post('/login', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },
    signup: ({ commit }, userInfos) => {
      commit('setStatus', '');
      console.log(userInfos);
      return new Promise((resolve, reject) => {
        instance.post('/signup', userInfos)
          .then(function (response) {
            commit('setStatus', 'created');
            console.log(response);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
    },
    deleteAccount: ({ commit }) => {
      return new Promise((resolve, reject) => {
        let user = localStorage.getItem('user')
        let userLocal = JSON.parse(user)
        instance.delete('/delete/' + userLocal.userId, { headers: { "Authorization": "Bearer " + userLocal.token } })
          .then(function (response) {
            commit('setStatus', 'Account_deleted');
            console.log(response);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_Account_deleted');
            console.log(error);
            reject(error);
          });
      }
      )
    },
    // paramétre wallView
    // Permet de créé une publication
    // createPublication: ({ commit }, publicationInfos) => {
    //   let user = localStorage.getItem("user");
    //   let userLocal = JSON.parse(user);
    //   instancePost
    //     .post("/publication/", publicationInfos, {
    //       headers: { Authorization: "Bearer " + userLocal.token },
    //     })
    //     .then(
    //       function (response) {
    //         commit('setStatus', 'Publication_created');
    //         self.$router.push("/publication");
    //         console.log(response);
    //       },
    //       function (error) {
    //         commit('setStatus', 'Error_Publication_created');
    //         console.log(error);
    //       }
    //     );
    // },
    // récupère toutes les publications
    allPublications({ commit }) {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      instancePost
        .get("/publication/", {
          headers: {
            Authorization: "Bearer " + userLocal.token
          },
        })
        .then((response) => {
          commit('publications', response.data)
          // this.publications = response.data;
          // console.log(this.publications);
          console.log(response);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    },
    // Permet de créé un commentaire
    createCommentaire: ({ commit }, commentaireInfos) => {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      instancePost
        .post("/commentaire/", commentaireInfos, {
          headers: { Authorization: "Bearer " + userLocal.token },
        })
        .then(
          function (response) {
            commit('setStatus', 'Commentaire_created');
            self.$router.push("/publication");
            console.log(response);
          },
          function (error) {
            commit('setStatus', 'Error_Commentaire_created');
            console.log(error);
          }
        );
    },
    // récupère toutes les commentaires
    allCommentaires({ commit }) {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      instancePost
        .get("/commentaire/", {
          headers: {
            Authorization: "Bearer " + userLocal.token
          },
        })
        .then((response) => {
          commit('commentaires', response.data)
          // this.commentaires = response.data;
          // console.log(this.commentaires);
          console.log(response);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    },
    // récupère tous les utilisateurs
    allUtilisateurs({ commit }) {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      instance.get('/profil/', { headers: { "Authorization": "Bearer " + userLocal.token } })
        .then((response) => {
          commit('utilisateurs', response.data)
          // this.utilisateurs = response.data;
          // console.log(this.utilisateurs);
          console.log(response);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    },
  },
  // Vuex nous permet de diviser notre magasin en modules. Chaque module peut contenir son propre état, des mutations, des actions, des getters et même des modules imbriqués
  modules: {
  }
})
