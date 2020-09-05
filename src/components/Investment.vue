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
              class="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#depositModal"
            >
              <i class="fas fa-money-check-alt"></i> Buy Points / Pool Deposit
            </button>
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
                      <b>Initial Amount</b> | {{currentUser.currency_id==2 ? 'R' : '$'}}{{ investment.amount }}
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
    <!-- Deposit Modal -->
    <div
      class="modal fade"
      id="depositModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="depositModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-primary">
          <div class="modal-header">
            <h5 class="modal-title" id="depositModalTitle">
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
          <form @submit.prevent="depositInvestment" id="myForm">
            <div class="modal-body">
              <!-- Start Card for Offers -->
              <div class="d-flex align-items-stretch">
                <div class="card bg-light">
                  <div class="row">
                    <div class="card-body pt-0">
                      <div class="row">
                        <div class="col-12">
                          <ul class="ml-4 mb-0 fa-ul text-muted">
                            <li>
                              <img
                                src="../assets/bitcoin.png"
                                alt="user-avatar"
                                class="img-circle img-fluid"
                                width="20"
                              />
                              Bitcoin Address Below and Pay:
                            </li>
                            <li>
                              <div class="input-group">
                                <input
                                  type="text"
                                  id="btcAddress"
                                  class="form-control"
                                  readonly
                                  value="1P3D1Cs2GoEf2HFWyhvhddXTTFi9sDwDMD"
                                />
                                <div class="input-group-append">
                                  <div class="input-group-text">
                                    <span
                                      class="btn btn-info btn-sm text-white copy-btn ml-auto fa fa-copy"
                                      @click.stop.prevent="copyBtcAddress"
                                    >
                                      Copy
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              Please click copy button to copy the BTC Address
                              correctly
                            </li>
                            <hr>
                            <li>
                              Skril Deposit: fxauction.pool@gmail.com
                            </li>
                            <hr>
                            <li>
                             Neteller Deposit: fxauction.pool@gmail.com
                            </li>
                            <hr>
                            <li>
                              <div class="form-group">
                                <label for="amount">Amount</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="amount"
                                  name="amount"
                                  placeholder="Amount"
                                  v-model="depositForm.amount"
                                  :class="{
                                    'is-invalid': depositForm.errors.has('amount'),
                                  }"
                                />
                                <has-error
                                  :form="depositForm"
                                  field="amount"
                                ></has-error>
                              </div>
                            </li>
                            <li>
                              <div class="form-group">
                                <div
                                  class="form-check"
                                  v-for="deposit_package in deposit_packages"
                                  :key="deposit_package.id"
                                >
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    :value="deposit_package.id"
                                    v-model="depositForm.package_id"
                                    :id="'radio' + deposit_package.id"
                                    :class="{
                                    'is-invalid': depositForm.errors.has('package_id'),
                                  }"
                                  />
                                  <label class="form-check-label"
                                    >{{ deposit_package.name }} |
                                    {{ deposit_package.interest }}% |{{
                                      deposit_package.period
                                    }}
                                    days</label
                                  >                                  
                                </div>
                                <has-error
                                  :form="depositForm"
                                  field="package_id"
                                ></has-error>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <hr />
                    <div class="row">
                      <div class="col-6">
                        <div class="imageView">
                          <img :src="imageView" width="150" />
                        </div>
                        <div class="form-group">
                          <label for="pop">Proof Of Payment</label>
                          <input
                            type="file"
                            accept="image/*"
                            v-on:change="attachFile"
                            ref="formImage"
                            class="form-control"
                            id="image"
                            :class="{
                              'is-invalid': depositForm.errors.has('pop'),
                            }"
                          />
                          <has-error :form="depositForm" field="pop"></has-error>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-group">
                          <textarea
                            v-model="depositForm.comment"
                            class="form-control"
                            rows="3"
                            placeholder="Enter Your Comment..."
                            style="margin-top: 0px; margin-bottom: 0px; height: 101px;"
                            :class="{
                              'is-invalid': depositForm.errors.has('comment'),
                            }"
                          ></textarea>
                          <has-error :form="depositForm" field="comment"></has-error>
                        </div>
                      </div>
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
                Save
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
      depositForm: new Form({
        amount: "",
        payment_method_id: "1",        
        package_id: "",
        comment: "",
        pop: "",
      }),

      payment_details: [],
      imageView: "",
    };
  },
  created() {
    this.fetchPaymentMethods();
  },
  methods: {
    //Attach Image
    attachFile(e) {
      var pattern = /image-*/;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      if (image.type.match(pattern)) {
        if (image["size"] < 4000000) {
          reader.onload = (e) => {
            this.imageView = e.target.result;
            this.depositForm.pop = this.imageView;
            console.log(this.imageView);
          };
        } else {
          this.flashMessage.error({
            title: "Error",
            message: "Image is too big try to make it small",
          });
        }
      } else {
        this.flashMessage.error({
          title: "Error",
          message: "File type is not an image. Please take a screenshot of POP",
        });
      }
    },
    //Copy btc address
    copyBtcAddress() {
      let btcAddressToCopy = document.querySelector("#btcAddress");
      btcAddressToCopy.setAttribute("type", "text");
      btcAddressToCopy.select();

      try {
        var successful = document.execCommand("copy");
        this.flashMessage.setStrategy("single");
        this.flashMessage.success({
          title: "Succefully Copied",
          message: "BTC address copied to clipboard",
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }
    },
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
    //Deposit Function
    depositInvestment(){
      Swal.fire({
        title: "Are you sure?",
        text: "Did you pay your deposit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed.  I did!",
      }).then((result) => {
        if (result.value) {
          this.depositForm.post("/api/investment").then((data) => {
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Payment Submitted",
            });
          this.$store.dispatch("getInvestments");
          $("#depositModal").modal("hide");
          }).catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: error.response.data.message,
            footer: "Contact Support if you need help",
          });
        });
        }
      })
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
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    investments() {
      return this.$store.getters.investments;
    },
    deposit_packages() {
      return this.$store.getters.deposit_packages;
    },
  },
  mounted() {
    if (this.investments.length) {
      return;
    }
    this.$store.dispatch("getInvestments");
    if (this.deposit_packages.length) {
      return;
    }
    this.$store.dispatch("getDepositPackages");
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
