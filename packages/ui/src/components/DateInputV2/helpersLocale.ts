import type { Locale } from 'date-fns'

const getLocalizedDays = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })
  const days = []
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(1970, 0, i + 4)
    days.push(formatter.format(date))
  }

  return days
}

export const getLocalizedMonths = (locale: Locale | string) => {
  const computedLocale = typeof locale === 'string' ? locale : locale.code

  const formatter = new Intl.DateTimeFormat(computedLocale, { month: 'long' })
  const months = []
  for (let i = 0; i < 12; i += 1) {
    const date = new Date(1970, i) // Iterate through months
    months.push(formatter.format(date))
  }

  return months
}

const getLocalizedShortMonths = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const months = []
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
  longDays.forEach(longDay => {
    days[longDay] = longDay.slice(0, 2)
  })

  // Get the keys of the dictionary
  const dayKeys = Object.keys(days)

  // Move the first element to the end
  if (dayKeys.length > 0) {
    dayKeys.push(dayKeys.shift()!) // Remove the first key and push it to the end
  }

  // Create a new object with the ordered keys
  const orderedDaysMap: Record<string, string> = {}
  dayKeys.forEach(key => {
    orderedDaysMap[key] = days[key]
  })

  return orderedDaysMap
}

export const getMonths = (locale: Locale | string) => {
  const computedLocale = typeof locale === 'string' ? locale : locale.code

  const longMonths = getLocalizedMonths(locale) // Get long names
  const shortMonths = getLocalizedShortMonths(computedLocale) // Get short names
  const months: Record<string, string> = {}

  // Map long month names (localized) to short month names (localized)
  longMonths.forEach((longMonth, index) => {
    months[longMonth] = shortMonths[index]
  })

  return months
}
