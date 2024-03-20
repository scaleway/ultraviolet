import styled from '@emotion/styled'
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
} from 'react'
import { Checkbox, Popup, Stack, Text } from '..'
import { type DataType, ValueInput } from './helper'

type DropdownProps = {
  options: DataType
  isVisible: boolean
  children: ReactNode
  selectedValues: (string | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(string | undefined)[]>>
  multiselect: boolean
  grouped: boolean
  emptyState: ReactNode
  direction?: 'row' | 'column'
}

const StyledPopup = styled(Popup)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};
`

const DropdownContainer = styled.div`
  max-height: 312px;
  overflow: scroll;
  padding: 0px;
`
const DropdownGroup = styled(Stack)`
  height: ${({ theme }) => theme.space['4']};
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  position: sticky;
  top: 0px;
  height: 32px;
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

const StyledTextGroup = styled(Text)`
  line-height: 32px;
`

export const Dropdown = ({
  options,
  isVisible,
  children,
  selectedValues,
  setSelectedValues,
  multiselect,
  grouped,
  emptyState,
  direction,
}: DropdownProps) => {
  const { setSearchInput } = useContext(ValueInput)
  const handleClick = (clickedOption: string) => {
    if (multiselect) {
      if (selectedValues.includes(clickedOption)) {
        setSelectedValues(selectedValues.filter(val => val !== clickedOption))
      } else {
        setSelectedValues([...selectedValues, clickedOption])
      }
    } else {
      setSelectedValues([clickedOption])
      setSearchInput(clickedOption)
    }
  }

  const isEmpty = useMemo(() => {
    const keys = Object.keys(options)
    for (const key of keys) {
      if (options[key].length !== 0) {
        return false
      }
    }

    return true
  }, [options])

  const computedEmptyState = emptyState ?? (
    <Text variant="bodyStrong" as="div">
      No options
    </Text>
  )

  const displayOption = (option: {
    value: string
    label: ReactNode
    disabled: boolean
    description?: string
  }) => {
    if (multiselect) {
      return (
        <Stack direction="row">
          <Checkbox
            checked={selectedValues.includes(option.value)}
            disabled={option.disabled}
          >
            <Stack gap={0.5} direction={direction}>
              <Text as="span" variant="body" placement="left">
                {option.label}
              </Text>
              {option.description ? (
                <Text
                  as="span"
                  variant="bodySmall"
                  sentiment="neutral"
                  placement="left"
                  prominence="weak"
                >
                  {option.description}
                </Text>
              ) : null}
            </Stack>
          </Checkbox>
        </Stack>
      )
    }

    return (
      <Stack gap={0.5} direction={direction}>
        <Text as="span" variant="body" placement="left">
          {option.label}
        </Text>
        {option.description ? (
          <Text
            as="span"
            variant="bodySmall"
            sentiment="neutral"
            placement="left"
            prominence="weak"
          >
            {option.description}
          </Text>
        ) : null}{' '}
      </Stack>
    )
  }

  const text = grouped ? (
    <DropdownContainer>
      {Object.keys(options).map(key => (
        <>
          <DropdownGroup key={key}>
            <StyledTextGroup variant="caption" as="span">
              {key.toUpperCase()}
            </StyledTextGroup>
          </DropdownGroup>
          <Stack>
            {options[key].map(option => (
              <DropdownItem
                key={option.value}
                onClick={() => {
                  if (!option.disabled) {
                    handleClick(option.value)
                  }
                }}
                disabled={option.disabled}
                selected={
                  selectedValues.includes(option.value) && option.disabled
                }
              >
                {displayOption(option)}
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
              onClick={() => {
                if (!option.disabled) {
                  handleClick(option.value)
                }
              }}
              disabled={option.disabled}
              selected={false}
            >
              {displayOption(option)}
            </DropdownItem>
          ))}
        </Stack>
      ))}
    </DropdownContainer>
  )

  return (
    <StyledPopup
      visible={isVisible}
      text={isEmpty ? computedEmptyState : text}
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
