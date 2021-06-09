<script lang="ts">
  import { classes, icons } from "./helpers"

  let clazz: string | undefined
  export { clazz as class }
  export let type: string
  export let label: string
</script>

<button
  on:click
  on:mousedown|stopPropagation
  class={classes("IconButton", clazz)}
  ><svg viewBox="0 0 24 24"> <path d={icons.get(type)} /></svg>{label}</button
>

<style type="scss">
  .IconButton {
    cursor: pointer;
    display: flex;
    color: var(--color-red);
    background-color: transparent;
    border: unset;
    padding: 1em 0.5em;
    align-items: center;
    > svg {
      width: 1em;
      margin-right: 0.25em;
      fill: var(--color-red);
    }
  }
</style>
