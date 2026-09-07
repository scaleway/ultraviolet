import { Tabs } from '..'
import { Template } from './Template.stories'

export const MenuDisabled = Template.bind({})

MenuDisabled.args = {
  children: [
    <Tabs.Tab key={1} value={1}>
      Choice
    </Tabs.Tab>,
    <Tabs.Tab key={2} value={2}>
      Choice
    </Tabs.Tab>,
    <Tabs.Tab key={3} value={3}>
      Choice
    </Tabs.Tab>,
    <Tabs.Tab key={4} value={4}>
      Choice
    </Tabs.Tab>,
    <Tabs.Menu disabled disclosure={<span>I am a menu</span>} key="menu">
      <Tabs.MenuItem key={5} value={5}>
        Choice
      </Tabs.MenuItem>
      <Tabs.MenuItem key={6} value={6}>
        Choice
      </Tabs.MenuItem>
    </Tabs.Menu>,
    <Tabs.Tab key="last">Choice</Tabs.Tab>,
  ],
  selected: 1,
}
