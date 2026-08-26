import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithCounter = Template.bind({})

WithCounter.args = {
  children: [
    <Tabs.Tab key={1} value={1}>
      No Counter
    </Tabs.Tab>,
    <Tabs.Tab counter={0} key={2} value={2}>
      No items
    </Tabs.Tab>,
    <Tabs.Tab counter={8} key={3} value={3}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab counter={80} key={4} value={4}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab counter={8000} key={5} value={5}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab counter="99+" key={6} value={6}>
      Some items
    </Tabs.Tab>,
  ],
  selected: 1,
}
