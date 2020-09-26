<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <form @submit.prevent="addBug">
          <input
            class="form-control"
            type="text"
            placeholder="Bug Title ... "
            v-model="newBug.title"
            required
          />
          <input
            class="form-control"
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
        <div class="col card" v-for="bug in bugs" :key="bug.id">
          BUGS IN CARD HERE
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
