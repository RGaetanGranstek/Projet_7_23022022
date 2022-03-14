<template>
  <div class="fullscreen background2">
    <div class="card card-container">
      <div>
        <h1>Connexion</h1>
        <p>
          Tu ne possèdes pas encore de compte ? <br />
          <router-link to="/signup">Créer un compte</router-link>
        </p>
        <div class="form-row">
          <input v-model="email" type="text" placeholder="Adresse mail" />
        </div>
        <input v-model="password" type="password" placeholder="Mot de passe" />
      </div>
      <div class="form-row" v-if="status == 'error_login'">
        Email et/ou mot de passe incorrect !
      </div>
      <div class="form-row">
        <button
          @click="login()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
        >
          <span>Connexion</span>
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
  name: "LoginView",
  components: {
    FooterSection,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/profil");
      return;
    }
  },
  computed: {
    validatedFields() {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
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