// SIZE

export const SIZE_KEY = ['large', 'medium', 'small', 'xsmall', 'xxsmall'] as const

export const SIZE_HEIGHT = {
  large: '600', // sizing key value from tokens
  medium: '500',
  small: '400',
  xsmall: '300',
  xxsmall: '200',
} as const satisfies Record<(typeof SIZE_KEY)[number], string>

export const SIZE_PADDING_KEY = {
  large: 2,
  medium: 1.5,
  small: 1,
  xsmall: 0.5,
  xxsmall: 0.25,
} as const satisfies Record<(typeof SIZE_KEY)[number], number>

export const SIZE_GAP_KEY = {
  large: 1,
  medium: 1,
  small: 1,
  xsmall: 0.5,
  xxsmall: 0.25,
} as const satisfies Record<(typeof SIZE_KEY)[number], number>
