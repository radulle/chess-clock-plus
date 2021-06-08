<script lang="ts">
  import Controlls from "./Controlls.svelte"
  import Options from "./Options.svelte"
  import { settings } from "./stores"
  import Trigger from "./Trigger.svelte"

  $: {
    const cssVars = Object.entries($settings.colors)
      .map(([key, val]) => `${key}: ${val};`)
      .join("")
    document.body.setAttribute("style", cssVars)
  }
</script>

<div class="Clock center">
  {#if !$settings.open}
    <Controlls />
    <Trigger player={0} />
    <Trigger player={1} />
  {:else}
    <Options />
  {/if}
</div>

<style type="scss">
  :global(body) {
    --unit: calc(8 * min(1vh, 1vw));
    font-family: Arial, Helvetica, sans-serif;
    background: var(--color-bg);
  }
  :global(.center) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  :global(*) {
    font-size: calc(var(--unit) / 2);
    -webkit-tap-highlight-color: transparent;
  }
  .Clock {
    overflow: hidden;
    background-image: linear-gradient(
      175deg,
      var(--color-border),
      var(--color-brown)
    );
    margin: calc(var(--unit) / 2);
    border-radius: var(--unit);
    padding: 0.1rem;
    padding-bottom: 0.2rem;
    box-shadow: 0 0 0 1px var(--color-border2), 0 0 0 6px var(--color-border),
      0 0 0 7px var(--color-border2);
  }
</style>
