import type { StoryFn } from '@storybook/react'
import { CockpitProductIcon } from '@ultraviolet/icons/product'
import { Row, Stack, Text } from '@ultraviolet/ui'
import illustration from '../assets/illustration.png'
import { ContentCard } from '../index'

export const Disabled: StoryFn<typeof ContentCard> = args => (
  <Stack gap={2}>
    <Row templateColumns="repeat(3, 1fr)" gap={1}>
      <Stack width="300px">
        <Text as="h2" variant="headingSmall">
          Normal
        </Text>
        <ContentCard
          {...args}
          direction="column"
          image={illustration}
          icon={<CockpitProductIcon size="large" disabled />}
          subtitle="New update"
          title="Create your first function"
          description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
          disabled
        />
      </Stack>
      <Stack width="300px">
        <Text as="h2" variant="headingSmall">
          As link
        </Text>
        <ContentCard
          {...args}
          direction="column"
          image={illustration}
          subtitle="New update"
          title="Create your first function"
          description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
          disabled
          href="https://www.scaleway.com/"
        />
      </Stack>
      <Stack width="300px">
        <Text as="h2" variant="headingSmall">
          As button
        </Text>
        <ContentCard
          {...args}
          direction="column"
          image={illustration}
          subtitle="New update"
          title="Create your first function"
          description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
          disabled
          onClick={
            // oxlint-disable-next-line eslint/no-console
            () => console.log('ok')
          }
        />
      </Stack>
    </Row>
  </Stack>
)

Disabled.parameters = {
  description: {
    story: 'You can disable the component by adding `disabled` as a prop.',
  },
}
