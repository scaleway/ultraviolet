import { useEffect, useRef, useState } from 'react'

import { Button } from '../../Button'
import { Popover } from '../index'

import type { StoryFn } from '@storybook/react-vite'

export const PlacementAuto: StoryFn<typeof Popover> = args => {
  const [opened, setOpened] = useState(false)
  const btnRef = useRef<HTMLElement>(null)

  useEffect(() => {
    btnRef.current?.scrollIntoView({ block: 'center', inline: 'center' })
  }, [])

  return (
    <Popover
      {...args}
      content="This is a simple text content inside the popover. You can customize it by passing text into content property."
      onClose={() => setOpened(false)}
      title="Popover Title"
      visible={opened}
    >
      <Button onClick={() => setOpened(true)} sentiment="neutral" ref={btnRef}>
        Open Popover
      </Button>
    </Popover>
  )
}

PlacementAuto.parameters = {
  docs: {
    description: {
      story:
        'The Popover automatically flips its direction if the "placement" prop includes "auto" and there is not enough space to open it in the requested direction.<br/>It also translates on the axis orthogonal to the direction, to avoid overflowing its container.',
    },
  },
}

PlacementAuto.decorators = [
  StoryComponent => (
    <div
      style={{
        height: '400px',
        overflow: 'auto',
        position: 'relative',
        border: '2px solid red',
        margin: '1rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '300%',
          width: '300%',
        }}
      >
        <StoryComponent />
      </div>
    </div>
  ),
]
