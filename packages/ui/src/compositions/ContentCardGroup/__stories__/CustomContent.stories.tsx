import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'

export const CustomContent: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({ ...props }) => (
  <ContentCardGroup {...props}>
    <ContentCardGroup.Card
      href="http://scaleway.com/example"
      subtitle="Sept 22, 2023 - 11h01"
      title="Cluster pool default has been scaled"
    >
      <div>3 nodes are ready out of 3, rollout completed in 2m14s.</div>
    </ContentCardGroup.Card>
    <ContentCardGroup.Card href="http://scaleway.com/example">
      <div>Region fr-par is now available for Instance offers.</div>
    </ContentCardGroup.Card>
  </ContentCardGroup>
)

CustomContent.parameters = {
  docs: {
    description: {
      story:
        'Custom children that do not set their own color inherit the card theme text color, so they stay readable on dark themes.',
    },
  },
}
