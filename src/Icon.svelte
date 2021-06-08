<script lang="ts">
  import { classes, icons } from "./helpers"

  let clazz: string | undefined
  export { clazz as class }
  export let type: string
  export let size: number = 1
</script>

<svg
  on:click
  style={`--size:${size};`}
  class={classes("Icon", clazz)}
  viewBox="0 0 24 24"
>
  <path d={icons.get(type)} /></svg
>

<style type="scss">
  .Icon {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    opacity: 100;
    height: calc(var(--size) * var(--unit));
    width: calc(var(--size) * var(--unit));
    fill: var(--color-red);
    background: var(--color-bg);
    border-radius: 50%;
    padding: 0.25rem;
    box-shadow: 0 0 0 1px var(--color-border2), 0 0 0 4px var(--color-border),
      0 0 0 5px var(--color-border2);
    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
