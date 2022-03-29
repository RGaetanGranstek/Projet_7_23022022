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
          <div v-show="!email">Un adresse email est requise !</div>
        </div>
        <input v-model="password" type="password" placeholder="Mot de passe" />
        <div v-show="!password">Un mot de passe est requis !</div>
      </div>
      <div
        class="form-row"
        v-if="status == 'error_login' && errorMailConnect != ''"
      >
        {{ errorMailConnect }}
      </div>
      <div
        class="form-row"
        v-if="status == 'error_login' && errorPasswordConnect != ''"
      >
        {{ errorPasswordConnect }}
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
const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export default {
  name: "LoginView",
  components: {
    FooterSection,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMailConnect: "",
      errorPasswordConnect: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/publication");
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
      if (regexMail.test(this.email) == true) {
        const self = this;
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(
            function (response) {
              self.$router.push("/publication");
              console.log(response);
            },
            function (error) {
              console.log(error);
            }
          );
        this.errorPasswordConnect = "Mot de passe incorrect";
      } else {
        this.errorMailConnect = "Email incorrect ou caractère interdit";
        console.log(this.errorMailConnect);
      }
    },
  },
};
</script>