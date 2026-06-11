import type { AnyObject, FilterConfig, FilterConfigGroup } from '../types'

export function isFilterConfigGroup<V extends AnyObject>(item: FilterConfig<V>): item is FilterConfigGroup<V> {
  return item.type === 'group'
}

export function getKeysWithDifferentValues<Values extends AnyObject>(a?: Values, b?: Values): (keyof Values)[] {
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
      // Tuples for Slider, in case of slect input it can cause a rerender if they are not sorted the same way but I prefer to keep 1 useless rerender
      // Instead of making this functions more complicated
      if (valueA.length === 2 && valueB.length === 2 && (valueA[0] !== valueB[0] || valueA[1] !== valueB[1])) {
        return true
      }
      // Multiple select input check all match
      if (!valueA.every(aValueInValueA => valueB.includes(aValueInValueA))) {
        return true
      }
      return false
    }

    return true
  })

  return keysWithDifferentValues as (keyof Values)[]
}

// This function is a very lightweight deepCompare according to the possible FormValues type aka values can be string | number | [string, string] | [number, number] | string[]
// We dont use JSON.stringify because its extremly slow
export function isSameValues<Values extends AnyObject>(a?: Values, b?: Values) {
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
