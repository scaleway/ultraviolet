export type ContrastLevel = 'pass' | 'fail' | 'disabled'

export type Pairing = {
  suffix: string
  textKey: string
  textVal: string
  bgKey: string
  bgVal: string
  ratio: number
  level: ContrastLevel
}

export const AA_THRESHOLD = 4.5

export const hexToRgb = (hex: string): [number, number, number] => {
  const cleaned = hex.replace('#', '')
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map(c => c + c)
          .join('')
      : cleaned
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)]
}

export const relativeLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex)
  const toLinear = (c: number) => {
    const srgb = c / 255
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

export const contrastRatio = (fg: string, bg: string): number => {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

export const getContrastLevel = (ratio: number): ContrastLevel => (ratio >= AA_THRESHOLD ? 'pass' : 'fail')

export const filterByPrefix = (colors: Record<string, string>, prefix: string) =>
  Object.entries(colors)
    .filter(([key]) => key.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))

export const getSuffix = (key: string, prefix: string) => key.slice(prefix.length)
