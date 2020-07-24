<template>
  <b-container>
    <h1 class="my-3">CRUD VUE/VUEX</h1>
    <b-form @submit="onSubmit" @reset="onReset">
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
        <b-button class="mx-2" type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
    <b-table
      striped
      hover
      id="my-table"
      :items="users"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <!-- A custom formatted column -->
      <template v-slot:cell(delete)="data">
        <div class="b-icon h4 text-danger mb-0">
          <b-icon-trash @click="remove(data.item)"></b-icon-trash>
        </div>
      </template>
    </b-table>
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      boxOne: "",
      fields: [
        // Regular columns
        "id",
        "first_name",
        "last_name",
        "email",
        // A virtual column made up from two fields
        { key: "delete", label: "Actions" }
      ],
      form: {
        firstName: "",
        lastName: "",
        email: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      users: "getUsers"
    }),
    rows() {
      return this.users.length;
    }
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetchUsers", "saveUser", "deleteUser"]),
    async onSubmit(evt) {
      evt.preventDefault();
      const vm = this;
      const user = {
        first_name: vm.form.firstName,
        last_name: vm.form.lastName,
        email: vm.form.email
      };
      await this.saveUser(user);
      this.onReset();
    },
    onReset() {
      this.form.email = "";
      this.form.firstName = "";
      this.form.lastName = "";
    },
    remove(user) {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to delete this user?")
        .then(value => {
          if (!value) return;
          this.deleteUser(user);
        })
        .catch(err => {
          // An error occurred
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
.b-icon {
  cursor: pointer;
}
</style>
