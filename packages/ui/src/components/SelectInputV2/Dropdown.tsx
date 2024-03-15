import styled from '@emotion/styled'
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from 'react'
import { Popup, Stack, Text } from '..'
import { ValueInput } from './helper'

type DataType = Record<
  string,
  {
    value: string
    label: ReactNode
    disabled: boolean
  }[]
>
type DropdownProps = {
  options: DataType
  isVisible: boolean
  children: ReactNode
  selectedValues: string[]
  setSelectedValues: Dispatch<SetStateAction<string[]>>
  multiselect: boolean
  grouped: boolean
}

const StyledPopup = styled(Popup)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};
`

const DropdownContainer = styled.div`
  max-height: 200px;
  overflow: scroll;
  padding: 0px;
`
const DropdownGroup = styled(Stack)`
  height: ${({ theme }) => theme.space['4']};
  padding: ${({ theme }) => theme.space['0']} ${({ theme }) => theme.space['2']}
    ${({ theme }) => theme.space['0']} ${({ theme }) => theme.space['2']};
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`

const DropdownItem = styled(Stack, {
  shouldForwardProp: prop => !['disabled', 'selected'].includes(prop),
})<{
  disabled: boolean
  selected: boolean
}>`
  background-color: ${({ theme, selected, disabled }) => {
    if (selected) {
      return `${theme.colors.primary.backgroundStrong};`
    }
    if (disabled) {
      return `${theme.colors.neutral.backgroundDisabled};`
    }

    return `${theme.colors.neutral.background};`
  }}
  padding: ${({ theme }) => theme.space['1.5']}
    ${({ theme }) => theme.space['2']} ${({ theme }) => theme.space['1.5']}
    ${({ theme }) => theme.space['2']};
  color:  ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.textDisabled}` : `${theme.colors.neutral.text}`)};


  &:hover {
    background-color: ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.backgroundStrongDisabled};` : `${theme.colors.primary.background};`)}
    color: ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.textStrongDisabled}` : `${theme.colors.primary.text}`)};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')}
  }
`

export const Dropdown = ({
  options,
  isVisible,
  children,
  selectedValues,
  setSelectedValues,
  multiselect,
  grouped,
}: DropdownProps) => {
  const { setSearchInput } = useContext(ValueInput)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedOption = event.currentTarget.textContent || ''

    if (multiselect) {
      setSelectedValues(selectedValues)
    } else {
      setSelectedValues([clickedOption])
      setSearchInput(clickedOption)
    }
  }

  const text = grouped ? (
    <DropdownContainer>
      {Object.keys(options).map(key => (
        <>
          <DropdownGroup key={key}>
            <Text variant="caption" as="span">
              {key.toUpperCase()}
            </Text>
          </DropdownGroup>
          <Stack>
            {options[key].map(option => (
              <DropdownItem
                key={option.value}
                onClick={event => {
                  if (!option.disabled) {
                    handleClick(event)
                  }
                }}
                disabled={option.disabled}
                selected={
                  selectedValues.includes(option.value) && option.disabled
                }
              >
                <Text as="span" variant="body">
                  {option.label}
                </Text>
              </DropdownItem>
            ))}
          </Stack>
        </>
      ))}
    </DropdownContainer>
  ) : (
    <DropdownContainer>
      {Object.keys(options).map(key => (
        <Stack key={key}>
          {options[key].map(option => (
            <DropdownItem
              key={option.value}
              onClick={handleClick}
              disabled={option.disabled}
              selected={false}
            >
              <Text as="span" variant="body">
                {option.label}
              </Text>
            </DropdownItem>
          ))}
        </Stack>
      ))}
    </DropdownContainer>
  )

  return (
    <StyledPopup
      visible={isVisible}
      text={text}
      placement="bottom"
      containerFullWidth
      disableAnimation
      maxWidth="400px"
      hasArrow={false}
    >
      {children}
    </StyledPopup>
  )
}
