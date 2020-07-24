<template>
  <b-container>
    <h1 class="my-3">CRUD VUE/VUEX</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Your First Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.firstName"
          required
          placeholder="Enter first name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Your Last Name:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.lastName"
          required
          placeholder="Enter last name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Email address:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <div class="my-3">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
    <b-table
      striped
      hover
      id="my-table"
      :items="users"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      users: [],
      form: {
        firstName: "",
        lastName: "",
        email: ""
      },
      show: true
    };
  },
  computed: {
    rows() {
      return this.users.length;
    }
  },
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const { data: users } = await this.$axios.get("people");
      this.users = users;
    },
    async saveUser() {
      const vm = this;
      const user = {
        first_name: vm.form.firstName,
        last_name: vm.form.lastName,
        email: vm.form.email
      };
      const { data: userCreated } = await this.$axios.post("people", user);
      console.log("saveUser -> userCreated", userCreated);
      this.onReset();
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.saveUser();
    },
    onReset() {
      // evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.firstName = "";
      this.form.lastName = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
