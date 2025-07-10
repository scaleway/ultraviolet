import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'

export const Description: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({
  ...props
}) => (
  <ContentCardGroup {...props}>
    <ContentCardGroup.Card
      title="Multi AZ available on Scaleway Kubernetes Clusters"
      subtitle="Oct 25 2023"
      href="https://www.scaleway.com/docs/containers/kubernetes/reference-content/multi-az-clusters/"
    />
    <ContentCardGroup.Card
      title="Why did Danish company KeepFocus, specialized in building metering"
      subtitle="Oct 12, 2023"
      href="https://www.scaleway.com/en/blog/scaleway-cloud-like-henrik-tudborg-keepfocus-migration/"
    />
    <ContentCardGroup.Card
      title="We are delighted to announce the launch of Virtual Private Cloud (VPC)"
      subtitle="Sep 13 2023"
      href="https://www.scaleway.com/en/blog/how-to-optimize-object-security-reliability/"
    />
  </ContentCardGroup>
)

Description.parameters = {
  docs: {
    description: {
      story: '`description` card prop is optional',
    },
  },
}
