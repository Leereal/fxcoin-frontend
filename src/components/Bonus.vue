<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Bonus</h1>
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
            <div class="card-body">
              <table class="table table-bordered table-striped col-12">
                <thead>
                  <tr>
                    <th>Date Received</th>                  
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="bonus in bonuses"
                    :key="bonus.id"
                  >
                    <td>
                      {{
                        bonus.date
                          | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                      }}
                    </td>                  
                    <td>{{ bonus.description }}</td>
                    <td>{{currentUser.currency_id==2 ? 'R' : '$'}}{{ bonus.amount }}</td>
                  </tr>
                </tbody>                
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                v-bind:class="[{ disabled: !pagination.prev_page_url }]"
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="fetchValues(pagination.prev_page_url)"
                  >Previous</a
                >
              </li>
              <li class="page-item disabled">
                <a class="page-link text-dark" href="#"
                  >Page {{ pagination.current_page }} of
                  {{ pagination.last_page }}</a
                >
              </li>
              <li
                v-bind:class="[{ disabled: !pagination.next_page_url }]"
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="fetchValues(pagination.next_page_url)"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
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
     bonuses: [],
      pagination: {},
    };
  },
  created() {
    this.fetchValues(); //Calling function/method to output data after component created
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    referralLink() {
      return (
        this.$ipAdr +
        "/register?ref=" +
        this.$store.getters.currentUser.username
      );
    },
  },
  methods: {
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
    //---Pagination Function--//
    makePagination(meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next_page_url: links.next,
        prev_page_url: links.prev,
      };
      this.pagination = pagination;
    },
    //---End Pagination Function--//
    //---FetchValues Function--//
    fetchValues() {
      let vm = this;
      axios
        .get("/api/user-bonus") //calling the api url for packages data
        .then((response) => {
          this.bonuses = response.data.data;
          vm.makePagination(response.data.meta, response.data.links);
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
@media (max-width: 576px) {
  table{
    font-size: 70%;
  }
    
}
</style>
