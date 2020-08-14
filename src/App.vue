<template>
  <div class="wrapper hold-transition sidebar-mini layout-fixed">
    <template v-if="!currentUser"> 
        <MainHeader />
        <router-view />
        <MainFooter />
    </template>
    <template v-else>
      <Header />
      <Sidebar />
      <router-view></router-view>
      <Footer />
    </template>
  </div>
</template>
<script>
import Header from "./inc/Header.vue";
import Sidebar from "./inc/Sidebar.vue";
import Footer from "./inc/Footer.vue";
import MainHeader from "./web/Header.vue";
import MainFooter from "./web/Footer.vue";


export default {
  components: {
    Header,
    Sidebar,
    Footer,
    MainHeader,
    MainFooter,
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
      //console.log(currentUser);
    },
  },
};
</script>
<style>
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  font-size: 0.8rem;
  line-height: 1.6;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
