import Tabs from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <Tabs.Tab value={0}>Choice 1</Tabs.Tab>,
    <Tabs.Tab value={1}>Choice 2</Tabs.Tab>,
  ],
  selected: 0,
}
