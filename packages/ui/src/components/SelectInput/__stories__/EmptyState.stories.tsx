import type { StoryFn } from '@storybook/react-vite'
import {
  DynamicIllustration,
  // @ts-expect-error can't import ultraviolet/illustration in ui (cyclic dependencies)
} from '@ultraviolet/illustrations'
import { EmptyState as EmptyStateComponent } from '../../EmptyState'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectInput } from '..'
import { Template } from './Template.stories'

const emptyStateText = (
  <Stack alignItems="center" gap={2}>
    <Text as="h3" variant="heading">
      No options
    </Text>
    <Text as="div" variant="body">
      This is an example of custom EmptyState. You can customise it as you want
      and make it as detailed, long and pretty as you want.
    </Text>
    <Link
      href="https://storybook.ultraviolet.scaleway.com/?path=/docs/get-started--docs"
      iconPosition="right"
    >
      It is possible to add links, for instance.
    </Link>
  </Stack>
)

export const EmptyState: StoryFn<typeof SelectInput> = args => (
  <Stack direction="column" gap={2} width="50%">
    <SelectInput
      {...args}
      emptyState={emptyStateText}
      label="Using a custom component"
    />
    <SelectInput
      {...args}
      emptyState={
        <EmptyStateComponent
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          image={<DynamicIllustration name="empty" width="120px" />}
          learnMore={{
            link: 'https://scaleway.com',
            text: 'Learn more',
          }}
          size="small"
          title="No option"
        />
      }
      helper="from ultraviolet/ui"
      label="Using component <EmptyState />"
    />
  </Stack>
)
EmptyState.args = {
  ...Template.args,
  options: {},
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
