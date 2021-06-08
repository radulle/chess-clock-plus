import { writable } from "svelte/store"

export function persistent<T>(name: string, defaultValue: T) {
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
