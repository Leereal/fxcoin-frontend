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
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5f397632b7f44f406e95455d/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
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
@media (max-width: 576px) {
  .wrapper{
    font-size: 100%;    
  }    
}
</style>
