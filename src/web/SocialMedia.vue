<template>
  <div class="container-fluid padding">
      <hr class="my-4">
    <div class="row text-center padding">
      <div class="col-12">
        <h2>Connect</h2>
      </div>
      <div class="col-12 social padding">
          <a href="facebook.com"> <i class="fab fa-facebook"></i></a>
          <a href="facebook.com"> <i class="fab fa-twitter"></i></a>
          <a href="facebook.com"> <i class="fab fa-whatsapp"></i></a>
          <a href="facebook.com"> <i class="fab fa-telegram"></i></a>
          <a href="facebook.com"> <i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
.social a{
    font-size: 4.5em;
    padding: 3rem;
}
.fa-telegram{
    color: #0088cc;
}
.fa-facebook{
    color: #3b5998;
}
.fa-twitter{
    color: #00acee;
}
.fa-whatsapp{
    color: #25D366;
}
.fa-instagram{
    color: #405DE6;
}
.fa-telegram:hover,
.fa-facebook:hover,
.fa-twitter:hover,
.fa-whatsapp:hover,
.fa-instagram:hover{
    color: red;
}

@media (max-width: 992px) {
    .social{
        font-size: 10px;
        padding: 2rem;
    }    
}
@media (max-width: 768px) {
    .social{
        font-size: 8px;
        padding: 1.2rem;
    }    
}
@media (max-width: 576px) {
    .social{
        font-size: 6px;
        padding: .7rem;
    }    
}
</style>
