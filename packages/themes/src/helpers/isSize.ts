import type { Sizes } from '../constants'
import { sizing } from '../constants'

const SIZES = Object.keys(sizing) as Sizes[]

export const isSize = (size?: string): size is Sizes => {
  if (size) {
    // cast as includes doesn't allow
    return SIZES.includes(size as Sizes)
  }

  return false
}
