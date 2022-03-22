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
            <img id="imageUrl" :src="user.imageUrl" class="profilImg" />
          </div>
        </div>
        <form aria-label="Nouveau message" class="flex-item-large bottomSup">
          <input
            v-model="titre"
            id="titre"
            type="text"
            placeholder="Titre de votre publication !"
          />
          <textarea
            v-model="message"
            class="newPublicationText"
            name="message"
            id="message"
            placeholder="Rédiger votre message !"
            aria-label="Rédiger un nouveau message"
          />

          <div v-if="!imagePreview">
            <img />
          </div>
          <div v-else>
            <img id="imagePreview" :src="imagePreview" class="postImage" />
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
        <!-- afficher toute les publications -->
        <div class="allUtilisateursBackground">
          <!-- On récupére les publications des plus récentes aux plus anciennes -->
          <div
            :key="publication.id"
            v-for="publication in allPublications.slice().reverse()"
          >
            <!-- On récupére les utilisateurs correspondant aux publications -->
            <div
              class="allPublication card-wall flex-item-large display"
              v-for="utilisateur in allUtilisateurs.filter((utilisateur) => {
                return utilisateur.id == publication.utilisateur_id;
              })"
              :key="utilisateur.id"
            >
              <div class="profilPublication">
                <img
                  id="imageUrl"
                  :src="utilisateur.imageUrl"
                  class="profilImg"
                />
                <span class="card-title"
                  >{{ utilisateur.nom }} {{ utilisateur.prenom }}</span
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
                <p v-if="!isHidden">
                  {{ publication.id }}
                </p>
                <p v-if="!isHidden">
                  {{ publication.titre }}
                </p>
                <p v-if="!isHidden">
                  {{ publication.message }}
                </p>
                <img
                  v-if="!isHidden"
                  id="imageUrl"
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
                  <div>
                    <button
                      v-on:click="commentaireIsHidden = !commentaireIsHidden"
                      class="button"
                    >
                      Pour afficher les commentaires
                    </button>
                  </div>
                </div>
              </div>

              <!-- affichage input new commentaire -->
              <div class="publicationWidthButton">
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

                      <div v-if="!imagePreview">
                        <img />
                      </div>
                      <div v-else>
                        <img
                          id="imagePreview"
                          :src="imagePreview"
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
              <!-- afficher tous les commentaires -->
              <!-- On récupére les commentaires des plus récents aux plus anciens -->
              <div class="publicationWidthButton">
                <!-- on trie les commentaires en fonction de la publication -->
                <div
                  v-for="commentaire in allCommentaires.filter(
                    (commentaire) => {
                      return commentaire.publication_id == publication.id;
                    }
                  )"
                  :key="commentaire.publication_id"
                >
                  <!-- On récupére les utilisateurs correspondant aux commentaires -->
                  <div
                    class="allCommentaire card-wall flex-item-large"
                    v-for="utilisateur in allUtilisateurs.filter(
                      (utilisateur) => {
                        return utilisateur.id == commentaire.utilisateur_id;
                      }
                    )"
                    :key="utilisateur.id"
                  >
                    <!-- afficher tous les commentaires -->
                    <div class="profilCommentaire">
                      <div
                        v-if="commentaireIsHidden"
                        class="profilCommentaire com"
                      >
                        <img
                          id="imageUrl"
                          :src="utilisateur.imageUrl"
                          class="profilImg"
                        />
                        <span class="card-title"
                          >{{ utilisateur.nom }} {{ utilisateur.prenom }}</span
                        >
                      </div>
                      <div
                        v-if="commentaireIsHidden"
                        class="white commentaireMargin com"
                      >
                        <p v-if="commentaireIsHidden">
                          {{ commentaire.id }}
                        </p>
                        <p v-if="commentaireIsHidden">
                          {{ commentaire.message }}
                        </p>
                        <img
                          v-if="!isHidden"
                          id="imageUrl"
                          :src="commentaire.imageUrl"
                          class="publicationImg"
                        />
                      </div>
                      <div
                        class="commentaireWidthButton publicationWidthButton"
                      >
                        <div>
                          <div>
                            <button
                              v-if="
                                commentaireIsHidden &&
                                user.id == commentaire.utilisateur_id
                              "
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- profil -->
      <div class="card-wall flex-item-small center">
        <div class="flex">
          <router-link to="/Profil" class="link">Mon Profil</router-link>
          <button @click="logout()" class="button">Déconnexion</button>
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
      commentaireIsHidden: false,
      commentaireMessage: "",
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
    this.$store.dispatch("allPublications");
    this.$store.dispatch("allUtilisateurs");
    this.$store.dispatch("allCommentaires");
  },
  computed: {
    ...mapState({
      user: "userInfos",
      allPublications: "publications",
      allUtilisateurs: "utilisateurs",
      allCommentaires: "commentaires",
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
      console.log(event.target.files);
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
      // console.log(id);
      // console.log(this.image);
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



mettre un espace en dessous des commentaires qui ne nous appartiennent pas
bouton affichage commentaires seulement present quand commentaires
bouton affichage commentaire qui doit afficher que dans la publication ou il se situe
input selection d'image qui doit s'afficher que dans l'input concerné

affichage image quand null ou "" à cacher dans publication et commentaire
pattern contrôle modification info profil


compte administrateur =>

"nom": "Groupomania",
"prenom": "Communication",
"pseudo": "Modérateur(trice)",
"email": "Contact@Groupomania.fr",
"password": "Groupomania!00",
"role": "ADMIN"