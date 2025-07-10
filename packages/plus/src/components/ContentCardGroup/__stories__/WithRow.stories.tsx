import type { StoryFn } from '@storybook/react-vite'
import { Row } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { ContentCardGroup } from '..'

export const WithRow: StoryFn<ComponentProps<typeof ContentCardGroup>> = ({
  ...props
}) => (
  <Row templateColumns="repeat(2, 1fr)" gap={1}>
    <ContentCardGroup {...props}>
      <ContentCardGroup.Card
        title="Multi AZ available on Scaleway Kubernetes Clusters Multi AZ available on Scaleway Kubernetes Clusters Multi AZ available on Scaleway Kubernetes Clusters"
        subtitle="Oct 25 2023"
        description="Improve your cluster resiliency !"
        href="https://www.scaleway.com/docs/containers/kubernetes/reference-content/multi-az-clusters/"
      />
      <ContentCardGroup.Card
        title="Why did Danish company KeepFocus, specialized in building metering"
        subtitle="Oct 12, 2023"
        href="https://www.scaleway.com/en/blog/scaleway-cloud-like-henrik-tudborg-keepfocus-migration/"
        description="All Regions are now fully migrated on the Hive backend."
      />
      <ContentCardGroup.Card
        title="We are delighted to announce the launch of Virtual Private Cloud (VPC)"
        subtitle="Sep 13 2023"
        href="https://www.scaleway.com/en/blog/how-to-optimize-object-security-reliability/"
        description="Enjoy your new VPC Product with regional private network."
      />
    </ContentCardGroup>
    <ContentCardGroup {...props}>
      <ContentCardGroup.Card
        title="Multi AZ available on Scaleway Kubernetes Clusters Multi AZ available on Scaleway Kubernetes Clusters Multi AZ available on Scaleway Kubernetes Clusters"
        subtitle="Oct 25 2023"
        description="Improve your cluster resiliency !"
        href="https://www.scaleway.com/docs/containers/kubernetes/reference-content/multi-az-clusters/"
      />
      <ContentCardGroup.Card
        title="Why did Danish company KeepFocus, specialized in building metering"
        subtitle="Oct 12, 2023"
        href="https://www.scaleway.com/en/blog/scaleway-cloud-like-henrik-tudborg-keepfocus-migration/"
        description="All Regions are now fully migrated on the Hive backend."
      />
      <ContentCardGroup.Card
        title="We are delighted to announce the launch of Virtual Private Cloud (VPC)"
        subtitle="Sep 13 2023"
        href="https://www.scaleway.com/en/blog/how-to-optimize-object-security-reliability/"
        description="Enjoy your new VPC Product with regional private network."
      />
    </ContentCardGroup>
  </Row>
)
