import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'
import { TextInputV2 } from '../../TextInputV2'

export const DefaultDisclosure = <Button>Open Modal</Button>

export const AutoFocus: StoryFn = props => (
  <Modal disclosure={DefaultDisclosure} {...props}>
    <div>
      The second input will autofocus
      <TextInputV2 placeholder="placeholder" />
      <TextInputV2
        placeholder="placeholder"
        ref={ref => {
          if (ref) {
            setTimeout(() => ref?.focus(), 1)
          }
        }}
      />
    </div>
  </Modal>
)

AutoFocus.parameters = {
  docs: {
    description: {
      story:
        'Autofocus will not work natively with the modal. To recreate autoFocus, set a ref on the element to "autofocus" and focus on the ref **with a timeout**.',
    },
  },
}
