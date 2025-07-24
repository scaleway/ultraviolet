import type { StoryFn } from '@storybook/react-vite'
import { Row, Status, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'

export const Custom: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({
  ...props
}) => (
  <ContentCardGroup {...props}>
    <ContentCardGroup.Card
      subtitle="Sept 22, 2023 - 11h01"
      href="http://scaleway.com/example"
    >
      <Row templateColumns="repeat(2, auto)" gap={1} alignItems="center">
        <Status sentiment="success" />
        <Text as="h3" variant="bodyStrong" sentiment="neutral" oneLine>
          [PAR] Servers are ups, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat
          nibh.
        </Text>
      </Row>
    </ContentCardGroup.Card>
    <ContentCardGroup.Card
      subtitle="Sept 22, 2023 - 11h00"
      href="http://scaleway.com/example"
    >
      <Row templateColumns="repeat(2, auto)" gap={1} alignItems="center">
        <Status sentiment="danger" />
        <Text as="h3" variant="bodyStrong" sentiment="neutral" oneLine>
          [PAR] Servers are down, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat
          nibh.
        </Text>
      </Row>
    </ContentCardGroup.Card>
    <ContentCardGroup.Card
      subtitle="Sept 22, 2023 - 11h00"
      href="http://scaleway.com/example"
    >
      <Row templateColumns="repeat(2, auto)" gap={1} alignItems="center">
        <Status sentiment="warning" />
        <Text as="h3" variant="bodyStrong" sentiment="neutral" oneLine>
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
