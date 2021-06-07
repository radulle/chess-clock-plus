import Clock from "./Clock.svelte"

var clock = new Clock({
  target: document.body,
})

export default clock

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    clock.$destroy()
  })
}
