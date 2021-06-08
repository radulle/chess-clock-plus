import { Clock, ClockState } from "chess-clock"
import { get, writable } from "svelte/store"

const config = Clock.getConfig(localStorage.getItem("name")!) || {}
export const clock = new Clock({ ...config, callback })

export const state = (() => {
  const { subscribe, set, update } = writable<ClockState>(clock.state)
  return {
    subscribe,
    get: () => get(state),
    pause: () =>
      get(state).status === "live" ? clock.pause() : clock.resume(),
    set,
  }
})()
function callback(res: ClockState) {
  state.set(res)
}
