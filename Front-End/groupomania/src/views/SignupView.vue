<template>
  <div class="fullscreen background2 form">
    <div class="card card-container">
      <div>
        <h1>Inscription</h1>
        <p>
          Tu possèdes déjà un compte ?
          <router-link to="/login">Connexion</router-link>
        </p>
      </div>
      <div class="form-row">
        <input v-model="pseudo" type="text" placeholder="pseudo" />
      </div>
      <div class="form-row">
        <input v-model="prenom" type="text" placeholder="Prénom" />
      </div>
      <div class="form-row">
        <input v-model="nom" type="text" placeholder="Nom" />
      </div>
      <div class="form-row">
        <input v-model="email" type="text" placeholder="Adresse mail" />
      </div>
      <div class="form-row">
        <input v-model="password" type="password" placeholder="Mot de passe" />
      </div>
      <div class="form-row" v-if="status == 'error_create'">
        Quelque chose cloche
      </div>
      <div class="form-row">
        <button
          @click="signup()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
        >
          <span>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script>
// @ is an alias to /src
// mapState Lorsqu’un composant doit utiliser plusieurs propriétés d’état de magasin ou getters, la déclaration de toutes ces propriétés calculées peut devenir répétitive et détaillée. Pour faire face à cela, nous pouvons utiliser l’assistant qui génère des fonctions getter calculées pour nous, nous épargnant quelques frappes.
import FooterSection from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  name: "SignupView",
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
    };
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/signup");
      return;
    }
  },
  computed: {
    validatedFields() {
      if (
        this.pseudo != "" &&
        this.prenom != "" &&
        this.nom != "" &&
        this.email != "" &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
    ...mapState(["nomValidInput"]),
    ...mapState(["prenomValidInput"]),
    ...mapState(["pseudoValidInput"]),
    ...mapState(["emailValidInput"]),
    ...mapState(["nomValidInput"]),
  },
  methods: {
    login() {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/publication");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    signup() {
      const self = this;
      this.$store
        .dispatch("signup", {
          pseudo: this.pseudo,
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.login();
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>