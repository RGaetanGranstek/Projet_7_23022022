<template>
  <div class="fullscreen background2 bottomSup">
    <div class="card-wall">
      <div class="form-row">
        <h1>Publication</h1>
      </div>
    </div>
    <!-- profil -->
    <div class="display reverseDisplay">
      <div class="card-wall flex-item-small">
        <div class="buttonProfil">
          <router-link to="/publication" class="link">
            Retour sur le fil d'Actualité</router-link
          >
          <div class="flex">
            <router-link to="/Profil" class="link">Mon Profil</router-link>
            <button @click="logout()" class="button">Déconnexion</button>
          </div>
        </div>
      </div>

      <div class="newPublication flex-item-large">
        <div class="allUtilisateursBackground">
          <div v-for="publication in publications" :key="publication.id">
            <!-- {{ publication.id }} -_-_- {{ $route.params.id }} -->
            <!-- On récupére les utilisateurs correspondant aux publications -->
            <div
              v-if="publication.id == $route.params.id"
              class="allPublication card-wall"
            >
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
                      v-if="user.id == publication.utilisateur_id"
                      @click.prevent="deletePublication(publication.id)"
                      class="button deleteAccount"
                    >
                      Supprimer ma publication
                    </button>
                  </div>
                </div>
              </div>
              <!-- afficher tous les commentaires -->
              <!-- On récupére les commentaires des plus récents aux plus anciens -->
              <div class="publicationWidthButton">
                <!-- on trie les commentaires en fonction de la publication -->
                <div>
                  <!-- On récupére les utilisateurs correspondant aux commentaires -->
                  <div
                    v-for="commentaire in publication.commentaires"
                    :key="commentaire.id"
                    class="allCommentaire card-wall flex-item-large"
                  >
                    <!-- afficher tous les commentaires -->
                    <div class="profilCommentaire">
                      <div class="profilCommentaire com">
                        <img
                          alt="image"
                          :src="commentaire.utilisateur.imageUrl"
                          class="profilImg"
                        />
                        <span class="card-title">
                          {{ commentaire.utilisateur.pseudo }}</span
                        >
                      </div>
                      <div class="white commentaireMargin com">
                        <!-- <p>
                          {{ commentaire.id }}
                        </p> -->
                        <p>
                          {{ commentaire.message }}
                        </p>
                        <img
                          alt="image"
                          v-if="!isHidden && commentaire.imageUrl !== ''"
                          :src="commentaire.imageUrl"
                          class="publicationImg"
                        />
                      </div>
                    </div>
                    <div class="commentaireWidthButton publicationWidthButton">
                      <div>
                        <div>
                          <button
                            v-if="user.id == commentaire.utilisateur_id"
                            @click.prevent="deleteCommentaire(commentaire.id)"
                            class="button deleteAccount"
                          >
                            Supprimer mon commentaire
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- visibilité de l'input nouveau commentaire -->
                <div>
                  <button
                    v-if="!isHiddenNewCom"
                    v-on:click="isHiddenNewCom = true"
                    class="button"
                  >
                    Répondre
                  </button>
                  <button
                    v-if="isHiddenNewCom"
                    v-on:click="isHiddenNewCom = !isHiddenNewCom"
                    class="button"
                  >
                    Répondre
                  </button>
                </div>
                <!-- affichage input new commentaire -->
                <div
                  v-if="isHiddenNewCom"
                  :src="publication.imageUrl"
                  class="publicationWidthButton"
                >
                  <div class="allCommentaire card-wall flex-item-large">
                    <div class="profilCommentaire">
                      <!-- nouveau commentaire -->
                      <form
                        aria-label="Nouveau commentaire"
                        class="flex-item-large"
                      >
                        <textarea
                          v-model="commentaireMessage"
                          class="newPublicationText"
                          name="message"
                          id="message"
                          placeholder="Rédiger votre commentaire !"
                          aria-label="Rédiger un nouveau commentaire"
                        />

                        <div v-if="!imagePreviewCom"></div>
                        <div v-else>
                          <img
                            alt="image"
                            id="imagePreviewCom"
                            :src="imagePreviewCom"
                            class="postImage"
                          />
                        </div>

                        <input
                          id="newImagePreviewCommentaire"
                          type="file"
                          @change="previewImage"
                          accept="image/png, image/jpg, image/jpeg"
                          aria-label="Choisir un fichier"
                        />

                        <button
                          @click.prevent="createCommentaire(publication.id)"
                          type="submit"
                          class="button"
                          aria-label="Publier le message"
                        >
                          Publier
                        </button>
                      </form>
                    </div>
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
// @ is an alias to /src
import FooterSection from "@/components/Footer.vue";
import { mapState } from "vuex";
const axios = require("axios");
const instancePost = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "publicationView",
  components: {
    FooterSection,
  },
  data() {
    return {
      titre: "",
      message: "",
      imageUrl: "",
      publications: [],
      imagePreviewCom: "",
      isHidden: false,
      isHiddenNewCom: false,
      commentaireMessage: "",
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
    // aperçu dynamique
    previewImage(event) {
      //   console.log(event.target.files);
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var self = this;
      reader.onload = (event) => {
        self.imagePreviewCom = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    async deletePublication(id) {
      let confirmDeletePublication = confirm(
        "Attention ! Votre message ainsi que les commentaires associés seront définitivement supprimés !"
      );
      //   console.log(id);
      if (confirmDeletePublication == true) {
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
    },
    async createCommentaire(id) {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      this.image = document.getElementById(
        "newImagePreviewCommentaire"
      ).files[0];
      const formData = new FormData();
      formData.append("userId", userLocal.userId);
      formData.append("image", this.image);
      formData.append("message", this.commentaireMessage);
      formData.append("utilisateur_id", userLocal.userId);
      formData.append("publication_id", id);
      //   console.log(id);
      //   console.log(this.image);
      await instancePost
        .post("/commentaire/", formData, {
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
    async deleteCommentaire(id) {
      let confirmDeleteCommentaire = confirm(
        "Attention ! Votre commentaire sera définitivement supprimé !"
      );
      // console.log(id);
      if (confirmDeleteCommentaire == true) {
        let user = localStorage.getItem("user");
        let userLocal = JSON.parse(user);
        await instancePost
          .delete(`/commentaire/${id}`, {
            headers: {
              Authorization: "Bearer " + userLocal.token,
            },
          })
          .then(() => {
            location.reload();
          });
      } else {
        return;
      }
    },
  },
};
</script>