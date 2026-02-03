import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Card } from '../index'
import { Tooltip } from '../../Tooltip'
import { InformationIcon } from '@ultraviolet/icons/InformationIcon'

export const SubHeader: StoryFn = args => (
  <Stack>
    <Card {...args}>
      <Text as="p" sentiment="neutral" variant="body">
        This is the content of a card.
      </Text>
    </Card>
    <Card
      {...args}
      subHeader={
        <Stack alignItems="center" direction="row" gap={1}>
          <Text as="h5" sentiment="neutral" variant="headingSmallStrong">
            Advanced subHeader
          </Text>
          <Badge sentiment="success" size="small">
            New
          </Badge>
        </Stack>
      }
    >
      <Text as="p" sentiment="neutral" variant="body">
        This is the content of a card with an advanced subHeader
      </Text>
    </Card>
    <Card
      {...args}
      subHeader={
        <Stack alignItems="center" direction="row" gap={1}>
          <Text as="h5" sentiment="neutral" variant="headingSmallStrong">
            Advanced subHeader
          </Text>
          <Tooltip text="I am a tooltip">
            <InformationIcon sentiment="neutral" />
          </Tooltip>
        </Stack>
      }
    >
      <Text as="p" sentiment="neutral" variant="body">
        This is the content of a card with an advanced subHeader
      </Text>
    </Card>
  </Stack>
)

SubHeader.args = {
  header: 'Simple Header',
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
