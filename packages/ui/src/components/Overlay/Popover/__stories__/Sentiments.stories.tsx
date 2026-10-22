import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Popover } from '../index'
import { Playground } from './Playground.stories'

export const Sentiments: StoryFn<typeof Popover> = () => (
  <Stack direction="row" gap={2}>
    <Popover
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      sentiment="neutral"
      title="Popover Title"
    >
      <Button sentiment="neutral">Open Popover neutral sentiment</Button>
    </Popover>

    <Popover
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      sentiment="primary"
      title="Popover Title"
    >
      <Button>Open Popover primary sentiment</Button>
    </Popover>
  </Stack>
)

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Popover has two sentiments: `neutral` and `primary`. You can change the sentiment by passing `sentiment` prop to the component. The default sentiment is `neutral`.',
    },
  },
}

Sentiments.decorators = Playground.decorators
