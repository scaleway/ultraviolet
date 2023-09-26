export const hexadecimalColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i

export const SHADES_KEYS = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '1000',
  '1100',
  '1200',
  '1300',
  '1400',
].reverse()

/**
 * This is the mapping between shades name and sentiments names.
 * If there is an array it means that one sentiment share the same shades.
 */
export const SHADES_KEYS_MATCHING = {
  primary: 'violet',
  secondary: 'purple',
  danger: 'fuchsia',
  warning: ['yellow', 'brown'],
  success: 'emerald',
  info: 'blue',
}

/**
 * Those are the default values in the form
 */
export const INITIAL_VALUES = {
  sentiment_neutral: 'neutral',
  sentiment_neutral_value: '#FFFFFF',
  sentiments: [
    {
      key: 'primary',
      value: '#521094',
      required: true,
    },
    {
      key: 'secondary',
      value: '#b824f9',
      required: true,
    },
    {
      key: 'success',
      value: '#2c8564',
      required: true,
    },
    {
      key: 'warning',
      value: '#fbc600',
      required: true,
    },
    {
      key: 'danger',
      value: '#e51963',
      required: true,
    },
    {
      key: 'info',
      value: '#0078d2',
      required: true,
    },
  ],
} as const
