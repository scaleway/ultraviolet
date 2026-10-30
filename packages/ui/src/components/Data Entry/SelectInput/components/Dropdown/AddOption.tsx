import { useSelectInput } from '../../SelectInputProvider'
import type { OptionType } from '../../types'
import { DisplayOption } from './Option'
import { selectInputStyle } from '../../styles.css'

export const AddOption = ({
  option,
  textVariant,
  addOption,
  searchable,
  isEmpty,
}: {
  option: OptionType
  textVariant: 'body' | 'bodySmall'
  addOption?: {
    text: string
    onClick: (searchText: string) => void
  }
  searchable?: boolean
  isEmpty?: boolean
}) => {
  const { setIsDropdownVisible, multiselect, onSearch, searchInput, setSearchInput } = useSelectInput()

  if (!addOption || !searchable || !(isEmpty || searchInput)) {
    return null
  }

  const handleClickCustomValue = () => {
    const newOption = { label: searchInput, value: searchInput }
    addOption.onClick(searchInput)
    onSearch([newOption])
    setIsDropdownVisible(multiselect)
    setSearchInput('')
  }

  return (
    <div
      aria-selected="false"
      className={selectInputStyle.comboboxCreate}
      data-testid="add-option"
      data-type="add-option"
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
  )
}
