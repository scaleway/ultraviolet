import { cn } from '@ultraviolet/utils'
import type { ChangeEvent, KeyboardEvent, MouseEvent, RefObject } from 'react'
import { useId } from 'react'
import { Tooltip } from '../../../../Overlay/Tooltip'
import { Checkbox } from '../../../Checkbox'
import { useSelectInput } from '../../SelectInputProvider'
import type { OptionType } from '../../types'
import { DisplayOption } from './Option'
import { selectInputStyle } from '../../styles.css'

export const Item = ({
  option,
  group,
  defaultSearchValue,
  focusedItemRef,
  isActive,
  onFocus,
  initialFocusRef,
  descriptionDirection,
  textVariant,
  optionalInfoPlacement,
}: {
  option: OptionType
  indexOption: number
  group?: string
  defaultSearchValue: string | null
  focusedItemRef: RefObject<HTMLDivElement | null>
  isActive: boolean
  onFocus: () => void
  initialFocusRef?: RefObject<HTMLElement | null>
  descriptionDirection: 'column' | 'row'
  textVariant: 'body' | 'bodySmall'
  optionalInfoPlacement: 'left' | 'right'
}) => {
  const { setIsDropdownVisible, onChange, multiselect, setSelectedData, selectedData, size } = useSelectInput()
  const id = useId()

  const handleClick = ({
    clickedOption,
    event,
  }: {
    clickedOption: OptionType
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement> | ChangeEvent<HTMLElement>
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
        aria-selected={selectedData.selectedValues.includes(option.value) && !option.disabled}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role - options must be inside a `select` and can't be styled accross all browsers
        role="option"
        className={cn(
          selectInputStyle.dropdownItem({
            disabled: !!option.disabled,
            size,
            selected: selectedData.selectedValues.includes(option.value) && !option.disabled,
          }),
        )}
        data-testid={`option-${option.value}`}
        id={id}
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
        onFocus={onFocus}
        ref={element => {
          const matchesDefaultSearch = option.value === defaultSearchValue || option.searchText === defaultSearchValue
          if (matchesDefaultSearch) {
            focusedItemRef.current = element
          } else if (initialFocusRef) {
            initialFocusRef.current = element
          }
        }}
        tabIndex={isActive ? 0 : -1}
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
