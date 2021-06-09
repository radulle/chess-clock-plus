<script lang="ts">
  import { classes, getTimeParts, pad } from "./helpers"
  import Icon from "./Icon.svelte"
  import IconButton from "./IconButton.svelte"
  import Pop from "./Pop.svelte"
  import { clock, press, settings, state } from "./stores"

  export let player: 0 | 1
  let time: string
  $: {
    const t = getTimeParts($state.remainingTime[player])
    time = `${pad(t.h)}:${pad(t.m)}:${pad(t.s)}.${(t.ms / 100) | 0}`
  }

  function grant() {
    clock.addTime(player === 1 ? 0 : 1, 15000)
  }
</script>

<button
  class={`Trigger p${player}`}
  on:mousedown={press(player)}
  class:selected={$state.lastPlayer === player}
  class:ready={$state.status === "ready"}
  ><div>{time}</div>
  <Icon
    class={classes(
      "piece",
      `p${player}`,
      ($state.status === "live" || $state.status === "ready") && "hidden",
      $state.white === player && "white"
    )}
    type="queen"
  />
  <div
    class={classes(
      "iconbuttons",
      `p${player}`,
      ($state.status === "live" || $state.status === "done") && "hidden"
    )}
  >
    <Pop text={`+${$settings.grant / 1000}s`}>
      <IconButton type="gift" label="Grant" on:click={grant} />
    </Pop>
  </div></button
>

<style type="scss">
  .Trigger {
    > div {
      font-size: calc(2 * var(--unit));
    }
    position: relative;
    width: 100%;
    height: 50%;
    border: unset;
    transition: 0.1s ease-in-out;
    cursor: pointer;
    text-align: center;

    &.p0 {
      border-radius: var(--unit) var(--unit) 0 0;
      margin-top: var(--unit);
      background: var(--color-bg2);
      color: var(--color-red);
      text-shadow: 0 0 3px var(--color-red);
      height: calc(50% - var(--unit));
      &.selected {
        margin-top: unset;
        background: var(--color-border);
        color: var(--color-brown);
        text-shadow: 0 0 0.2rem transparent;
        height: 50%;
      }
      &.ready {
        margin-top: calc(var(--unit) / 2);
        height: calc(50% - var(--unit) / 2);
      }
      div {
        transform: rotate(180deg);
      }
    }

    &.p1 {
      border-radius: 0 0 var(--unit) var(--unit);
      margin-bottom: var(--unit);
      background: var(--color-bg);
      color: var(--color-red);
      text-shadow: 0 0 3px var(--color-red);
      height: calc(50% - var(--unit));
      &.selected {
        margin-bottom: unset;
        background: var(--color-border);
        color: var(--color-brown);
        text-shadow: 0 0 0.2rem transparent;
        height: 50%;
      }
      &.ready {
        margin-bottom: calc(var(--unit) / 2);
        height: calc(50% - var(--unit) / 2);
      }
    }
    .iconbuttons {
      position: absolute;
      display: flex;
      opacity: 100%;
      &.p0 {
        top: 0;
        right: 0;
        transform: rotate(180deg);
      }
      &.p1 {
        left: 0;
        bottom: 0;
      }
      &.hidden {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
</style>
