<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Market Place</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Home</router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="card card-solid">
        <div class="card-header">
          <h5>Points on Sale</h5>
        </div>
        <div class="card-body pb-0">
          <div v-if="status == 'Closed'" class="alert" role="alert">           
            <div class="col-12 text-center text-danger">
              <h4>Market Opens in </h4>
              <Countdown
                :end="nextMarket"
                showDays
                showHours
                showMinutes
                showSeconds
              ></Countdown>
              <h4 class="text-center text-primary">
                {{ new Date(nextMarket) }}
              </h4>
              <p>
                Market Place is for those who want to participate in Peer to
                Peer Investment Plans. If you want to purchase points for Pool
                Plans you do not have to wait for Market Place to open. Click on
                Buy Points from System and make your payment then submit POP.
              </p>
            </div>             
          </div>
          <div v-else-if="status == 'Finished'" class="alert" role="alert">
            <div class="col-12 text-center text-primary">
              <h4>Points Finished</h4>              
              <h5>Sorry No more points left for sell. Please check when next Market open</h5>
            </div>            
          </div>

          <div v-else class="row d-flex align-items-stretch">
            <!-- Start Card for Offers -->
            <div
              class="col-12 col-sm-6 col-md-3 d-flex align-items-stretch"
              v-for="market_place in market_places"
              v-bind:key="market_place.id"
            >
              <div class="card bg-light">
                <div class="card-header text-muted border-bottom-0">
                   ID: {{ market_place.transaction_code }}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-8">
                      <h2 class="lead">
                        <b>{{ market_place.payment_method }}</b>
                      </h2>
                      <p class="text-muted text-sm">
                        <b>Amount: </b>
                        {{ currentUser.currency_id == 2 ? "R" : "$"
                        }}{{ market_place.balance }}
                      </p>
                    </div>
                    <div class="col-4 text-center">
                      <img
                        :src="market_place.payment_method_avatar"
                        alt="avatar"
                        class="img-circle img-fluid"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <ul class="ml-4 mb-0 fa-ul text-muted">
                      <li class="small font-weight-bold">
                        <span class="fa-li"
                          ><i class="fas fa-lg fa-building"></i
                        ></span>
                        Country: {{ market_place.country }}
                      </li>
                      <li class="small font-weight-bold">
                        <span class="fa-li"
                          ><i class="fas fa-lg fa-phone"></i
                        ></span>
                        Phone #: #######
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button
                      @click="fetchValue(market_place)"
                      class="btn btn-block btn-primary"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      <i class="fas fa-gavel"></i> Offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Card for Offers -->
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </section>
    <!-- /.content -->
    <!-- Add Modal -->
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-primary">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalTitle">
              Make Your Offer
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addValue" id="myForm">
            <div class="modal-body">
              <!-- Start Card for Offers -->
              <div class="d-flex align-items-stretch">
                <div class="card bg-light">
                  <div class="card-header text-muted border-bottom-0">
                    ID: {{ form.transaction_code }}
                  </div>
                  <div class="card-body pt-0">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="lead">
                          <b>{{ form.payment_method }}</b>
                        </h2>
                        <hr />
                        <p class="text-muted text-sm">
                          <b>Amount: </b>
                          {{ currentUser.currency_id == 2 ? "R" : "$"
                          }}{{ form.balance }} |<a
                            href=""
                            @click.prevent="buyAll(form.balance)"
                          >
                            Buy All</a
                          >
                        </p>
                        <hr />
                        <ul class="ml-4 mb-0 fa-ul text-muted">
                          <li>
                            <span class="fa-li"
                              ><i class="fa fa-flag"></i
                            ></span>
                            Country: {{ form.country }}
                          </li>
                        </ul>
                      </div>
                      <div class="col-5 text-center">
                        <img
                          :src="form.avatar"
                          alt="user-avatar"
                          class="img-circle img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="form-group">
                      <label for="amount">Amount</label>
                      <input
                        type="text"
                        class="form-control"
                        id="amount"
                        name="amount"
                        placeholder="Amount"
                        v-model="form.amount"
                        :class="{
                          'is-invalid': form.errors.has('amount'),
                        }"
                      />
                      <has-error :form="form" field="amount"></has-error>
                    </div>
                    <hr />
                    <div class="form-group">
                      <div
                        class="form-check"
                        v-for="peer_package in peer_packages"
                        :key="peer_package.id"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="peer_package.id"
                          v-model="form.package_id"
                          :class="{
                            'is-invalid': form.errors.has('package_id'),
                          }"
                          :id="'radio' + peer_package.id"
                        />
                        <label class="form-check-label"
                          >{{ peer_package.name }} |
                          {{ peer_package.interest }}% |{{
                            peer_package.period
                          }}
                          days</label
                        >
                      </div>
                      <has-error :form="form" field="package_id"></has-error>
                    </div>
                    <hr />
                    <div class="card  collapsed-card">
                      <div class="card-header">
                        <h3 class="card-title">Add Comment (Not Required)</h3>
                        <div class="card-tools">
                          <button
                            type="button"
                            class="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                        <!-- /.card-tools -->
                      </div>
                      <!-- /.card-header -->
                      <div class="card-body" style="display: none;">
                        <div class="form-group">
                          <textarea
                            v-model="form.comment"
                            class="form-control"
                            rows="3"
                            placeholder="Enter Your Comment..."
                            style="margin-top: 0px; margin-bottom: 0px; height: 101px;"
                            :class="{
                              'is-invalid': form.errors.has('comment'),
                            }"
                          ></textarea>
                          <has-error :form="form" field="comment"></has-error>
                        </div>
                      </div>
                      <!-- /.card-body -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Card for Offers -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-light"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-outline-light">
                Buy Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import Countdown from "countdown-vue";
