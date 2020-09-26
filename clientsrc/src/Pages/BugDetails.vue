<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>{{ bug.title }}</h1>
        <h1>{{ bug.description }}</h1>
        <h1>{{ bug.updatedAt }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form class="form-inline" @submit.prevent="addNote">
          <div class="form-group">
            <button @submit.prevent="addNote">Add Note</button>
            <input
              type="text"
              placeholder="Type new note here..."
              class="form-control"
              v-model="newNote.content"
              required
            />
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <notes-component v-for="note in notes" :key="note.id" :noteProp="note" />
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
      },
      newNote: {
        content: "",
        bug: this.$route.params.bugId,
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
  components: {
    NotesComponent,
  },
  methods: {
    addNote() {
      this.$store.dispatch("addNote", this.newNote);
    },
  },
};
</script>

<style>
</style>