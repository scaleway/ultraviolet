import { Tabs } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  children: [
    <Tabs.Tab key="first" value="first">
      Choice 1
    </Tabs.Tab>,
    <Tabs.Tab key="second" value="second" disabled>
      Choice 2
    </Tabs.Tab>,
    <Tabs.Tab key="3" value={3}>
      Choice 3
    </Tabs.Tab>,
  ],
  selected: 'first',
}
