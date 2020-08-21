<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Dashboard</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard" class="nav-link">Home</router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="input-group">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="ref-label">Referral / Affiliate Link</span>
                </div>
              </div>
              <input
                type="text"
                id="referral-link"
                class="form-control"
                readonly
                :value="referralLink"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span
                    class="btn btn-info btn-sm text-white copy-btn ml-auto fa fa-copy"
                    @click.stop.prevent="copyReferralLink"
                  >
                    Copy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-3 col-12">
            <router-link to="/trade">
              <!-- small box -->
              <div class="small-box bg-info">
                <div class="inner">
                  <h3>
                    {{ totals.payment }}
                    <sup style="font-size: 15px">points</sup>
                  </h3>
                  <p>Withdrawals: ${{ totals.payment }}</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer"
                  >More info <i class="fas fa-arrow-circle-right"></i
                ></a>
              </div>
            </router-link>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-12">
            <!-- small box -->
            <router-link to="/investments">
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>
                    {{ totals.balance
                    }} <sup style="font-size: 15px">points</sup>
                  </h3>
                  <p>Balance: ${{ totals.balance }}</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer"
                  >More info <i class="fas fa-arrow-circle-right"></i
                ></a>
              </div>
            </router-link>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <router-link to="/referrals">
              <div class="small-box bg-warning">
                <div class="inner">
                  <h3>{{ totals.referrals }}</h3>

                  <p>Referrals</p>
                </div>
                <div class="icon">
                  <i class="ion ion-person-add"></i>
                </div>
                <a href="#" class="small-box-footer"
                  >More info <i class="fas fa-arrow-circle-right"></i
                ></a>
              </div>
            </router-link>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <router-link to="/referral-bonus">
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>
                    {{ totals.referral_bonus }}
                    <sup style="font-size: 15px">points</sup>
                  </h3>

                  <p>Referral Bonus : ${{ totals.referral_bonus }}</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="#" class="small-box-footer"
                  >Withdraw Now <i class="fas fa-arrow-circle-right"></i
                ></a>
              </div>
            </router-link>
          </div>
          <!-- ./col -->
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3">
            <router-link to="/bonus">
              <div class="info-box">
                <span class="info-box-icon bg-info elevation-1"
                  ><i class="fas fa-wallet"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Other Bonus</span>
                  <span class="info-box-number">
                    {{ totals.bonus }}
                    <small>points</small>
                  </span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
            </router-link>
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <router-link to="/offers">
              <div class="info-box mb-3">
                <span class="info-box-icon bg-danger elevation-1"
                  ><i class="fas fa-gavel"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Offers</span>
                  <span class="info-box-number"
                    >{{ totals.offers }} <small>points</small></span
                  >
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
            </router-link>
          </div>
          <!-- /.col -->

          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>

          <div class="col-12 col-sm-6 col-md-3">
            <router-link to="/trade">
              <div class="info-box mb-3">
                <span class="info-box-icon bg-success elevation-1"
                  ><i class="fas fa-shopping-cart"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Points on Sale</span>
                  <span class="info-box-number"
                    >{{ totals.sales }} <small>points</small></span
                  >
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
            </router-link>
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <router-link to="/referrals">
              <div class="info-box mb-3">
                <span class="info-box-icon bg-warning elevation-1"
                  ><i class="fas fa-users"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Active Referrals</span>
                  <span class="info-box-number">{{
                    totals.active_members
                  }}</span>
                </div>
                <!-- /.info-box-content -->
              </div>
              <!-- /.info-box -->
            </router-link>
          </div>
          <!-- /.col -->
        </div>
        <div class="row">
          <!-- Left col -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Running Investments</h3>
                <div class="card-tools">
                  <button
                    type="button"
                    class="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i class="fas fa-minus"></i>
                  </button>                  
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body p-0">
                <ul class="products-list product-list-in-card pl-2 pr-2">
                  <li class="item" v-for="investment in investments.slice(0,4)" :key="investment.id">
                    <div class="product-img">
                      <img
                       :src="[investment.status!=1 ? require('../assets/pending.png') : require('../assets/success.png')]"                     
                        alt="Status"
                        class="img-size-50"
                      />
                    </div>
                    <div class="product-info">
                      <a href="javascript:void(0)" class="product-title"
                        >{{investment.package}}
                        <span class="float-right"
                        :class="[investment.status!=1 ? ' badge badge-primary' :'badge badge-success']"
                          >${{investment.balance}}</span
                        ></a
                      >
                      <span class="product-description">
                       Maturity Date is {{investment.due_date | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
                      </span>
                    </div>
                  </li>                 
                </ul>
              </div>
              <!-- /.card-body -->
              <div class="card-footer text-center">
                <router-link to="/investments" class="uppercase"
                  >View All Investments</router-link
                >
              </div>
              <!-- /.card-footer -->
            </div>
          </div>
          <!-- /.col -->

          <div class="col-md-4">
            <!-- Info Boxes Style 2 -->
            <div class="info-box mb-3 bg-twitter">
              <router-link to="www.twitter.com">
                <span class="info-box-icon"
                  ><i class="fab fa-twitter"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Twitter</span>
                  <span class="info-box-number">Follow Us</span>
                </div>
                <!-- /.info-box-content -->
              </router-link>
            </div>
            <!-- /.info-box -->
            <div class="info-box mb-3 bg-facebook">
              <router-link to="www.facebook.com">
                <span class="info-box-icon"
                  ><i class="fab fa-facebook"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Facebook Group</span>
                  <span class="info-box-number">Join Now</span>
                </div>
                <!-- /.info-box-content -->
              </router-link>
            </div>
            <!-- /.info-box -->
            <div class="info-box mb-3 bg-telegram">
              <router-link to="www.telegram.com">
                <span class="info-box-icon"
                  ><i class="fab fa-telegram"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">Telegram Group</span>
                  <span class="info-box-number">Join Now</span>
                </div>
                <!-- /.info-box-content -->
              </router-link>
            </div>
            <!-- /.info-box -->
            <div class="info-box mb-3 bg-green">
              <router-link to="www.whatsapp.com">
                <span class="info-box-icon"
                  ><i class="fab fa-whatsapp"></i
                ></span>

                <div class="info-box-content">
                  <span class="info-box-text">WhatsApp Group</span>
                  <span class="info-box-number">Join Now</span>
                </div>
              </router-link>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.fetchValues();
     if (this.totals.length) {
      return;
    }
    if (this.investments.length) {
      return;
    }
    this.$store.dispatch("getTotals");
    this.$store.dispatch("getInvestments");
  },
  methods: {
    //---FetchValues Function--//
    fetchValues() {
      axios
        .get("/api/user-pending-payments") //calling the api url for packages data
        .then((response) => {
          this.market_places = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    copyReferralLink() {
      let referralLinkToCopy = document.querySelector("#referral-link");
      referralLinkToCopy.setAttribute("type", "text");
      referralLinkToCopy.select();

      try {
        var successful = document.execCommand("copy");
        this.flashMessage.setStrategy("single");
        this.flashMessage.success({
          title: "Succefully Copied",
          message: "Link was successfully copied to clipboard",
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }
    },
  },
  mounted() {
   
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    totals() {
      return this.$store.getters.totals;
    },
    investments() {
      return this.$store.getters.investments;
    },
    referralLink() {
      return this.$ipAdr + "/register?ref=" + this.currentUser.username;
    },
  },
};
</script>
<style scoped>
.ref-label {
  color: red;
}
.inner-title {
  font-size: 200%;
}
.bg-telegram {
  background-color: #0088cc;
  color: white;
}
.bg-telegram > a,
.bg-twitter > a,
.bg-facebook > a {
  color: white;
}
.bg-twitter {
  background-color: #00acee;
  color: white;
}
.bg-facebook {
  background-color: #3b5998;
  color: white;
}
</style>
