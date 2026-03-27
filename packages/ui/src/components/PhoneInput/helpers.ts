const startingCharFlagsHexValue = 0x1_f1_e6

const getRegionalIndicatorSymbol = (letter: string) =>
  String.fromCodePoint(
    startingCharFlagsHexValue - 65 + letter.toUpperCase().charCodeAt(0),
  )

export const getCountryFlag = (country: string) =>
  getRegionalIndicatorSymbol(country[0] ?? '') +
  getRegionalIndicatorSymbol(country[1] ?? '')
