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
].toReversed()

/**
 * This is the mapping between shades name and sentiments names.
 * If there is an array it means that one sentiment share the same shades.
 */
export const SHADES_KEYS_MATCHING = {
  danger: 'fuchsia',
  info: 'blue',
  primary: 'violet',
  secondary: 'purple',
  success: 'emerald',
  warning: ['yellow', 'brown'],
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
      required: true,
      value: '#521094',
    },
    {
      key: 'secondary',
      required: true,
      value: '#b824f9',
    },
    {
      key: 'success',
      required: true,
      value: '#2c8564',
    },
    {
      key: 'warning',
      required: true,
      value: '#fbc600',
    },
    {
      key: 'danger',
      required: true,
      value: '#e51963',
    },
    {
      key: 'info',
      required: true,
      value: '#0078d2',
    },
  ],
} as const
