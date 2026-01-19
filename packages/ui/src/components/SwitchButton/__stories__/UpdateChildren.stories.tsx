import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { SwitchButton } from '../index'

export const UpdateChildren: StoryFn<
  ComponentProps<typeof SwitchButton>
> = () => {
  const [firstCount, setFirstCount] = useState(1)
  const [value, setValue] = useState('1')

  return (
    <>
      <button
        onClick={() =>
          setFirstCount(current => (current === 1 ? 10_000_000 : 1))
        }
        type="button"
      >
        Change children size
      </button>

      <SwitchButton
        onChange={event => setValue(event.target.value)}
        value={value}
      >
        <SwitchButton.Option value="1">Button {firstCount}</SwitchButton.Option>
        <SwitchButton.Option value="2">Button</SwitchButton.Option>
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
