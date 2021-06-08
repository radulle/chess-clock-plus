<script lang="ts">
  import Icon from "./Icon.svelte"
  import { settings } from "./stores"

  export let open: boolean
  const keys: { [key: string]: HTMLInputElement } = {}
  const reset = () => {
    if (confirm("Reset colors to defaults?")) settings.resetColors()
  }
</script>

<div class="Colors" class:visible={open}>
  {#each Object.keys($settings.colors) as key (key)}
    <input
      hidden
      bind:this={keys[key]}
      name="key"
      type="color"
      bind:value={$settings.colors[key]}
    />
    <label
      on:click={() => keys[key].click()}
      for="key"
      class="Color"
      style={`background-color:${$settings.colors[key]}`}
    />
  {/each}
  <Icon type="trash" on:click={reset} />
</div>

<style type="scss">
  .Colors {
    height: 0;
    display: flex;
    opacity: 0;
    --size: 1;
    padding: 0 1em;
    justify-content: space-between;
    &.visible {
      height: auto;
      transition: opacity 0.2s 0.2s ease-in-out;
      opacity: 100%;
    }
    > label {
      display: block;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      opacity: 100;
      height: calc(var(--size) * var(--unit));
      width: calc(var(--size) * var(--unit));
      fill: var(--color-red);
      background: var(--color-bg);
      border-radius: 50%;
      box-shadow: 0 0 0 1px var(--color-border2), 0 0 0 4px var(--color-border),
        0 0 0 5px var(--color-border2);
    }
    :global(svg) {
      margin: unset;
      padding: unset;
    }
  }
</style>
