<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Offers</h1>
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
        <div class="card-body pb-0">
          <div  v-if="alloffers" class="row d-flex align-items-stretch">
          <div v-for="alloffer in alloffers" :key="alloffer.id" class="info-box bg-warning col-12 col-sm-6 col-md-6 d-flex align-items-stretch ">
            <span class="info-box-icon"
              ><i class="fas fa-spinner fa-pulse"></i></span>
            <div class="info-box-content">
              <span class="info-box-number"
                >You paid <span class="text-success">{{ currentUser.currency_id == 2 ? "R" : "$"}}{{alloffer.amount}}</span> waiting for approval</span>
              <div class="progress">
                <div class="progress-bar" style="width: 100%"></div>
              </div>
              <span class="progress-description inline-block">
                Please be patient
              </span>
            </div>
          </div>
          </div>
          <div v-if="offers.length == 0" class="alert alert-primary">
            It looks like you paid all your offers. There is nothing to pay
            here. Wait for Market Place to Open and then place your Offer.
          </div>
          <div class="row col-12 col-lg-8">
            <div class="card-body pt-0">
              <form>
                <div
                  class="card card-widget collapsed-card"
                  style="display:block"
                  v-for="offer in offers"
                  v-bind:key="offer.id"
                >
                  <div class="card-header">
                    <div class="user-block">
                      <img
                        class="img-circle"
                        :src="offer.payment_method_avatar"
                        alt="User Image"
                      />
                      <span class="username">
                        {{ offer.payment_method }} |
                        {{ currentUser.currency_id == 2 ? "R" : "$"
                        }}{{ offer.amount }} | <span class="text-danger">Please pay. Click +</span>
                      </span>
                      <span class="description"
                        >Time Placed -
                        {{
                          offer.offer_time
                            | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                        }}
                      </span>
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
                  <div class="card-body text-left" style="display: none;">
                    <div class="row">
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li>
                          <span class="fa-li"
                            ><i class="fas fa-piggy-bank"></i
                          ></span>
                          Account Holder Name: {{ offer.account_holder }}
                        </li>
                        <hr />
                        <li>
                          <span class="fa-li"
                            ><i class="fas fa-piggy-bank"></i
                          ></span>
                          Account: {{ offer.account_to_pay }}
                        </li>
                        <hr />
                        <li v-if="currentUser.currency_id == 2">
                          <span class="fa-li"
                            ><i class="fas fa-lg fa-phone"></i
                          ></span>
                          Branch: {{ offer.branch }}
                        </li>
                        <hr v-if="currentUser.currency_id == 2" />
                        <li v-if="currentUser.currency_id == 2">
                          <span class="fa-li"
                            ><i class="fas fa-lg fa-phone"></i
                          ></span>
                          Account Type: {{ offer.account_type }}
                        </li>
                        <hr v-if="currentUser.currency_id == 2" />
                        <li>
                          <span class="fa-li"
                            ><i class="fas fa-lg fa-phone"></i
                          ></span>
                          Phone #: {{ offer.cellphone }}
                        </li>
                      </ul>
                    </div>
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
                              'is-invalid': form.errors.has('comment'),
                            }"
                          />
                          <has-error :form="form" field="comment"></has-error>
                        </div>
                      </div>
                      <div class="col-6">
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
                    </div>
                  </div>
                  <!-- /.card-body -->

                  <!-- /.card-footer -->
                  <div class="card-footer" style="display: none;">
                    <button class="btn btn-outline-danger float-left" disabled>
                      Cancel Offer <i class="fas fa-times-circle"></i>
                    </button>
                    <button
                      class="btn btn-outline-success float-right"
                      @click.prevent="makePayment(offer)"
                    >
                      <i class="fas fa-check-circle"></i> Make Payment
                    </button>
                  </div>
                  <!-- /.card-footer -->
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <p class="text-danger">
            Please make sure you complete your payments within 12 hours to avoid
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
        pop: "",
        comment: "",
        id: "",
      }),
      offers: [],
      alloffers: [],
      imageView: "",
      file: "",
    };
  },
  created() {
    this.fetchValues();
    this.fetchAllOffers();
  },
  methods: {
    //Attach Image
    attachFile(e) {
      var pattern = /image-*/;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      if (image.type.match(pattern)) {
        if (image["size"] < 10000000) {
          reader.onload = (e) => {
            this.imageView = e.target.result;
            this.form.pop = this.imageView;
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
    //---FetchValues Function--//
    fetchValues() {
      axios
        .get("/api/offers") //calling the api url for packages data
        .then((response) => {
          this.offers = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //---FetchValues Function--//
    fetchAllOffers() {
      axios
        .get("/api/all-offers") //calling the api url for packages data
        .then((response) => {
          this.alloffers = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //---AddValue Function--//
    makePayment(offer) {
      this.form.id = offer.id;
      Swal.fire({
        title: "Are you sure?",
        text: "Did you pay the required amount",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed.  I did!",
      }).then((result) => {
        if (result.value) {
          this.form.post("/api/make-payment").then((data) => {
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Payment Submitted",
            });
            this.fetchValues();
            this.fetchAllOffers();
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
<style scoped></style>
