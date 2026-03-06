import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

import { DisplayOption } from './Option'

import type { OptionType } from '../../types'

export const AddOption = ({
  option,
  textVariant,
  addOption,
  searchable,
  isEmpty,
}: {
  option: OptionType
  textVariant: 'caption' | 'body' | 'bodySmall'
  addOption?: {
    text: string
    onClick: (searchText: string) => void
  }
  searchable?: boolean
  isEmpty?: boolean
}) => {
  const {
    setIsDropdownVisible,
    multiselect,
    onSearch,
    searchInput,
    setSearchInput,
  } = useSelectInput()

  const handleClickCustomValue = () => {
    const newOption = { label: searchInput, value: searchInput }
    addOption?.onClick(searchInput)
    onSearch([newOption])
    setIsDropdownVisible(multiselect)
    setSearchInput('')
  }

  return addOption && searchable && (isEmpty || searchInput) ? (
    <div
      aria-selected="false"
      className={selectInputStyle.comboboxCreate}
      data-testid="add-option"
      id="add-option"
      onClick={handleClickCustomValue}
      onKeyDown={event => {
        if (['Enter', ' '].includes(event.key)) {
          handleClickCustomValue()
        }
      }}
      role="option"
      tabIndex={-1}
    >
      <DisplayOption
        descriptionDirection="row"
        option={option}
        optionalInfoPlacement="left"
        textVariant={textVariant}
      />
    </div>
  ) : null
}
