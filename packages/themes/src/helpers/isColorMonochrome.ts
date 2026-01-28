import type { ExtendedColor, Monochrome } from '../constants'

const monochromes: TupleUnion<Monochrome> = ['black', 'white']

export const isColorMonochrome = (
  color?: ExtendedColor,
): color is Monochrome => {
  if (color) {
    // cast as includes doesn't allow
    return monochromes.includes(color as Monochrome)
  }

  return false
}
