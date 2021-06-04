<script lang="ts">
  import type { Clock, ClockState } from "chess-clock"
  import { getTimeParts, pad } from "./utils"

  export let state: ClockState, timer: Clock, player: 0 | 1

  let t: ReturnType<typeof getTimeParts>
  $: t = getTimeParts(state?.remainingTime[player])
</script>

<button
  class="Trigger"
  on:click={() => timer.push(player)}
  class:selected={state.lastPlayer === player}
  >{pad(t.h)}:{pad(t.m)}:{pad(t.s)}<span class="light">.{(t.ms / 100) | 0}</span
  ></button
>

<style type="scss">
  .Trigger {
    font-size: 2rem;
    height: 100px;
    span.light {
      color: lightsalmon;
    }
    &.selected {
      background-color: aquamarine;
    }
  }
</style>
