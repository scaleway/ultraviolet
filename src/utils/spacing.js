import { calc } from '@smooth-ui/core-em'
import { space } from '../theming'

export function sp(multiplier) {
  return p => {
    const [, unit] = space(p)
    return calc(unit, value => value * multiplier)
  }
}
