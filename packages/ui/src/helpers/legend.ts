import type { Theme } from '@emotion/react'

export const getLegendColor = (theme: Theme): string[] => {
  const { colors } = theme

  return Object.keys(colors.other.data.charts)
    .filter(key => !['success', 'danger'].includes(key))
    .toSorted((a, b) => {
      if (Number(a.replace('data', '')) < Number(b.replace('data', ''))) {
        return -1
      }

      return 1
    })
    .map(
      key =>
        colors.other.data.charts[key as keyof typeof colors.other.data.charts],
    )
}
