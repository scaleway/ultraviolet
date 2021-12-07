import { Meta, Story } from '@storybook/react'
import React, { ComponentProps, useState } from 'react'
import TabGroup from '..'
import Tab from '../Tab'

export default {
  args: {
    children: [<TabGroup.Tab>Choice 1</TabGroup.Tab>],
    selected: 0,
  },
  component: TabGroup,
  parameters: {
    docs: {
      description: {
        component: 'TabGroup gives a navigation made out of tabs.',
      },
    },
  },
  subcomponents: { Tab },
  title: 'Components/Navigation/TabGroup',
} as Meta

const Template: Story<ComponentProps<typeof TabGroup>> = ({
  selected,
  ...args
}) => {
  const [change, onChange] = useState(selected)
  const onChangeHandler = (e?: string | number) => onChange(e)

  return <TabGroup selected={change} onChange={onChangeHandler} {...args} />
}

export const Default = Template.bind({})

export const Disabled = Template.bind({})

Disabled.args = {
  children: [
    <TabGroup.Tab name="first">Choice 1</TabGroup.Tab>,
    <TabGroup.Tab name="second" disabled>
      Choice 2
    </TabGroup.Tab>,
    <TabGroup.Tab name="third">Choice 3</TabGroup.Tab>,
  ],
  selected: 'first',
}

export const Showcase = Template.bind({})

Showcase.args = {
  children: [
    <TabGroup.Tab>Choice 1</TabGroup.Tab>,
    <TabGroup.Tab as="a">Choice 2</TabGroup.Tab>,
    <TabGroup.Tab disabled>Choice 3</TabGroup.Tab>,
    <TabGroup.Tab as="a" disabled>
      Choice 4
    </TabGroup.Tab>,
    <TabGroup.Tab as="div">Choice 5</TabGroup.Tab>,
    <TabGroup.Tab name="six">Choice 6</TabGroup.Tab>,
    <TabGroup.Tab>Choice 7</TabGroup.Tab>,
  ],
  selected: 1,
}
