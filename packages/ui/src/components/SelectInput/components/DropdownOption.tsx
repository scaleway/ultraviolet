'use client'

import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Tooltip } from '../../Tooltip'
import type { OptionType } from '../types'
import {
  dropdownInfo,
  dropdownInfoContainer,
  dropdownInfoTextItem,
} from './dropdown.css'

type DisplayOptionProps = {
  option: OptionType
  descriptionDirection: 'row' | 'column'
  optionalInfoPlacement: 'left' | 'right'
}

export const DisplayOption = ({
  option,
  optionalInfoPlacement,
  descriptionDirection,
}: DisplayOptionProps) => {
  if (descriptionDirection === 'row' && optionalInfoPlacement === 'left') {
    return (
      <Tooltip text={option.tooltip}>
        <Stack
          data-testid={`option-stack-${option.value}`}
          direction="row"
          gap={0.5}
          justifyContent="left"
        >
          <Stack
            alignItems="center"
            className={dropdownInfoContainer}
            direction="row"
            gap={0.5}
          >
            {option.optionalInfo ?? null}
            <Text
              as="span"
              className={dropdownInfoTextItem}
              placement="left"
              variant="body"
            >
              {option.label}
            </Text>
            {option.description ? (
              <Text
                as="span"
                placement="left"
                prominence="weak"
                sentiment="neutral"
                variant="bodySmall"
              >
                {option.description}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Tooltip>
    )
  }

  if (descriptionDirection === 'row' && optionalInfoPlacement === 'right') {
    return (
      <Tooltip text={option.tooltip}>
        <Stack
          alignItems="baseline"
          data-testid={`option-stack-${option.value}`}
          direction="row"
          gap={0.5}
          justifyContent="space-between"
        >
          <Stack
            alignItems="baseline"
            className={dropdownInfoContainer}
            direction="row"
            gap={0.5}
          >
            <Text
              as="span"
              className={dropdownInfoTextItem}
              placement="left"
              variant="body"
            >
              {option.label}
            </Text>
            {option.description ? (
              <Text
                as="span"
                placement="left"
                prominence="weak"
                sentiment="neutral"
                variant="bodySmall"
              >
                {option.description}
              </Text>
            ) : null}
          </Stack>
          {option.optionalInfo ? (
            <div className={dropdownInfo}>{option.optionalInfo}</div>
          ) : null}
        </Stack>
      </Tooltip>
    )
  }

  if (descriptionDirection === 'column' && optionalInfoPlacement === 'left') {
    return (
      <Tooltip text={option.tooltip}>
        <Stack
          alignItems="normal"
          direction="row"
          gap={0.5}
          justifyContent={option.optionalInfo ? 'left' : 'space-between'}
        >
          {option.optionalInfo ?? null}

          <Stack
            className={dropdownInfoContainer}
            data-testid={`option-stack-${option.value}`}
            direction="column"
            gap={0.5}
          >
            <Text
              as="span"
              className={dropdownInfoTextItem}
              placement="left"
              variant="body"
            >
              {option.label}
            </Text>
            {option.description ? (
              <Text
                as="span"
                placement="left"
                prominence="weak"
                sentiment="neutral"
                variant="bodySmall"
              >
                {option.description}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Tooltip>
    )
  }

  return (
    <Tooltip text={option.tooltip}>
      <Stack
        alignItems="normal"
        data-testid={`option-stack-${option.value}`}
        direction="column"
        gap={0.5}
      >
        <Stack
          className={dropdownInfoContainer}
          direction="row"
          gap={0.5}
          justifyContent="space-between"
        >
          <Text
            as="span"
            className={dropdownInfoTextItem}
            placement="left"
            variant="body"
          >
            {option.label}
          </Text>
          {option.optionalInfo ? (
            <div className={dropdownInfo}>{option.optionalInfo}</div>
          ) : null}
        </Stack>
        {option.description ? (
          <Text
            as="span"
            placement="left"
            prominence="weak"
            sentiment="neutral"
            variant="bodySmall"
          >
            {option.description}
          </Text>
        ) : null}
      </Stack>
    </Tooltip>
  )
}
