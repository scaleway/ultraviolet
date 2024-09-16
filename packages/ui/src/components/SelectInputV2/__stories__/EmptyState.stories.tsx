import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { EmptyState as EmptyStateComponent } from '../../EmptyState'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'

const emptyStateText = (
  <Stack gap={2} alignItems="center">
    <Text variant="heading" as="h3">
      No options
    </Text>
    <Text variant="body" as="div">
      This is an example of custom EmptyState. You can customise it as you want
      and make it as detailed, long and pretty as you want.
    </Text>
    <Link
      iconPosition="right"
      href="https://storybook.ultraviolet.scaleway.com/?path=/docs/get-started--docs"
    >
      It is possible to add links, for instance.
    </Link>
  </Stack>
)

export const EmptyState: StoryFn<typeof SelectInputV2> = args => (
  <Stack width="50%" direction="column" gap={2}>
    <SelectInputV2
      {...args}
      emptyState={emptyStateText}
      label="Using a custom component"
    />
    <SelectInputV2
      {...args}
      emptyState={
        <EmptyStateComponent
          bordered
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          image="static/media/packages/ui/src/components/EmptyState/__stories__/illustrations/kapsule.webp"
          learnMore={{
            link: 'https://scaleway.com',
            text: 'Learn more',
          }}
          title="No option"
          size="small"
        />
      }
      label="Using component <EmptyState />"
      helper="from ultraviolet/ui"
    />
  </Stack>
)
EmptyState.args = {
  ...Template.args,
  options: {},
  searchable: false,
}
EmptyState.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

EmptyState.parameters = {
  docs: {
    description: {
      story: 'Set a custom `EmptyState` when no option is available.',
    },
  },
}
