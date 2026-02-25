import type { StoryFn } from '@storybook/react-vite'
import { Checkbox } from '..'
import { useState } from 'react'

export const Sizes: StoryFn<typeof Checkbox> = () => {
  const [checked, setChecked] = useState(false)
  const [checkedSmall, setCheckedSmall] = useState(false)

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
        size="default"
      >
        Default size
      </Checkbox>
      <Checkbox
        checked={checkedSmall}
        onChange={e => setCheckedSmall(e.target.checked)}
        size="small"
      >
        Small size
      </Checkbox>
    </>
  )
}
