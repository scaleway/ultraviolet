import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { DynamicIllustration } from '..'
import { ILLUSTRATIONS } from '../Illustrations'

const StyledDynamicIllustration = styled(DynamicIllustration)`
  width: 100px;
`

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ILLUSTRATIONS.light).map(iconName => (
      <Stack direction="row" gap={1} alignItems="center">
        <StyledDynamicIllustration
          name={iconName as keyof typeof ILLUSTRATIONS.light}
          {...props}
        />
        <Text as="span" variant="bodyStrong">
          {iconName}
        </Text>
      </Stack>
    ))}
  </Stack>
)
