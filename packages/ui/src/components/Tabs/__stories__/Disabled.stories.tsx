import { Tabs } from '..'
import { Template } from './Template.stories'

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
