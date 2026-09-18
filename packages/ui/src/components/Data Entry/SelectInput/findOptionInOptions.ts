import type { DataType } from './types'

export const findOptionInOptions = (options: DataType, optionValue: string) => {
  const flatOptions = Array.isArray(options) ? options : Object.keys(options).flatMap(group => options[group])

  return flatOptions.find(option => option.value === optionValue)
}
