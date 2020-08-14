<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Investments</h1>
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
          <h3 class="card-title">Total Investments</h3>
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
                v-for="investment in investments"
                v-bind:key="investment.id"
              >
                <div class="card-header">
                  <div
                    class="user-block row"
                    :class="[
                      investment.status != 1 ? 'text-primary' : 'text-success',
                    ]"
                  >
                    <span class="username">
                      <b>Initial Amount</b> | ${{ investment.amount }}
                      | Balance:
                      <span>$ {{ investment.balance }}</span>
                    </span>
                    <span class="description"
                      >Mature By -
                      {{
                        investment.due_date
                          | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                      }}</span
                    >
                  </div>
                  <!-- /.user-block -->
                  <div class="float-right">
                    <span data-toggle="modal" data-target="#addModal">
                      <button
                        @click="fetchValue(investment)"
                        class="btn btn-sm rounded-0"
                        :class="[
                          investment.status != 1
                            ? 'btn-primary'
                            : 'btn-success',
                        ]"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Trade"
                        data-original-title="Trade"
                        :disabled="investment.status != 1"
                      >
                        <i class="fas fa-money-check-alt"></i> Trade
                      </button>
                    </span>
                  </div>
                </div>
                <!-- /.card-header -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <p class="text-danger">
            Thank you for investing. It's now time to wait for your investment
            to mature and then sale on Market Place
          </p>
        </div>
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
              Sell Your Points
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
          <form @submit.prevent="addTrade" id="addValue">
            <div class="modal-body">
              <div class="form-group">
                <label for="amount"
                  >Amount (Balance:
                  <a
                    class="addfield"
                    href=""
                    @click.prevent="buyAll(tradeForm.balance)"
                    >${{ tradeForm.balance }}</a
                  >)</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="amount"
                  name="amount"
                  v-model="tradeForm.amount"
                  :class="{
                    'is-invalid': tradeForm.errors.has('amount'),
                  }"
                />
                <has-error :form="tradeForm" field="amount"></has-error>
              </div>
              <div class="form-group">
                <label for="payment_detail_id">Payment Method</label>
                <select
                  class="form-control"
                  id="payment_detail_id"
                  v-model="tradeForm.payment_detail_id"
                  name="payment_detail_id"
                  :class="{
                    'is-invalid': tradeForm.errors.has('payment_detail_id'),
                  }"
                >
                  <option value="">Select Payment Method</option>
                  <option
                    v-for="payment_detail in payment_details"
                    v-bind:key="payment_detail.id"
                    :value="payment_detail.id"
                    >{{ payment_detail.payment_method }}</option
                  >
                </select>
                <has-error
                  :form="tradeForm"
                  field="payment_detail_id"
                ></has-error>
              </div>
              <div class="form-group">
                <textarea
                  v-model="tradeForm.comment"
                  class="form-control"
                  rows="3"
                  placeholder="Enter Your Comment..."
                  style="margin-top: 0px; margin-bottom: 0px; height: 101px;"
                  :class="{
                    'is-invalid': tradeForm.errors.has('comment'),
                  }"
                ></textarea>
                <has-error :form="tradeForm" field="comment"></has-error>
              </div>
              <div class="form-group">
                <label for="reason">Reason</label>
                <select
                  class="form-control"
                  id="reason"
                  v-model="tradeForm.reason"
                  name="reason"
                  :class="{
                    'is-invalid': tradeForm.errors.has('reason'),
                  }"
                >
                  <option value="">Select Reason</option>
                  <option value="Need Money">Need Money</option>
                  <option value="Closing Account">Closing Account</option>
                </select>
                <has-error :form="tradeForm" field="reason"></has-error>
              </div>
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
                Trade Now
              </button>
              <has-error :form="tradeForm" field="errors"></has-error>
            </div>
          </form>
        </div>
      </div>
    </div>
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
        investment_id: "",
        amount: "",
        balance: "",
        payment_detail_id: "",
        comment: "",
        reason: "",
        due_date: "",
      }),
      market_places: [],
      payment_details: [],
    };
  },
  created() {
    this.fetchPaymentMethods();
  },
  methods: {
    buyAll(amount) {
      this.tradeForm.amount = amount;
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

    fetchValue(form) {
      this.tradeForm.investment_id = form.id;
      this.tradeForm.balance = form.balance;
      this.tradeForm.due_date = form.due_date;
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
          this.tradeForm
            .post("/api/market-place")
            .then((data) => {
              this.flashMessage.setStrategy("single");
              this.flashMessage.success({
                title: "Succefully Saved",
                message: "Trade Created",
              });
              console.log(data);
              this.$store.dispatch("getInvestments");
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
        }
      });
      // (err) =>
      //   this.flashMessage.error({
      //     title: "Error",
      //     message: "Please try again or Contact Support",
      //   });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
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
.addfield {
  color: white;
}
</style>
