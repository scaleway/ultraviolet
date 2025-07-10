import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Tabs } from '..'

export const Template: StoryFn<
  Omit<ComponentProps<typeof Tabs>, 'onChange'>
> = ({ selected, ...args }) => {
  const [change, onChange] = useState(selected)
  const onChangeHandler = (e?: string | number) => onChange(e)

  return <Tabs selected={change} onChange={onChangeHandler} {...args} />
}
