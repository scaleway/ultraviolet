'use client'

import { useMemo } from 'react'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { Tooltip } from '../../../Tooltip'
import type { OptionType } from '../../types'
import { selectInputStyle } from '../../styles.css'

type DisplayOptionProps = {
  option: OptionType
  descriptionDirection: 'row' | 'column'
  optionalInfoPlacement: 'left' | 'right'
  textVariant: 'body' | 'bodySmall'
}

export const DisplayOption = ({
  option,
  optionalInfoPlacement,
  descriptionDirection,
  textVariant,
}: DisplayOptionProps) => {
  const captionSize = useMemo(() => (textVariant === 'body' ? 'bodySmall' : 'caption'), [textVariant])

  const optionDescription = option.description ? (
    <Text
      as="span"
      placement="left"
      prominence="weak"
      sentiment={option.disabled ? undefined : 'neutral'}
      variant={captionSize}
    >
      {option.description}
    </Text>
  ) : null

  if (descriptionDirection === 'row' && optionalInfoPlacement === 'left') {
    return (
      <Tooltip disableAnimation text={option.tooltip}>
        <Stack
          alignItems={optionDescription ? 'flex-start' : 'center'}
          className={selectInputStyle.dropdownInfoContainer}
          direction="row"
          data-testid={`option-stack-${option.value}`}
          gap={0.5}
        >
          {option.optionalInfo}
          <Text as="span" className={selectInputStyle.dropdownInfoTextItem} placement="left" variant={textVariant}>
            {option.label}
          </Text>
          {optionDescription}
        </Stack>
      </Tooltip>
    )
  }

  if (descriptionDirection === 'row' && optionalInfoPlacement === 'right') {
    return (
      <Tooltip disableAnimation text={option.tooltip}>
        <Stack
          alignItems="baseline"
          data-testid={`option-stack-${option.value}`}
          direction="row"
          gap={0.5}
          justifyContent="space-between"
        >
          <Stack alignItems="baseline" className={selectInputStyle.dropdownInfoContainer} direction="row" gap={0.5}>
            <Text as="span" className={selectInputStyle.dropdownInfoTextItem} placement="left" variant={textVariant}>
              {option.label}
            </Text>
            {optionDescription}
          </Stack>
          {option.optionalInfo ? <div className={selectInputStyle.dropdownInfo}>{option.optionalInfo}</div> : null}
        </Stack>
      </Tooltip>
    )
  }

  if (descriptionDirection === 'column' && optionalInfoPlacement === 'left') {
    return (
      <Tooltip disableAnimation text={option.tooltip}>
        <Stack
          alignItems="normal"
          direction="row"
          gap={0.5}
          justifyContent={option.optionalInfo ? 'left' : 'space-between'}
          className={selectInputStyle.optionalInfoPadding}
        >
          {option.optionalInfo}
          <Stack
            className={selectInputStyle.dropdownInfoContainer}
            data-testid={`option-stack-${option.value}`}
            direction="column"
            gap={0.5}
          >
            <Text as="span" className={selectInputStyle.dropdownInfoTextItem} placement="left" variant={textVariant}>
              {option.label}
            </Text>
            {optionDescription}
          </Stack>
        </Stack>
      </Tooltip>
    )
  }

  return (
    <Tooltip disableAnimation text={option.tooltip}>
      <Stack alignItems="normal" data-testid={`option-stack-${option.value}`} direction="column" gap={0.5}>
        <Stack
          className={selectInputStyle.dropdownInfoContainer}
          direction="row"
          gap={0.5}
          justifyContent="space-between"
          alignItems={optionDescription ? 'flex-start' : 'center'}
        >
          <Text as="span" className={selectInputStyle.dropdownInfoTextItem} placement="left" variant={textVariant}>
            {option.label}
          </Text>
          {option.optionalInfo ? <div className={selectInputStyle.dropdownInfo}>{option.optionalInfo}</div> : null}
        </Stack>
        {optionDescription}
      </Stack>
    </Tooltip>
  )
}
