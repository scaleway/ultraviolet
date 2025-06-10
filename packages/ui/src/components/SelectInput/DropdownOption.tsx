'use client'

import styled from '@emotion/styled'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { OptionType } from './types'

const StyledInfo = styled.div`
  align-content: center;
`
const TextItem = styled(Text)`
  overflow: auto;
  text-overflow: ellipsis;
  flex-shrink: 0;
  flex-wrap: wrap;
  max-width: 100%;
`
const CustomStack = styled(Stack)`
overflow: hidden;
`

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
          gap={0.5}
          direction="row"
          justifyContent="left"
          data-testid={`option-stack-${option.value}`}
        >
          <CustomStack gap={0.5} direction="row" alignItems="center">
            {option.optionalInfo ?? null}
            <TextItem as="span" variant="body" placement="left">
              {option.label}
            </TextItem>
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
          </CustomStack>
        </Stack>
      </Tooltip>
    )
  }

  if (descriptionDirection === 'row' && optionalInfoPlacement === 'right') {
    return (
      <Tooltip text={option.tooltip}>
        <Stack
          gap={0.5}
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          data-testid={`option-stack-${option.value}`}
        >
          <CustomStack gap={0.5} direction="row" alignItems="baseline">
            <TextItem as="span" variant="body" placement="left">
              {option.label}
            </TextItem>
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
          </CustomStack>
          {option.optionalInfo ? (
            <StyledInfo>{option.optionalInfo}</StyledInfo>
          ) : null}
        </Stack>
      </Tooltip>
    )
  }

  if (descriptionDirection === 'column' && optionalInfoPlacement === 'left') {
    return (
      <Tooltip text={option.tooltip}>
        <Stack
          gap={0.5}
          direction="row"
          justifyContent={option.optionalInfo ? 'left' : 'space-between'}
          alignItems="normal"
        >
          {option.optionalInfo ?? null}

          <CustomStack
            gap={0.5}
            direction="column"
            data-testid={`option-stack-${option.value}`}
          >
            <TextItem as="span" variant="body" placement="left">
              {option.label}
            </TextItem>
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
          </CustomStack>
        </Stack>
      </Tooltip>
    )
  }

  return (
    <Tooltip text={option.tooltip}>
      <Stack
        gap={0.5}
        direction="column"
        alignItems="normal"
        data-testid={`option-stack-${option.value}`}
      >
        <CustomStack gap={0.5} direction="row" justifyContent="space-between">
          <TextItem as="span" variant="body" placement="left">
            {option.label}
          </TextItem>
          {option.optionalInfo ? (
            <StyledInfo>{option.optionalInfo}</StyledInfo>
          ) : null}
        </CustomStack>
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
    </Tooltip>
  )
}
