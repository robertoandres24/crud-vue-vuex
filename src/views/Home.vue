<template>
  <b-container>
    <h1 class="my-3">CRUD VUE/VUEX</h1>
    <b-table striped hover :items="people"></b-table>
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
      people: []
    };
  },
  async created() {
    const { data: people } = await this.$axios.get("people?_page=1&_limit=10");
    console.log("created -> people", people);
    this.people = people;
  }
};
</script>
