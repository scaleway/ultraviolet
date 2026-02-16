'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { Label } from '../../Label'
import type { SelectInput } from '../../SelectInput'
import { Arrow } from './components/ArrowIcon'
import { IconWithContent } from './components/IconWithContent'
import { RevealOnHover } from './components/RevealOnHover'
import { Selector } from './components/Selector'
import { SelectorHelper } from './components/SelectorLabel'
import { firstLabel, optionSelectorWrapper, secondLabel } from './styles.css'
import type { OptionSelectorProps, SelectorOption } from './types'

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
  hideWhenEmpty,
  direction = 'horizontal',
}: OptionSelectorProps) => {
  const firstValue = useMemo(() => {
    if (value?.first) {
      return value.first
    }

    if (firstSelector.options.length === 1) {
      onChange?.({
        first: firstSelector.options[0].value,
        second: value?.second,
        changingValue: 'first',
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
        second: secondSelector.options[0].value,
        changingValue: 'second',
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
    onChange?.({ first: val, second: value?.second, changingValue: 'first' })
  }
  const onChangeSecondSelector = (val: string) => {
    onChange?.({ first: value?.first, second: val, changingValue: 'second' })
  }

  const isReadOnly = (selector: OptionSelectorProps['firstSelector']) =>
    selector.options.length === 1 || selector.readOnly || readOnly

  const isHorizontal = direction === 'horizontal'
  const firstSelectorStringError = typeof firstSelector.error === 'string'
  const secondSelectorStringError = typeof secondSelector?.error === 'string'

  return (
    <fieldset
      aria-label={ariaLabel}
      className={cn(className, optionSelectorWrapper({ direction }))}
      data-testid={dataTestId}
      name={name}
      style={style}
    >
      {isHorizontal ? (
        <Label className={firstLabel} required={required} size={size}>
          {firstSelector.label}
        </Label>
      ) : null}
      {firstValue && secondSelector && secondSelectorOptions && isHorizontal ? (
        <Label className={secondLabel} required={required}>
          {secondSelector?.label}
        </Label>
      ) : null}
      <Selector
        direction={direction}
        disabled={disabled}
        error={error}
        firstSelector={firstSelector}
        isFirst
        isHorizontal={isHorizontal}
        onChange={onChangeFirstSelector}
        options={firstSelectorOptions}
        readOnly={isReadOnly(firstSelector)}
        required={required}
        size={size}
        value={firstValue}
      />
      {secondSelector &&
      secondSelectorOptions &&
      !(hideWhenEmpty && !firstValue) ? (
        <>
          <Arrow direction={direction} size={size} />
          <Selector
            direction={direction}
            // The second selector is disabled when the first selector has no selected value or is in an error state
            disabled={disabled || !firstValue || !!firstSelector.error}
            error={error}
            firstSelector={secondSelector}
            isHorizontal={isHorizontal}
            onChange={onChangeSecondSelector}
            options={secondSelectorOptions}
            readOnly={isReadOnly(secondSelector)}
            required={required}
            size={size}
            value={secondValue}
          />
        </>
      ) : null}
      {/** Do not use error and helper directly from SelectInput to avoid misalignment issues when direction="horizontal" */}
      {isHorizontal && (firstSelectorStringError || firstSelector.helper) ? (
        <SelectorHelper
          error={firstSelector.error}
          helper={firstSelector.helper}
          isError={firstSelectorStringError}
          isFirst
        />
      ) : null}
      {secondSelector &&
      isHorizontal &&
      (secondSelectorStringError || secondSelector?.helper) ? (
        <SelectorHelper
          error={secondSelector.error}
          helper={secondSelector.helper}
          isError={secondSelectorStringError}
        />
      ) : null}
    </fieldset>
  )
}
