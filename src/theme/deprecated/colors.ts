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

const ngray300 = '#dbdbdf'

const violet = '#4f0599'
const lightViolet = '#a365f6'

const green = '#45d6b5'
const red = '#ef5774'
const orange = '#ff8c69'
const blue = '#3f6ed8'
const darkBlue = '#2f52a1'

const zumthor = '#e4edff'
const foam = '#cdfcf1'
const serenade = '#ffefe6'
const pippin = '#ffe1e7'
const shadow = '#a5a5cd'
const gold = '#ffd536'
const crimson = '#cf0f34'

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
  crimson,
  darkBlue,
  foam,
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
  lightViolet,
  ngray300,
  orange,
  pippin,
  primary,
  red,
  serenade,
  shadow,
  success,
  transparent,
  violet,
  warning,
  white,
  zumthor,
}

export type ColorDeprecated = keyof typeof baseColors

const colors: Record<ColorDeprecated, string> = baseColors

export default colors
