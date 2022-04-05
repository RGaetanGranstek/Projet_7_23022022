<template>
  <div class="fullscreen background2 Bienvenue">
    <div class="card card-container">
      <div class="right">
        <button @click="logout()" class="button">Déconnexion</button>
      </div>
      <div>
        <div v-if="!imageUrl">
          <img alt="image" :src="user.imageUrl" class="profilImg" />
        </div>
        <div v-else>
          <img alt="image" :src="imageUrl" class="profilImg" />
        </div>
        <input
          id="newImageUrl"
          type="file"
          @change="previewFiles"
          accept="image/png, image/jpg, image/jpeg"
          aria-label="Choisir un fichier"
        />
      </div>
      <div>
        <h1 class="titleProfil">Profil de {{ user.pseudo }}</h1>
      </div>
      <div>
        <p id="prenom">{{ user.prenom }}</p>
      </div>
      <div>
        <p id="nom">{{ user.nom }}</p>
      </div>
      <div>
        <p id="email">{{ user.email }}</p>
      </div>
      <div class="form-row" v-if="'create' && status == 'error_create'">
        Quelque chose cloche
      </div>
      <div class="buttonProfil form-column">
        <div class="left">
          <button @click="confirmDeleteAccount()" class="button deleteAccount">
            Supprimer mon compte
          </button>
        </div>
        <div class="right">
          <button @click.prevent="confirmUpdateProfil()" class="button">
            Mettre à jour mon compte
          </button>
        </div>
      </div>
      <div class="form-row" v-if="status == 'Account_updated'">
        Les informations de compte ont été mises à jour.
      </div>
      <div class="form-row" v-if="status == 'error_Account_updated'">
        Quelque chose cloche
      </div>
      <div class="buttonProfil">
        <router-link to="/publication"
          >Retour sur le fil d'Actualité</router-link
        >
      </div>
    </div>
    <div v-if="admin(true)" class="display">
      <div></div>
      <div
        v-for="profil in profils.filter((profil) => profil.id != user.id)"
        :key="profil.id"
        class="card card-container"
      >
        <div>
          <img alt="image" :src="profil.imageUrl" class="profilImg" />
        </div>
        <div>
          <h1 class="titleProfil">Profil de {{ profil.pseudo }}</h1>
        </div>
        <div>
          <p id="prenom">{{ profil.prenom }}</p>
        </div>
        <div>
          <p id="nom">{{ profil.nom }}</p>
        </div>
        <div>
          <p id="email">{{ profil.email }}</p>
        </div>
        <div class="form-row" v-if="'create' && status == 'error_create'">
          Quelque chose cloche
        </div>
        <div class="buttonProfil adminProfilDeleteAccount">
          <div>
            <button
              @click="confirmDeleteAccount(profil.id)"
              class="button deleteAccount"
            >
              Supprimer le compte
            </button>
          </div>
        </div>
        <div class="form-row" v-if="status == 'Account_updated'">
          Les informations de compte ont été mises à jour.
        </div>
        <div class="form-row" v-if="status == 'error_Account_updated'">
          Quelque chose cloche
        </div>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script>
import FooterSection from "@/components/Footer.vue";
import { mapState } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
});

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
      image: "",
      imageUrl: "",
      profils: [],
    };
  },

  async created() {
    if (this.admin(true)) {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      await instance
        .get("/profil/", {
          headers: { Authorization: "Bearer " + userLocal.token },
          "Content-Type": "application/json",
        })
        .then((response) => {
          this.profils = response.data;
          console.log(this.profils);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    }
  },
  mounted() {
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
    admin() {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      if (userLocal.role === "ADMIN") {
        return true;
      } else {
        return false;
      }
    },
    deleteAccount(id) {
      const self = this;
      if (self.admin(true)) {
        let user = localStorage.getItem("user");
        let userLocal = JSON.parse(user);
        instance
          .delete("/delete/" + id, {
            headers: { Authorization: "Bearer " + userLocal.token },
          })
          .then(function (response) {
            console.log(response);
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
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
      }
    },
    confirmDeleteAccount(id) {
      if (
        window.confirm(
          "Attention ! Cette opération est irreversible. Tous vos messages ainsi que les commentaires associés seront définitivement supprimés !"
        )
      ) {
        this.deleteAccount(id);
      }
    },
    confirmUpdateProfil(id) {
      if (window.confirm("Souhaitez-vous validé les modifications ?")) {
        this.updateAccount(id);
      }
    },
    updateAccount() {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      this.image = document.getElementById("newImageUrl").files[0];
      const formData = new FormData();
      formData.append("userId", userLocal.userId);
      formData.append("image", this.image);
      instance
        .put("/update/" + userLocal.userId, formData, {
          headers: {
            Authorization: "Bearer " + userLocal.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.imageUrl = response.data.imageUrl;
          localStorage.setItem("image", response.data);
          location.reload();
        });
    },
    // aperçu dynamique
    previewFiles(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var self = this;
      reader.onload = (event) => {
        self.imageUrl = event.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>