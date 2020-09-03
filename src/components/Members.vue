<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Members</h1>
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
        <div class="card-header">
          <h3 class="card-title">Members</h3>

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
        <div class="card-body" style="overflow-x:auto;">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date Joined</th>
                <th scope="col">First Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Cellphone</th>
                <th scope="col">Country</th>
                <th scope="col">Currency</th>
                <th scope="col">Affiliates</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in members" v-bind:key="member.id">
                <td>{{ member.id }}</td>
                <td>
                  {{
                    member.registration_date
                      | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                  }}
                </td>
                <td>{{ member.firstname }}</td>
                <td>{{ member.surname }}</td>
                <td>{{ member.username }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.cellphone }}</td>
                <td>{{ member.country }}</td>
                <td>{{ member.currency }}</td>
                <td>{{ member.affiliates }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
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
      members: [],
    };
  },
  methods: {
    //---FetchValues Function--//
    fetchValues() {
      axios
        .get("/api/users") //calling the api url for packages data
        .then((response) => {
          this.members = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchValues();
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
};
</script>
<style scoped>

td {overflow:hidden; white-space:nowrap}
@media (max-width: 576px) {
  table {
    font-size: 50%;
  }
}
</style>
