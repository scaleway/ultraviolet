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
    <div style={{ gap: '16px', display: 'inline-flex' }}>
      <Popover
        visible={defaultOpened}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        sentiment="neutral"
        onClose={() => onCloseCallBack(setDefaultOpened)}
      >
        <Button sentiment="neutral" onClick={() => setDefaultOpened(true)}>
          Open Popover neutral sentiment
        </Button>
      </Popover>

      <Popover
        visible={primaryOpened}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        sentiment="primary"
        onClose={() => onCloseCallBack(setPrimaryOpened)}
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
      story: `Popover has two sentiments: \`neutral\` and \`primary\`. You can change the sentiment by passing \`sentiment\` prop to the component. The default sentiment is \`neutral\`.`,
    },
  },
}

Sentiments.decorators = Playground.decorators
