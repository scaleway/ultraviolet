import { Theme } from '@emotion/react'
import { DatumValue, Serie } from '@nivo/line'

const parse = (data?: DatumValue | null) => {
  if (typeof data === 'number') return data
  if (typeof data === 'string') return parseFloat(data)
  if (data instanceof Date) return data.getTime()

  return 0
}

export const getMaxChartValue = (preppedData?: Serie[]): number => {
  if (!preppedData?.length) return 0

  const maximum = Math.max(
    ...preppedData.map(data =>
      data.data.reduce(
        (max, { y }) => Math.max(parse(y), max),
        Number.NEGATIVE_INFINITY,
      ),
    ),
  )

  return Math.ceil(maximum + maximum * 0.1)
}

export const getMinChartValue = (preppedData?: Serie[]): number => {
  if (!preppedData?.length) return 0

  const minimum = Math.min(
    ...preppedData.map(data =>
      data.data.reduce(
        (min, { y }) => Math.min(parse(y), min),
        Number.POSITIVE_INFINITY,
      ),
    ),
  )

  return Math.floor(minimum - minimum * 0.1)
}

export const getMin = (values: number[] = []): number =>
  values.length ? Math.min(...values) : 0

export const getMax = (values: number[] = []): number =>
  values.length ? Math.max(...values) : 0

export const getAverage = (values: number[] = []): number =>
  values.length
    ? Math.round(
        (values.reduce((average, curr) => average + curr, 0) / values.length) *
          100,
      ) / 100
    : 0

export const getCurrent = (values: number[] = []): number =>
  values.length ? values[values.length - 1] : 0

export const getSelected = (
  label: string,
  index: number,
  selected: string[] = [],
): string[] => {
  const labelIndexed = label + index.toString()
  const found = selected.indexOf(labelIndexed)

  if (found > -1) {
    selected.splice(found, 1)
  } else {
    selected.push(labelIndexed)
  }

  return selected
}

export const legendColors = (theme: Theme): string[] =>
  [
    theme.colors.chartGreen,
    theme.colors.chartPurple,
    theme.colors.gray350,
  ] as string[]

export const getLegendColor = (index: number, theme: Theme): string => {
  const colors = legendColors(theme)

  return colors[index] || colors[colors.length - 1]
}
