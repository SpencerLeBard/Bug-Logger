<template>
  <div class="container-fluid bg-secondary con-full">
    <div class="row bg-secondary align-items-center">
      <div class="col-2 bg-dark text-light offset-2">
        <h3>Last Updated On: {{ bug.updatedAt | formatDate }}</h3>
      </div>
      <div class="col-4 ml-5 card bg-dark text-light">
        <h1 v-if="bug.title && !editToggle">Bug Name: {{ bug.title }}</h1>
        <i
          v-if="bug.closed == false"
          class="fa fa-cog btn big-button bg-dark text-light"
          aria-hidden="true"
          role="button"
          data-toggle="dropdown"
        ></i>
        <div class="btn-group dropright">
          <div class="dropdown-menu ml-1 text-center">
            <p class="btn" @click="editToggle = !editToggle">Edit Bug</p>
            <p class="btn" @click="closeBug">Close Bug</p>
          </div>
          <h4 v-if="bug.description && !editToggle">
            Bug Description: {{ bug.description }} <br />
            Bug Squashed Status:
            {{ bug.closed }}
          </h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div id="editForm card">
          <form class="form" @submit.prevent="editBug" v-if="editToggle">
            <input
              type="text"
              class="form-control mb-2"
              aria-describedby="helpId"
              v-model="bugData.title"
              placeholder=" New Bug Title..."
            />
            <input
              type="text"
              class="form-control"
              aria-describedby="helpId"
              v-model="bugData.description"
              placeholder="New Bug Description..."
            />
            <button
              type="submit"
              class="btn btn-warning"
              @click="editToggle = !editToggle"
            >
              <i
                class="fa fa-arrow-circle-right big-icon"
                @click="editBug"
                aria-hidden="true"
              ></i>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col mt-3">
        <form class="form-inline" @submit.prevent="addNote">
          <div class="form-group">
            <button class="btn btn-primary" @submit.prevent="addNote">
              Add Note
            </button>
            <input
              type="text"
              placeholder="Type new note here..."
              class="form-control m-1"
              v-model="newNote.content"
              required
            />
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col notes-card m-1 p-3">
        <div><h1 class="card col-12 text-center">Notes:</h1></div>
        <notes-component
          class="card col-12 m-2 note-cards p-3 text-center"
          v-for="note in notes"
          :key="note.id"
          :noteProp="note"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NotesComponent from "../components/NotesComponent";
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
        //maybe something else
      },
      Data: {
        title: "",
        description: "",
      },
      newNote: {
        content: "",
        bug: this.$route.params.bugId,
      },
      editToggle: false,
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
  components: {
    NotesComponent,
  },
  methods: {
    addNote() {
      this.$store.dispatch("addNote", this.newNote);
    },
    editBug() {
      this.bugData.id = this.$route.params.bugId;
      this.$store.dispatch("editBug", this.bugData);
    },
    closeBug() {
      this.$store.dispatch("closeBug", this.bug.id);
    },
  },
};
</script>

<style>
.notes-card {
  height: 25vh;
}
.note-cards:hover {
  transform: scale(1.025);
  transition: 0.2s ease;
  background-color: rgba(243, 239, 239, 0.863);
}
.note-cards {
  width: 96vw;
}
.con-full {
  height: 98vh;
}
</style>