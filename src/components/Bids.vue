<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>All Pending Payments</h1>
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
      <!-- Default box -->
      <div class="card">
        <div class="card-body">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body" style="overflow-x:auto;">
              <table class="table table-bordered table-striped table-sm col-12">
                <thead>
                  <tr>
                    <!-- <th>Market Place Date</th> -->
                    <th>Placed By</th>       
                    <th>Amount</th> 
                    <th>Bid Time</th>
                    <th>Bidder First Name</th>
                    <th>Bidder Surname</th> 
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Account Holder</th>    
                    <th>Proof</th>  
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="bid in bids"
                    :key="bid.id"
                  >
                    <!-- <td>
                      {{
                        bid.market_place_date
                          | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                      }}
                    </td>                    -->
                    <td>{{ bid.placed_by}}</td>               
                    <td>{{ bid.currency}}{{ bid.amount}}</td>
                    <td>{{ bid.offer_time | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td> 
                    <td>{{ bid.firstname}}</td> 
                    <td>{{ bid.surname}}</td>
                    <td v-if="bid.status == 0"><badge class="bg-success">Approved</badge></td>
                    <td v-if="bid.status == 2"><badge class="bg-warning">Not Yet Paid</badge></td> 
                    <td v-if="bid.status == 101"><badge class="bg-primary">Waiting Approval</badge></td>   
                    <td>{{ bid.method_to_pay}}</td>   
                    <td>{{ bid.account_holder}}</td>
                    <td>{{ bid.pop}}</td>      
                                                          
                  </tr>
                </tbody>               
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          
        </div>
        <!-- /.card-footer-->
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
      bids: [],    
    };
  },
  created() {
    this.fetchValues(); //Calling function/method to output data after component created
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },    
  },
  methods: {   
    fetchValues() {    
      axios
        .get("/api/pending-payment") //calling the api url for packages data
        .then((response) => {
          this.bids = response.data.data;       
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //---End FetchValues Function--//
  },
};
</script>
<style scoped>
td {overflow:hidden; white-space:nowrap}
th {overflow:hidden; white-space:nowrap}
@media (max-width: 576px) {
  .card-body{
    font-size: 70%;
  }
    
}
</style>

