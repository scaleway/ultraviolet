import type { StoryFn } from '@storybook/react-vite'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Popover } from '../index'
import { Playground } from './Playground.stories'

export const Sentiments: StoryFn<typeof Popover> = () => {
  const [primaryOpened, setPrimaryOpened] = useState(false)
  const [defaultOpened, setDefaultOpened] = useState(false)

  const onCloseCallBack = useCallback(
    (setValue: Dispatch<SetStateAction<boolean>>) => {
      setValue(false)
    },
    [],
  )

  return (
    <div style={{ display: 'inline-flex', gap: '16px' }}>
      <Popover
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setDefaultOpened)}
        sentiment="neutral"
        title="Popover Title"
        visible={defaultOpened}
      >
        <Button onClick={() => setDefaultOpened(true)} sentiment="neutral">
          Open Popover neutral sentiment
        </Button>
      </Popover>

      <Popover
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setPrimaryOpened)}
        sentiment="primary"
        title="Popover Title"
        visible={primaryOpened}
      >
        <Button onClick={() => setPrimaryOpened(true)}>
          Open Popover primary sentiment
        </Button>
      </Popover>
    </div>
  )
}

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Popover has two sentiments: `neutral` and `primary`. You can change the sentiment by passing `sentiment` prop to the component. The default sentiment is `neutral`.',
    },
  },
}

Sentiments.decorators = Playground.decorators
