<template>
  <b-container>
    <h1 class="my-3">CRUD VUE/VUEX</h1>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-table
      striped
      hover
      id="my-table"
      :items="people"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
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
      people: []
    };
  },
  computed: {
    rows() {
      return this.people.length;
    }
  },
  async created() {
    this.fetchPeople();
  },
  methods: {
    async fetchPeople() {
      const { data: people } = await this.$axios.get("people");
      this.people = people;
    }
  }
};
</script>
