import type { ClockState } from "chess-clock"
import { Clock } from "chess-clock"
import { get, writable } from "svelte/store"
export { configs, settings, clock, state, press }

function persistent<T>(name: string, defaultValue: T) {
  const value = writable<T>(
    JSON.parse(localStorage.getItem(name)!) || defaultValue
  )
  value.subscribe((value) =>
    value === null || value === undefined
      ? localStorage.removeItem(name)
      : localStorage.setItem(name, JSON.stringify(value))
  )
  return value
}

const audio = new window.Audio("./click.mp3")

let settings = (() => {
  const { subscribe, set, update } = persistent<{
    open?: boolean
    mute?: boolean
  }>("settings", {})
  return {
    subscribe,
    open: () => update((val) => ({ ...val, open: true })),
    close: () => update((val) => ({ ...val, open: false })),
    mute: () => update((val) => ({ ...val, mute: !val.mute })),
  }
})()

let configs = (() => {
  const { subscribe, set, update } = persistent(
    "configs",
    Clock.listConfigEntries()
  )
  return {
    subscribe,
    select: (name: string) => () => {
      const config = get(configs).find((e) => e[0] === name)
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
configs.subscribe((value) => {
  clear()
  value.forEach((e) => {
    Clock.setConfig(...e)
  })
})

const config = Clock.getConfig(localStorage.getItem("name")!) || {}
const clock = new Clock({ ...config, callback })

const state = (() => {
  const { subscribe, set, update } = writable<ClockState>(clock.state)
  return {
    subscribe,
    pause: () =>
      get(state).status === "live" ? clock.pause() : clock.resume(),
    set,
  }
})()
function callback(res: ClockState) {
  state.set(res)
}

const press = (player: 0 | 1) => () => {
  clock.push(player)
  if (!get(settings).mute) {
    audio.currentTime = 0
    audio.playbackRate = player === 1 ? 3 : 1
    audio.play()
  }
}
