<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Points on Trade</h1>
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
          <h3 class="card-title">Pending Payments</h3>
          <div class="card-tools">            
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse"
            >
              <i class="fas fa-minus"></i>
            </button>            
          </div>
        </div>
        <div class="card-body pb-0">
          <div class="row col-lg-6">
            <div class="card-body pt-0">
              <div
                class="card card-widget collapsed-card"
                v-for="market_place in market_places"
                v-bind:key="market_place.id"
              >
                <div class="card-header">
                  <div class="user-block">
                    <img
                      class="img-circle"
                      src="../assets/fnb.png"
                      alt="User Image"
                    />
                    <span class="username">
                      {{ market_place.payment_method }} | ${{
                        market_place.amount
                      }}
                      | Balance: <span :class="{'text-red' : market_place.balance == 0}">$ {{ market_place.balance }}</span>
                    </span>
                    <span class="description">Time Placed - 7:30 PM Today</span>
                  </div>
                  <!-- /.user-block -->
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
                <div class="card-body text-center" style="display: none;">
                  <div
                    class="row"
                    v-for="pending_payment in market_place.pending_payments"
                    v-bind:key="pending_payment.id"
                  >
                    <div
                      v-if="pending_payment.status == 0"
                      class="card card-widget collapsed-card "
                    >
                      <div class="card-header green">
                        <div class="user-block">
                          <img
                            class="img-circle"
                            src="../assets/fnb.png"
                            alt="User Image"
                          />
                          <span class="username">
                            {{ pending_payment.payment_method }} | ${{
                              pending_payment.amount
                            }}
                            | Received
                            <i class="fas fa-check-circle"></i>
                          </span>
                          <span class="description"
                            >Time Paid - 7:30 PM Today</span
                          >
                        </div>
                        <!-- /.user-block -->
                      </div>
                    </div>
                    <!---Start Card for Unpaid Offers-->
                    <div
                      v-else-if="pending_payment.status == 101"
                      class="card card-widget collapsed-card "
                    >
                      <div class="card-header purple">
                        <div class="user-block">
                          <img
                            class="img-circle"
                            src="../assets/fnb.png"
                            alt="User Image"
                          />
                          <span class="username">
                            {{ pending_payment.payment_method }} | ${{
                              pending_payment.amount
                            }}
                            | Paid
                            <i class="fas fa-check-circle"></i>
                          </span>
                          <span class="description"
                            >Time Placed - 7:30 PM Today</span
                          >
                        </div>
                        <!-- /.user-block -->
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
                      <div class="card-body text-center" style="display: none;">
                        <div class="row">
                          <div class="col-6">
                            <label for="imageView">Proof of Payment</label>
                            <div class="imageView">
                              <img src="../assets/fnb.png" width="150" />
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group">
                              <textarea
                                class="form-control"
                                rows="3"
                                placeholder="No comment."
                                style="margin-top: 0px; margin-bottom: 0px; height: 101px;"
                                readonly
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- /.card-body -->

                      <!-- /.card-footer -->
                      <div class="card-footer" style="display: none;">
                        <button
                          class="btn btn-outline-success"
                          @click.prevent="approvePayment(pending_payment)"
                        >
                          <i class="fas fa-check-circle"></i> Yes, Payment
                          Received.
                          <i class="fas fa-smile-wink"></i>
                        </button>
                      </div>
                      <!-- /.card-footer -->
                    </div>
                    <!---Start Card for Unpaid Offers-->
                    <div v-else class="card card-widget collapsed-card ">
                      <div class="card-header amber">
                        <div class="user-block">
                          <img
                            class="img-circle"
                            src="../assets/fnb.png"
                            alt="User Image"
                          />
                          <span class="username">
                            {{ pending_payment.payment_method }} | ${{
                              pending_payment.amount
                            }}
                          </span>
                          <span class="description"
                            >Time Placed - 7:30 PM Today</span
                          >
                        </div>
                        <!-- /.user-block -->
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
                      <div class="card-body text-center" style="display: none;">
                        <div class="row">
                          <div v-if="pending_payment.status == 2">
                            <p>
                              Waiting for Payment
                              <i class="fas fa-frown-open"></i>
                            </p>
                          </div>
                          <div
                            v-if="pending_payment.status == 3"
                            class="text-red"
                          >
                            <p>
                              Cancelled / Reversed<i
                                class="fas fa-frown-open"
                              ></i>
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- /.card-body -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <p class="text-danger">
            Please make sure you complete your approval within 12 hours to avoid
            being blocked
          </p>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </section>
    <!-- /.content -->    
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
      }),
      tradeForm: new Form({
        amount: "",
        payment_detail_id: "",
        comment: "",
        reason: "",
      }),
      market_places: [],
      pending_payments: [],
      payment_details:[]
    };
  },
  created() {
    this.fetchValues();
    this.fetchPaymentMethods();
  },
  methods: {
    //---FetchValues Function--//
    fetchValues() {
      axios
        .get("/api/pending-payments") //calling the api url for packages data
        .then((response) => {
          this.market_places = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //---FetchPaymentMethods Function--//
    fetchPaymentMethods() {
      axios
        .get("/api/user-payment-details") //calling the api url for PaymentMethods data
        .then((response) => {
          this.payment_details = response.data.data;         
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //---Add Trade Function--//
    addTrade() {        
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to trade now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I do",
      }).then((result) => {
        if (result.value) {
          this.tradeForm.post("/api/market-place").then((data) => {
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Trade Created",
            });
            this.fetchValues();
            $('#addModal').modal('hide');            
          });
        }
      }),
        (err) =>
          this.flashMessage.error({
            title: "Error",
            message: "Please try again or Contact Support",
          });
    },

    //---Approve Function--//
    approvePayment(pending_payment) {
      this.form.id = pending_payment.id;
      Swal.fire({
        title: "Are you sure?",
        text: "Did you receive your payment for real?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I did!. Thanks",
      }).then((result) => {
        if (result.value) {
          this.form.post("/api/approve-payment").then((data) => {
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Payment Received",
            });
            this.fetchValues();
          });
        }
      }),
        (err) =>
          this.flashMessage.error({
            title: "Error",
            message: "Please check if the offer still exists or try again",
          });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
<style scoped>
.green {
  background-color: green;
  color: white;
}
.amber {
  background-color: yellow;
  color: black;
}

.purple {
  background-color: purple;
  color: white;
}
</style>
