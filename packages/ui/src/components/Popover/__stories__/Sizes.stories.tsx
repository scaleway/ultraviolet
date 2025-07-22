import type { StoryFn } from '@storybook/react-vite'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Popover } from '../index'
import { Playground } from './Playground.stories'

export const Sizes: StoryFn<typeof Popover> = () => {
  const [openedSmall, setOpenedSmall] = useState(false)
  const [openedMedium, setOpenedMedium] = useState(false)
  const [openedLarge, setOpenedLarge] = useState(false)

  const onCloseCallBack = useCallback(
    (setValue: Dispatch<SetStateAction<boolean>>) => {
      setValue(false)
    },
    [],
  )

  return (
    <div style={{ gap: '16px', display: 'inline-flex' }}>
      <Popover
        visible={openedSmall}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setOpenedSmall)}
        size="small"
      >
        <Button sentiment="neutral" onClick={() => setOpenedSmall(true)}>
          Open Popover small size
        </Button>
      </Popover>

      <Popover
        visible={openedMedium}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setOpenedMedium)}
        size="medium"
      >
        <Button sentiment="neutral" onClick={() => setOpenedMedium(true)}>
          Open Popover medium size
        </Button>
      </Popover>

      <Popover
        visible={openedLarge}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setOpenedLarge)}
        size="large"
      >
        <Button sentiment="neutral" onClick={() => setOpenedLarge(true)}>
          Open Popover large size
        </Button>
      </Popover>
    </div>
  )
}

Sizes.parameters = {
  docs: {
    description: {
      story: `Popover has two sentiments: \`neutral\` and \`primary\`. You can change the sentiment by passing \`sentiment\` prop to the component. The default sentiment is \`neutral\`.`,
    },
  },
}

Sizes.decorators = Playground.decorators
