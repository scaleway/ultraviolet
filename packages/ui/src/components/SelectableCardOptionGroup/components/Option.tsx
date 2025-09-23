'use client'

import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useId } from 'react'
import { Label } from '../../Label'
import { radioStack } from '../../Radio/styles.css'
import { SelectableCard } from '../../SelectableCard'
import { SelectInput } from '../../SelectInput'
import { StyledInputWrapper } from '../../SelectInput/SelectBar'
import { Stack } from '../../Stack'
import { useSelectableCardOptionGroup } from '../Provider'
import { Image } from './Image'

const StyledSelectableCard = styled(SelectableCard)`
  padding: 0;
  padding-top: ${({ theme }) => theme.space[2]};

  ${radioStack} {
    position: absolute;
    padding: 8px;
    margin-top: -${({ theme }) => theme.space[2]};
  }

  cursor: pointer;
`

const FullHeightStack = styled(Stack)`
  height: 100%;
`

const StyledSelectInput = styled(SelectInput, {
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
  options: ComponentProps<typeof SelectInput>['options']
  optionValue?: ComponentProps<typeof SelectInput>['value']
  optionPlaceholder?: ComponentProps<typeof SelectInput>['placeholder']
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
      checked={groupValue === value}
      className={className}
      data-testid={dataTestId}
      disabled={disabled || groupDisabled}
      isError={error}
      onChange={event => {
        onChange?.(event)
        if (Array.isArray(options)) {
          onChangeOption?.(options?.[0]?.value)
        }
      }}
      showTick
      tooltip={tooltip}
      type="radio"
      value={value}
      {...(label ? { id: inputId } : { 'aria-label': ariaLabel as string })}
    >
      <FullHeightStack
        direction="column"
        flex="1 1 auto"
        gap={2}
        justifyContent="space-between"
        width="100%"
      >
        <StyledPaddedStack
          alignItems="center"
          direction="column"
          gap={1}
          justifyContent="center"
          width="100%"
        >
          {typeof image === 'string' ? (
            <Image
              alt={typeof label === 'string' ? label : value}
              disabled={disabled || groupDisabled}
              size={size}
              src={image}
            />
          ) : (
            image
          )}
          <Stack
            alignItems="center"
            direction="column"
            gap={0.5}
            justifyContent="center"
            width="100%"
          >
            {typeof label === 'string' ? (
              <Label
                disabled={disabled || groupDisabled}
                htmlFor={inputId}
                labelDescription={labelDescription}
                sentiment={groupValue === value ? 'primary' : 'neutral'}
              >
                {label}
              </Label>
            ) : (
              label
            )}
            {children}
          </Stack>
        </StyledPaddedStack>
        <StyledSelectInput
          aria-label={
            typeof label === 'string' ? `${label} option` : `${value} option`
          }
          checked={groupValue === value}
          data-testid={dataTestId ? `${dataTestId}-select` : undefined}
          disabled={disabled || groupDisabled}
          error={error}
          name="selectable-card-option"
          onChange={onChangeOption}
          options={options}
          placeholder={optionPlaceholder}
          size="medium"
          value={optionValue}
        />
      </FullHeightStack>
    </StyledSelectableCard>
  )
}
