import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Checkbox } from '..'

export const Sizes: StoryFn<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(false)
  const [checkedSmall, setCheckedSmall] = useState(false)

  return (
    <>
      <Checkbox {...args} checked={checked} onChange={e => setChecked(e.target.checked)} size="default">
        Default size
      </Checkbox>
      <Checkbox {...args} checked={checkedSmall} onChange={e => setCheckedSmall(e.target.checked)} size="small">
        Small size
      </Checkbox>
    </>
  )
}

Sizes.args = {
  helper: 'Helper text',
}
