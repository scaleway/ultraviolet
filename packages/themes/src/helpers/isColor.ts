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

const colors: TupleUnion<ExtendedColor> = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'danger',
  'warning',
  'info',
  'black',
  'white',
]

export const isColor = (color?: string): color is ExtendedColor => {
  if (color) {
    // cast as includes doesn't allow
    return colors.includes(color as ExtendedColor)
  }

  return false
}
