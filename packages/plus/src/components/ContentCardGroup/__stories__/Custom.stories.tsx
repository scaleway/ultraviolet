import type { StoryFn } from '@storybook/react'
import { Stack, Status, Text } from '@ultraviolet/ui'
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
      <Stack direction="row" gap={1} alignItems="center">
        <Status sentiment="success" />
        <Text as="h3" variant="bodyStrong" sentiment="neutral">
          [PAR] Servers are ups
        </Text>
      </Stack>
    </ContentCardGroup.Card>
    <ContentCardGroup.Card
      subtitle="Sept 22, 2023 - 11h00"
      href="http://scaleway.com/example"
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Status sentiment="danger" />
        <Text as="h3" variant="bodyStrong" sentiment="neutral">
          [PAR] Servers downs
        </Text>
      </Stack>
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
