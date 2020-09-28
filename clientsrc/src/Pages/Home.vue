<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-12 card d-flex justify-content-center text-center bg-dark text-light"
        >
          <form @submit.prevent="addBug">
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
                class="btn btn-danger"
                @submit.prevent="addBug"
              >
                Create Bug
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row forest-img">
        <div class="col-12 card list-boards" v-for="bug in bugs" :key="bug.id">
          <div class="list-group-item">
            <router-link
              class="list-group d-flex text-center"
              :to="{ name: 'BugDetails', params: { bugId: bug.id } }"
            >
              Bug: {{ bug.title }}
            </router-link>
            <div class="text-center">
              ||| Created By: {{ bug.creatorEmail }} ||| Created:
              {{ bug.createdAt | formatDate }} ||| Bug Squashed: {{ bug.closed
              <i
                v-if="bug.closed == true"
                class="fa fa-check"
                aria-hidden="true"
              ></i
              >}}
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
  /* background-color: black; */
}
.list-boards {
  width: 25vw;
}

.forest-img {
  background: url(https://images.unsplash.com/photo-1577209299418-485f60c0d4de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1263&q=80);
  /* height: 92vh;
  background-size: cover; */
}
</style>
