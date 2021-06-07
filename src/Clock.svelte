<script lang="ts">
  import Controlls from "./Controlls.svelte"
  import Options from "./Options.svelte"
  import { settings } from "./store"
  import Trigger from "./Trigger.svelte"
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
    --color-bg: #fffaea;
    --color-red: #a4441a;
    --color-brown: #bfa371;
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
    background-image: linear-gradient(175deg, #fff4d3, #d0b57b);
    margin: calc(var(--unit) / 2);
    border-radius: var(--unit);
    padding: 0.1rem;
    padding-bottom: 0.2rem;
    box-shadow: 0 10px 10px -5px rgb(233 219 176 / 0%),
      0 0 0 1px rgb(0 0 0 / 10%), 0 0 0 6px #fff4d3, 0 0 0 7px rgb(0 0 0 / 10%);
  }
</style>
