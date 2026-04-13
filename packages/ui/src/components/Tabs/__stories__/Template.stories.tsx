import { useState } from 'react'

import { Tabs } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  // oxlint-disable-next-line typescript/no-unnecessary-type-arguments needed here
  Omit<ComponentProps<typeof Tabs>, 'onChange'>
> = ({ selected, ...args }) => {
  const [change, onChange] = useState(selected)
  const onChangeHandler = (e?: string | number) => onChange(e)

  return <Tabs onChange={onChangeHandler} selected={change} {...args} />
}
