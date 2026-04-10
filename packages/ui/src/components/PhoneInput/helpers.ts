import { parsePhoneNumber } from 'awesome-phonenumber'

const startingCharFlagsHexValue = 0x1_f1_e6

const getRegionalIndicatorSymbol = (letter: string) =>
  String.fromCodePoint(
    startingCharFlagsHexValue - 65 + letter.toUpperCase().charCodeAt(0),
  )

export const getCountryFlag = (country: string) =>
  getRegionalIndicatorSymbol(country[0] ?? '') +
  getRegionalIndicatorSymbol(country[1] ?? '')

export type ParsedPhoneNumber = {
  inputValue: string
  formatted: string
  country: string | null
  valid: boolean
  e164: string | null
  international: string | null
  national: string | null
}

export const parsePhoneValue = (
  inputValue: string,
  defaultCountry = 'FR',
): ParsedPhoneNumber => {
  try {
    const parsed = parsePhoneNumber(inputValue)
    const country = parsed.regionCode
    let phoneNumber = inputValue

    if (!country && phoneNumber.length === 10) {
      phoneNumber = `+33${phoneNumber}`
    }

    const isValid =
      phoneNumber.length > 4 &&
      parsePhoneNumber(phoneNumber, { regionCode: country || defaultCountry })
        .valid

    const parsedValid = parsePhoneNumber(phoneNumber, {
      regionCode: country || defaultCountry,
    })

    return {
      inputValue,
      formatted: isValid
        ? (parsedValid.number?.international ?? inputValue)
        : inputValue,
      country: country || defaultCountry,
      valid: isValid,
      e164: isValid ? (parsedValid.number?.e164 ?? null) : null,
      international: isValid
        ? (parsedValid.number?.international ?? null)
        : null,
      national: isValid ? (parsedValid.number?.national ?? null) : null,
    }
  } catch {
    return {
      inputValue,
      formatted: inputValue,
      country: null,
      valid: false,
      e164: null,
      international: null,
      national: null,
    }
  }
}

export const formatPhoneNumber = (
  phoneNumber: string,
  options?: {
    regionCode?: string
    format?: 'international' | 'national' | 'e164' | 'rfc3966'
  },
): string => {
  try {
    const parsed = parsePhoneNumber(phoneNumber, options)
    const format = options?.format || 'international'

    switch (format) {
      case 'e164': {
        return parsed.number?.e164 ?? phoneNumber
      }
      case 'national': {
        return parsed.number?.national ?? phoneNumber
      }
      case 'rfc3966': {
        return parsed.number?.rfc3966 ?? phoneNumber
      }
      case 'international': {
        return parsed.number?.international ?? phoneNumber
      }
      default: {
        return parsed.number?.international ?? phoneNumber
      }
    }
  } catch {
    return phoneNumber
  }
}

export const validatePhoneNumber = (
  phoneNumber: string,
  options?: { regionCode?: string },
): boolean => {
  try {
    const parsed = parsePhoneNumber(phoneNumber, options)
    return parsed.valid || false
  } catch {
    return false
  }
}
