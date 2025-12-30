import type { DatumValue, Serie } from '@nivo/line'

const parse = (data?: DatumValue | null): number => {
  if (typeof data === 'number') {
    return data || 0
  }
  if (typeof data === 'string') {
    return Number.parseFloat(data) || 0
  }
  if (data instanceof Date) {
    return data.getTime()
  }

  return 0
}

export const getMin = (values: DatumValue[] = []): number =>
  values.length > 0 ? Math.min(...values.map(data => parse(data))) : 0

export const getMax = (values: DatumValue[] = []): number =>
  values.length > 0 ? Math.max(...values.map(data => parse(data))) : 0

export const getAverage = (values: DatumValue[] = []): number =>
  values.length > 0
    ? Math.round(
        (values.reduce<number>((sum, curr) => sum + parse(curr), 0) /
          values.length) *
          100,
      ) / 100
    : 0

export const getMaxChartValue = (preppedData?: Serie[]): number => {
  if (!preppedData?.length) {
    return 0
  }

  const maximum = Math.max(
    ...preppedData.map(({ data }) => getMax(data.map(({ y }) => y || 0))),
  )

  return Math.ceil(maximum + maximum * 0.1)
}

export const getMinChartValue = (preppedData?: Serie[]): number => {
  if (!preppedData?.length) {
    return 0
  }

  const minimum = Math.min(
    ...preppedData.map(({ data }) => getMin(data.map(({ y }) => y || 0))),
  )

  return Math.floor(minimum - minimum * 0.1)
}

export const getCurrent = (values: number[] = []): number => {
  const val = values.at(-1)

  return val || 0
}

export const getSelected = (
  label: string,
  index: number,
  selected: string[] = [],
): string[] => {
  const labelIndexed = label + index.toString()
  const found = selected.indexOf(labelIndexed)

  if (found !== -1) {
    selected.splice(found, 1)
  } else {
    selected.push(labelIndexed)
  }

  return selected
}
