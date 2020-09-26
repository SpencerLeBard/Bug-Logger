<template>
  <div>
    <h1>{{ bug.title }}</h1>
    <h1>{{ bug.description }}</h1>
    <h1>{{ bug.updatedAt }}</h1>
  </div>
</template>

<script>
export default {
  name: "BugDetails",
  props: ["bugId"],
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
  },
  data() {
    return {
      bugData: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
  },
};
</script>

<style>
</style>