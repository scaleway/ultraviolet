import type { StoryFn } from '@storybook/react-vite'
import { CockpitProductIcon } from '@ultraviolet/icons/product/CockpitProductIcon'
import illustration from '../assets/illustration.png'
import { ContentCard } from '../index'
import { Stack } from '../../../Stack'
import { Row } from '../../../Row'
import { Text } from '../../../Text'

export const Disabled: StoryFn<typeof ContentCard> = args => (
  <Stack gap={2}>
    <Row gap={1} templateColumns="repeat(3, 1fr)">
      <Stack width="300px">
        <Text as="h2" variant="headingSmall">
          Normal
        </Text>
        <ContentCard
          {...args}
          description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
          direction="column"
          disabled
          icon={<CockpitProductIcon disabled size="large" />}
          image={illustration}
          subtitle="New update"
          title="Create your first function"
        />
      </Stack>
      <Stack width="300px">
        <Text as="h2" variant="headingSmall">
          As link
        </Text>
        <ContentCard
          {...args}
          description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
          direction="column"
          disabled
          href="https://www.scaleway.com/"
          image={illustration}
          subtitle="New update"
          title="Create your first function"
        />
      </Stack>
      <Stack width="300px">
        <Text as="h2" variant="headingSmall">
          As button
        </Text>
        <ContentCard
          {...args}
          description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
          direction="column"
          disabled
          image={illustration}
          onClick={
            // oxlint-disable-next-line eslint/no-console
            () => console.log('ok')
          }
          subtitle="New update"
          title="Create your first function"
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
