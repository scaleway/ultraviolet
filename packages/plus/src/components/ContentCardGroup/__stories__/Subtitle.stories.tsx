import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'

export const Subtitle: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({
  ...props
}) => (
  <ContentCardGroup {...props}>
    <ContentCardGroup.Card
      title="Multi AZ available on Scaleway Kubernetes Clusters"
      description="Improve your cluster resiliency !"
      href="https://www.scaleway.com/docs/containers/kubernetes/reference-content/multi-az-clusters/"
    />
    <ContentCardGroup.Card
      title="Why did Danish company KeepFocus, specialized in building metering"
      href="https://www.scaleway.com/en/blog/scaleway-cloud-like-henrik-tudborg-keepfocus-migration/"
      description="All Regions are now fully migrated on the Hive backend."
    />
    <ContentCardGroup.Card
      title="We are delighted to announce the launch of Virtual Private Cloud (VPC)"
      href="https://www.scaleway.com/en/blog/how-to-optimize-object-security-reliability/"
      description="Enjoy your new VPC Product with regional private network."
    />
  </ContentCardGroup>
)

Subtitle.parameters = {
  docs: {
    description: {
      story: '`subtitle` card prop is optional',
    },
  },
}
