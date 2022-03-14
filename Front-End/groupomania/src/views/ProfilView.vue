<template>
  <div class="fullscreen background2 Bienvenue">
    <div class="card card-container">
      <h1>Profil de {{ user.pseudo }}</h1>
      <p>{{ user.prenom }} {{ user.nom }} {{ user.email }}</p>
      <div class="form-row">
        <button @click="logout()" class="button">Déconnexion</button>
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
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>