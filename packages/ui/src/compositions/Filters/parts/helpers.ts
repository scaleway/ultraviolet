import type { AnyObject, FilterConfig, FilterConfigGroup } from '../types'

export const isFilterConfigGroup = <V extends AnyObject>(item: FilterConfig<V>): item is FilterConfigGroup<V> =>
  item.type === 'group'

export const getKeysWithDifferentValues = <Values extends AnyObject>(a?: Values, b?: Values): (keyof Values)[] => {
  if (a === b) {
    return []
  }
  if (!a || !b) {
    return []
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  const keysWithDifferentValues = keysA.filter((_, i) => {
    const keyA = keysA[i] as keyof typeof a
    const keyB = keysB[i] as keyof typeof b

    // Key in a doesnt exist in b or inverse
    if (!Object.hasOwn(b, keyA)) {
      return true
    }
    if (!Object.hasOwn(a, keyB)) {
      return true
    }

    const valueA = a[keyA]
    const valueB = b[keyA]

    // Typical cse for string | number
    if (valueA === valueB) {
      return false
    }

    if (Array.isArray(valueA) && Array.isArray(valueB)) {
      if (valueA.length !== valueB.length) {
        return true
      }
      // Tuples for Slider, in case of a select input it can cause a rerender if they are not sorted the same way but we can accept 1 useless rerender
      // Instead of making this function more complicated
      if (valueA.length === 2 && valueB.length === 2 && (valueA[0] !== valueB[0] || valueA[1] !== valueB[1])) {
        return true
      }
      // Multiple select input check all match
      return !valueA.every(aValueInValueA => valueB.includes(aValueInValueA))
    }

    return true
  })

  return keysWithDifferentValues as (keyof Values)[]
}

// This function is a very lightweight deepCompare according to the possible FormValues type aka values can be string | number | [string, string] | [number, number] | string[]
// We dont use JSON.stringify because its extremly slow
export const isSameValues = <Values extends AnyObject>(a?: Values, b?: Values) => {
  if (a === b) {
    return true
  }
  if (!a || !b) {
    return false
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  return getKeysWithDifferentValues(a, b).length === 0
}
