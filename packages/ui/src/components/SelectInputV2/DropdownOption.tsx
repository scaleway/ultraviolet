import styled from '@emotion/styled'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { OptionType } from './types'

const StyledInfo = styled.div`
  align-content: center;
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
          <Stack gap={0.5} direction="row" alignItems="center">
            {option.optionalInfo ?? null}
            <Text as="span" variant="body" placement="left">
              {option.label}
            </Text>
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
          <Stack gap={0.5} direction="row">
            <Text as="span" variant="body" placement="left">
              {option.label}
            </Text>
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

          <Stack
            gap={0.5}
            direction="column"
            data-testid={`option-stack-${option.value}`}
          >
            <Text as="span" variant="body" placement="left">
              {option.label}
            </Text>
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
        <Stack gap={0.5} direction="row" justifyContent="space-between">
          <Text as="span" variant="body" placement="left">
            {option.label}
          </Text>
          {option.optionalInfo ? (
            <StyledInfo>{option.optionalInfo}</StyledInfo>
          ) : null}
        </Stack>
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
