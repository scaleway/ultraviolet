import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'

export const Template: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({
  ...props
}) => (
  <ContentCardGroup {...props}>
    <ContentCardGroup.Card
      description="Improve your cluster resiliency !"
      href="https://www.scaleway.com/docs/containers/kubernetes/reference-content/multi-az-clusters/"
      subtitle="Oct 25 2023"
      title="Multi AZ available on Scaleway Kubernetes Clusters"
    />
    <ContentCardGroup.Card
      description="All Regions are now fully migrated on the Hive backend."
      href="https://www.scaleway.com/en/blog/scaleway-cloud-like-henrik-tudborg-keepfocus-migration/"
      subtitle="Oct 12, 2023"
      title="Why did Danish company KeepFocus, specialized in building metering"
    />
    <ContentCardGroup.Card
      description="Enjoy your new VPC Product with regional private network."
      href="https://www.scaleway.com/en/blog/how-to-optimize-object-security-reliability/"
      subtitle="Sep 13 2023"
      title="We are delighted to announce the launch of Virtual Private Cloud (VPC)"
    />
  </ContentCardGroup>
)
