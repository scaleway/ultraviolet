import type { ComponentStory } from '@storybook/react'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { ButtonV2 } from '../../ButtonV2'
import { Popover } from '../index'

export const Sizes: ComponentStory<typeof Popover> = () => {
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
        <ButtonV2 sentiment="neutral" onClick={() => setOpenedSmall(true)}>
          Open Popover small size
        </ButtonV2>
      </Popover>

      <Popover
        visible={openedMedium}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setOpenedMedium)}
        size="medium"
      >
        <ButtonV2 sentiment="neutral" onClick={() => setOpenedMedium(true)}>
          Open Popover medium size
        </ButtonV2>
      </Popover>

      <Popover
        visible={openedLarge}
        title="Popover Title"
        content="This is a simple text content inside the popover. You can customize it by passing text into content property."
        onClose={() => onCloseCallBack(setOpenedLarge)}
        size="large"
      >
        <ButtonV2 sentiment="neutral" onClick={() => setOpenedLarge(true)}>
          Open Popover large size
        </ButtonV2>
      </Popover>
    </div>
  )
}

Sizes.parameters = {
  docs: {
    description: {
      story: `Popover has two variants: \`default\` and \`primary\`. You can change the variant by passing \`variant\` prop to the component. The default variant is \`default\`.`,
    },
  },
}
