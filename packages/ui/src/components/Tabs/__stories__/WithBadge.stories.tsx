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
      value={6}
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
