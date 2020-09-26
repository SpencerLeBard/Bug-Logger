<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col card" v-for="bug in bugs" :key="bug.id">
          card here
          <div class="list-group-item">
            <router-link
              class="list-group"
              :to="{ name: 'bug', params: { bugId: bug.id } }"
              >{{ bug.title }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs", this.$route.params.bugId);
  },
  data() {
    return {
      newBug: {
        title: "",
        discription: "",
      },
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {},
};
</script>
