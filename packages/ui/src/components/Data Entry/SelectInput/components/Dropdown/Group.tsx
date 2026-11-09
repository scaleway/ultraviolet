import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'
import { Text } from '../../../../Typography/Text'
import { Checkbox } from '../../../Checkbox'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

export const Group = ({ group, index, labelId }: { group: string; index: number; labelId: string }) => {
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
      <Text
        as="span"
        id={labelId}
        placement="left"
        sentiment="neutral"
        variant={size === 'small' ? 'captionSmall' : 'caption'}
      >
        {group.toUpperCase()}
      </Text>
    ),
    [group, labelId, size],
  )

  if (!group) {
    return null
  }

  return (
    <div className={selectInputStyle.dropdownGroupWrapper} role="presentation">
      {selectAllGroup ? (
        <div
          aria-selected={selectedData.selectedGroups.includes(group)}
          className={cn(
            selectInputStyle.dropdownGroupSelectable({
              size,
            }),
            selectInputStyle.dropdownGroup,
          )}
          data-testid={`group-${index}`}
          onClick={handleSelectGroup}
          onKeyDown={event => {
            if ([' ', 'Enter'].includes(event.key)) {
              event.preventDefault()
              handleSelectGroup()
            }
          }}
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role - options must be inside a select and can't be styled across all browsers
          role="option"
          tabIndex={-1}
        >
          <Checkbox
            aria-hidden
            checked={selectedData.selectedGroups.includes(group)}
            className={selectInputStyle.dropdownCheckbox}
            data-testid="select-group"
            disabled={false}
            onChange={handleSelectGroup}
            style={{ display: 'none' }}
            tabIndex={-1}
            value={group}
          >
            {groupLabel}
          </Checkbox>
        </div>
      ) : (
        <div className={selectInputStyle.dropdownGroup} data-testid={`group-${index}`}>
          {groupLabel}
        </div>
      )}
    </div>
  )
}
