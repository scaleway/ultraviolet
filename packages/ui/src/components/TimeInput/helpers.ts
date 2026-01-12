import type { TIME_KEYS } from './constants'

const regexNumber = /^\d+$/

export const isNumber = (key: string) => regexNumber.test(key)
export const isAOrP = (key: string) => ['a', 'A', 'p', 'P'].includes(key)

const isValidNewHour = (old: number, key: number, timeFormat: number) => {
  const newValue = old * 10 + key

  return (
    (timeFormat === 24 && newValue < 24) || (timeFormat === 12 && newValue < 13)
  )
}

export const isCompleteHour = (timeFormat: number, value: number) => {
  if (timeFormat === 12 && value > 1) {
    return true
  }
  if (timeFormat === 24 && value > 2) {
    return true
  }

  return false
}

export const canConcat = (
  oldValue: number,
  type: (typeof TIME_KEYS)[number],
  key: number,
  timeFormat: 24 | 12,
) =>
  (type === 'h' && isValidNewHour(oldValue, key, timeFormat)) ||
  (type !== 'h' && oldValue < 6) ||
  (type !== 'h' && oldValue < 6)

export const getLastTypedChar = (value: string, oldValue?: number) => {
  // Detect the newly typed character(s)
  if (!oldValue) {
    return value
  }

  const oldValueString = oldValue.toString()
  const valueCorrected = value.startsWith('0') ? value.slice(1) : value

  for (let i = 0; i < valueCorrected.length; i += 1) {
    if (oldValueString[i] !== valueCorrected[i]) {
      return valueCorrected[i]
    }
  }

  return ''
}

export const getValueByType = (
  type: (typeof TIME_KEYS)[number],
  value?: Date | null,
) => {
  if (!value) {
    return 0
  }
  if (type === 'h') {
    return value.getHours()
  }
  if (type === 'm') {
    return value.getMinutes()
  }

  return value.getSeconds()
}

export const setValueByType = (
  type: (typeof TIME_KEYS)[number],
  date: Date | undefined,
  value: number,
) => {
  if (type === 'h') {
    return date?.setHours(value)
  }
  if (type === 'm') {
    return date?.setMinutes(value)
  }

  return date?.setSeconds(value)
}

export const format = (
  value: number,
  type: (typeof TIME_KEYS)[number],
  timeFormat: 24 | 12,
) => {
  // 12-hour format: hours go from 1 to 12 (not 0-11)
  if (type === 'h' && timeFormat === 12) {
    return (value % 12 === 0 ? 12 : value % 12).toString().padStart(2, '0')
  }

  return value.toString().padStart(2, '0')
}
