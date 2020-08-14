<template>
<div>
     <!-- Start Footer -->
    <footer class="footer-box">
        <div class="container">
            <div class="row">
               <div class="col-md-12 white_fonts">
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-3">
                            <div class="full">
                                <img class="img-responsive" src="../assets/logo.png" alt="#" />
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                            <div class="full">
                                <h3>Quick Links</h3>
                            </div>
                            <div class="full">
                                <ul class="menu_footer">
                                    <li><router-link to="/home"> >Home</router-link></li>
                                    <li><router-link to="/register"> >Get Registered Now</router-link></li>
                                    <li><router-link to="/login"> >Already a Member</router-link></li>                                    
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                            <div class="full">
                                <div class="footer_blog full white_fonts">
                             <h3>Forex</h3>
                             <p>Make money, learn and earn at the same time. It's not too late to change your lifestyle</p>
                             <div class="newsletter_form">
                                <form action="index.html">
                                   <input type="email" placeholder="Your Email" name="#" required="">
                                   <button>Submit</button>
                                </form>
                             </div>
                         </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                            <div class="full">
                                <div class="footer_blog full white_fonts">
                             <h3>Contact us</h3>
                             <ul class="full">
                               <li><img src="../assets/front/images/i5.png"><span>300 Madison Ave,<br> New York, NY 10017, <br>United States</span></li>
                               <li><img src="../assets/front/images/i6.png"><span>info@fxauction.com</span></li>
                               <li><img src="../assets/front/images/i7.png"><span>+1 440 230 6276</span></li>
                             </ul>
                         </div>
                            </div>
                        </div>
					</div>
                </div>
			 </div>
        </div>
    </footer>
    <!-- End Footer -->

    <div class="footer_bottom">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <p class="crp">© Copyrights {{ $moment().year() }}</p>
                </div>
            </div>
        </div>
    </div>

    <a href="#" id="scroll-to-top" class="hvr-radial-out"><i class="fa fa-angle-up"></i></a>

</div>
</template>

<script scoped>
export default {

}
</script>
<style scoped src="@/assets/style.css">
footer.footer-box h3{

    border-bottom: solid red 4px;

}
 
</style>