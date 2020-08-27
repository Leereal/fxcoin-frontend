<template>
  <div class="container-fluid">
    <!-- Start Slider -->
    <div id="slides" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#slides" data-slide-to="0" class="active">MmMm</li>
        <li data-target="#slides" data-slide-to="1"></li>
        <li data-target="#slides" data-slide-to="2"></li>
      </ul>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img  class="img-fluid" src="../assets/home.jpg" alt="caurosel image 1" />
          <div class="carousel-caption first-caption">
            <h1>FXAuction</h1>
            <h3>Investment today is a source of income tomorrow</h3>
            <router-link to="/register">
            <button
              type="button"
              class="btn btn-lg btn-outline-light register-btn "
            >
              Register Now
            </button>
            </router-link>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/money.jpg" alt="caurosel image 2" />
          <div class="carousel-caption">           
            <h3>Investment today is a source of income tomorrow</h3>
            <router-link to="/register">
            <button
              type="button"
              class="btn btn-lg btn-outline-light register-btn "
            >
              Join Today
            </button>
            </router-link>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/happy.jpg" alt="caurosel image 3" />
          <div class="carousel-caption">           
            <h3>Be happy, No stress</h3>
            <router-link to="/register">
            <button
              type="button"
              class="btn btn-lg btn-outline-light register-btn "
            >
              Register Now
            </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- End Slider -->
  </div>
</template>

<script>
export default {};
</script>
<style>
.carousel-inner img {
  width: 100%;
  height: 100%;
}
.carousel-caption {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.carousel-caption h1 {
  font-size: 500%;
  text-transform: uppercase;
  text-shadow: 1px 1px 10px #000;
}
.carousel-caption h3 {
  font-size: 200%;
  font-weight: 500;
  text-transform: uppercase;
  text-shadow: 1px 1px 15px #000;
}
.register-btn {
  background-color: blue !important;
}

@media (max-width: 768px) {
  .carousel-caption {
    top: 45%;
  }
  .carousel-caption h1 {
    font-size: 350%;
  }
  .carousel-caption h3 {
    font-size: 140%;
    font-weight: 500;
    padding-bottom: 0.2rem;
  }
  .carousel-caption .btn{
    font-size: 95%;
    padding: 8px 14px;
  }
}

@media (max-width: 576px) {
  .carousel-caption {
    top: 40%;
  }
  .first-caption {
    top: 25%;
  }
  
  .carousel-caption h1 {
    font-size: 250%;
  }
  .carousel-caption h3 {
    font-size: 110%;
    font-weight: 500;
    padding-bottom: 0.2rem;
  }
  .carousel-caption .btn{
    font-size: 90%;
    padding: 4px 8px;
  }
  .carousel-indicators{
    display: none;
  }
}
</style>
