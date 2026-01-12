import type { DataType, OptionType } from './types'

export const findOptionInOptions = (options: DataType, optionValue: string) => {
  let flatOptions: OptionType[] = []
  if (Array.isArray(options)) {
    flatOptions = options
  } else {
    flatOptions = Object.keys(options).flatMap(group => options[group])
  }

  return flatOptions.find(option => option.value === optionValue)
}
