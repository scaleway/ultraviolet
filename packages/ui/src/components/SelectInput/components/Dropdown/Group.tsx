import { cn } from '@ultraviolet/utils'

import { Checkbox } from '../../../Checkbox'
import { Text } from '../../../Text'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

export const Group = ({ group, index }: { group: string; index: number }) => {
  const {
    selectAllGroup,
    selectedData,
    size,
    setSelectedData,
    multiselect,
    options,
    onChange,
  } = useSelectInput()

  const handleSelectGroup = () => {
    if (multiselect) {
      setSelectedData({ selectedGroup: group, type: 'selectGroup' })
      if (!Array.isArray(options)) {
        if (selectedData.selectedGroups.includes(group)) {
          const newSelectedValues = [...selectedData.selectedValues].filter(
            selectedValue =>
              !options[group].find(option => option.value === selectedValue),
          )
          onChange?.(newSelectedValues)
        } else {
          const newSelectedValues = [...selectedData.selectedValues]

          options[group].map(option =>
            newSelectedValues.includes(option.value) || option.disabled
              ? null
              : newSelectedValues.push(option.value),
          )
          onChange?.(newSelectedValues)
        }
      }
    }
  }

  return (
    <div
      className={selectInputStyle.dropdownGroupWrapper}
      id={selectAllGroup ? 'items' : undefined}
    >
      {group ? (
        <button
          className={cn(
            selectAllGroup
              ? selectInputStyle.dropdownGroupSelectable({
                  size,
                })
              : '',
            selectInputStyle.dropdownGroup,
          )}
          data-selectgroup={selectAllGroup}
          data-testid={`group-${index}`}
          key={group}
          onClick={() => (selectAllGroup ? handleSelectGroup() : null)}
          onKeyDown={event => {
            if ([' ', 'Enter'].includes(event.key)) {
              event.preventDefault()
              handleSelectGroup()
            }
          }}
          tabIndex={selectAllGroup ? 0 : -1}
          type="button"
        >
          {selectAllGroup ? (
            <Checkbox
              checked={selectedData.selectedGroups.includes(group)}
              className={selectInputStyle.dropdownCheckbox}
              data-testid="select-group"
              disabled={false}
              onChange={() => (selectAllGroup ? handleSelectGroup() : null)}
              tabIndex={-1}
              value={group}
            >
              <Text
                as="span"
                placement="left"
                sentiment="neutral"
                variant={size === 'small' ? 'captionSmall' : 'caption'}
              >
                {group.toUpperCase()}
              </Text>
            </Checkbox>
          ) : (
            <Text
              as="span"
              placement="left"
              sentiment="neutral"
              variant={size === 'small' ? 'captionSmall' : 'caption'}
            >
              {group.toUpperCase()}
            </Text>
          )}
        </button>
      ) : null}
    </div>
  )
}
