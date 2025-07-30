import { Badge } from '../../Badge'
import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithBadge = Template.bind({})

WithBadge.args = {
  children: [
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      key={1}
      value={1}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={1}
      key={2}
      value={2}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={10}
      key={3}
      value={3}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      disabled
      key={4}
      value={4}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={1}
      disabled
      key={5}
      value={5}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={10}
      disabled
      key={6}
      value={6}
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
