import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Popover } from '../index'
import { Playground } from './Playground.stories'

export const Sizes: StoryFn<typeof Popover> = () => (
  <Stack direction="row" gap={2}>
    <Popover
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      size="small"
      title="Popover Title"
    >
      <Button sentiment="neutral">Open Popover small size</Button>
    </Popover>

    <Popover
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      size="medium"
      title="Popover Title"
    >
      <Button sentiment="neutral">Open Popover medium size</Button>
    </Popover>

    <Popover
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      size="large"
      title="Popover Title"
    >
      <Button sentiment="neutral">Open Popover large size</Button>
    </Popover>
  </Stack>
)

Sizes.parameters = {
  docs: {
    description: {
      story:
        'Popover has two sentiments: `neutral` and `primary`. You can change the sentiment by passing `sentiment` prop to the component. The default sentiment is `neutral`.',
    },
  },
}

Sizes.decorators = Playground.decorators
