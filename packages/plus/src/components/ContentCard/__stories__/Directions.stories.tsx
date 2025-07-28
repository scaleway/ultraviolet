import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import { ContentCard } from '../index'
import { Template } from './Template.stories'

export const Directions: StoryFn<typeof ContentCard> = args => (
  <Stack gap={2}>
    <Stack width="315px">
      <Text as="h2" variant="headingSmall">
        Column
      </Text>
      <ContentCard {...args} direction="column" />
    </Stack>
    <Stack>
      <Text as="h2" variant="headingSmall">
        Row
      </Text>
      <ContentCard {...args} direction="row" />
    </Stack>
  </Stack>
)

Directions.args = { ...Template.args }
