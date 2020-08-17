<template>
  <div>
    <Slider/>
    <Welcome />
    <ThreeColumn/>    
    <Register />
    <Plans/>
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/web/Slider.vue";
import Welcome from "@/web/Welcome.vue";
import Register from "@/web/Register.vue";
import ThreeColumn from "@/web/ThreeColumn.vue";
import Plans from "@/web/Plans.vue";

export default {
  name: "Home",
  components: {
    Slider,
    Welcome,
    Register,
    ThreeColumn,
    Plans,
  },
};
</script>
<style>
.home {
  text-align: center;
}
</style>
