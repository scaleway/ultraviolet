import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Tabs } from '..'

export const Template: StoryFn<
  Omit<ComponentProps<typeof Tabs>, 'onChange'>
> = ({ selected, ...args }) => {
  const [change, onChange] = useState(selected)
  const onChangeHandler = (e?: string | number) => onChange(e)

  return (
    // <div style={{ maxWidth: '400px' }}>
    <Tabs selected={change} onChange={onChangeHandler} {...args} />
    // </div>
  )
}
