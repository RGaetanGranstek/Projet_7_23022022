<template>
  <div class="fullscreen background2 Bienvenue">
    <div class="card card-container">
      <div class="right">
        <button @click="logout()" class="button">Déconnexion</button>
      </div>
      <h1 class="titleProfil">Profil de {{ user.pseudo }}</h1>
      <div class="form-column">
        <p>{{ user.pseudo }}</p>
        <input v-model="pseudo" type="text" placeholder="pseudo" />
      </div>
      <div class="form-column">
        <p>{{ user.prenom }}</p>
        <input v-model="prenom" type="text" placeholder="Prénom" />
      </div>
      <div class="form-column">
        <p>{{ user.nom }}</p>
        <input v-model="nom" type="text" placeholder="Nom" />
      </div>
      <div class="form-column">
        <p>{{ user.email }}</p>
        <input v-model="email" type="text" placeholder="Adresse mail" />
      </div>
      <div class="form-column">
        <p></p>
        <input v-model="password" type="password" placeholder="Mot de passe" />
      </div>
      <div class="form-row" v-if="'create' && status == 'error_create'">
        Quelque chose cloche
      </div>
      <div class="buttonProfil form-column">
        <div class="left">
          <button @click="deleteAccount()" class="button deleteAccount">
            Supprimer mon compte
          </button>
        </div>
        <div class="right">
          <button @click="updateAccount()" class="button">
            Mettre à jour mon compte
          </button>
        </div>
      </div>
      <div class="form-row" v-if="status == 'Account_updated'">
        Les informations de compte ont été mis à jour.
      </div>
      <div class="form-row" v-if="status == 'error_Account_updated'">
        Quelque chose cloche
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script>
// @ is an alias to /src
import FooterSection from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  name: "ProfilView",
  components: {
    FooterSection,
  },
  data() {
    return {
      pseudo: "",
      prenom: "",
      nom: "",
      email: "",
      password: "",
      imageUrl: "",
    };
  },
  mounted() {
    console.log(this.$store.state);
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("userProfil");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
    ...mapState(["status"]),
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteAccount() {
      const self = this;
      this.$store.dispatch("deleteAccount").then(
        function () {
          self.$store.commit("logout");
          self.$router.push("/");
        },
        function (error) {
          console.log(error);
        }
      );
    },
    updateAccount() {
      const self = this;
      this.$store
        .dispatch("updateAccount", {
          pseudo: this.pseudo,
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password,
          imageUrl: this.imageUrl,
        })
        .then(
          function (response) {
            self.$router.push("/profil");
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>