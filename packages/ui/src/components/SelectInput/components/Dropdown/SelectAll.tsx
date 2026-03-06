import { cn } from '@ultraviolet/utils'

import { Checkbox } from '../../../Checkbox'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

import type { OptionType } from '../../types'

export const SelectAll = ({
  textVariant,
}: {
  textVariant: 'body' | 'bodySmall' | 'caption'
}) => {
  const {
    onChange,
    options,
    multiselect,
    selectAll,
    setSelectedData,
    selectedData,
    size,
  } = useSelectInput()
  const selectAllOptions = () => {
    if (multiselect) {
      setSelectedData({ type: 'selectAll' })
      if (selectedData.allSelected && onChange) {
        onChange([])
      } else {
        const allValues: OptionType[] = []
        if (Array.isArray(options)) {
          options.map(option => allValues.push(option))
        } else {
          Object.keys(options).map((group: string) =>
            options[group].map(option => {
              if (!option.disabled) {
                allValues.push(option)
              }

              return null
            }),
          )
        }
        onChange?.(allValues.map(value => value.value))
      }
    }
  }

  return selectAll && multiselect ? (
    <Stack gap={0.25} id="items" tabIndex={-1}>
      <div
        aria-disabled={false}
        aria-label="select-all"
        aria-selected={selectedData.allSelected}
        className={cn(
          selectInputStyle.dropdownItem({
            selected: selectedData.allSelected,
            size,
          }),
        )}
        data-testid="select-all"
        onClick={selectAllOptions}
        onKeyDown={event =>
          [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
        }
        role="option"
        tabIndex={0}
      >
        <Checkbox
          checked={selectedData.allSelected}
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
              variant={size === 'small' ? 'captionSmall' : 'bodySmall'}
            >
              {selectAll?.description}
            </Text>
          </Stack>
        </Checkbox>
      </div>
    </Stack>
  ) : null
}
