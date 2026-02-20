import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'
import { Row } from '../../../Row'
import { Status } from '../../../Status'
import { Text } from '../../../Text'

export const Custom: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({
  ...props
}) => (
  <ContentCardGroup {...props}>
    <ContentCardGroup.Card
      href="http://scaleway.com/example"
      subtitle="Sept 22, 2023 - 11h01"
    >
      <Row alignItems="center" gap={1} templateColumns="repeat(2, auto)">
        <Status sentiment="success" />
        <Text as="h3" oneLine sentiment="neutral" variant="bodyStrong">
          [PAR] Servers are ups, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat
          nibh.
        </Text>
      </Row>
    </ContentCardGroup.Card>
    <ContentCardGroup.Card
      href="http://scaleway.com/example"
      subtitle="Sept 22, 2023 - 11h00"
    >
      <Row alignItems="center" gap={1} templateColumns="repeat(2, auto)">
        <Status sentiment="danger" />
        <Text as="h3" oneLine sentiment="neutral" variant="bodyStrong">
          [PAR] Servers are down, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat
          nibh.
        </Text>
      </Row>
    </ContentCardGroup.Card>
    <ContentCardGroup.Card
      href="http://scaleway.com/example"
      subtitle="Sept 22, 2023 - 11h00"
    >
      <Row alignItems="center" gap={1} templateColumns="repeat(2, auto)">
        <Status sentiment="warning" />
        <Text as="h3" oneLine sentiment="neutral" variant="bodyStrong">
          [PAR] Servers are flacky, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat
          nibh.
        </Text>
      </Row>
    </ContentCardGroup.Card>
  </ContentCardGroup>
)

Custom.parameters = {
  docs: {
    description: {
      story:
        'We recommend to use `title`, `subtitle` and `description` properties instead of custom rendering. However if needed you can provide a React node as `children`',
    },
  },
}
