<template>
  <div class="fullscreen background2" >
    <img class="logo_accueil" alt="Groupomania logo" src="../assets/icon-above-font-sans-fond.png">
    <Accueil_Groupomania msg="Messagerie interne de l'entreprise"/>
  </div>
    <FooterSection/>
</template>

<script>
// @ is an alias to /src
import Accueil_Groupomania from '@/components/Accueil_Groupomania.vue'
import FooterSection from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Accueil_Groupomania, 
    FooterSection
  }
}
</script>
