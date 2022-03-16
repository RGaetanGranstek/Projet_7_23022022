<template>
  <div class="fullscreen background2 Bienvenue">
    <div class="card card-container">
      <div class="right">
        <button @click="logout()" class="button">Déconnexion</button>
      </div>
      <div>
        <img id="imageUrl" :src="user.imageUrl" class="profilImg" />
        <input
          id="newImageUrl"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
        />
        <h1 class="titleProfil">Profil de {{ user.pseudo }}</h1>
      </div>
      <div class="form-column">
        <p id="pseudo">{{ user.pseudo }}</p>
        <input v-model="pseudo" type="text" placeholder="pseudo" />
      </div>
      <div class="form-column">
        <p id="prenom">{{ user.prenom }}</p>
        <input v-model="prenom" type="text" placeholder="Prénom" />
      </div>
      <div class="form-column">
        <p id="nom">{{ user.nom }}</p>
        <input v-model="nom" type="text" placeholder="Nom" />
      </div>
      <div class="form-column">
        <p id="email">{{ user.email }}</p>
        <input v-model="email" type="text" placeholder="Adresse mail" />
      </div>
      <!-- <div class="form-column">
        <p></p>
        <input v-model="password" type="password" placeholder="Mot de passe" />
      </div> -->
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
        Les informations de compte ont été mises à jour.
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
      // password: "",
      // imageUrl: "",
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
      let newPseudo = document.getElementById("pseudo").innerText;
      let newNom = document.getElementById("nom").innerText;
      let newPrenom = document.getElementById("prenom").innerText;
      let newEmail = document.getElementById("email").innerText;
      // let newPassword = document.getElementById("password");
      // let newImageUrl = document.getElementById("imageUrl").src;
      // let imageUrlInput =
      //   // URL.createObjectURL(
      //   document.getElementById("newImageUrl").files[0];
      // // );
      if (this.pseudo !== null && this.pseudo !== "") {
        newPseudo = this.pseudo;
      }
      if (this.prenom !== null && this.prenom !== "") {
        newPrenom = this.prenom;
      }
      if (this.nom !== null && this.nom !== "") {
        newNom = this.nom;
      }
      if (this.email !== null && this.email !== "") {
        newEmail = this.email;
      }
      // if (this.password !== null && this.password !== ""){newPassword = this.password;}
      // if (imageUrlInput !== null && imageUrlInput !== "") {
      //   const formData = new FormData();
      //   formData.append("image", imageUrlInput);
      //   // newImageUrl = imageUrlInput;
      // }
      // console.log(newImageUrl);
      // console.log(imageUrlInput);
      this.$store
        .dispatch("updateAccount", {
          pseudo: newPseudo,
          prenom: newPrenom,
          nom: newNom,
          email: newEmail,
          // password: this.password,
          // imageUrl: newImageUrl,
        })
        .then(
          function (response) {
            self.updateImage();
            self.$router.push("/profil");
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
    },

    updateImage() {
      let imageUrlInput = document.getElementById("newImageUrl").files[0];
      const formData = new FormData();
      formData.append("image", imageUrlInput);
      return new Promise((resolve, reject) => {
        let user = localStorage.getItem("user");
        let userLocal = JSON.parse(user);
        instance
          .put("/update/" + userLocal.userId, formData, {
            headers: { Authorization: "Bearer " + userLocal.token },
          })
          .then(function (response) {
            console.log(response);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },
  },
};
</script>

updateImage ne fonctionne pas, instance axios.