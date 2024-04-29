import type { DataType, OptionType } from './types'

export const findOptionInOptions = (options: DataType, optionValue: string) => {
  let flatOptions: OptionType[] = []
  if (!Array.isArray(options)) {
    flatOptions = Object.keys(options)
      .map(group => options[group])
      .flat()
  } else {
    flatOptions = options
  }

  return flatOptions.find(option => option.value === optionValue)
}
