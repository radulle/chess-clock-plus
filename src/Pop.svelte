<script>
  import { fade, fly } from "svelte/transition"

  export let text: string

  let id = 0
  let notes: { text: string; id: number }[] = []

  function removeNote(id: number) {
    notes = notes.filter((note) => note.id !== id)
  }

  let addNote = () => {
    id++
    notes = [...notes, { text, id }]
    const i = id
    setTimeout(() => removeNote(i), 250)
  }
</script>

<div class="Pop" on:click={addNote}>
  {#each notes as note (note.id)}
    <div
      class="note"
      out:fly={{ y: -75, duration: 1500 }}
      in:fade={{ duration: 250 }}
    >
      {note.text}
    </div>
  {/each}
  <slot />
</div>

<style type="scss">
  .Pop {
    position: relative;
    .note {
      position: absolute;
      left: 1em;
      top: 1em;
      pointer-events: none;
    }
  }
</style>
