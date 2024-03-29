import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { INPUT_SIZE_HEIGHT, type OptionType, SIZES_TAG } from './types'

type SelectBarProps = {
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  disabled: boolean
  readOnly: boolean
  value: OptionType | undefined
  placeholder: string
  multiselect: boolean
  state: 'neutral' | 'danger' | 'success'
  onChange?: (value: (string | undefined)[]) => void
  autoFocus?: boolean
  innerRef: RefObject<HTMLDivElement>
  selectedValues: (OptionType | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  isDropdownVisible: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
}

type StyledInputWrapperProps = {
  size: 'small' | 'medium' | 'large'
  isDropdownVisible: boolean
  state: 'neutral' | 'danger' | 'success'
  openable: boolean
}

const StateStack = styled(Stack)`
  padding-right: ${({ theme }) => theme.space['2']};
  right: 0px;
  display: flex;
`

const StackTags = styled(Stack, {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width: number | undefined }>`
  max-width: ${({ width }) => width}px;
  overflow: hidden;
`
const StyledInputWrapper = styled(Stack, {
  shouldForwardProp: prop =>
    !['size', 'isDropdownVisible', 'state', 'openable'].includes(prop),
})<StyledInputWrapperProps>`
  display: flex;
  height: ${({ size }) => INPUT_SIZE_HEIGHT[size]}px;
  padding: ${({ theme }) => theme.space[1]};
  padding-right: 0;
  padding-left: ${({ theme }) => theme.space[2]};

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme, state }) => theme.colors[state].border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:hover,
  :focus {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    outline: none;
  }
  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
  }

  &:not([data-disabled='true']):not([data-readonly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  &:active {
    box-shadow: ${({ theme, openable }) =>
      openable ? theme.shadows.focusPrimary : 'none'};
  }

  ${({ theme, isDropdownVisible }) =>
    !isDropdownVisible
      ? ''
      : `
          box-shadow: ${theme.shadows.focusPrimary};
          border-color: ${theme.colors.primary.borderHover};
          }
        `}
`
const CustomTag = styled(Tag)`
  height: fit-content;
  width: fit-content;
`

const StyledPlaceholder = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  text-size: ${({ theme }) => theme.typography.body.fontSize};
  display: flex;
  flex: 1;
  align-self: center;
`

type MakeTagProps = {
  selectedValues: (OptionType | undefined)[]
  disabled: boolean
  readOnly: boolean
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  onChange?: (value: (string | undefined)[]) => void
}
const makeTags = ({
  selectedValues,
  disabled,
  readOnly,
  setSelectedValues,
  onChange,
}: MakeTagProps) =>
  selectedValues.map(selectedValue => (
    <CustomTag
      key={selectedValue?.value}
      sentiment="neutral"
      disabled={disabled}
      onClose={
        !readOnly
          ? event => {
              event.stopPropagation()
              const newSelectedValues = selectedValues
                ?.filter(val => val !== selectedValue)
                .map(val => val?.value)
              setSelectedValues(
                selectedValues?.filter(val => val !== selectedValue),
              )
              onChange?.(newSelectedValues)
            }
          : undefined
      }
    >
      {selectedValue?.label}
    </CustomTag>
  ))

export const SelectBar = ({
  size,
  clearable,
  disabled,
  readOnly,
  value,
  placeholder,
  multiselect,
  state,
  onChange,
  autoFocus,
  innerRef,
  selectedValues,
  setSelectedValues,
  isDropdownVisible,
  setIsDropdownVisible,
}: SelectBarProps) => {
  const openable = !(readOnly || disabled)
  const refTag = useRef<HTMLDivElement>(null)
  const width = innerRef.current?.offsetWidth
  const [overflowed, setOverflowed] = useState(false)
  const [overflowAmount, setOverflowAmount] = useState(0)
  const [nonOverflowedValues, setNonOverFlowedValues] = useState<
    (OptionType | undefined)[]
  >([value])

  useEffect(() => {
    let tagsWidth = 0
    let computedOverflowAmount = 0
    let computedOverflowed = false
    let computedNonOverflowedValues: (OptionType | undefined)[] = []
    if (computedOverflowed) {
      computedOverflowAmount += 1
      setOverflowAmount(computedOverflowAmount)
    } else {
      for (const selectedValue of selectedValues) {
        if (selectedValue && selectedValue.label && width) {
          const totalTagWidth =
            SIZES_TAG.tagWidth +
            SIZES_TAG.letterWidth * selectedValue.value.toString().length
          if (totalTagWidth + tagsWidth > width - 100) {
            setOverflowed(true)
            computedOverflowed = true
            computedOverflowAmount += 1
            setOverflowAmount(computedOverflowAmount)
          } else {
            setOverflowed(false)
            setNonOverFlowedValues([
              ...computedNonOverflowedValues,
              selectedValue,
            ])
            computedNonOverflowedValues = [
              ...computedNonOverflowedValues,
              selectedValue,
            ]
            tagsWidth += totalTagWidth
          }
        }
      }
    }
    setOverflowAmount(computedOverflowAmount)
  }, [selectedValues, width, overflowed])

  const displayValues = () =>
    multiselect ? (
      <StackTags
        direction="row"
        gap="1"
        wrap="nowrap"
        ref={refTag}
        width={width}
      >
        {makeTags({
          selectedValues: nonOverflowedValues,
          disabled,
          readOnly,
          setSelectedValues,
          onChange,
        })}
        {overflowed ? (
          <CustomTag sentiment="neutral" disabled={disabled} key="+">
            +{overflowAmount}
          </CustomTag>
        ) : null}
      </StackTags>
    ) : (
      selectedValues[0]?.label
    )

  return (
    <StyledInputWrapper
      data-disabled={disabled}
      data-readonly={readOnly}
      size={size}
      isDropdownVisible={isDropdownVisible}
      state={state}
      direction="row"
      wrap="nowrap"
      gap="1"
      justifyContent="space-between"
      alignItems="center"
      onClick={
        openable ? () => setIsDropdownVisible(!isDropdownVisible) : undefined
      }
      autoFocus={autoFocus}
      onKeyDown={event => {
        if (event.key === 'ArrowDown') {
          setIsDropdownVisible(true)
        }

        return ['Enter', ' '].includes(event.key) && openable
          ? setIsDropdownVisible(!isDropdownVisible)
          : null
      }}
      ref={innerRef}
      openable={!(readOnly || disabled)}
      aria-labelledby="select bar"
      aria-haspopup="listbox"
      aria-expanded={isDropdownVisible}
      aria-controls="select-dropdown"
      tabIndex={0}
    >
      {selectedValues.length > 0 ? (
        displayValues()
      ) : (
        <StyledPlaceholder as="p" variant="body">
          {placeholder}
        </StyledPlaceholder>
      )}
      <StateStack direction="row" gap={1} alignItems="center">
        {state === 'danger' ? <Icon name="alert" sentiment="danger" /> : null}
        {state === 'success' ? (
          <Icon name="checkbox-circle-outline" sentiment="success" />
        ) : null}
        {clearable && selectedValues.length > 0 ? (
          <Button
            aria-label="clear value"
            disabled={disabled || !value}
            variant="ghost"
            size={size === 'small' ? 'xsmall' : 'small'}
            icon="close"
            onClick={event => {
              event.stopPropagation()
              setSelectedValues([])
              onChange?.([])
            }}
            sentiment="neutral"
          />
        ) : null}
        <Icon
          aria-label="show dropdown"
          size={size === 'small' ? 'xsmall' : 'small'}
          name="arrow-down"
          sentiment="neutral"
        />
      </StateStack>
    </StyledInputWrapper>
  )
}
