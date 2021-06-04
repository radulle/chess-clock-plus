export { getTimeParts, pad }

const pad = (n: number, z = 2) => n.toString().padStart(z, "0")

function getTimeParts(ms: number) {
  const d = new Date(ms)
  return {
    h: d.getUTCHours(),
    m: d.getUTCMinutes(),
    s: d.getUTCSeconds(),
    ms: d.getUTCMilliseconds(),
  }
}
