import styled from '@emotion/styled'
import { Stack } from '../Stack'
import { Text } from '../Text'
import type { OptionType } from './types'

const StyledInfo = styled.div`
  align-content: center;
`

type DisplayOptionProps = {
  option: OptionType
  multiselect: boolean
  descriptionDirection: 'row' | 'column'
  optionalInfoPlacement: 'left' | 'right'
}

export const DisplayOption = ({
  option,
  multiselect,
  optionalInfoPlacement,
  descriptionDirection,
}: DisplayOptionProps) => {
  if (descriptionDirection === 'row' && optionalInfoPlacement === 'left') {
    return (
      <Stack
        gap={0.5}
        direction="row"
        justifyContent="left"
        onClick={event => (multiselect ? event.stopPropagation() : null)}
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
    )
  }

  if (descriptionDirection === 'row' && optionalInfoPlacement === 'right') {
    return (
      <Stack
        gap={0.5}
        direction="row"
        justifyContent="space-between"
        onClick={event => (multiselect ? event.stopPropagation() : null)}
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
    )
  }

  if (descriptionDirection === 'column' && optionalInfoPlacement === 'left') {
    return (
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
          onClick={event => (multiselect ? event.stopPropagation() : null)}
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
    )
  }

  return (
    <Stack
      gap={0.5}
      direction="column"
      alignItems="normal"
      onClick={event => (multiselect ? event.stopPropagation() : null)}
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
  )
}
