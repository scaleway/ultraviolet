'use client'

import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useId } from 'react'
import { Label } from '../../Label'
import { RadioStack } from '../../Radio'
import { SelectInputV2 } from '../../SelectInputV2'
import { StyledInputWrapper } from '../../SelectInputV2/SelectBar'
import { SelectableCard } from '../../SelectableCard'
import { Stack } from '../../Stack'
import { useSelectableCardOptionGroup } from '../Provider'
import { Image } from './Image'

const StyledSelectableCard = styled(SelectableCard)`
  padding: 0;
  padding-top: ${({ theme }) => theme.space[2]};

  ${RadioStack} {
    position: absolute;
    padding: 8px;
    margin-top: -${({ theme }) => theme.space[2]};
  }

  cursor: pointer;
`

const FullHeightStack = styled(Stack)`
  height: 100%;
`

const StyledSelectInputV2 = styled(SelectInputV2, {
  shouldForwardProp: prop => !['checked'].includes(prop),
})<{ checked: boolean }>`
  ${StyledInputWrapper} {
    border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default};
    border-bottom: 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;
  }

  ${StyledInputWrapper}:hover, ${StyledInputWrapper}:focus, ${StyledInputWrapper}:active {
    border-color: ${({ theme, disabled, error }) => {
      if (disabled) {
        return theme.colors.neutral.borderDisabled
      }

      if (error) {
        return theme.colors.danger.border
      }

      return theme.colors.neutral.border
    }} !important;
    outline: none;
  }
`

const StyledPaddedStack = styled(Stack)`
  padding: 0 ${({ theme }) => theme.space[2]};
`

type OptionProps = Omit<ComponentProps<typeof SelectableCard>, 'onChange'> & {
  value: string
  className?: string
  children?: ReactNode
  options: ComponentProps<typeof SelectInputV2>['options']
  optionValue?: ComponentProps<typeof SelectInputV2>['value']
  optionPlaceholder?: ComponentProps<typeof SelectInputV2>['placeholder']
  image?: ReactNode
  labelDescription?: ComponentProps<typeof Label>['labelDescription']
  id?: string
  'data-testid'?: string
  tooltip?: string
}

export const Option = ({
  value,
  label,
  labelDescription,
  'aria-label': ariaLabel,
  children,
  className,
  options,
  optionPlaceholder,
  image,
  disabled,
  id,
  'data-testid': dataTestId,
  tooltip,
}: OptionProps) => {
  const {
    onChange,
    onChangeOption,
    groupValue,
    disabled: groupDisabled,
    size,
    error,
    optionValue,
  } = useSelectableCardOptionGroup()

  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <StyledSelectableCard
      value={value}
      onChange={event => {
        onChange?.(event)
        if (Array.isArray(options)) {
          onChangeOption?.(options?.[0]?.value)
        }
      }}
      className={className}
      type="radio"
      showTick
      disabled={disabled || groupDisabled}
      checked={groupValue === value}
      isError={error}
      data-testid={dataTestId}
      tooltip={tooltip}
      {...(label ? { id: inputId } : { 'aria-label': ariaLabel as string })}
    >
      <FullHeightStack
        direction="column"
        width="100%"
        flex="1 1 auto"
        justifyContent="space-between"
        gap={2}
      >
        <StyledPaddedStack
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={1}
        >
          {typeof image === 'string' ? (
            <Image
              src={image}
              alt={typeof label === 'string' ? label : value}
              size={size}
              disabled={disabled || groupDisabled}
            />
          ) : (
            image
          )}
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            gap={0.5}
          >
            {typeof label === 'string' ? (
              <Label
                sentiment={groupValue === value ? 'primary' : 'neutral'}
                htmlFor={inputId}
                disabled={disabled || groupDisabled}
                labelDescription={labelDescription}
              >
                {label}
              </Label>
            ) : (
              label
            )}
            {children}
          </Stack>
        </StyledPaddedStack>
        <StyledSelectInputV2
          value={optionValue}
          onChange={onChangeOption}
          options={options}
          name="selectable-card-option"
          size="medium"
          disabled={disabled || groupDisabled}
          error={error}
          checked={groupValue === value}
          aria-label={
            typeof label === 'string' ? `${label} option` : `${value} option`
          }
          data-testid={dataTestId ? `${dataTestId}-select` : undefined}
          placeholder={optionPlaceholder}
        />
      </FullHeightStack>
    </StyledSelectableCard>
  )
}
