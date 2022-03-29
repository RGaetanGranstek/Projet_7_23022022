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
        <input id="pseudo" v-model="pseudo" type="text" placeholder="pseudo" />
        <div v-show="!pseudo">Un pseudo est requis !</div>
      </div>
      <div class="form-row">
        <input id="prenom" v-model="prenom" type="text" placeholder="Prénom" />
        <div v-show="!prenom">Votre prenom est requis !</div>
      </div>
      <div class="form-row">
        <input id="nom" v-model="nom" type="text" placeholder="Nom" />
        <div v-show="!nom">Votre nom est requis !</div>
      </div>
      <div class="form-row">
        <input
          id="email"
          v-model="email"
          type="text"
          placeholder="Adresse mail"
        />
        <div v-show="!email">Un adresse email est requise !</div>
      </div>
      <div class="form-row">
        <input v-model="password" type="password" placeholder="Mot de passe" />
        <div v-show="!password">Un mot de passe est requis !</div>
      </div>
      <div class="form-row" v-if="errorCreate != ''">
        Erreur : {{ errorCreate }}
      </div>
      <div class="form-row" v-if="errorPasswordCreate != ''">
        Erreur : {{ errorPasswordCreate }}
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
const regexName = /^[^=*'<>{}0-9]{3,}$/;
const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

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
      errorCreate: "",
      errorPasswordCreate: "",
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
      this.errorCreate = "";
      this.errorPasswordCreate = "";
      // Récupération des infos pour l'envoie en POST
      // Validation que le formulaire est correctement rempli
      if (
        (regexName.test(this.pseudo) == true) &
        (regexName.test(this.nom) == true) &
        (regexName.test(this.prenom) == true) &
        (regexMail.test(this.email) == true)
      ) {
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
        this.errorPasswordCreate =
          "Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule, 2 chiffres, un symbole ainsi qu'aucun espace.";
      } else {
        this.errorCreate = "Email incorrect ou caractère interdit";
        console.log(this.errorCreate);
      }
    },
  },
};
</script>