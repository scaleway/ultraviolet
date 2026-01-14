import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Popover } from '../index'

export const Playground: StoryFn<typeof Popover> = args => {
  const [opened, setOpened] = useState(false)

  const onCloseCallBack = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <Popover
      {...args}
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      onClose={onCloseCallBack}
      title="Popover Title"
      visible={opened}
    >
      <Button onClick={() => setOpened(true)} sentiment="neutral">
        Open Popover
      </Button>
    </Popover>
  )
}

Playground.parameters = {
  docs: {
    description: {
      story:
        'You can controle the state of the popover by passing `visible` prop to it and handle the `onClose` callback. This is useful when you want to control the state of the popover yourself.',
    },
  },
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '200px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StoryComponent />
      </div>
    </div>
  ),
]
