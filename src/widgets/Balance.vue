<template>
  <!-- small box -->
  <router-link to="/investments">
    <div class="small-box bg-success">
      <div class="inner">
        <h3>300 000 <sup style="font-size: 20px">points</sup></h3>
        <p>Balance: $300 000</p>
      </div>
      <div class="icon">
        <i class="ion ion-stats-bars"></i>
      </div>
      <a href="#" class="small-box-footer"
        >More info <i class="fas fa-arrow-circle-right"></i
      ></a>
    </div>
  </router-link>
</template>

<script>
export default {
  computed: {
    investments() {
      return this.$store.getters.investments;
    },
  },
  mounted() {
    if (this.investments.length) {
      return;
    }
    this.$store.dispatch("getInvestments");
  },
};
</script>

<style></style>
