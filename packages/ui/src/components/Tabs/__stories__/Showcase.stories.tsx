import { Badge } from '../../Badge'
import { Tabs } from '..'
import { Template } from './Template.stories'

export const Showcase = Template.bind({})

Showcase.args = {
  children: [
    <Tabs.Tab key={1} value={1}>
      Choice 1
    </Tabs.Tab>,
    <Tabs.Tab
      as="a"
      href="https://scaleway.com"
      key={2}
      target="_blank"
      value={2}
    >
      Link
    </Tabs.Tab>,
    <Tabs.Tab disabled key={3} value={3}>
      Disabled
    </Tabs.Tab>,
    <Tabs.Tab as="a" disabled href="https://scaleway.com" key={4} value={4}>
      Disabled too
    </Tabs.Tab>,
    <Tabs.Tab
      as="a"
      href="https://scaleway.com"
      key={5}
      target="_blank"
      value={5}
    >
      Link no value
    </Tabs.Tab>,
    <Tabs.Tab as="div" key={6} value={6}>
      Choice 6
    </Tabs.Tab>,
    <Tabs.Tab key="six" value="six">
      Choice 6 too but six value
    </Tabs.Tab>,
    <Tabs.Tab key="tooltip" tooltip="Awesome tooltip" value="tooltip">
      With tooltip
    </Tabs.Tab>,
    <Tabs.Tab counter={1} key="8" value="8">
      Choice 8
    </Tabs.Tab>,
    <Tabs.Tab counter={10} key="9" value="9">
      Choice 9
    </Tabs.Tab>,
    <Tabs.Tab key="10" value="10">
      Lots of info <Badge>New badge very long</Badge>
    </Tabs.Tab>,
  ],
  selected: 1,
}
