<template>
  <div class="fullscreen background2 about">
    <img class="logo_about" src="../assets/icon-left-font-monochrome-white.png" alt="Groupomania Logo">
    <h1>A propos de Groupomania</h1>
    <p>Notre entreprise, spécialisée dans la grande distribution,<br> est en pleine expansion.<br> Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années.<br> Nous étions uniquement 300 il y a 3 ans.</p>
  </div>
    <FooterSection/>
</template>

<script>
// @ is an alias to /src
import FooterSection from '@/components/Footer.vue'

export default {
  name: 'AboutView',
  components: {
    FooterSection
  }
}
</script>