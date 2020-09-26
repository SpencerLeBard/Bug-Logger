<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col card d-flex justify-content-center text-center bg-dark text-light"
        >
          <form @submit.prevent="addBug">
            Create Bug Here!
            <input
              class="form-control create-bug-title"
              type="text"
              placeholder="Bug Title ... "
              v-model="newBug.title"
              required
            />
            <input
              class="form-control create-bug-desc"
              type="text"
              placeholder="Description ..."
              v-model="newBug.description"
            />
            <div class="modal-footer justify-content-center">
              <button
                type="submit"
                class="btn btn-danger"
                @submit.prevent="addBug"
              >
                Create Bug
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-12 card" v-for="bug in bugs" :key="bug.id">
          <div class="list-group-item">
            <router-link
              class="list-group"
              :to="{ name: 'BugDetails', params: { bugId: bug.id } }"
              >{{ bug.title }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BugDetails from "../Pages/BugDetails";
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
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
    },
  },
  components: {
    BugDetails,
  },
};
</script>
<style scoped>
/* .create-bug-title {
  width: 10vw;
}
.create-bug-desc {
  width: 10vw;
} */
</style>
