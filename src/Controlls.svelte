<script lang="ts">
  import Icon from "./Icon.svelte"
  import { clock, settings, state } from "./store"
  import { classes } from "./utils"
</script>

<div class="Controlls">
  <Icon
    type="settings"
    size={1.5}
    on:click={settings.open}
    class={classes(
      "center",
      $state.status === "live" && "hidden",
      $state.status !== "ready" && "left"
    )}
  />

  <Icon
    type={$state.status === "paused" || $state.status === "ready"
      ? "play"
      : "pause"}
    size={1.5}
    on:click={state.pause}
    class={classes(
      "center",
      ($state.status === "ready" || $state.status === "done") && "hidden"
    )}
  />

  <Icon
    type="reset"
    size={1.5}
    on:click={() => clock.reset()}
    class={classes(
      "center",
      "right",
      ($state.status === "live" || $state.status === "ready") && "hidden"
    )}
  />
</div>

<style type="scss">
  .Controlls {
    :global(.left) {
      right: 66%;
    }
    :global(.right) {
      left: 66%;
    }
  }
</style>
