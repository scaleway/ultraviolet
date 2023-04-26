import type { Story } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '..'
import { Toggle } from '../../Toggle'

export const ToggleStory: Story = () => {
  const [toggled, setToggled] = useState(false)

  return (
    <Modal
      disclosure={dialog => (
        <Toggle
          name="toggle"
          checked={toggled}
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
