import { Tabs } from '..'
import { Badge } from '../../Badge'
import { Template } from './Template.stories'

export const WithBadge = Template.bind({})

WithBadge.args = {
  children: [
    <Tabs.Tab
      value={1}
      badge={
        <Badge variant="warning" size="small">
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
        <Badge variant="warning" size="small">
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
        <Badge variant="warning" size="small">
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
        <Badge variant="warning" size="small">
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
        <Badge variant="warning" size="small">
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
        <Badge variant="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
