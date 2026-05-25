import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Modal } from '..'
import type { ModalState } from '../../../../dist/components/Modal/types'
import { Toggle } from '../../Toggle'

export const ToggleStory: StoryFn = () => {
  const [toggled, setToggled] = useState(false)

  const disclosure = (dialog: ModalState) => (
    <Toggle
      checked={toggled}
      name="toggle"
      onChange={() => {
        dialog?.toggle?.()
        setToggled(true)
      }}
    />
  )

  return (
    <Modal
      disclosure={disclosure}
      onBeforeClose={() => {
        setToggled(false)
      }}
    >
      <div>Content should be present in center of the modal</div>
    </Modal>
  )
}
