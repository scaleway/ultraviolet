const white = '#fff'
const gray50 = '#fafafb'
const gray100 = '#f6f5f7'
const gray200 = '#eeeeff'
const gray300 = '#dce1eb'
const gray350 = '#d4dae7'
const gray550 = '#b2b6c3'
const gray700 = '#4a4f62'
const gray950 = '#151a2d'
const black = '#000'

const violet = '#4f0599'

const green = '#45d6b5'
const red = '#ef5774'
const orange = '#ff8c69'
const blue = '#3f6ed8'

const gold = '#ffd536'

// System colors
const primary = violet
const beta = orange
const success = green
const warning = red
const info = blue

const transparent = 'transparent'

const baseColors = {
  beta,
  black,
  blue,
  chartGreen: '#33BBB3',
  chartNegativeRed: '#ef5774',
  chartPurple: '#9B83F9',
  gold,
  gray50,
  gray100,
  gray200,
  gray300,
  gray350,
  gray550,
  gray700,
  gray950,
  green,
  info,
  orange,
  primary,
  red,
  success,
  transparent,
  violet,
  warning,
  white,
}

export type ColorDeprecated = keyof typeof baseColors

const colors: Record<ColorDeprecated, string> = baseColors

export default colors
