const format = (value: string, timeFormat: 12 | 24, isHour?: boolean) => {
  if (value === '') return ''
  if (timeFormat === 12 && isHour) {
    const formattedValue = Number.parseInt(value, 10) % 12
    const finalValue = formattedValue === 0 ? 12 : formattedValue

    return finalValue.toString().padStart(2, '0')
  }

  return value.padStart(2, '0')
}

const computePeriod = (hours?: string, period?: 'am' | 'pm') => {
  if (period) return period

  if (hours && Number.parseInt(hours, 10) >= 12) return 'pm'

  return 'am'
}

export const isNumber = (key: string) => /^\d+$/.test(key)
export const isAOrP = (key: string) => ['a', 'A', 'p', 'P'].includes(key)

const isValidNewHour = (old: string, key: string, timeFormat: number) => {
  const newValue = Number.parseInt(old + key, 10)

  return (
    (timeFormat === 24 && newValue < 24) || (timeFormat === 12 && newValue < 13)
  )
}

export const isCompleteHour = (timeFormat: number, value?: string) => {
  const computedValue = Number.parseInt(value ?? '0', 10)

  if (timeFormat === 12 && computedValue > 1) return true
  if (timeFormat === 24 && computedValue > 2) return true

  return false
}

export const canConcat = (
  oldValue: string | undefined,
  type: 'h' | 'm' | 's',
  key: string,
  timeFormat: 24 | 12,
) =>
  oldValue &&
  ((type === 'h' && oldValue && isValidNewHour(oldValue, key, timeFormat)) ||
    (type !== 'h' && Number.parseInt(oldValue, 10) < 6))

export const formatValue = (
  value: {
    h: string
    m: string
    s: string
    period?: string
  },
  timeFormat: 24 | 12,
) => ({
  h: format(value.h, timeFormat, true),
  m: format(value.m, timeFormat),
  s: format(value.s, timeFormat),
  period: computePeriod(
    value.h,
    value.period === 'am' || value.period === 'pm' ? value.period : undefined,
  ),
})
