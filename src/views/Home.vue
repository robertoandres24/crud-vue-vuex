<template>
  <div class="home container">
    <h1 class="mb-4">Crud Vue Vuex</h1>
    <div class="people-list">
      <div class="bg-secondary header my-2 p-2 row">
        <div class="col">id</div>
        <div class="col">Nombre</div>
        <div class="col">Apellido</div>
        <div class="col">Email</div>
      </div>
      <div class="body">
        <div v-for="p in people" :key="p.id" class="row">
          <div class="col">{{ p.id }}</div>
          <div class="col">{{ p.first_name }}</div>
          <div class="col">{{ p.last_name }}</div>
          <div class="col">{{ p.email }}</div>
        </div>
      </div>
    </div>
  </div>
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
