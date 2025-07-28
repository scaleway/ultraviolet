import { Badge } from '../../Badge'
import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithBadge = Template.bind({})

WithBadge.args = {
  children: [
    <Tabs.Tab
      value={1}
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={2}
      counter={1}
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={3}
      counter={10}
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={4}
      disabled
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={5}
      disabled
      counter={1}
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={6}
      disabled
      counter={10}
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
