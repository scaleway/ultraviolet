import type { ComponentStory } from '@storybook/react'
import { useCallback, useState } from 'react'
import { ButtonV2 } from '../../ButtonV2'
import { Popover } from '../index'

export const Controlled: ComponentStory<typeof Popover> = () => {
  const [opened, setOpened] = useState(false)

  const onCloseCallBack = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <Popover
      visible={opened}
      title="Popover Title"
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      onClose={onCloseCallBack}
    >
      <ButtonV2 onClick={() => setOpened(true)} sentiment="neutral">
        Open Popover
      </ButtonV2>
    </Popover>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story: `You can controle the state of the popover by passing \`visible\` prop to it and handle the \`onClose\` callback. This is useful when you want to control the state of the popover yourself.`,
    },
  },
}

Controlled.decorators = [
  StoryComponent => (
    <div style={{ display: 'inline-flex' }}>
      <StoryComponent />
    </div>
  ),
]
