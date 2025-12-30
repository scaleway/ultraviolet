'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useId } from 'react'
import { Label } from '../../Label'
import { SelectableCard } from '../../SelectableCard'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'
import { useSelectableCardOptionGroup } from '../Provider'
import {
  optionFullHeight,
  optionPadded,
  optionSelectInput,
  optionSelectInputDisabled,
  optionSelectInputError,
  selectableCard,
} from '../styles.css'
import { Image } from './Image'

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
  style,
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
    <SelectableCard
      checked={groupValue === value}
      className={cn(className, selectableCard)}
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
      style={style}
      tooltip={tooltip}
      type="radio"
      value={value}
      {...(label ? { id: inputId } : { 'aria-label': ariaLabel as string })}
    >
      <Stack
        className={optionFullHeight}
        direction="column"
        flex="1 1 auto"
        gap={2}
        justifyContent="space-between"
        width="100%"
      >
        <Stack
          alignItems="center"
          className={optionPadded}
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
        </Stack>
        <SelectInput
          aria-label={
            typeof label === 'string' ? `${label} option` : `${value} option`
          }
          className={cn(
            optionSelectInput,
            disabled || groupDisabled ? optionSelectInputDisabled : '',
            error ? optionSelectInputError : '',
          )}
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
      </Stack>
    </SelectableCard>
  )
}
