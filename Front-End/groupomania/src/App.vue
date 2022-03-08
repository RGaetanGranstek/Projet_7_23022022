<template>
  <div class="fullscreen background2" >
    <img class="logo_accueil" alt="Groupomania logo" src="./assets/icon-left-font-monochrome-white.png">
    <Accueil_Groupomania msg="Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement 300 il y a 3 ans."/>
  </div>
</template>

<script>
import Accueil_Groupomania from './components/Accueil_Groupomania.vue'

export default {
  name: 'App',
  components: {
    Accueil_Groupomania
  }
}
</script>

<style lang="scss">
@import "./sass/main.scss";
</style>
