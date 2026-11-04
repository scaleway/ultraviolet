import { cn } from '@ultraviolet/utils'
import { forwardRef, useId } from 'react'
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import { Tooltip } from '../../../../Overlay/Tooltip'
import { Checkbox } from '../../../Checkbox'
import { useSelectInput } from '../../SelectInputProvider'
import type { OptionType } from '../../types'
import { DisplayOption } from './Option'
import { selectInputStyle } from '../../styles.css'

type ItemProps = {
  option: OptionType
  group?: string
  descriptionDirection: 'column' | 'row'
  textVariant: 'body' | 'bodySmall'
  optionalInfoPlacement: 'left' | 'right'
  isActive: boolean
  onFocus: () => void
  indexOption: number
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ option, group, descriptionDirection, textVariant, optionalInfoPlacement, isActive, onFocus }, ref) => {
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
      <Tooltip containerFullWidth tabIndex={-1} text={option.tooltip}>
        <div
          aria-disabled={!!option.disabled}
          aria-selected={selectedData.selectedValues.includes(option.value) && !option.disabled}
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
          onFocus={onFocus}
          onKeyDown={event => {
            const shouldClick = [' ', 'Enter'].includes(event.key) && !option.disabled
            if (shouldClick) {
              handleClick({
                clickedOption: option,
                event,
              })
            }
          }}
          ref={ref}
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role - options must be inside a `select` and can't be styled accross all browser
          role="option"
          tabIndex={isActive ? 0 : -1}
        >
          {multiselect ? (
            <Checkbox
              aria-hidden
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
              style={{ display: 'none' }}
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
  },
)
