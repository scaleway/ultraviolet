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
          data-testid={`option-stack-${option.value}`}
          direction="row"
          gap={0.5}
          justifyContent="left"
        >
          <CustomStack alignItems="center" direction="row" gap={0.5}>
            {option.optionalInfo ?? null}
            <TextItem as="span" placement="left" variant="body">
              {option.label}
            </TextItem>
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
          </CustomStack>
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
          <CustomStack alignItems="baseline" direction="row" gap={0.5}>
            <TextItem as="span" placement="left" variant="body">
              {option.label}
            </TextItem>
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
          alignItems="normal"
          direction="row"
          gap={0.5}
          justifyContent={option.optionalInfo ? 'left' : 'space-between'}
        >
          {option.optionalInfo ?? null}

          <CustomStack
            data-testid={`option-stack-${option.value}`}
            direction="column"
            gap={0.5}
          >
            <TextItem as="span" placement="left" variant="body">
              {option.label}
            </TextItem>
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
          </CustomStack>
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
        <CustomStack direction="row" gap={0.5} justifyContent="space-between">
          <TextItem as="span" placement="left" variant="body">
            {option.label}
          </TextItem>
          {option.optionalInfo ? (
            <StyledInfo>{option.optionalInfo}</StyledInfo>
          ) : null}
        </CustomStack>
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
