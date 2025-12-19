'use client'

import { RayStartArrowIcon } from '@ultraviolet/icons'
import { Row, SelectInput, Stack } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { useMemo } from 'react'
import { RevealOnHover } from './RevealOnHover'
import { optionSelectorArrow } from './styles.css'
import type { OptionSelectorProps, SelectorOption } from './types'

const mergeIconWithContent = (content: ReactNode, icon: ReactNode) => (
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
        content={mergeIconWithContent(option.content, option.icon)}
        hoverContent={mergeIconWithContent(option.hoverContent, option.icon)}
      />
    ) : (
      mergeIconWithContent(option.content, option.icon)
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
}: OptionSelectorProps) => {
  const firstValue = useMemo(() => {
    if (firstSelector.value) {
      return firstSelector.value
    }

    if (firstSelector.options.length === 1) {
      firstSelector.onChange?.(
        firstSelector.options[0].value as string & string[],
      )

      return firstSelector.options[0].value
    }

    return undefined
  }, [firstSelector])

  const secondValue = useMemo(() => {
    if (secondSelector?.value) {
      return secondSelector?.value
    }

    if (secondSelector?.options.length === 1) {
      secondSelector.onChange?.(
        secondSelector.options[0].value as string & string[],
      )

      return secondSelector?.options[0].value
    }

    return undefined
  }, [secondSelector])

  const firstSelectorOptions = makeSelectInputOptions(firstSelector.options)
  const secondSelectorOptions = secondSelector?.options
    ? makeSelectInputOptions(secondSelector.options)
    : undefined

  const onChangeFirstSelector = (value: string) => {
    firstSelector.onChange?.(value as string & string[])
  }
  const onChangeSecondSelector = (value: string) =>
    secondSelector?.onChange?.(value as string & string[])

  return (
    <Row
      alignItems="start"
      className={className}
      data-testid={dataTestId}
      gap={2}
      style={style}
      templateColumns="1fr auto 1fr"
    >
      <SelectInput
        data-testid="first-selector"
        disabled={firstSelector.disabled || disabled}
        error={firstSelector.error}
        helper={firstSelector.helper}
        label={firstSelector.label}
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
        size={size}
        value={firstValue}
      />
      {firstSelector.value && secondSelector && secondSelectorOptions ? (
        <>
          <RayStartArrowIcon
            className={optionSelectorArrow[size]}
            prominence="weak"
            sentiment="neutral"
            size={size}
          />
          <SelectInput
            data-testid="second-selector"
            disabled={
              !!firstSelector.error || secondSelector.disabled || disabled
            }
            error={secondSelector.error}
            helper={secondSelector.helper}
            label={secondSelector.label}
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
    </Row>
  )
}
