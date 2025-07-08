import type { StoryFn } from '@storybook/react'
import { type ComponentProps, useState } from 'react'
import { SwitchButton } from '../index'

export const UpdateChildren: StoryFn<
  ComponentProps<typeof SwitchButton>
> = () => {
  const [firstCount, setFirstCount] = useState(1)
  const [value, setValue] = useState('1')

  return (
    <>
      <button
        type="button"
        onClick={() => setFirstCount(current => (current === 1 ? 10000000 : 1))}
      >
        Change children size
      </button>

      <SwitchButton
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        <SwitchButton.Option value="1">
          First ({firstCount})
        </SwitchButton.Option>
        <SwitchButton.Option value="3">Button</SwitchButton.Option>
      </SwitchButton>
    </>
  )
}
UpdateChildren.args = {
  value: 'option1',
}
UpdateChildren.parameters = {
  docs: {
    description: {
      story:
        'When the children changes, the button and the overlay should correctly resize',
    },
  },
}
