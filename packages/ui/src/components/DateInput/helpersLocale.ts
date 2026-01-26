import type { Locale } from 'date-fns'

const getLocalizedDays = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })
  const days: string[] = []
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(1970, 0, i + 4)
    days.push(formatter.format(date))
  }

  return days
}

export const getLocalizedMonths = (locale: Locale | string) => {
  const computedLocale = typeof locale === 'string' ? locale : locale.code

  const formatter = new Intl.DateTimeFormat(computedLocale, { month: 'long' })
  const months: string[] = []
  for (let i = 0; i < 12; i += 1) {
    const date = new Date(1970, i)
    months.push(formatter.format(date))
  }

  return months
}

const getLocalizedShortMonths = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const months: string[] = []
  for (let i = 0; i < 12; i += 1) {
    const date = new Date(1970, i)
    months.push(formatter.format(date))
  }

  return months
}

export const getDays = (locale: Locale | string) => {
  const computedLocale = typeof locale === 'string' ? locale : locale.code
  const longDays = getLocalizedDays(computedLocale) // Get long names
  const days: Record<string, string> = {}

  // Map long day names (localized) to short day names (localized)
  for (const longDay of longDays) {
    days[longDay] = longDay.slice(0, 2)
  }

  const dayKeys = Object.keys(days)

  const dayKeysShifted = dayKeys.shift()
  if (dayKeysShifted) {
    dayKeys.push(dayKeysShifted)
  }

  const orderedDaysMap: Record<string, string> = {}

  for (const key of dayKeys) {
    orderedDaysMap[key] = days[key]
  }

  return orderedDaysMap
}

export const getMonths = (locale: Locale | string) => {
  const computedLocale = typeof locale === 'string' ? locale : locale.code

  const longMonths = getLocalizedMonths(locale)
  const shortMonths = getLocalizedShortMonths(computedLocale)
  const months: Record<string, string> = {}

  // Map long month names (localized) to short month names (localized)
  longMonths.forEach((longMonth, index) => {
    months[longMonth] = shortMonths[index]
  })

  return months
}
