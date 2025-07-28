import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithCounter = Template.bind({})

WithCounter.args = {
  children: [
    <Tabs.Tab value={1}>No Counter</Tabs.Tab>,
    <Tabs.Tab counter={0} value={2}>
      No items
    </Tabs.Tab>,
    <Tabs.Tab counter={8} value={3}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab counter={80} value={4}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab counter={8000} value={5}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab counter="99+" value={6}>
      Some items
    </Tabs.Tab>,
  ],
  selected: 1,
}
