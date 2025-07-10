const INPUT_SIZE_HEIGHT = {
  small: '400',
  medium: '500',
  large: '600',
} as const

const DEFAULT_PLACEHOLDER = { h: '00', m: '00', s: '00' } as const
const TIME_KEYS: ('h' | 'm' | 's')[] = ['h', 'm', 's'] as const

const DEFAULT_DATE = new Date()
DEFAULT_DATE.setHours(0, 0, 0)

export { DEFAULT_DATE, INPUT_SIZE_HEIGHT, DEFAULT_PLACEHOLDER, TIME_KEYS }