export default {
  components: { Countdown },
  data() {
    return {
      form: new Form({
        account_number: "",
        transaction_code: "",
        payment_method: "",
        balance: "",
        country: "",
        cellphone: "",
        market_place_id: "",
        payment_method_id: "",
        amount: "",
        package_id: "",
        comment: "",
        avatar: "",
      }),
      market_places: [],
      status: "",
      error_log: "",
    };
  },
  created() {
    this.fetchValues();
  },
  methods: {    
    fetchValues() {
      axios
        .get("/api/market-place") //calling the api url for packages data
        .then((response) => {
          this.market_places = response.data.data;
          this.status = response.data.status;
          console.log(response.data.status);
        })
        .catch(function(error) {
          this.error_log = error;
        });
    },
    fetchValue(form) {
      this.form.market_place_id = form.id;
      this.form.transaction_code = form.transaction_code;
      this.form.payment_method = form.payment_method;
      this.form.balance = form.balance;
      this.form.country = form.country;
      this.form.cellphone = form.cellphone;
      this.form.avatar = form.payment_method_avatar;
      this.form.payment_method_id = form.payment_method_id;
      this.form.amount = "";
      this.form.package_id = "";
      this.form.comment = "";
    },
    //---AddValue Function--//
    addValue() {
      this.form
        .post("/api/pending-payment")
        .then((data) => {
          console.log(data);
          this.flashMessage.setStrategy("single");
          this.flashMessage.success({
            title: "Succefully Saved",
            message: "Offer Successfully Placed, Pay within 12 hours",
          });
          this.fetchValues();
          $("#addModal").modal("hide");
        })
        .catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: error.response.data.message,
            footer: "Contact Support if you need help",
          });
        });
    },
    buyAll(amount) {
      this.form.amount = amount;
    },
  },
  computed: {
    peer_packages() {
      return this.$store.getters.peer_packages;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    nextMarket(){
      
      var morning_session = "2020-09-11 10:00:00";
      var afternoon_session = "2020-09-11 21:00:00"; 
      return morning_session;
    }
  },
  mounted() {
    if (this.peer_packages.length) {
      return;
    }
    this.$store.dispatch("getPeerPackages");
  },
};
</script>
