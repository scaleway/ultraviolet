'use client'

import { RayStartArrowIcon } from '@ultraviolet/icons/RayStartArrowIcon'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useMemo } from 'react'
import { Label } from '../../Label'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { RevealOnHover } from './RevealOnHover'
import {
  arrow,
  errorFirstSelector,
  errorSecondSelector,
  firstLabel,
  firstSelectInput,
  optionSelectorWrapper,
  secondLabel,
  secondSelectInput,
} from './styles.css'
import type { OptionSelectorProps, SelectorOption } from './types'

const IconWithContent = ({
  content,
  icon,
}: {
  content: ReactNode
  icon: ReactNode
}) => (
  <Stack alignItems="center" direction="row" gap="1.5">
    {icon}
    {content}
  </Stack>
)

const makeSelectInputOptions = (
  options: SelectorOption[],
): ComponentProps<typeof SelectInput>['options'] =>
  options.map(option => {
    const optionLabel = option.hoverContent ? (
      <RevealOnHover
        content={
          <IconWithContent content={option.content} icon={option.icon} />
        }
        hoverContent={
          <IconWithContent content={option.hoverContent} icon={option.icon} />
        }
        key={option.value}
      />
    ) : (
      <IconWithContent
        content={option.content}
        icon={option.icon}
        key={option.value}
      />
    )

    return {
      disabled: option.disabled,
      label: optionLabel,
      optionalInfo: option.optionalInfo,
      searchText: option.value,
      tooltip: option.tooltip,
      value: option.value,
    }
  })

/**
 * A compound selection component that displays two sequential select inputs
 * where the first selection contextualizes and filters the options available in the second.
 */
export const OptionSelector = ({
  className,
  style,
  'data-testid': dataTestId,
  firstSelector,
  secondSelector,
  size = 'large',
  disabled,
  readOnly,
  'aria-label': ariaLabel,
  error,
  required,
  onChange,
  name,
  value,
}: OptionSelectorProps) => {
  const firstValue = useMemo(() => {
    if (value?.first) {
      return value.first
    }

    if (firstSelector.options.length === 1) {
      onChange?.({
        first: firstSelector.options[0].value as string & string[],
        second: value?.second,
      })

      return firstSelector.options[0].value
    }

    return undefined
  }, [value?.first, value?.second, onChange, firstSelector])

  const secondValue = useMemo(() => {
    if (value?.second) {
      return value.second
    }

    if (secondSelector?.options.length === 1) {
      onChange?.({
        first: value?.first,
        second: secondSelector.options[0].value as string & string[],
      })

      return secondSelector?.options[0].value
    }

    return undefined
  }, [secondSelector, value?.first, value?.second, onChange])

  const firstSelectorOptions = makeSelectInputOptions(firstSelector.options)
  const secondSelectorOptions = secondSelector?.options
    ? makeSelectInputOptions(secondSelector.options)
    : undefined

  const onChangeFirstSelector = (val: string) => {
    onChange?.({ first: val, second: value?.second })
  }
  const onChangeSecondSelector = (val: string) =>
    onChange?.({ first: value?.first, second: val as string & string[] })

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: to fix
    <fieldset
      aria-label={ariaLabel}
      aria-required={required}
      className={cn(className, optionSelectorWrapper)}
      data-testid={dataTestId}
      name={name}
      style={style}
    >
      <Label className={firstLabel} required={required}>
        {firstSelector.label}
      </Label>
      {firstValue && secondSelector && secondSelectorOptions ? (
        <Label className={secondLabel} required={required}>
          {secondSelector?.label}
        </Label>
      ) : null}
      <SelectInput
        className={firstSelectInput}
        data-testid="first-selector"
        disabled={firstSelector.disabled || disabled}
        error={error || !!firstSelector.error}
        helper={firstSelector.helper}
        labelDescription={firstSelector.labelDescription}
        onChange={onChangeFirstSelector}
        optionalInfoPlacement="right"
        options={firstSelectorOptions}
        placeholder={firstSelector.placeholder}
        readOnly={
          firstSelector.options.length === 1 ||
          firstSelector.readOnly ||
          readOnly
        }
        required={required}
        size={size}
        value={firstValue}
      />
      {firstValue && secondSelector && secondSelectorOptions ? (
        <>
          <RayStartArrowIcon
            className={arrow}
            prominence="weak"
            sentiment="neutral"
            size={size}
          />
          <SelectInput
            className={secondSelectInput}
            data-testid="second-selector"
            disabled={
              !!firstSelector.error || secondSelector.disabled || disabled
            }
            error={!!error || !!secondSelector.error}
            helper={secondSelector.helper}
            labelDescription={secondSelector.labelDescription}
            onChange={onChangeSecondSelector}
            optionalInfoPlacement="right"
            options={secondSelectorOptions}
            placeholder={secondSelector.placeholder}
            readOnly={
              secondSelector.options.length === 1 ||
              secondSelector.readOnly ||
              readOnly
            }
            size={size}
            value={secondValue}
          />
        </>
      ) : null}
      {/** Do not use error directly from SelectInput to avoid misalignment issues */}
      {firstSelector.error && typeof firstSelector.error === 'string' ? (
        <Text
          as="p"
          className={errorFirstSelector}
          sentiment="danger"
          variant="caption"
        >
          {firstSelector.error}
        </Text>
      ) : null}
      {secondSelector?.error && typeof secondSelector?.error === 'string' ? (
        <Text
          as="p"
          className={errorSecondSelector}
          sentiment="danger"
          variant="caption"
        >
          {secondSelector.error}
        </Text>
      ) : null}
    </fieldset>
  )
}
