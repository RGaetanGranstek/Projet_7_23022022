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
              </div>
              <div class="publicationWidthButton">
                <!-- <div v-if="!imagePreview">
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
                  v-if="user.id == publication.utilisateur_id"
                  id="newImagePreview"
                  type="file"
                  @change="previewImage"
                  accept="image/png, image/jpg, image/jpeg"
                  aria-label="Choisir un fichier"
                /> -->
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
                  <!-- <div>
                    <button
                      v-if="user.id == publication.utilisateur_id"
                      v-on:click="isHidden = !isHidden"
                      @click.prevent="modificationPublication(publication.id)"
                      class="button"
                    >
                      Pour éditer la publication
                    </button>
                    <button
                      v-if="user.id == publication.utilisateur_id"
                      @click="updatePublication(publication.id)"
                      class="button"
                    >
                      Mettre à jour ma publication
                    </button>
                  </div> -->
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
                        id="newImagePreview"
                        type="file"
                        @change="previewImage"
                        accept="image/png, image/jpg, image/jpeg"
                        aria-label="Choisir un fichier"
                      />

                      <button
                        @click="createCommentaire()"
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
    createPublication() {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      this.$store
        .dispatch("createPublication", {
          titre: this.titre,
          message: this.message,
          utilisateur_id: userLocal.userId,
          imageUrl: this.imageUrl,
        })
        .then(
          function (response) {
            location.reload();
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
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
    // modificationPublication() {},
    // async updatePublication(id) {
    //   let confirmUpdatePublication = confirm(
    //     "Souhaitez-vous validé les modifications ?"
    //   );
    //   // console.log(id);
    //   if (confirmUpdatePublication == true) {
    //     let user = localStorage.getItem("user");
    //     let userLocal = JSON.parse(user);
    //     await instancePost
    //       .put(`/publication/${id}`, {
    //         headers: {
    //           Authorization: "Bearer " + userLocal.token,
    //         },
    //       })
    //       .then(() => {
    //         location.reload();
    //       });
    //   } else {
    //     return;
    //   }
    // },
    createCommentaire(id) {
      let user = localStorage.getItem("user");
      let userLocal = JSON.parse(user);
      this.$store
        .dispatch("createCommentaire", {
          message: this.commentaireMessage,
          utilisateur_id: userLocal.userId,
          publication_id: id,
          imageUrl: this.imageUrl,
        })
        .then(
          function (response) {
            location.reload();
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
    },
    async deleteCommentaire(id) {
      let confirmDeleteCommentaire = confirm(
        "Attention ! Votre message ainsi que les commentaires associés seront définitivement supprimés !"
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

mettre un espace en dessous des commentaires qui e nous appartiennent pas, sans bouton supprimer le message
bouton affichage commentaires seulement present quand commentaires
rédaction d'un commentaire avec enregistrement en bdd
image publication et profil
compte administrateur


vidéo à intégré
modification publication (cibler)