import Tabs from '..'
import { Template } from './Template.stories'

export const MenuDisabled = Template.bind({})

MenuDisabled.args = {
  children: [
    <Tabs.Tab value={1}>Choice</Tabs.Tab>,
    <Tabs.Tab value={2}>Choice</Tabs.Tab>,
    <Tabs.Tab value={3}>Choice</Tabs.Tab>,
    <Tabs.Tab value={4}>Choice</Tabs.Tab>,
    <Tabs.Menu disabled disclosure={<span>I am a menu</span>}>
      <Tabs.MenuItem value={5}>Choice</Tabs.MenuItem>
      <Tabs.MenuItem value={6}>Choice</Tabs.MenuItem>
    </Tabs.Menu>,
    <Tabs.Tab>Choice</Tabs.Tab>,
  ],
  selected: 1,
}
