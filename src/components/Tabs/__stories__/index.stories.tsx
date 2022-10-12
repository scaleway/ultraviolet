import { Meta, Story } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import Tabs from '..'
import Badge from '../../Badge'
import Tab from '../Tab'

export default {
  args: {
    children: [<Tabs.Tab>Choice 1</Tabs.Tab>],
    selected: 0,
  },
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Tabs gives a navigation made out of tabs.',
      },
    },
  },
  subcomponents: { Tab },
  title: 'Components/Navigation/Tabs',
} as Meta

const Template: Story<Omit<ComponentProps<typeof Tabs>, 'onChange'>> = ({
  selected,
  ...args
}) => {
  const [change, onChange] = useState(selected)
  const onChangeHandler = (e?: string | number) => onChange(e)

  return <Tabs selected={change} onChange={onChangeHandler} {...args} />
}

export const Default = Template.bind({})

export const Disabled = Template.bind({})

Disabled.args = {
  children: [
    <Tabs.Tab value="first">Choice 1</Tabs.Tab>,
    <Tabs.Tab value="second" disabled>
      Choice 2
    </Tabs.Tab>,
    <Tabs.Tab value={3}>Choice 3</Tabs.Tab>,
  ],
  selected: 'first',
}

export const Showcase = Template.bind({})

Showcase.args = {
  children: [
    <Tabs.Tab value={1}>Choice 1</Tabs.Tab>,
    <Tabs.Tab value={2} as="a" href="https://scaleway.com" target="_blank">
      Link
    </Tabs.Tab>,
    <Tabs.Tab value={3} disabled>
      Disabled
    </Tabs.Tab>,
    <Tabs.Tab value={4} href="https://scaleway.com" as="a" disabled>
      Disabled too
    </Tabs.Tab>,
    <Tabs.Tab value={5} as="a" href="https://scaleway.com" target="_blank">
      Link no value
    </Tabs.Tab>,
    <Tabs.Tab value={6} as="div">
      Choice 6
    </Tabs.Tab>,
    <Tabs.Tab value="six">Choice 6 too but six value</Tabs.Tab>,
    <Tabs.Tab value="tooltip" tooltip="Awesome tooltip">
      With tooltip
    </Tabs.Tab>,
    <Tabs.Tab value="8" counter={1}>
      Choice 8
    </Tabs.Tab>,
    <Tabs.Tab value="9" counter={10}>
      Choice 9
    </Tabs.Tab>,
  ],
  selected: 1,
}

export const WithBadges = Template.bind({})

WithBadges.args = {
  children: [
    <Tabs.Tab
      value={1}
      badge={
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={2}
      counter={1}
      badge={
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={3}
      counter={10}
      badge={
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={4}
      disabled
      badge={
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={5}
      disabled
      counter={1}
      badge={
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={6}
      disabled
      counter={10}
      badge={
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}

export const WithMenu = Template.bind({})

WithMenu.args = {
  children: [
    <Tabs.Tab value={1}>Choice</Tabs.Tab>,
    <Tabs.Tab value={2}>Choice</Tabs.Tab>,
    <Tabs.Tab value={3}>Choice</Tabs.Tab>,
    <Tabs.Tab value={4}>Choice</Tabs.Tab>,
    <Tabs.Menu disclosure={<span>I am a menu</span>}>
      <Tabs.MenuItem value={5}>Choice</Tabs.MenuItem>
      <Tabs.MenuItem value={6}>Choice</Tabs.MenuItem>
    </Tabs.Menu>,
    <Tabs.Tab>Choice</Tabs.Tab>,
  ],
  selected: 1,
}

export const MenuDisabled = Template.bind({})

MenuDisabled.args = {
  children: [
    <Tabs.Tab value={1}>Choice</Tabs.Tab>,
    <Tabs.Tab value={2}>Choice</Tabs.Tab>,
    <Tabs.Tab value={3}>Choice</Tabs.Tab>,
    <Tabs.Tab value={4}>Choice</Tabs.Tab>,
    <Tabs.Menu disabled disclosure={<span>I am a menu</span>}>
      <Tabs.MenuItem value={5}>Choice</Tabs.MenuItem>
      <Tabs.MenuItem value={6}>Choice</Tabs.MenuItem>
    </Tabs.Menu>,
    <Tabs.Tab>Choice</Tabs.Tab>,
  ],
  selected: 1,
}

export const MenuShowCase = Template.bind({})

MenuShowCase.args = {
  children: [
    <Tabs.Tab value={1}>Choice</Tabs.Tab>,
    <Tabs.Tab value={2}>Choice</Tabs.Tab>,
    <Tabs.Tab value={3}>Choice</Tabs.Tab>,
    <Tabs.Tab value={4}>Choice</Tabs.Tab>,
    <Tabs.Tab value={5}>Choice</Tabs.Tab>,
    <Tabs.Menu
      style={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}
      disclosure="More"
    >
      <Tabs.MenuItem value={6}>Choice</Tabs.MenuItem>
      <Tabs.MenuItem value={7}>Choice</Tabs.MenuItem>
    </Tabs.Menu>,
  ],
  selected: 1,
}

export const WithCounter = Template.bind({})

WithCounter.args = {
  children: [
    <Tabs.Tab value={1}>No Counter</Tabs.Tab>,
    <Tabs.Tab value={2} counter={0}>
      No items
    </Tabs.Tab>,
    <Tabs.Tab value={2} counter={8}>
      Some items
    </Tabs.Tab>,
  ],
  selected: 1,
}
