import { Clock } from "chess-clock"
import { get } from "svelte/store"
import { persistent } from "./helpers"
import { clock } from "./index"
import { settings } from "./settings"

export const modes = (() => {
  const { subscribe, set, update } = persistent(
    "configs",
    Clock.listConfigEntries()
  )
  return {
    subscribe,
    get: () => get(modes),
    select: (name: string) => () => {
      const config = modes.get().find((e) => e[0] === name)
      if (config) {
        const [name, stages] = config
        clock.reset({ name, stages })
        localStorage.setItem("name", name)
        settings.close()
      }
    },
  }
})()
const clear = () =>
  Clock.listConfigNames().forEach((e) => Clock.deleteConfig(e))
modes.subscribe((value) => {
  clear()
  value.forEach((e) => {
    Clock.setConfig(...e)
  })
})
