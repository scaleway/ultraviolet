import { cn } from '@ultraviolet/utils'
import type { ChangeEvent, KeyboardEvent, MouseEvent, RefObject } from 'react'
import { Checkbox } from '../../../Checkbox'
import { Tooltip } from '../../../Tooltip'
import { useSelectInput } from '../../SelectInputProvider'
import type { OptionType } from '../../types'
import { DisplayOption } from './Option'
import { selectInputStyle } from '../../styles.css'

export const Item = ({
  option,
  indexOption,
  group,
  defaultSearchValue,
  focusedItemRef,
  descriptionDirection,
  textVariant,
  optionalInfoPlacement,
}: {
  option: OptionType
  indexOption: number
  group?: string
  defaultSearchValue: string | null
  focusedItemRef: RefObject<HTMLDivElement | null>
  descriptionDirection: 'column' | 'row'
  textVariant: 'body' | 'bodySmall'
  optionalInfoPlacement: 'left' | 'right'
}) => {
  const { setIsDropdownVisible, onChange, multiselect, setSelectedData, selectedData, size } = useSelectInput()

  const handleClick = ({
    clickedOption,
    event,
  }: {
    clickedOption: OptionType
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement> | ChangeEvent<HTMLDivElement>
  }) => {
    event.stopPropagation()

    setSelectedData({ clickedOption, group, type: 'selectOption' })
    if (multiselect) {
      if (selectedData.selectedValues.includes(clickedOption.value)) {
        onChange?.(selectedData.selectedValues.filter(value => value !== clickedOption.value))
      } else {
        onChange?.([...selectedData.selectedValues, clickedOption.value])
      }
    } else {
      onChange?.(clickedOption.value)
    }
    setIsDropdownVisible(multiselect) // hide the dropdown on click when single select only
  }

  return (
    <Tooltip containerFullWidth text={option.tooltip}>
      <div
        aria-disabled={!!option.disabled}
        aria-label={option.value}
        aria-selected={selectedData.selectedValues.includes(option.value) && !option.disabled}
        className={cn(
          selectInputStyle.dropdownItem({
            disabled: !!option.disabled,
            size,
            selected: selectedData.selectedValues.includes(option.value) && !option.disabled,
          }),
        )}
        data-testid={`option-${option.value}`}
        id={`option-${indexOption}`}
        onClick={event => {
          if (!option.disabled) {
            handleClick({
              clickedOption: option,
              event,
            })
          }
        }}
        onKeyDown={event => {
          const shouldClick = [' ', 'Enter'].includes(event.key) && !option.disabled
          if (shouldClick) {
            handleClick({
              clickedOption: option,
              event,
            })
          }
        }}
        ref={option.value === defaultSearchValue || option.searchText === defaultSearchValue ? focusedItemRef : null}
        role="option"
        tabIndex={0}
      >
        {multiselect ? (
          <Checkbox
            checked={selectedData.selectedValues.includes(option.value) && !option.disabled}
            className={selectInputStyle.dropdownCheckbox}
            disabled={option.disabled}
            onChange={event => {
              if (!option.disabled) {
                handleClick({
                  clickedOption: option,
                  event,
                })
              }
            }}
            tabIndex={-1}
            value={option.value}
          >
            <DisplayOption
              descriptionDirection={descriptionDirection}
              option={option}
              optionalInfoPlacement={optionalInfoPlacement}
              textVariant={textVariant}
            />
          </Checkbox>
        ) : (
          <DisplayOption
            descriptionDirection={descriptionDirection}
            option={option}
            optionalInfoPlacement={optionalInfoPlacement}
            textVariant={textVariant}
          />
        )}
      </div>
    </Tooltip>
  )
}
