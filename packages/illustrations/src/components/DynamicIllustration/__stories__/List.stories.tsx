import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { DynamicIllustration } from '..'
import { ILLUSTRATIONS } from '../__generated__/Illustrations'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ILLUSTRATIONS.light).map(iconName => (
      <Stack direction="row" gap={1} alignItems="center" key={iconName}>
        <DynamicIllustration
          name={iconName as keyof typeof ILLUSTRATIONS.light}
          width={100}
          {...props}
        />
        <Text as="span" variant="bodyStrong">
          {iconName}
        </Text>
      </Stack>
    ))}
  </Stack>
)
