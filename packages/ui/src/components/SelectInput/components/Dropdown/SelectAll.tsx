import { cn } from '@ultraviolet/utils'
import { Checkbox } from '../../../Checkbox'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

export const SelectAll = ({ textVariant }: { textVariant: 'body' | 'bodySmall' }) => {
  const {
    onChange,
    options,
    numberOfOptions,
    numberOfDisabledOptions,
    multiselect,
    selectAll,
    setSelectedData,
    selectedData,
    size,
  } = useSelectInput()

  if (!(selectAll && multiselect)) {
    return null
  }

  const allSelected = selectedData.selectedValues.length === numberOfOptions - numberOfDisabledOptions

  const selectAllOptions = () => {
    setSelectedData({ type: 'selectAll' })

    if (!onChange) {
      return
    }

    let newValues: string[] = []

    if (!allSelected) {
      const allOptions = Array.isArray(options) ? options : Object.values(options).flat()
      const optionsToSelect = allOptions.filter(option => !option.disabled)
      newValues = optionsToSelect.map(option => option.value)
    }
    onChange(newValues)
  }

  return (
    <Stack gap={0.25} id="items" tabIndex={-1} className={selectInputStyle.dropdownSection}>
      <div
        aria-label="select-all"
        aria-selected={allSelected}
        className={cn(
          selectInputStyle.dropdownItem({
            selected: allSelected,
            size,
          }),
        )}
        data-testid="select-all"
        onClick={selectAllOptions}
        onKeyDown={event => ([' ', 'Enter'].includes(event.key) ? selectAllOptions() : null)}
        role="option"
        tabIndex={0}
      >
        <Checkbox
          checked={allSelected}
          className={selectInputStyle.dropdownCheckbox}
          data-testid="select-all-checkbox"
          disabled={false}
          onChange={selectAllOptions}
          tabIndex={-1}
          value="select-all"
        >
          <Stack direction="column">
            <Text as="span" placement="left" variant={textVariant}>
              {selectAll?.label}
            </Text>
            <Text
              as="span"
              placement="left"
              prominence="weak"
              sentiment="neutral"
              variant={size === 'large' ? 'bodySmall' : 'caption'}
            >
              {selectAll?.description}
            </Text>
          </Stack>
        </Checkbox>
      </div>
    </Stack>
  )
}
