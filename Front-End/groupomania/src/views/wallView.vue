<template>
  <div class="fullscreen background2 bottomSup">
    <div class="card-wall">
      <div class="form-row">
        <h1>Fil d'actualité de Groupomania</h1>
      </div>
    </div>
    <div class="display">
      <!-- nouvelle publication -->
      <div class="newPublication card-wall flex-item-large display">
        <div>
          <div>
            <img alt="image" :src="user.imageUrl" class="profilImg" />
          </div>
        </div>
        <form aria-label="Nouveau message" class="flex-item-large">
          <input
            v-model="titre"
            id="titre"
            type="text"
            placeholder="Titre de votre publication !"
          />
          <textarea
            style="resize: none"
            v-model="message"
            class="newPublicationText"
            name="message"
            id="message"
            placeholder="Rédiger votre message !"
            aria-label="Rédiger un nouveau message"
          />

          <div v-if="!imagePreview"></div>
          <div v-else>
            <img
              alt="image"
              id="imagePreview"
              :src="imagePreview"
              class="postImage"
            />
          </div>

          <input
            id="newImagePreview"
            type="file"
            @change="previewImage"
            accept="image/png, image/jpg, image/jpeg"
            aria-label="Choisir un fichier"
          />

          <button
            @click="createPublication()"
            type="submit"
            class="button"
            aria-label="Publier le message"
          >
            Publier
          </button>
        </form>
      </div>
      <!-- profil -->
      <div class="card-wall flex-item-small">
        <div class="flex">
          <router-link to="/Profil" class="link">Mon Profil</router-link>
          <button @click="logout()" class="button">Déconnexion</button>
        </div>
      </div>
      <!-- afficher toute les publications -->
      <div class="newPublication flex-item-large display displayWall">
        <div class="allUtilisateursBackground">
          <!-- On récupére les publications des plus récentes aux plus anciennes -->
          <div
            :key="publication.id"
            v-for="publication in publications.slice().reverse()"
          >
            <!-- On récupére les utilisateurs correspondant aux publications -->
            <div class="allPublication card-wall flex-item-large display">
              <div class="profilPublication">
                <img
                  alt="image"
                  :src="publication.utilisateur.imageUrl"
                  class="profilImg"
                />
                <span class="card-title">
                  {{ publication.utilisateur.pseudo }}</span
                >
              </div>
              <div class="flex-item-large white publicationMargin">
                <input
                  v-if="isHidden"
                  v-model="titre"
                  id="titre"
                  type="text"
                  placeholder="Titre de votre publication !"
                />
                <textarea
                  style="resize: none"
                  v-if="isHidden"
                  v-model="message"
                  class="newPublicationText"
                  name="message"
                  id="message"
                  placeholder="Rédiger votre message !"
                  aria-label="Rédiger un nouveau message"
                />
                <!-- <p v-if="!isHidden">
                  {{ publication.id }}
                </p> -->
                <p v-if="!isHidden">
                  {{ publication.titre }}
                </p>
                <p v-if="!isHidden">
                  {{ publication.message }}
                </p>
                <img
                  alt="image"
                  v-if="!isHidden && publication.imageUrl !== ''"
                  :src="publication.imageUrl"
                  class="publicationImg"
                />
              </div>
              <div class="publicationWidthButton">
                <div class="form-column">
                  <div>
                    <button
                      v-if="
                        admin(true) || user.id == publication.utilisateur_id
                      "
                      @click.prevent="deletePublication(publication.id)"
                      class="button deleteAccount"
                    >
                      Supprimer ma publication
                    </button>
                  </div>
                  <!-- switch page publication et visibilité des commentaires -->
                  <div>
                    <router-link
                      :to="{
                        name: 'publication',
                        params: { id: publication.id },
                      }"
                      class="link"
                    >
                      Afficher la publication</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
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
const instancePost = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "wallView",
  components: {
    FooterSection,
  },
  data() {
    return {
      titre: "",
      message: "",
      imageUrl: "",
      imagePreview: "",
      isHidden: false,
      publications: [],
    };
  },
  async created() {
    let user = localStorage.getItem("user");
    let userLocal = JSON.parse(user);
    await instancePost
      .get("/publication/", {
        headers: {
          Authorization: "Bearer " + userLocal.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.publications = response.data;
        // console.log(this.publications);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  },
  mounted() {
    // console.log(this.$store.state);
    // console.log(this.$store.state.user);
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
        // console.log(userLocal.role);
        return true;
      } else {
        // console.log(userLocal.role);
        return false;
      }
    },
    // aperçu dynamique
    previewImage(event) {
      // console.log(event.target.files);
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var self = this;
      reader.onload = (event) => {
        self.imagePreview = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    async createPublication() {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      this.image = document.getElementById("newImagePreview").files[0];
      const formData = new FormData();
      formData.append("userId", userLocal.userId);
      formData.append("image", this.image);
      formData.append("titre", this.titre);
      formData.append("message", this.message);
      formData.append("utilisateur_id", userLocal.userId);
      // console.log(this.image);
      await instancePost
        .post("/publication/", formData, {
          headers: {
            Authorization: "Bearer " + userLocal.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          location.reload();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deletePublication(id) {
      let confirmDeletePublication = confirm(
        "Attention ! Votre message ainsi que les commentaires associés seront définitivement supprimés !"
      );
      // console.log(id);
      if (confirmDeletePublication == true) {
        const self = this;
        if (self.admin(true) || this.user.id) {
          let user = localStorage.getItem("user");
          let userLocal = JSON.parse(user);
          await instancePost
            .delete(`/publication/${id}`, {
              headers: {
                Authorization: "Bearer " + userLocal.token,
              },
            })
            .then(() => {
              location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          return;
        }
      } else {
        return;
      }
    },
  },
};
</script>



pattern (ameliorer l'affichage)
reverse affichage qui déconne à cause du reverse globale de publications

compte administrateur =>

"pseudo": "Modérateur(trice)",
"nom": "Groupomania",
"prenom": "Communication",
"email": "Contact@Groupomania.fr",
"password": "Groupomania!00",
"role": "ADMIN"