import Tabs from '..'
import { Template } from './Template.stories'

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
