import type { StoryFn } from '@storybook/react-vite'
import { ContentCard } from '../index'
import { Template } from './Template.stories'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'

export const Loading: StoryFn<typeof ContentCard> = args => (
  <Stack gap={2}>
    <Stack width="315px">
      <Text as="h2" variant="headingSmall">
        Column
      </Text>
      <ContentCard {...args} direction="column" loading />
    </Stack>
    <Stack>
      <Text as="h2" variant="headingSmall">
        Row
      </Text>
      <ContentCard {...args} direction="row" loading />
    </Stack>
  </Stack>
)

Loading.args = { ...Template.args }

Loading.parameters = {
  description: {
    story:
      'You can easily enable a loading state by passing `loading` it will render a placeholder skeleton.',
  },
}
