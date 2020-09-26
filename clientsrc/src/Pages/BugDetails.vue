<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>{{ bug.updatedAt }}</h1>
      </div>
      <div class="col">
        <h1 v-if="bug.title && !editToggle">{{ bug.title }}</h1>
        <div class="btn-group dropright">
          <i
            class="fa fa-ellipsis-v btn big-button"
            aria-hidden="true"
            role="button"
            data-toggle="dropdown"
          ></i>
          <div class="dropdown-menu ml-1 text-center">
            <p class="btn" @click="editToggle = !editToggle">Edit Bug</p>
          </div>
        </div>
        <h4 v-if="bug.description && !editToggle">{{ bug.description }}</h4>
      </div>
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
      console.log(this.bugData);
      this.$store.dispatch("editBug", this.bugData);
    },
  },
};
</script>

<style>
</style>