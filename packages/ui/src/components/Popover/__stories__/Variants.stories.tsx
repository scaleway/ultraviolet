import type { StoryFn } from '@storybook/react'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Popover } from '../index'

export const Variants: StoryFn<typeof Popover> = () => {
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
        variant="default"
        onClose={() => onCloseCallBack(setDefaultOpened)}
      >
        <Button sentiment="neutral" onClick={() => setDefaultOpened(true)}>
          Open Popover default variant
        </Button>
      </Popover>

      <Popover
        visible={primaryOpened}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        variant="primary"
        onClose={() => onCloseCallBack(setPrimaryOpened)}
      >
        <Button onClick={() => setPrimaryOpened(true)}>
          Open Popover primary variant
        </Button>
      </Popover>
    </div>
  )
}

Variants.parameters = {
  docs: {
    description: {
      story: `Popover has two variants: \`default\` and \`primary\`. You can change the variant by passing \`variant\` prop to the component. The default variant is \`default\`.`,
    },
  },
}
