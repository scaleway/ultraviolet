import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Popover } from '../index'

export const Controlled: StoryFn<typeof Popover> = args => {
  const [visible, setVisible] = useState(false)

  const onClose = () => {
    const confirm = globalThis.confirm('Do you really want to close the Popover?')

    if (confirm) {
      setVisible(false)
    }
  }

  return (
    <Popover {...args} visible={visible} onClose={onClose}>
      <Button sentiment="neutral" onClick={() => setVisible(true)}>
        Open Popover
      </Button>
    </Popover>
  )
}

Controlled.args = {
  content: (
    <p>
      This Popover is controlled by the <code>visible</code> property. Any action that should close it will call the{' '}
      <code>onClose</code> callback to update (or not) the <code>visible</code> property.
    </p>
  ),
  title: 'Controlled Popover',
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'You can control the state of the popover by passing the `visible` prop to it and handle the `onClose` callback.',
    },
  },
}

Controlled.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2} justifyContent="center" alignItems="end" style={{ height: '200px' }}>
      <StoryComponent />
    </Stack>
  ),
]
