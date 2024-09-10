import type { StoryFn } from '@storybook/react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'

export const SubHeader: StoryFn = args => (
  <Stack>
    <Card {...args}>
      <Text as="p" variant="body" sentiment="neutral">
        This is the content of a card.
      </Text>
    </Card>
    <Card
      {...args}
      subHeader={
        <Stack gap={1} direction="row" alignItems="center">
          <Text as="h5" variant="headingSmallStrong" sentiment="neutral">
            Advanced subHeader
          </Text>
          <Badge sentiment="success" size="small">
            New
          </Badge>
        </Stack>
      }
    >
      <Text as="p" variant="body" sentiment="neutral">
        This is the content of a card with an advanced subHeader
      </Text>
    </Card>
  </Stack>
)

SubHeader.args = {
  subHeader: 'subHeader',
}

SubHeader.parameters = {
  docs: {
    description: {
      story:
        'You can pass a `string` to the `subHeader` prop to display a simple subHeader inside the card.',
    },
  },
}
