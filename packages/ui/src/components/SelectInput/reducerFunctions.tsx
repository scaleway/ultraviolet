import type { DataType, OptionType, ReducerState } from './types'

export const selectAllAction = (
  state: ReducerState,
  allGroups: string[],
  allValues: OptionType[],
  numberOfOptions: number,
  numberOfDisabledOptions: number,
) => {
  const allSelected = state.selectedValues.length === numberOfOptions - numberOfDisabledOptions

  if (allSelected) {
    return { selectedGroups: [], selectedValues: [] }
  }
  return {
    selectedGroups: allGroups,
    selectedValues: allValues.map(option => option.value),
  }
}

export const selectGroupAction = (state: ReducerState, selectedGroupAction: string, options: DataType) => {
  if (!Array.isArray(options)) {
    if (state.selectedGroups.includes(selectedGroupAction)) {
      return {
        selectedGroups: state.selectedGroups.filter(selectedGroup => selectedGroup !== selectedGroupAction),
        selectedValues: [...state.selectedValues].filter(
          selectedValue => !options[selectedGroupAction].find(option => option.value === selectedValue),
        ),
      }
    }

    const newSelectedValues = [...state.selectedValues]
    options[selectedGroupAction].map(option =>
      newSelectedValues.find(aValue => aValue === option.value) || option.disabled
        ? null
        : newSelectedValues.push(option.value),
    )

    return {
      selectedGroups: [...state.selectedGroups, selectedGroupAction],
      selectedValues: newSelectedValues,
    }
  }

  return state
}

export const selectOptionAction = (
  state: ReducerState,
  options: DataType,
  multiselect: boolean,
  clickedOption: OptionType,
  group?: string,
) => {
  if (multiselect) {
    if (state.selectedValues.includes(clickedOption.value)) {
      return {
        selectedGroups:
          group && state.selectedGroups.includes(group)
            ? state.selectedGroups.filter(selectedGroup => selectedGroup !== group)
            : [],
        selectedValues: state.selectedValues.filter(val => val !== clickedOption.value),
      }
    }

    return {
      selectedGroups:
        !Array.isArray(options) &&
        group &&
        options[group].every(
          option => [...state.selectedValues, clickedOption.value].includes(option.value) || option.disabled,
        )
          ? [...state.selectedGroups, group]
          : state.selectedGroups,
      selectedValues: [...state.selectedValues, clickedOption.value],
    }
  }

  return {
    selectedGroups: state.selectedGroups,
    selectedValues: [clickedOption.value],
  }
}

export const clearAllAction = () => ({
  selectedGroups: [],
  selectedValues: [],
})

export const updateAction = (state: ReducerState, options: DataType) => ({
  selectedGroups: state.selectedGroups,
  selectedValues: state.selectedValues.filter(selectedValue => {
    if (!Array.isArray(options)) {
      return Object.keys(options).some(group =>
        options[group].some(option => option.value === selectedValue && !option.disabled),
      )
    }

    return options.some(option => option.value === selectedValue && !option.disabled)
  }),
})

export const resetAction = (selectedGroups: string[], selectedValues: string[]) => ({
  selectedGroups,
  selectedValues,
})
