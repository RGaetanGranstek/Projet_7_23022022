<template>
  <div class="Bienvenue">
    <h1>Bienvenue chez Groupomania !</h1>
    <ul>
      <li><a href="" target="_blank" rel="noopener">Inscription</a></li>
      <li><a href="" target="_blank" rel="noopener">Connexion</a></li>
    </ul>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Accueil_Groupomania',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1 {
      margin: 1% 20%;
    }
  h2 {
      margin: 1% 5%;
      padding: 2%;
    }
  ul {
    list-style-type: none;
    padding: 0;
    }
  li {
    display: inline-block;
    margin: 2%;
    }
</style>
