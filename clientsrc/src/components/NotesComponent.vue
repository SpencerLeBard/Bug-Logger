<template>
  <div>
    <div>
      <h5>{{ noteProp.content }}</h5>
      <button class="btn btn-sm btn-danger" @click="deleteNote">
        delete note
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "note-component",
  props: ["noteProp"],
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.noteProp.id);
    },
  },
};
</script>

<style>
</style>