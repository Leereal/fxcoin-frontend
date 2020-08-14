<template>
  <div>
    <Welcome />
    <About />
    <Services />
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/web/Slider.vue";
import Welcome from "@/web/Welcome.vue";
import Services from "@/web/Services.vue";
import Register from "@/web/Register.vue";
import About from "@/web/About.vue";

export default {
  name: "Home",
  components: {
    Slider,
    Welcome,
    Services,
    Register,
    About,
  },
};
</script>
<style>
.home {
  text-align: center;
}
</style>
