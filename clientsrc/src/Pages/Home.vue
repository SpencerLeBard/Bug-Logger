<template>
  <div class="home">
    <div class="container-fluid bg-secondary">
      <div class="row">
        <div class="col text-center bg-secondary text-light text-center">
          <form
            @submit.prevent="addBug"
            class="justify-content-center text-center"
          >
            Report Bugs Here!
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
                class="btn btn-danger mr-5 col-12"
                @submit.prevent="addBug"
              >
                Create Bug
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row ml-5">
        <div
          class="col-11 ml-2 m-1 list-boards d-flex justify-content-center"
          v-for="bug in bugs"
          :key="bug.id"
        >
          <div class="list-group-item">
            <router-link
              class="list-group d-flex text-center"
              :to="{ name: 'BugDetails', params: { bugId: bug.id } }"
            >
              Bug Title: {{ bug.title }}
            </router-link>
            <div class="text-center">
              ||| Created By: {{ bug.creatorEmail }} ||| Created:
              {{ bug.createdAt | formatDate }} ||| Bug Squashed:
              {{ bug.closed }}
              <p>
                <i
                  v-if="bug.closed == true"
                  class="fa fa-check"
                  aria-hidden="true"
                ></i>
              </p>
            </div>
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
.list-boards:hover {
  transform: scale(1.07);
  transition: 0.15s ease;
}
</style>
