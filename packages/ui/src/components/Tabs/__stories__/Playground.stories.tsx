import { Tabs } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <Tabs.Tab key={0} value={0}>
      Choice 1
    </Tabs.Tab>,
    <Tabs.Tab key={1} value={1}>
      Choice 2
    </Tabs.Tab>,
  ],
  selected: 0,
}
