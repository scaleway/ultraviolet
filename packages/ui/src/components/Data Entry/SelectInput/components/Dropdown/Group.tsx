import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'
import { Text } from '../../../../Typography/Text'
import { Checkbox } from '../../../Checkbox'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

export const Group = ({ group, index }: { group: string; index: number }) => {
  const { selectAllGroup, selectedData, size, setSelectedData, multiselect, options, onChange } = useSelectInput()

  const handleSelectGroup = () => {
    if (multiselect) {
      setSelectedData({ selectedGroup: group, type: 'selectGroup' })
      if (!Array.isArray(options)) {
        let newSelectedValues: string[] = selectedData.selectedValues
        if (selectedData.selectedGroups.includes(group)) {
          newSelectedValues = [...selectedData.selectedValues].filter(
            selectedValue => !options[group].find(option => option.value === selectedValue),
          )
        } else {
          newSelectedValues = [...selectedData.selectedValues]
          options[group].map(option =>
            newSelectedValues.includes(option.value) || option.disabled ? null : newSelectedValues.push(option.value),
          )
        }
        onChange?.(newSelectedValues)
      }
    }
  }

  const groupLabel = useMemo(
    () => (
      <Text as="span" placement="left" sentiment="neutral" variant={size === 'small' ? 'captionSmall' : 'caption'}>
        {group.toUpperCase()}
      </Text>
    ),
    [group, size],
  )

  if (!group) {
    return null
  }

  return (
    <div className={selectInputStyle.dropdownGroupWrapper} data-type="items">
      {selectAllGroup ? (
        <button
          className={cn(
            selectInputStyle.dropdownGroupSelectable({
              size,
            }),
            selectInputStyle.dropdownGroup,
          )}
          data-selectgroup
          data-testid={`group-${index}`}
          onClick={handleSelectGroup}
          onKeyDown={event => {
            if ([' ', 'Enter'].includes(event.key)) {
              event.preventDefault()
              handleSelectGroup()
            }
          }}
          type="button"
        >
          <Checkbox
            aria-hidden
            checked={selectedData.selectedGroups.includes(group)}
            className={selectInputStyle.dropdownCheckbox}
            data-testid="select-group"
            disabled={false}
            onChange={() => (selectAllGroup ? handleSelectGroup() : null)}
            tabIndex={-1}
            value={group}
          >
            {groupLabel}
          </Checkbox>
        </button>
      ) : (
        <div className={selectInputStyle.dropdownGroup} data-testid={`group-${index}`}>
          {groupLabel}
        </div>
      )}
    </div>
  )
}
