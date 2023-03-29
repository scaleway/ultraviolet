import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithCounter = Template.bind({})

WithCounter.args = {
  children: [
    <Tabs.Tab value={1}>No Counter</Tabs.Tab>,
    <Tabs.Tab value={2} counter={0}>
      No items
    </Tabs.Tab>,
    <Tabs.Tab value={3} counter={8}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab value={4} counter={80}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab value={5} counter={8000}>
      Some items
    </Tabs.Tab>,
    <Tabs.Tab value={6} counter="99+">
      Some items
    </Tabs.Tab>,
  ],
  selected: 1,
}
