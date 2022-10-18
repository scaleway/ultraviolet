import Tabs from '..'
import { Template } from './Template.stories'

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
