<template>
  <div id="home">
    <Slider/>
    <Welcome />
    <ThreeColumn/>    
    <Register />
    <Plans/>
    <SocialMdeia/>
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/web/Slider.vue";
import Welcome from "@/web/Welcome.vue";
import Register from "@/web/Register.vue";
import ThreeColumn from "@/web/ThreeColumn.vue";
import Plans from "@/web/Plans.vue";
import SocialMdeia from '@/web/SocialMedia.vue';


export default {
  name: "Home",
  components: {
    Slider,
    Welcome,
    Register,
    ThreeColumn,
    Plans,
    SocialMdeia,
  },
};
</script>
<style>
#home{
height: 100%;
width: 100%;
font-family: 'Poppins' sans-serif;
color: #222;
}
</style>
