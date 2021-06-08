import { get } from "svelte/store"
import { copyObj } from "../helpers"
import { persistent } from "./helpers"

const defaultSettings = {
  colors: {
    "--color-bg": "#fffaea",
    "--color-bg2": "#efe0b1",
    "--color-red": "#a4441a",
    "--color-brown": "#bfa371",
    "--color-border": "#fff4d3",
    "--color-border2": "#e5e1d2",
  },
}

export const settings = (() => {
  const { subscribe, set, update } = persistent<{
    open?: boolean
    mute?: boolean
    colors: { [key: string]: string }
  }>("settings", copyObj(defaultSettings))
  return {
    subscribe,
    set,
    get: () => get(settings),
    open: () => update((val) => ({ ...val, open: true })),
    close: () => update((val) => ({ ...val, open: false })),
    mute: () => update((val) => ({ ...val, mute: !val.mute })),
    resetColors: () =>
      update((val) => ({ ...val, colors: copyObj(defaultSettings.colors) })),
  }
})()
