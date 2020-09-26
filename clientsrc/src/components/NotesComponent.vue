<template>
  <div>
    <div>
      {{ noteProp.content }}
      <button @click="deleteNote">delete note</button>
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