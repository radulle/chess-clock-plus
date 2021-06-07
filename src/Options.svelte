<script lang="ts">
  import Icon from "./Icon.svelte"
  import { configs, settings, state } from "./store"
</script>

<div class="Options">
  <div class="header">
    <Icon type={$settings.mute ? "muted" : "sound"} on:click={settings.mute} />
    <div style="flex: 1;" />
    <Icon type="close" on:click={settings.close} />
  </div>
  <h1>Game modes</h1>
  <ul>
    {#each $configs as [name] (name)}
      <li class:selected={$state.name === name} on:click={configs.select(name)}>
        {name}
      </li>
    {/each}
  </ul>
</div>

<style type="scss">
  .Options {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    :global(svg) {
      margin: 1em;
    }
    .header {
      display: flex;
    }
    h1 {
      padding-left: 1rem;
      font-size: calc(1.25 * 1em);
      color: var(--color-red);
      text-shadow: 0 0 3px var(--color-brown);
    }
    ul {
      padding: unset;
      margin: unset;
      flex: 1;
      overflow: auto;
      border-top: 1px solid var(--color-brown);
      li {
        font-size: calc(1.25 * 1em);
        color: var(--color-red);
        list-style-type: none;
        margin: unset;
        padding: 1rem;
        border-bottom: 1px solid var(--color-brown);
        cursor: pointer;
        line-height: var(--unit);
        &:last-of-type {
          border-bottom: unset;
        }
        &:hover {
          text-shadow: 0 0 3px var(--color-brown);
        }
        &.selected {
          color: var(--color-red);
          text-decoration: underline;
          text-shadow: 0 0 3px var(--color-red);
        }
      }
    }
  }
</style>
