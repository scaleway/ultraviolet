export const INPUT_SIZE_HEIGHT = {
  small: '400',
  medium: '500',
  large: '600',
} as const

export const EMPTY_TIME_12 = {
  h: '',
  m: '',
  s: '',
  period: '',
}

export const EMPTY_TIME_24 = {
  h: '',
  m: '',
  s: '',
}

export const DEFAULT_PLACEHOLDER = { h: '00', m: '00', s: '00' } as const
export const TIME_KEYS: ('h' | 'm' | 's')[] = ['h', 'm', 's']
