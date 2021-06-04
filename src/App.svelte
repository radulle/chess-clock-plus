<script lang="ts">
  import type { ClockState } from "chess-clock"
  import { Clock } from "chess-clock"
  import Trigger from "./Trigger.svelte"

  let state: ClockState
  const callback = (res: ClockState) => (state = res)
  const timer = new Clock({
    ...Clock.getConfig("Fischer Rapid 5|5")!,
    callback,
  })
  callback(timer.state)
</script>

<div class="App">
  <Trigger player={0} {state} {timer} />

  <div class="small">
    <button>options</button>
    {#if state?.status === "live"}<button on:click={() => timer.pause()}
        >pause</button
      >{/if}
    {#if state?.status === "paused"}<button on:click={() => timer.resume()}
        >resume</button
      >{/if}
    {#if state?.status !== "ready"}<button on:click={() => timer.reset()}
        >restart</button
      >
    {/if}
  </div>

  <Trigger player={1} {state} {timer} />

  <!-- <code>{JSON.stringify(state)}</code>
  {state.remainingTime.reduce((acc, cur) => acc + cur, 0)} -->
</div>

<style type="scss">
  :global(body) {
    font-size: large;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  .App {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .App button {
    font-size: 2rem;
    height: 100px;
  }
  .App .small {
    display: flex;
    width: 100%;
    > button {
      flex: 1;
    }
  }
</style>
