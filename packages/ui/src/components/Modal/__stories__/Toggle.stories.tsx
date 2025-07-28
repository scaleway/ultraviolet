import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Toggle } from '../../Toggle'
import { Modal } from '..'

export const ToggleStory: StoryFn = () => {
  const [toggled, setToggled] = useState(false)

  return (
    <Modal
      disclosure={dialog => (
        <Toggle
          checked={toggled}
          name="toggle"
          onChange={() => {
            dialog?.toggle?.()
            setToggled(true)
          }}
        />
      )}
      onBeforeClose={() => {
        setToggled(false)
      }}
    >
      <div>Content should be present in center of the modal</div>
    </Modal>
  )
}
