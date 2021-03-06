import { modes } from "./modes"
import { settings } from "./settings"
import { clock, state } from "./state"
export { modes, settings, clock, state, press }

const audio = new window.Audio("./click.mp3")

const press = (player: 0 | 1) => () => {
  if (!clock.push(player)) return
  if (settings.get().mute) return
  audio.currentTime = 0
  audio.playbackRate = player === 1 ? 2 : 1
  audio.play()
}
